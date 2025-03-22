# SDGP-Project-MOODBEATS/Database/schemas.py
import datetime
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from bson import ObjectId
from pydantic import BaseModel, ConfigDict
from bson import ObjectId
from datetime import date
import datetime


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

# History Schema
class History(BaseModel):
    userId: str  # Use str instead of ObjectId
    songId: str
    moodAtPlay: str

    model_config = ConfigDict(arbitrary_types_allowed=True)


class Profile(BaseModel):

    firstname: str = Field(..., description="User's first name")
    surname: str = Field(..., description="User's surname")
    email: EmailStr = Field(..., description="User's email address")
    phone: str = Field(..., description="User's phone number")
    birthday: date = Field(..., description="User's date of birth")
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, description="Timestamp when profile was created")
    updated_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, description="Timestamp when profile was last updated")

    class Config:
        json_encoders = {datetime.datetime: lambda v: v.isoformat()}
        json_schema_extra = {
            "example": {
                "_id": "60c72b2f9b1d4b3d4c8a9e9a",
                "firstname": "John",
                "surname": "Doe",
                "email": "john.doe@example.com",
                "phone": "1234567890",
                "birthday": "1995-06-15",
                "created_at": "2025-03-21T12:00:00Z",
                "updated_at": "2025-03-21T12:30:00Z"
            }
        }