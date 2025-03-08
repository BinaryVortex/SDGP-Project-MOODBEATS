import os
import uuid
import tempfile
from pathlib import Path
import soundfile as sf
import librosa
import numpy as np
from fastapi import UploadFile

async def save_upload_file_tmp(upload_file: UploadFile) -> Path:
    """
    Save an uploaded file to a temporary directory and return the path.
    
    Args:
        upload_file: The uploaded file from FastAPI
        
    Returns:
        Path to the saved temporary file
    """
    try:
        # Create temp directory if it doesn't exist
        temp_dir = Path("temp")
        temp_dir.mkdir(exist_ok=True)
        
        # Generate a unique filename with original extension
        original_filename = upload_file.filename
        extension = os.path.splitext(original_filename)[1]
        temp_filename = f"{uuid.uuid4()}{extension}"
        temp_file_path = temp_dir / temp_filename
        
        # Write file content
        content = await upload_file.read()
        with open(temp_file_path, "wb") as f:
            f.write(content)
            
        return temp_file_path
    
    except Exception as e:
        # If there's an error, try to use the system's temp directory
        suffix = os.path.splitext(upload_file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
            content = await upload_file.seek(0)
            content = await upload_file.read()
            temp.write(content)
            return Path(temp.name)

def convert_audio_format(input_path, target_sr=16000):
    """
    Convert the audio file to the format expected by the model.
    
    Args:
        input_path: Path to the input audio file
        target_sr: Target sample rate
        
    Returns:
        Path to the converted audio file or the original if no conversion needed
    """
    try:
        # Load the audio file
        y, sr = librosa.load(str(input_path), sr=None)
        
        # If the sample rate already matches, no need to convert
        if sr == target_sr:
            return input_path
            
        # Convert sample rate
        y_converted = librosa.resample(y, orig_sr=sr, target_sr=target_sr)
        
        # Create a new filename for the converted file
        base_path = os.path.splitext(input_path)[0]
        converted_path = f"{base_path}_converted.wav"
        
        # Save the converted file
        sf.write(converted_path, y_converted, target_sr)
        
        return converted_path
        
    except Exception as e:
        print(f"Error converting audio: {str(e)}")
        # Return the original file if conversion fails
        return input_path

def cleanup_temp_files(file_paths):
    """
    Clean up temporary files after processing.
    
    Args:
        file_paths: List of file paths to clean up
    """
    for path in file_paths:
        try:
            if os.path.exists(path):
                os.remove(path)
                print(f"Removed temporary file: {path}")
        except Exception as e:
            print(f"Error removing temporary file {path}: {str(e)}")