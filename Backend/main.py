import asyncio
import logging
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, timezone

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# MongoDB connection string (updated for clarity)
MONGO_URI = "mongodb+srv://vihariambegoda2003:CYxtZv4OQM4KjY4s@cluster0.0fo38.mongodb.net/?retryWrites=true&w=majority"
try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client["moodbeats_db"]
    fs = AsyncIOMotorGridFSBucket(db)
    logging.info("Connected to MongoDB")
except Exception as e:
    logging.error(f"Failed to connect to MongoDB: {str(e)}")
    raise e

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to MoodBeats API"}

# List all songs
@app.get("/songs/")
async def get_songs():
    try:
        files = await db.fs.files.find().to_list(100)
        if not files:
            return {"songs": []}
        song_list = [{"_id": str(file["_id"]), "filename": file["filename"]} for file in files]
        return {"songs": song_list}
    except Exception as e:
        logging.error(f"Error fetching songs: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching songs: {str(e)}")

# Stream a specific song by ID
@app.get("/songs/{song_id}")
async def stream_song(song_id: str):
    try:
        file_id = ObjectId(song_id)
        file_exists = await db.fs.files.find_one({"_id": file_id})
        if not file_exists:
            raise HTTPException(status_code=404, detail="File not found")
        
        grid_out = await fs.open_download_stream(file_id)
        return StreamingResponse(
            grid_out,
            media_type="audio/mpeg",
            headers={"Content-Disposition": f"inline; filename={grid_out.filename}"}
        )
    except Exception as e:
        logging.error(f"Error streaming file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error streaming file: {str(e)}")

# Upload file endpoint
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".mp3"):
        raise HTTPException(status_code=400, detail="Only MP3 files are allowed")
    
    file_data = await file.read()
    try:
        file_id = await fs.upload_from_stream(file.filename, file_data)
        logging.info(f"File uploaded with ID: {file_id}")
        return {"filename": file.filename, "file_id": str(file_id)}
    except Exception as e:
        logging.error(f"Failed to upload file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")

# Fix: Correct the entry point for running FastAPI app
if __name__ == "___main_":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)