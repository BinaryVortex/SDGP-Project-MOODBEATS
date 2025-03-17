import os
import json
import logging
from typing import Dict, Any, Optional
from datetime import datetime, date

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

def json_serial(obj):
    """
    JSON serializer for objects not serializable by default json code.
    Used for datetime objects and Decimal.
    """
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

def save_json(data: Dict[str, Any], file_path: str) -> bool:
    """
    Save data to a JSON file.
    
    Args:
        data: The data to save
        file_path: Path to the JSON file
    
    Returns:
        True if successful, False otherwise
    """
    try:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, "w") as f:
            json.dump(data, f, default=json_serial, indent=2)
        return True
    except Exception as e:
        logger.error(f"Error saving JSON to {file_path}: {e}")
        return False

def load_json(file_path: str) -> Optional[Dict[str, Any]]:
    """
    Load data from a JSON file.
    
    Args:
        file_path: Path to the JSON file
    
    Returns:
        The loaded data or None if an error occurred
    """
    try:
        if not os.path.exists(file_path):
            return None
        
        with open(file_path, "r") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading JSON from {file_path}: {e}")
        return None

def sanitize_filename(filename: str) -> str:
    """
    Sanitize a filename to ensure it's safe to use on the filesystem.
    
    Args:
        filename: The filename to sanitize
    
    Returns:
        The sanitized filename
    """
    # Remove disallowed characters
    invalid_chars = r'<>:"/\|?*'
    for char in invalid_chars:
        filename = filename.replace(char, "_")
    
    # Limit length
    max_length = 255
    if len(filename) > max_length:
        name, ext = os.path.splitext(filename)
        name = name[:max_length - len(ext) - 1]
        filename = name + ext
    
    return filename

def get_file_mime_type(file_path: str) -> str:
    """
    Get the MIME type of a file based on its extension.
    
    Args:
        file_path: Path to the file
    
    Returns:
        The MIME type
    """
    extension = os.path.splitext(file_path)[1].lower()
    
    mime_types = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".ogg": "audio/ogg",
    }
    
    return mime_types.get(extension, "application/octet-stream")