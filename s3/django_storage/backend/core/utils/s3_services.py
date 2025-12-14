import io
import boto3
from botocore.exceptions import ClientError
from django.conf import settings
from datetime import timedelta
import os
from botocore.client import Config  # Used for path-style configuration


def get_s3_client():
    """Initialize and return a Boto3 S3 client configured for MinIO."""
    return boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        endpoint_url=settings.S3_ENDPOINT_URL,
        region_name=settings.AWS_DEFAULT_REGION,
        use_ssl=settings.S3_SECURE,
        verify=False,
    )


def create_bucket_if_not_exists(bucket: str):
    """Create bucket if it doesn’t exist."""
    client = get_s3_client()
    try:
        existing_buckets = [b["Name"] for b in client.list_buckets().get("Buckets", [])]
        if bucket not in existing_buckets:
            client.create_bucket(Bucket=bucket)
            print(f"Bucket '{bucket}' created.")
    except ClientError as e:
        print(f"Error creating bucket '{bucket}': {e}")
        raise


def upload_file(file_obj, bucket: str, key: str, public: bool = False) -> str:
    """Upload a file to MinIO (via Boto3) and return its public URL."""
    client = get_s3_client()
    create_bucket_if_not_exists(bucket)

    file_obj.seek(0)
    data = io.BytesIO(file_obj.read())
    content_type = getattr(file_obj, "content_type", "application/octet-stream")

    extra_args = {"ContentType": content_type}
    if public:
        extra_args["ACL"] = "public-read"

    try:
        client.upload_fileobj(data, bucket, key, ExtraArgs=extra_args)
        print(f"Uploaded '{key}' to bucket '{bucket}'")
    except ClientError as e:
        print(f"Upload failed: {e}")
        raise

    endpoint = settings.S3_ENDPOINT_URL.rstrip("/")
    scheme = "https" if settings.S3_SECURE else "http"
    return f"{scheme}://{endpoint}/{bucket}/{key}"


def get_presigned_url(bucket: str, key: str, expires_in: int = 3600) -> str:
    """Generate a presigned URL for an object."""
    client = get_s3_client()
    try:
        url = client.generate_presigned_url(
            "get_object",
            Params={"Bucket": bucket, "Key": key},
            ExpiresIn=expires_in,
        )

        url = url.replace("s3", "localhost")

        print(f"Generated presigned URL: {url}")
        return url
    except ClientError as e:
        print(f"Error generating presigned URL: {e}")
        raise


def delete_file(bucket: str, key: str):
    """Delete an object from MinIO."""
    client = get_s3_client()
    try:
        client.delete_object(Bucket=bucket, Key=key)
        print(f"Deleted '{key}' from '{bucket}'")
    except ClientError as e:
        if e.response["Error"]["Code"] == "NoSuchKey":
            print(f"Object '{key}' not found, skipping deletion.")
        else:
            raise


# def upload_file(file_obj, bucket: str, key: str, public: bool = False) -> str:
#     """
#     Upload a single file to S3/MinIO and return its public URL.

#     Args:
#         file_obj: The Django UploadedFile object.
#         bucket (str): S3 bucket name (e.g., 'projects').
#         key (str): The full S3 key (path + filename, e.g., 'myproject/src/file.txt').
#         public (bool): If True, makes the file publicly readable.

#     Returns:
#         str: The public URL of the uploaded file.
#     """

#     # 1. Setup the S3 Client (Using MinIO/Custom Endpoint)
#     s3 = boto3.client(
#         "s3",
#         endpoint_url=settings.AWS_S3_ENDPOINT_URL,  # e.g., 'http://s3:9000'
#         aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
#         aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
#         region_name="us-east-1",  # MinIO often uses a dummy region
#         config=Config(s3={"addressing_style": "path"}),  # CRITICAL for MinIO path style
#     )

#     # 2. Define Extra Args (for Content Type and Public Access)
#     extra_args = {}
#     if public:
#         extra_args["ACL"] = "public-read"

#     # Get MIME type if available
#     if hasattr(file_obj, "content_type") and file_obj.content_type:
#         extra_args["ContentType"] = file_obj.content_type

#     # 3. Perform the Upload
#     try:
#         s3.upload_fileobj(
#             Fileobj=file_obj,  # The Django UploadedFile
#             Bucket=bucket,
#             Key=key,  # The full folder path + filename
#             ExtraArgs=extra_args,
#         )
#     except Exception as e:
#         # In a real app, log this error
#         print(f"S3 Upload FAILED for {key}: {e}")
#         # Re-raise or handle as needed
#         raise

#     # 4. Construct the Public URL (Path-Style)
#     # The URL structure is: https://<S3_DOMAIN>/<bucket>/<key>

#     # Check if a custom domain/endpoint is set for public access (optional)
#     if settings.AWS_S3_CUSTOM_DOMAIN:
#         base_domain = settings.AWS_S3_CUSTOM_DOMAIN
#     else:
#         # Fallback for standard S3, but often not used with MinIO
#         base_domain = f"s3.amazonaws.com"

#     # Determine protocol based on the endpoint configuration (use https if not explicitly http)
#     protocol = "https" if "https://" in settings.AWS_S3_ENDPOINT_URL else "http"

#     # Use a clean domain for the public URL
#     clean_domain = base_domain.split("://", 1)[-1]

#     # This reliably includes the folder structure in the URL
#     final_url = f"{protocol}://{clean_domain}/{bucket}/{key}"

#     return final_url
