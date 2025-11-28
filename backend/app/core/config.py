"""Application configuration."""

from pydantic import BaseModel
from typing import List
import os


class Settings(BaseModel):
    """Application settings."""

    # API Settings
    API_VERSION: str = "2.0.0"
    DEBUG: bool = True

    # CORS Settings
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    # Storage Settings
    DATA_DIR: str = os.path.join(os.path.dirname(__file__), "..", "..", "data")
    COURSES_FILE: str = "courses.json"

    # AI Settings (placeholders for future integration)
    AI_API_KEY: str = ""
    AI_MODEL: str = "gpt-4"
    AI_MAX_TOKENS: int = 4096

    # Export Settings
    EXPORT_DIR: str = os.path.join(os.path.dirname(__file__), "..", "..", "exports")


settings = Settings()

# Ensure directories exist
os.makedirs(settings.DATA_DIR, exist_ok=True)
os.makedirs(settings.EXPORT_DIR, exist_ok=True)
