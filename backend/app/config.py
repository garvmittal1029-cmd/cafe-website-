"""Application configuration loaded from environment variables."""

import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load .env from project root
load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))


class Settings(BaseSettings):
    """Application settings."""

    MONGODB_URL: str = "mongodb://localhost:27017/brew_and_bloom"
    BACKEND_PORT: int = 8000
    BACKEND_HOST: str = "0.0.0.0"
    DATABASE_NAME: str = "brew_and_bloom"

    class Config:
        env_file = "../../.env"
        extra = "ignore"


settings = Settings()
