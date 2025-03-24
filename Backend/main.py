import asyncio
import datetime
import logging
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, timezone
from mongodb import db, to_json, check_db_connection  # Import database connection
from Schemas import User, Song, Playlist, History, Profile

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# MongoDB connection
MONGO_URI = "mongodb+srv://vidurabaddage:moodbeats12345@cluster0.lr80v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = AsyncIOMotorClient(MONGO_URI)
db = client["moodbeats_db"]
fs = AsyncIOMotorGridFSBucket(db)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to MoodBeats API"}

# List all songs
@app.get("/songs/")
async def get_songs():
    try:
        files = await db.fs.files.find().to_list(100)  # Query fs.files for the uploaded songs
        if not files:
            return {"songs": []}  # Return empty list if no files are found
        song_list = [{"_id": str(file["_id"]), "filename": file["filename"]} for file in files]
        return {"songs": song_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching songs: {str(e)}")

# Stream a specific song by ID
@app.get("/songs/{song_id}")
async def stream_song(song_id: str):
    try:
        # Convert the song_id to ObjectId
        file_id = ObjectId(song_id)
        logging.debug(f"Attempting to stream file with ID: {file_id}")

        # Check if the file exists in GridFS
        file_exists = await db.fs.files.find_one({"_id": file_id})
        if not file_exists:
            logging.error(f"File not found in GridFS: {file_id}")
            raise HTTPException(status_code=404, detail="File not found")

        # Open the file stream from GridFS
        grid_out = await fs.open_download_stream(file_id)
        logging.debug(f"File found: {grid_out.filename}")

        # Stream the file back to the client
        return StreamingResponse(
            grid_out,
            media_type="audio/mpeg",  # Set the appropriate media type for MP3 files
            headers={"Content-Disposition": f"inline; filename={grid_out.filename}"}
        )
    except Exception as e:
        logging.error(f"Error streaming file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error streaming file: {str(e)}")

# Upload file endpoint
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    """Upload file to MongoDB GridFS"""
    if not file.filename.endswith(".mp3"):
        raise HTTPException(status_code=400, detail="Only MP3 files are allowed")
    
    logging.debug(f"Received file: {file.filename}")
    file_data = await file.read()
    logging.debug(f"File size: {len(file_data)} bytes")
    
    file_id = await fs.upload_from_stream(file.filename, file_data)
    logging.debug(f"File uploaded with ID: {file_id}")
    
    return {"filename": file.filename, "file_id": str(file_id)}

# Create a user
@app.post("/users/")
async def create_user(user: User):
    user_dict = user.dict(exclude={"id"})  # Exclude None id
    user_dict["_id"] = ObjectId()  # Assign new ObjectId
    await db.users.insert_one(user_dict)  # Insert into MongoDB
    return {"message": "User created", "user": to_json(user_dict)}

# Get all users
@app.get("/users/")
async def get_users():
    users = await db.users.find().to_list(100)  # Limit to 100 users
    return {"users": [to_json(user) for user in users]}

# Create a song
@app.post("/songs/")
async def create_song(song: Song):
    song_dict = song.dict(exclude={"id"})
    song_dict["_id"] = ObjectId()
    await db.songs.insert_one(song_dict)
    return {"message": "Song added", "song": to_json(song_dict)}

# Create a playlist
@app.post("/playlists/")
async def create_playlist(playlist: Playlist):
    playlist_dict = playlist.dict(exclude={"id"})
    playlist_dict["_id"] = ObjectId()
    await db.playlists.insert_one(playlist_dict)
    return {"message": "Playlist created", "playlist": to_json(playlist_dict)}

# Get all playlists
@app.get("/playlists/")
async def get_playlists():
    playlists = await db.playlists.find().to_list(100)
    return {"playlists": [to_json(playlist) for playlist in playlists]}

# Create a history entry
@app.post("/history/")
async def create_history(history: History):
    history_dict = history.dict()

    # Convert userId and songId to ObjectId
    try:
        history_dict["userId"] = ObjectId(history_dict["userId"])
    except:
        raise HTTPException(status_code=400, detail="Invalid userId format")

    try:
        history_dict["songId"] = ObjectId(history_dict["songId"])
    except:
        raise HTTPException(status_code=400, detail="Invalid songId format")

    result = await db.history.insert_one(history_dict)

    # Convert ObjectId to string before returning
    history_dict["_id"] = str(result.inserted_id)
    history_dict["userId"] = str(history_dict["userId"])
    history_dict["songId"] = str(history_dict["songId"])

    return {"message": "History record created", "history": history_dict}

# Create a profile
@app.post("/profiles/")
async def create_profile(profile: Profile):
    profile_dict = profile.dict()
    profile_dict["_id"] = ObjectId()
    profile_dict["created_at"] = datetime.utcnow()
    profile_dict["updated_at"] = datetime.utcnow()

    # Insert the profile into the correct collection
    await db.profiles.insert_one(profile_dict)  # Use db.profiles instead of profile_collection
    return {"message": "Profile created", "profile": to_json(profile_dict)}

# Get all history entries
@app.get("/history/")
async def get_history():
    history_entries = await db.history.find().to_list(100)
    return {"history": [to_json(entry) for entry in history_entries]}

# Get playlist endpoint
@app.get("/playlist")
async def get_playlist():
    try:
        songs = await db.fs.files.find().to_list(None)
        playlist = [song["filename"] for song in songs]
        return {"playlist": playlist}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)