from django.urls import path
from . import views

urlpatterns = [
    path("create", views.create_project, name="create_project"),
    path("get-all", views.list_projects, name="list_projects"),
    path(
        "upload-folder", views.ProjectFolderUploadView.as_view(), name="upload_folder"
    ),
    path(
        "project-folders/",
        views.ProjectFolderListView.as_view(),
        name="project-folder-list",
    ),
]
