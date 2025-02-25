from fastapi import APIRouter

# Create a router for music-related endpoints
router = APIRouter()

# Example endpoint: Fetch music
@router.get("/")
async def get_music():
    return {"message": "Music fetched"}
