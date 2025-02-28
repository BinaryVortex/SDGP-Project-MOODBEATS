# music.py
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from typing import List
from datetime import datetime
from database import db
from models import Music, MusicCreate, UserInDB
from services.auth import get_current_user
from bson import ObjectId
import os
import shutil

router = APIRouter()

@router.post("/", response_model=Music)
async def upload_music(
    title: str,
    artist: str,
    genre: str = None,
    mood: str = None,
    file: UploadFile = File(...),
    current_user: UserInDB = Depends(get_current_user)
):
    # Create uploads directory if it doesn't exist
    os.makedirs("uploads", exist_ok=True)
    
    # Generate unique filename
    file_id = str(ObjectId())
    file_extension = os.path.splitext(file.filename)[1]
    file_path = f"uploads/{file_id}{file_extension}"
    
    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Create music entry
    music = MusicCreate(
        title=title,
        artist=artist,
        genre=genre,
        mood=mood,
        file_path=file_path
    )
    
    music_dict = music.dict()
    music_dict["id"] = file_id
    music_dict["created_at"] = datetime.now()
    
    await db.music.insert_one(music_dict)
    return Music(**music_dict)

@router.get("/", response_model=List[Music])
async def get_music(mood: str = None):
    query = {}
    if mood:
        query["mood"] = mood
    
    cursor = db.music.find(query)
    music_list = await cursor.to_list(length=None)
    return [Music(**music) for music in music_list]