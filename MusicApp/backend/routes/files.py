from fastapi import APIRouter, UploadFile, File, HTTPException, Form, Request
from fastapi.responses import FileResponse
from typing import Optional, List
import os
import uuid
import shutil
from schemas import FileUploadResponse
from config import settings
from utils.file_handler import get_file_type_directory, is_allowed_file_type

router = APIRouter(
    prefix=f"{settings.API_PREFIX}/files",
    tags=["files"],
)

@router.post("/upload", response_model=FileUploadResponse)
async def upload_file(
    file: UploadFile = File(...),
    user_id: Optional[str] = Form(None),
    request: Request = None
):
    """
    Upload a file (image or audio) to the server.
    """
    try:
        # Check file size
        file_size = 0
        content = await file.read()
        file_size = len(content)
        
        if file_size > settings.MAX_UPLOAD_SIZE:
            raise HTTPException(
                status_code=400, 
                detail=f"File size exceeds the maximum allowed size of {settings.MAX_UPLOAD_SIZE / (1024 * 1024)} MB"
            )
        
        # Reset file position to start
        await file.seek(0)
        
        # Check if file type is allowed
        if not is_allowed_file_type(file.content_type):
            raise HTTPException(
                status_code=400, 
                detail=f"File type '{file.content_type}' is not allowed"
            )
        
        # Determine target directory based on file type
        file_dir = get_file_type_directory(file.content_type)
        
        # Generate a unique filename
        file_extension = os.path.splitext(file.filename)[1]
        if not file_extension:
            # Get extension from MIME type if not in filename
            if file.content_type == "image/jpeg":
                file_extension = ".jpg"
            elif file.content_type == "image/png":
                file_extension = ".png"
            elif file.content_type == "audio/mpeg":
                file_extension = ".mp3"
            elif file.content_type == "audio/wav":
                file_extension = ".wav"
            else:
                file_extension = ""
        
        new_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(file_dir, new_filename)
        
        # Create directory if it doesn't exist
        os.makedirs(file_dir, exist_ok=True)
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Generate full URL for the file
        base_url = str(request.base_url).rstrip("/")
        file_url = f"{base_url}/uploads/{os.path.relpath(file_path, 'uploads')}"
        
        return FileUploadResponse(
            filename=new_filename,
            path=file_path,
            url=file_url
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{file_type}/{filename}")
async def get_file(file_type: str, filename: str):
    """
    Get a file by type and filename.
    """
    if file_type not in ["images", "audio"]:
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    file_path = os.path.join("uploads", file_type, filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(file_path)