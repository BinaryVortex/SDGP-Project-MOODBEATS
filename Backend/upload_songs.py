import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from motor.motor_asyncio import AsyncIOMotorGridFSBucket
import os

# MongoDB connection
MONGO_URI = "mongodb+srv://vidurabaddage:moodbeats12345@cluster0.lr80v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = AsyncIOMotorClient(MONGO_URI)
db = client["moodbeats_db"]
fs = AsyncIOMotorGridFSBucket(db)

# Upload songs from a folder
async def upload_songs_from_folder(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith(".mp3"):  # Upload only MP3 files
            with open(os.path.join(folder_path, filename), "rb") as song_file:
                await fs.upload_from_stream(filename, song_file)
                print(f"Uploaded {filename}")

# Run the upload
async def main():
    await upload_songs_from_folder("path_to_your_songs_folder")

if __name__ == "__main__":
    asyncio.run(main())