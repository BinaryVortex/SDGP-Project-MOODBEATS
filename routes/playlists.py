from fastapi import APIRouter
from models import Playlist

# Create a router for playlist-related endpoints
router = APIRouter()

# Example endpoint: Create a playlist
@router.post("/")
async def create_playlist(playlist: Playlist):
    return {"message": "Playlist created", "playlist": playlist}
