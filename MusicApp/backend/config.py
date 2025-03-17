import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from typing import List, Optional  # Add this line

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # API settings
    API_VERSION: str = "v1"
    API_PREFIX: str = f"/api/{API_VERSION}"
    
    # Server settings
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    # CORS settings
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",      # React web app
        "http://localhost:19000",     # Expo development server
        "http://localhost:19006",     # Expo web
        "exp://localhost:19000",      # Expo on device
        "http://10.0.2.2:8000",       # For Android emulator
        "*"                           # For development (remove in production)
    ]
    
    # Gemini API settings
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_API_URL: str = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent"

      # OpenAI API settings (optional)
    OPENAI_API_KEY: Optional[str] = None
    
    # File upload settings
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10 MB
    ALLOWED_IMAGE_TYPES: List[str] = ["image/jpeg", "image/png", "image/gif"]
    ALLOWED_AUDIO_TYPES: List[str] = ["audio/mpeg", "audio/wav", "audio/ogg"]
    
    # Chat settings
    MAX_HISTORY_LENGTH: int = 20  # Maximum number of messages to keep in history

    class Config:
        env_file = ".env"

settings = Settings()