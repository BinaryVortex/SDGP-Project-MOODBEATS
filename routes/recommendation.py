# recommendation.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional

from database import db
from models import Music, UserInDB
from services.auth import get_current_user

router = APIRouter()

@router.get("/by-mood/{mood}", response_model=List[Music])
async def get_recommendations_by_mood(
    mood: str,
    limit: int = 10,
    current_user: Optional[UserInDB] = Depends(get_current_user)
):
    # Find music with matching mood
    cursor = db.music.find({"mood": mood}).limit(limit)
    music_list = await cursor.to_list(length=None)
    
    if not music_list:
        raise HTTPException(status_code=404, detail=f"No music found for mood: {mood}")
    
    return [Music(**music) for music in music_list]

@router.get("/personalized", response_model=List[Music])
async def get_personalized_recommendations(
    current_user: UserInDB = Depends(get_current_user),
    limit: int = 10
):
    # In a real implementation, you would:
    # 1. Get user's listening history
    # 2. Analyze preferences
    # 3. Return personalized recommendations
    
    # For now, we're returning a placeholder implementation
    # that just returns some random tracks
    cursor = db.music.find({}).limit(limit)
    music_list = await cursor.to_list(length=None)
    
    return [Music(**music) for music in music_list]