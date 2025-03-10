# SDGP-Project-MOODBEATS/Database/schemas.py
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from bson import ObjectId

# For MongoDB ObjectId handling
class PyObjectId(ObjectId):
    @classmethod
    def _get_validators_(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

  
# Playlist Schema
class Mood(BaseModel):
    name: str  # Mood name (e.g., Happy, Sad)
    description: str  # Mood description
    associated_songs: List[str]  # List of song IDs

    class Config:
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "name": "Relaxed",
                "description": "A calm and soothing mood",
                "associated_songs": [
                    "64b1a9d5c2eafbd7a8d8c3e5",
                    "64b1a9d5c2eafbd7a8d8c3e6"
                ]
            }
        }