# Import necessary libraries for MongoDB connection
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.collection import Collection

# MongoDB connection URL
MONGO_DB_URL = "mongodb://localhost:27017"

# Create a MongoDB client
client = AsyncIOMotorClient(MONGO_DB_URL)

# Select the database
db = client["moodbeats"]

# Functions to access collections
def get_users_collection() -> Collection:
    return db["users"]

def get_playlists_collection() -> Collection:
    return db["playlists"]

def get_music_collection() -> Collection:
    return db["music"]
