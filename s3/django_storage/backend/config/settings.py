from pathlib import Path
import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret key for Django security (must be kept secret in production)
SECRET_KEY = os.environ.get("SECRET_KEY")

# Enable debug mode (set False in production)
DEBUG = True

# Allowed hosts for this Django instance
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "api"]

# CORS settings: allow frontend apps to make requests to this API
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# ----------------------------------------------------------------------
# Installed apps
# ----------------------------------------------------------------------
INSTALLED_APPS = [
    # Django built-in apps are commented out because this is API-only
    # "django.contrib.admin",           # Optional admin interface
    # "django.contrib.auth",            # Optional if using Django's auth system
    # "django.contrib.contenttypes",    # Required if using auth/models
    # "django.contrib.sessions",        # Required if using session-based auth
    # "django.contrib.messages",        # Optional message framework
    # "django.contrib.staticfiles",     # Optional, only needed for static files
    "corsheaders",  # For handling Cross-Origin Resource Sharing
    "rest_framework",  # Django REST Framework
    "apps.gallery",  # Your custom authentication app
]

# ----------------------------------------------------------------------
# Middleware
# ---------------------------------------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # Handle CORS headers first
    "django.middleware.security.SecurityMiddleware",  # Security headers
    "django.middleware.common.CommonMiddleware",  # Standard middleware for API
    "django.middleware.csrf.CsrfViewMiddleware",  # CSRF protection
    "django.middleware.clickjacking.XFrameOptionsMiddleware",  # Prevent clickjacking
]

# ----------------------------------------------------------------------
# Django REST Framework settings
# ----------------------------------------------------------------------
REST_FRAMEWORK = {
    # Ensure that unauthenticated requests do not have a default AnonymousUser
    "UNAUTHENTICATED_USER": None,
}

# ----------------------------------------------------------------------
# Root URL configuration
# ----------------------------------------------------------------------
ROOT_URLCONF = "config.urls"

# WSGI application path (used by servers like Gunicorn or uWSGI)
WSGI_APPLICATION = "config.wsgi.application"

# ----------------------------------------------------------------------
# Database configuration
# ----------------------------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",  # PostgreSQL backend
        "NAME": os.environ.get("POSTGRES_DB"),  # Database name
        "USER": os.environ.get("POSTGRES_USER"),  # Database user
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD"),  # Database password
        "HOST": os.environ.get("POSTGRES_HOST"),  # Database host
        "PORT": os.environ.get("POSTGRES_PORT"),  # Database port
    }
}

# ----------------------------------------------------------------------
# AWS / MinIO Credentials
# ----------------------------------------------------------------------
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID", "admin")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY", "admin")
AWS_DEFAULT_REGION = os.environ.get("AWS_DEFAULT_REGION", "us-east-1")

print("=======================================")
print(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION)


S3_ENDPOINT_URL = os.environ.get("S3_ENDPOINT_URL", "http://s3_bucket:9000")
S3_SECURE = os.environ.get("S3_SECURE", False)

BUCKET_IMAGE = "images"
BUCKET_HTML = "html"
BUCKET_JSON = "json"
BUCKET_README = "readme"

# ----------------------------------------------------------------------
# Internationalization
# ----------------------------------------------------------------------
LANGUAGE_CODE = os.environ.get("LANGUAGE_CODE", "en-us")  # Default language
TIME_ZONE = os.environ.get("TIME_ZONE", "UTC")  # Default time zone
USE_I18N = True  # Enable Django translation system
USE_TZ = True  # Enable timezone-aware datetimes

# ----------------------------------------------------------------------
# Optional: Media files (user-uploaded files)
# Uncomment if you plan to store images/files in the filesystem
# ----------------------------------------------------------------------
# MEDIA_URL = "/media/"
# MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# ----------------------------------------------------------------------
# Optional: Static files (CSS/JS)
# Not needed for API-only backend unless using admin or static assets
# ----------------------------------------------------------------------
# STATIC_URL = "/static/"
