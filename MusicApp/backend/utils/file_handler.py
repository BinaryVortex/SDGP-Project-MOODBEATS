import os
import base64
import uuid
from config import settings

def get_file_type_directory(mime_type: str) -> str:
    """
    Determine the directory to store a file based on its MIME type.
    
    Args:
        mime_type: The MIME type of the file
    
    Returns:
        The directory path
    """
    if mime_type.startswith("image/"):
        return "uploads/images"
    elif mime_type.startswith("audio/"):
        return "uploads/audio"
    else:
        return "uploads"

def is_allowed_file_type(mime_type: str) -> bool:
    """
    Check if a file type is allowed for upload.
    
    Args:
        mime_type: The MIME type of the file
    
    Returns:
        True if the file type is allowed, False otherwise
    """
    if mime_type in settings.ALLOWED_IMAGE_TYPES:
        return True
    if mime_type in settings.ALLOWED_AUDIO_TYPES:
        return True
    return False

async def save_base64_file(base64_data: str, mime_type: str) -> str:
    """
    Save a base64-encoded file to disk.
    
    Args:
        base64_data: The base64-encoded file data
        mime_type: The MIME type of the file
    
    Returns:
        The path to the saved file
    """
    try:
        # Determine directory based on MIME type
        file_dir = get_file_type_directory(mime_type)
        os.makedirs(file_dir, exist_ok=True)
        
        # Determine file extension
        file_extension = ".bin"  # Default
        if mime_type == "image/jpeg":
            file_extension = ".jpg"
        elif mime_type == "image/png":
            file_extension = ".png"
        elif mime_type == "audio/mpeg":
            file_extension = ".mp3"
        elif mime_type == "audio/wav":
            file_extension = ".wav"
        
        # Generate a unique filename
        filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(file_dir, filename)
        
        # Decode and save file
        file_data = base64.b64decode(base64_data)
        with open(file_path, "wb") as f:
            f.write(file_data)
        
        return file_path
    except Exception as e:
        print(f"Error saving base64 file: {e}")
        raise