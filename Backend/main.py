import asyncio
from fastapi import FastAPI, HTTPException
from mongodb import db, to_json, check_db_connection  # Import database connection
from Schemas import Mood
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


# MOOD all moods
@app.post("/moods/")
async def create_mood(mood: Mood):
    mood_dict = mood.dict(exclude={"id"})
    mood_dict["_id"] = ObjectId()
    await db.moods.insert_one(mood_dict)
    return {"message": "Mood created", "mood": to_json(mood_dict)}

# Get all moods
@app.get("/moods/")
async def get_moods():
    moods = await db.moods.find().to_list(100)
    return {"moods": [to_json(mood) for mood in moods]}




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000,reload=True)