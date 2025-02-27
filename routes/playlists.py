# playlists.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List

from ..database import db
from ..models import Playlist, PlaylistCreate, UserInDB
from ..services.auth import get_current_user
from bson import ObjectId

router = APIRouter()

@router.post("/", response_model=Playlist)
async def create_playlist(
    playlist: PlaylistCreate, 
    current_user: UserInDB = Depends(get_current_user)
):
    playlist_dict = playlist.dict()
    playlist_dict["id"] = str(ObjectId())
    playlist_dict["user_id"] = current_user.id
    playlist_dict["songs"] = []
    
    await db.playlists.insert_one(playlist_dict)
    return Playlist(**playlist_dict)

@router.get("/", response_model=List[Playlist])
async def get_user_playlists(current_user: UserInDB = Depends(get_current_user)):
    cursor = db.playlists.find({"user_id": current_user.id})
    playlists = await cursor.to_list(length=None)
    return [Playlist(**playlist) for playlist in playlists]

@router.post("/{playlist_id}/songs/{song_id}")
async def add_song_to_playlist(
    playlist_id: str, 
    song_id: str, 
    current_user: UserInDB = Depends(get_current_user)
):
    # Check if playlist belongs to user
    playlist = await db.playlists.find_one({"id": playlist_id, "user_id": current_user.id})
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    
    await db.playlists.update_one(
        {"id": playlist_id},
        {"$push": {"songs": song_id}}
    )
    return {"status": "success"}