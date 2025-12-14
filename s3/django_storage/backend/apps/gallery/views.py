# views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import boto3
from botocore.client import Config
from pathlib import PurePosixPath
from rest_framework import generics
from .models import ProjectFolder
from .serializers import ProjectFolderSerializer
from rest_framework.exceptions import ValidationError


from .models import Projects, ProjectFolder, ProjectFile
from core.utils.s3_services import get_presigned_url


@api_view(["POST"])
def create_project(request):
    """
    Create a Projects record and upload optional files to S3.
    Returns signed URLs for access.
    """
    # Create the project record
    name = request.data.get("name")
    description = request.data.get("description", "")

    if not name:
        return Response(
            {"error": "Name is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    project = Projects.objects.create(name=name, description=description)

    # Dictionary to store signed URLs for response
    signed_urls = {}

    # Upload image
    if "image" in request.FILES:
        project.image_url = upload_file(
            request.FILES["image"], settings.BUCKET_IMAGE, f"{project.id}/image.png"
        )
        signed_urls["image_url"] = get_presigned_url(
            settings.BUCKET_IMAGE, f"{project.id}/image.png"
        )

    # Upload HTML file
    if "html_file" in request.FILES:
        project.html_file_url = upload_file(
            request.FILES["html_file"],
            settings.BUCKET_HTML,
            f"{project.id}/index.html",
        )
        signed_urls["html_file_url"] = get_presigned_url(
            settings.BUCKET_HTML, f"{project.id}/index.html"
        )

    # Upload JSON file
    if "json_file" in request.FILES:
        project.json_file_url = upload_file(
            request.FILES["json_file"],
            settings.BUCKET_JSON,
            f"{project.id}/data.json",
        )
        signed_urls["json_file_url"] = get_presigned_url(
            settings.BUCKET_JSON, f"{project.id}/data.json"
        )

    # Upload README file
    if "readme_file" in request.FILES:
        project.readme_file_url = upload_file(
            request.FILES["readme_file"],
            settings.BUCKET_README,
            f"{project.id}/README.md",
        )
        signed_urls["readme_file_url"] = get_presigned_url(
            settings.BUCKET_README, f"{project.id}/README.md"
        )

    # Save project record with uploaded file URLs
    project.save()

    # Return project info with signed URLs
    response_data = {
        "id": str(project.id),
        "name": project.name,
    }
    response_data.update(signed_urls)
    return JsonResponse(response_data)


@api_view(["GET"])
def list_projects(request):
    """
    List all Projects with raw fields and signed URLs.
    """
    projects = Projects.objects.all()
    raw_projects = []
    signed_projects = []

    for project in projects:
        # Raw DB fields
        raw_projects.append(
            {
                "id": str(project.id),
                "name": project.name,
                "description": project.description,
                "image_url_field": project.image_url,
                "html_file_url_field": project.html_file_url,
                "json_file_url_field": project.json_file_url,
                "readme_file_url_field": project.readme_file_url,
            }
        )

        # Signed URLs
        signed_urls = {}
        if project.image_url:
            signed_urls["image_url"] = get_presigned_url(
                settings.BUCKET_IMAGE, f"{project.id}/image.png"
            )
        if project.html_file_url:
            signed_urls["html_file_url"] = get_presigned_url(
                settings.BUCKET_HTML, f"{project.id}/index.html"
            )
        if project.json_file_url:
            signed_urls["json_file_url"] = get_presigned_url(
                settings.BUCKET_JSON, f"{project.id}/data.json"
            )
        if project.readme_file_url:
            signed_urls["readme_file_url"] = get_presigned_url(
                settings.BUCKET_README, f"{project.id}/README.md"
            )
        signed_projects.append({"id": str(project.id), **signed_urls})

    return JsonResponse(
        {"raw_projects": raw_projects, "signed_projects": signed_projects}
    )


# ==================================================


def upload_file(file_obj, bucket: str, key: str, public: bool = False) -> str:
    endpoint = getattr(settings, "S3_ENDPOINT_URL", None) or getattr(
        settings, "AWS_S3_ENDPOINT_URL", None
    )
    access = getattr(settings, "AWS_ACCESS_KEY_ID", None)
    secret = getattr(settings, "AWS_SECRET_ACCESS_KEY", None)
    bucket = bucket or getattr(settings, "AWS_S3_BUCKET_NAME", "projects")

    if not endpoint or not access or not secret:
        raise RuntimeError(
            "S3 credentials/endpoint missing in settings (S3_ENDPOINT_URL/AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY)."
        )

    s3 = boto3.client(
        "s3",
        endpoint_url=endpoint,
        aws_access_key_id=access,
        aws_secret_access_key=secret,
        config=Config(s3={"addressing_style": "path"}),
    )

    extra_args = {}
    if public:
        extra_args["ACL"] = "public-read"
    if hasattr(file_obj, "content_type") and file_obj.content_type:
        extra_args["ContentType"] = file_obj.content_type

    s3.upload_fileobj(Fileobj=file_obj, Bucket=bucket, Key=key, ExtraArgs=extra_args)

    ep = endpoint.rstrip("/")
    if ep.startswith("http://") or ep.startswith("https://"):
        return f"{ep}/{bucket}/{key}"
    return f"http://{ep}/{bucket}/{key}"


class ProjectFolderUploadView(APIView):

    def post(self, request):
        files = request.FILES.getlist("files")
        relative_paths = request.data.getlist("paths")

        project_name = request.data.get("name", "untitled_project").strip()
        description = request.data.get("description", "")

        if not files:
            return Response(
                {"error": "No files uploaded."}, status=status.HTTP_400_BAD_REQUEST
            )

        if len(files) != len(relative_paths):
            return Response(
                {
                    "error": "File count mismatch with path count. Ensure frontend sends 'paths' list."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        relative_paths = [p.replace("\\", "/") for p in relative_paths]

        # --- Check for existing project with same name ---
        s3_base_prefix = f"{project_name.rstrip('/')}/"
        print("==================================================")
        print(ProjectFolder.objects.filter(name=project_name).exists())
        print("==================================================")

        if ProjectFolder.objects.filter(name=project_name).exists():
            raise ValidationError(
                {"error": f"A project with the name '{project_name}' already exists."}
            )

        # --- Determine common root folder in uploaded files ---
        first_segments = [p.split("/", 1)[0] for p in relative_paths if p]
        common_root = None
        if first_segments:
            candidate = first_segments[0]
            if all(seg == candidate for seg in first_segments):
                common_root = candidate

        # --- Create project folder ---
        project_folder = ProjectFolder.objects.create(
            name=project_name, description=description, s3_prefix=s3_base_prefix
        )

        uploaded_urls = []
        folder_structure = {}
        bucket_name = getattr(settings, "AWS_S3_BUCKET_NAME", "projects")

        for file_obj, relative_path in zip(files, relative_paths):
            if not relative_path:
                continue

            pp = PurePosixPath(relative_path)
            parts = list(pp.parts)

            if common_root and parts and parts[0] == common_root:
                parts = parts[1:]

            if not parts:
                continue

            safe_inner_path = "/".join(parts)
            project_prefix_clean = project_folder.s3_prefix.rstrip("/")
            s3_key = f"{project_prefix_clean}/{safe_inner_path}"
            s3_key = s3_key.replace("//", "/")

            print("==========================================")
            print("s3_key :", s3_key)
            print("==========================================")

            try:
                url = upload_file(
                    file_obj,
                    bucket=bucket_name,
                    key=s3_key,
                    public=False,
                )
                uploaded_urls.append(url)
            except Exception:
                continue

            try:
                ProjectFile.objects.create(
                    project=project_folder,
                    file_name=safe_inner_path,
                    s3_key=s3_key,
                    content_type=getattr(file_obj, "content_type", None),
                    size=getattr(file_obj, "size", None),
                )
            except Exception:
                pass

            node = folder_structure
            for part in parts[:-1]:
                node = node.setdefault(part, {})
            node[parts[-1]] = None

        return Response(
            {
                "project_id": str(project_folder.id),
                "name": project_folder.name,
                "description": project_folder.description,
                "folder_structure": folder_structure,
                "uploaded_files": uploaded_urls,
            },
            status=status.HTTP_201_CREATED,
        )


class ProjectFolderListView(generics.ListAPIView):
    queryset = ProjectFolder.objects.prefetch_related("files").all()
    serializer_class = ProjectFolderSerializer
