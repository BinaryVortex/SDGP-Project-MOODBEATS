# Import FastAPI to create the application
from fastapi import FastAPI

# Import routers from routes to include different functionalities
from routes.users import router as users_router
from routes.playlists import router as playlists_router
from routes.music import router as music_router
from routes.voice_emotion import router as voice_emotion_router
from routes.facial_emotion import router as facial_emotion_router
from routes.recommendation import router as recommendation_router

# Create a FastAPI app instance
app = FastAPI()

# Include routers to organize routes
app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(playlists_router, prefix="/playlists", tags=["Playlists"])
app.include_router(music_router, prefix="/music", tags=["Music"])
app.include_router(voice_emotion_router, prefix="/voice-emotion", tags=["Voice Emotion"])
app.include_router(facial_emotion_router, prefix="/facial-emotion", tags=["Facial Emotion"])
app.include_router(recommendation_router, prefix="/recommendation", tags=["Recommendation"])

# Root endpoint to verify server health
@app.get("/")
def read_root():
    return {"message": "Welcome to MoodBeats Backend"}
