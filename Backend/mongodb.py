from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os

# MongoDB connection URI
MONGO_URI = "mongodb+srv://vihariambegoda2003:CYxtZv4OQM4KjY4s@cluster0.0fo38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  # Change this if using a remote DB

# Initialize MongoDB client
client = AsyncIOMotorClient(MONGO_URI)
db = client["moodbeats_db"]  # Database name

# Helper function to convert MongoDB documents to JSON
def to_json(doc):
    """Convert MongoDB document to JSON."""
    if not doc:
        return None
    doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
    return doc

# Check if connection is successful
async def check_db_connection():
    try:
        await client.admin.command("ping")
        print(" MongoDB Connected Successfully!")
    except Exception as e:
        print(f" MongoDB Connection Failed: {e}")