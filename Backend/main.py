import asyncio
from fastapi import FastAPI, HTTPException
from mongodb import db, to_json, check_db_connection  # Import database connection
from Schemas import User, Song, Playlist, History
from bson import ObjectId

import asyncio

#loop = asyncio.get_event_loop()
#loop.run_until_complete(check_db_connection())


app = FastAPI()

async def check_db_connection():
    print("Checking database connection...")
    # Simulate DB connection check (Replace this with actual DB connection logic)
    await asyncio.sleep(1)
    print("Database connected successfully!")

# Use this only if no event loop is running
loop = asyncio.get_event_loop()
if loop.is_running():
    asyncio.create_task(check_db_connection())  # Non-blocking task
else:
    loop.run_until_complete(check_db_connection())

@app.get("/")
def read_root():
    return {"message": "Welcome to MoodBeats API"}

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

# Get all songs
@app.get("/songs/")
async def get_songs():
    songs = await db.songs.find().to_list(100)
    return {"songs": [to_json(song) for song in songs]}

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

# Get all history entries
@app.get("/history/")
async def get_history():
    history_entries = await db.history.find().to_list(100)
    return {"history": [to_json(entry) for entry in history_entries]}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080, reload=True)


