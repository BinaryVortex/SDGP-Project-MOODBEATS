# models.py
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User models 
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: str
    hashed_password: str
    created_at: datetime = datetime.now()

class UserResponse(UserBase):
    id: str
    created_at: datetime

# Playlist models
class PlaylistBase(BaseModel):
    name: str
    description: Optional[str] = None
    mood: Optional[str] = None

class PlaylistCreate(PlaylistBase):
    pass

class Playlist(PlaylistBase):
    id: str
    user_id: str
    songs: List[str] = []
    created_at: datetime = datetime.now()

# Music models
class MusicBase(BaseModel):
    title: str
    artist: str
    genre: Optional[str] = None
    mood: Optional[str] = None

class MusicCreate(MusicBase):
    file_path: str

class Music(MusicBase):
    id: str
    file_path: str
    created_at: datetime