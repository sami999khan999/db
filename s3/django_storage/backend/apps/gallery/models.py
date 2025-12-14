from django.db import models
import uuid


# Create your models here.
class Projects(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

    image_url = models.URLField(null=True, blank=True)
    html_file_url = models.URLField(null=True, blank=True)
    json_file_url = models.URLField(null=True, blank=True)
    readme_file_url = models.URLField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ProjectFolder(models.Model):
    """
    Represents an uploaded project folder (can contain multiple files in S3)
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    s3_prefix = models.CharField(
        max_length=512, help_text="S3 path prefix where the project files are stored"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ProjectFile(models.Model):
    """
    Represents individual files of a project stored in S3
    """

    project = models.ForeignKey(
        ProjectFolder, on_delete=models.CASCADE, related_name="files"
    )
    file_name = models.CharField(max_length=512)  # relative path e.g., src/index.js
    s3_key = models.CharField(max_length=1024)  # full S3 object key
    content_type = models.CharField(max_length=255, blank=True, null=True)
    size = models.BigIntegerField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file_name} ({self.project.name})"
