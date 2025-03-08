from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from pydantic import BaseModel
import os

from ml_models.emotion_detector import get_detector
from utils.audio_processing import save_upload_file_tmp, convert_audio_format, cleanup_temp_files

# Note: Since you already set the prefix in main.py, we don't include it here
router = APIRouter(
    tags=["Voice Emotion"],
    responses={404: {"description": "Not found"}},
)

class EmotionResponse(BaseModel):
    primary_emotion: str
    confidence: float
    all_emotions: dict

@router.post("/detect", response_model=EmotionResponse)
async def detect_emotion(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
):
    """
    Detect emotion from an uploaded audio file.
    
    Parameters:
    - file: Audio file (wav, mp3, etc.)
    
    Returns:
    - Detected emotion with confidence scores
    """
    try:
        # Check if the file is an audio file
        if not file.content_type.startswith('audio/'):
            raise HTTPException(
                status_code=400, 
                detail="Invalid file type. Please upload an audio file."
            )
        
        # Save the uploaded file to a temporary location
        temp_file = await save_upload_file_tmp(file)
        
        # Convert audio to the format expected by the model if needed
        processed_file = convert_audio_format(temp_file)
        
        # Get the detector singleton
        detector = get_detector()
        
        # Predict emotion
        result = detector.predict_emotion(processed_file)
        
        # Schedule cleanup of temporary files
        files_to_cleanup = [temp_file]
        if processed_file != temp_file:
            files_to_cleanup.append(processed_file)
        background_tasks.add_task(cleanup_temp_files, files_to_cleanup)
        
        # Check for errors in prediction
        if "error" in result:
            raise HTTPException(
                status_code=500,
                detail=f"Error predicting emotion: {result['error']}"
            )
        
        return result
    
    except Exception as e:
        # Handle any unexpected errors
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during emotion detection: {str(e)}"
        )

@router.get("/available-emotions")
async def get_available_emotions():
    """
    Get the list of emotions that can be detected by the model.
    
    Returns:
    - List of available emotions
    """
    detector = get_detector()
    unique_emotions = set(detector.emotion_labels.values())
    return {"available_emotions": list(unique_emotions)}