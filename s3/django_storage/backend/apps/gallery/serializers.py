from rest_framework import serializers
from .models import ProjectFile, ProjectFolder, Projects
from core.utils.s3_services import get_presigned_url
from config import settings


class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = "__all__"


class ProjectFileSerializer(serializers.ModelSerializer):
    presigned_url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFile
        fields = [
            "id",
            "file_name",
            "s3_key",
            "content_type",
            "size",
            "presigned_url",
            "uploaded_at",
        ]

    def get_presigned_url(self, obj):
        return get_presigned_url("projects", obj.s3_key)


class ProjectFolderSerializer(serializers.ModelSerializer):
    files = ProjectFileSerializer(many=True, read_only=True)

    class Meta:
        model = ProjectFolder
        fields = [
            "id",
            "name",
            "description",
            "s3_prefix",
            "created_at",
            "updated_at",
            "files",
        ]
