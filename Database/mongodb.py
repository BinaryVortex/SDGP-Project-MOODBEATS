import motor.motor_asyncio
from fastapi import FastAPI
from .models import User, Song, Playlist  # Import models

app = FastAPI()

# MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://vidurabadage:moodbeats12345@cluster0.lr80v.mongodb.net/moodbeats?retryWrites=true&w=majority"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client.moodbeats  # Use your database name here

# Create a new user
@app.post("/users/")
async def create_user(user: User):
    collection = db['users']
    result = await collection.insert_one(user.dict())
    return {"message": "User created", "user_id": str(result.inserted_id)}

# Fetch all songs for a mood
@app.get("/songs/{mood}")
async def get_songs_by_mood(mood: str):
    collection = db['songs']
    songs = await collection.find({"mood_tags": mood}).to_list(100)
    return {"songs": songs}

# Save detected mood
@app.post("/mood_logs/")
async def save_mood(mood: str):
    collection = db['mood_logs']
    result = await collection.insert_one({"mood": mood})
    return {"message": "Mood saved", "log_id": str(result.inserted_id)}
