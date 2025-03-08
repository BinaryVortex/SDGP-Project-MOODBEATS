# SDGP-Project-MOODBEATS/Database/schemas.py
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from bson import ObjectId

# For MongoDB ObjectId handling
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

# User Schema
class User(BaseModel):
    
    username: str
    email: EmailStr
    password: str

    class Config:
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "username": "user123",
                "email": "user123@example.com",
                "password": "securepassword"
            }
        }

# Song Schema
class Song(BaseModel):
    title: str
    artist: str
    mood_tags: List[str]

    class Config:
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "title": "Happy Song",
                "artist": "Artist Name",
                "mood_tags": ["happy", "energetic"]
            }
        }

# Playlist Schema
class Playlist(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id")
    mood: str
    songs: List[str]  # Store song IDs or titles

    class Config:
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "mood": "happy",
                "songs": ["song_id_1", "song_id_2"]
            }
        }
