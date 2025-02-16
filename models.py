from pydantic import BaseModel, EmailStr
from typing import List

# User model for signup/login
class User(BaseModel):
    username: str
    email: EmailStr
    password: str

# Playlist model
class Playlist(BaseModel):
    name: str
    description: str
    songs: List[str]

# Music model
class Music(BaseModel):
    title: str
    artist: str
    mood: str
