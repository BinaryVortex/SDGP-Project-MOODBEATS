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
  
    mood: str
    

    class Config:
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            
       }