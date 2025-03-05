from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import Optional, List, Dict
import random
import os
import json
from enum import Enum

app = FastAPI(title="Mood Music Generator API")

# Mood classes
class Mood(str, Enum):
    HAPPY = "happy"
    SAD = "sad"
    RELAXED = "relaxed"
    ENERGETIC = "energetic"
    ANXIOUS = "anxious"
    ANGRY = "angry"
    NEUTRAL = "neutral"

# API configuration
API_KEY = "SG_b2f02c2605b8fc32"
MUSIC_GEN_API_URL = "https://api.segmind.io/v1/music/generate"  # Example service endpoint

# Request models
class MoodInput(BaseModel):
    mood: Mood
    intensity: Optional[float] = 0.5  # 0.0 to 1.0
    preferences: Optional[Dict[str, str]] = None

# Response models
class MusicResponse(BaseModel):
    music_url: str
    duration: int  # in seconds
    mood: Mood
    intensity: float
    genre: Optional[str] = None
    tempo: Optional[int] = None  # BPM

# Mood to musical characteristics mapping
MOOD_TO_MUSIC = {
    Mood.HAPPY: {
        "genres": ["pop", "upbeat", "cheerful"],
        "tempo_range": (100, 140),
        "key": ["C major", "G major", "D major"],
        "instruments": ["piano", "guitar", "synth"]
    },
    Mood.SAD: {
        "genres": ["ballad", "ambient", "slow"],
        "tempo_range": (60, 80),
        "key": ["A minor", "E minor", "D minor"],
        "instruments": ["piano", "strings", "acoustic guitar"]
    },
    Mood.RELAXED: {
        "genres": ["ambient", "chill", "lofi"],
        "tempo_range": (70, 90),
        "key": ["F major", "G major", "C major"],
        "instruments": ["piano", "synth pad", "strings"]
    },
    Mood.ENERGETIC: {
        "genres": ["edm", "rock", "upbeat"],
        "tempo_range": (120, 160),
        "key": ["E major", "A major", "B major"],
        "instruments": ["synth", "electric guitar", "drums"]
    },
    Mood.ANXIOUS: {
        "genres": ["tense", "atmospheric", "dark ambient"],
        "tempo_range": (80, 110),
        "key": ["B minor", "F# minor", "C# minor"],
        "instruments": ["strings", "synth", "percussion"]
    },
    Mood.ANGRY: {
        "genres": ["rock", "metal", "intense"],
        "tempo_range": (90, 140),
        "key": ["E minor", "A minor", "D minor"],
        "instruments": ["electric guitar", "drums", "bass"]
    },
    Mood.NEUTRAL: {
        "genres": ["ambient", "background", "neutral"],
        "tempo_range": (80, 100),
        "key": ["C major", "G major", "F major"],
        "instruments": ["piano", "soft synth", "strings"]
    }
}

# Dependency to verify API key
def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key

# Cached music (for demo/testing purposes)
CACHED_MUSIC = {
    Mood.HAPPY: [
        {"url": "https://storage.soundgen.io/demo/happy_1.mp3", "duration": 180},
        {"url": "https://storage.soundgen.io/demo/happy_2.mp3", "duration": 210},
    ],
    Mood.SAD: [
        {"url": "https://storage.soundgen.io/demo/sad_1.mp3", "duration": 195},
        {"url": "https://storage.soundgen.io/demo/sad_2.mp3", "duration": 225},
    ],
    # Add entries for other moods
}

@app.post("/generate-music/", response_model=MusicResponse, dependencies=[Depends(verify_api_key)])
async def generate_music(mood_input: MoodInput):
    """
    Generate music based on detected mood and optional parameters.
    """
    try:
        # Get musical characteristics for the mood
        music_params = MOOD_TO_MUSIC[mood_input.mood]
        
        # Adjust parameters based on intensity
        tempo_min, tempo_max = music_params["tempo_range"]
        intensity_factor = mood_input.intensity
        
        # Calculate tempo based on intensity (higher intensity = faster tempo)
        tempo = int(tempo_min + (tempo_max - tempo_min) * intensity_factor)
        
        # Select random genre from the mood's genres
        genre = random.choice(music_params["genres"])
        
        # In a real implementation, you would call an external music generation API
        # For this example, we'll use cached responses for demo purposes
        
        # Simulate API call to music generation service
        try:
            # In production, replace this with actual API call
            # async with httpx.AsyncClient() as client:
            #     response = await client.post(
            #         MUSIC_GEN_API_URL,
            #         json={
            #             "mood": mood_input.mood,
            #             "tempo": tempo,
            #             "genre": genre,
            #             "key": random.choice(music_params["key"]),
            #             "instruments": random.sample(music_params["instruments"], 2),
            #             "duration": 180  # 3 minutes
            #         },
            #         headers={"Authorization": f"Bearer {API_KEY}"}
            #     )
            #     result = response.json()
            #     music_url = result["url"]
            #     duration = result["duration"]
            
            # For demo, use cached results
            cached = random.choice(CACHED_MUSIC.get(mood_input.mood, [{"url": "https://storage.soundgen.io/demo/default.mp3", "duration": 180}]))
            music_url = cached["url"]
            duration = cached["duration"]
            
            return MusicResponse(
                music_url=music_url,
                duration=duration,
                mood=mood_input.mood,
                intensity=mood_input.intensity,
                genre=genre,
                tempo=tempo
            )
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Music generation service error: {str(e)}")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating music: {str(e)}")

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.get("/available-moods", response_model=List[str])
def get_available_moods(api_key: str = Depends(verify_api_key)):
    """Get all available mood categories"""
    return [mood.value for mood in Mood]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)