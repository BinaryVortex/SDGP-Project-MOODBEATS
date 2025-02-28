# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from routes import users, playlists, music, voice_emotion, facial_emotion, recommendation

app = FastAPI(title="MoodBeats API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(playlists.router, prefix="/playlists", tags=["Playlists"])
app.include_router(music.router, prefix="/music", tags=["Music"])
app.include_router(voice_emotion.router, prefix="/voice-emotion", tags=["Voice Emotion"])
app.include_router(facial_emotion.router, prefix="/facial-emotion", tags=["Facial Emotion"])
app.include_router(recommendation.router, prefix="/recommendations", tags=["Recommendations"])

@app.get("/")
async def root():
    return {"message": "Welcome to MoodBeats API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)