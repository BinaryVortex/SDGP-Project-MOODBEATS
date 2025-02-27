from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional
import random
import uvicorn
import numpy as np
from enum import Enum

app = FastAPI(title="Music Generator API")

# Define mood types for the API
class Mood(str, Enum):
    HAPPY = "happy"
    SAD = "sad"
    RELAXED = "relaxed"
    ENERGETIC = "energetic"
    ANGRY = "angry"
    NEUTRAL = "neutral"

class MoodInput(BaseModel):
    mood: Mood
    intensity: float = 0.5  # 0.0 to 1.0 representing intensity of the mood

class MusicParameters(BaseModel):
    bpm: int  # Beats per minute
    key: str  # Musical key
    scale: str  # Major/minor
    instruments: List[str]
    duration_seconds: int = 30

class MusicResponse(BaseModel):
    track_id: str
    parameters: MusicParameters
    download_url: str
    stream_url: str

# Music generation parameters based on mood
mood_music_parameters = {
    Mood.HAPPY: {
        "bpm_range": (110, 130),
        "keys": ["C", "G", "D", "A"],
        "scale": "major",
        "instruments": ["piano", "acoustic_guitar", "glockenspiel", "strings"]
    },
    Mood.SAD: {
        "bpm_range": (60, 80),
        "keys": ["A", "E", "B", "F#"],
        "scale": "minor",
        "instruments": ["piano", "cello", "violin", "ambient_pad"]
    },
    Mood.RELAXED: {
        "bpm_range": (70, 90),
        "keys": ["D", "G", "C", "F"],
        "scale": "major",
        "instruments": ["acoustic_guitar", "piano", "flute", "ambient_pad"]
    },
    Mood.ENERGETIC: {
        "bpm_range": (125, 145),
        "keys": ["E", "A", "D", "B"],
        "scale": "major",
        "instruments": ["electric_guitar", "synth", "drums", "bass"]
    },
    Mood.ANGRY: {
        "bpm_range": (90, 110),
        "keys": ["E", "B", "F#", "C#"],
        "scale": "minor",
        "instruments": ["distorted_guitar", "drums", "bass", "synth"]
    },
    Mood.NEUTRAL: {
        "bpm_range": (85, 100),
        "keys": ["C", "G", "D", "F"],
        "scale": "major",
        "instruments": ["piano", "strings", "light_percussion", "bass"]
    }
}

# Mock database for generated tracks
generated_tracks = {}

def generate_music_parameters(mood: Mood, intensity: float) -> MusicParameters:
    """Generate music parameters based on mood and intensity"""
    mood_params = mood_music_parameters[mood]
    
    # Adjust BPM based on intensity
    bpm_min, bpm_max = mood_params["bpm_range"]
    intensity_adjusted_max = bpm_min + (bpm_max - bpm_min) * intensity
    bpm = int(random.uniform(bpm_min, intensity_adjusted_max))
    
    # Select key and scale
    key = random.choice(mood_params["keys"])
    scale = mood_params["scale"]
    
    # Select instruments (more intense moods use more instruments)
    num_instruments = max(2, int(2 + intensity * 3))
    instruments = random.sample(mood_params["instruments"], min(num_instruments, len(mood_params["instruments"])))
    
    # Duration based on intensity (more intense = shorter)
    duration = int(20 + (1 - intensity) * 40)  # 20-60 seconds
    
    return MusicParameters(
        bpm=bpm,
        key=key,
        scale=scale,
        instruments=instruments,
        duration_seconds=duration
    )

def mock_generate_music(parameters: MusicParameters) -> str:
    """
    Mocked function to generate music based on parameters.
    In a real implementation, this would call a music generation model.
    Returns a track ID.
    """
    # In a real implementation, this would:
    # 1. Call a music generation model/service
    # 2. Save the generated audio file
    # 3. Return a reference to the file
    
    track_id = f"track_{random.randint(10000, 99999)}"
    # Store the parameters for later retrieval
    generated_tracks[track_id] = parameters
    
    return track_id

@app.post("/generate-music", response_model=MusicResponse)
async def generate_music(mood_input: MoodInput = Body(...)):
    """
    Generate music based on detected mood from face recognition.
    Returns music metadata and URLs to access the generated track.
    """
    try:
        # Validate intensity
        if mood_input.intensity < 0 or mood_input.intensity > 1:
            raise HTTPException(status_code=400, detail="Intensity must be between 0.0 and 1.0")
        
        # Generate music parameters based on mood
        parameters = generate_music_parameters(mood_input.mood, mood_input.intensity)
        
        # Generate music (mocked)
        track_id = mock_generate_music(parameters)
        
        # In a real implementation, these URLs would point to actual files
        base_url = "https://api.yourappdomain.com/music"
        
        return MusicResponse(
            track_id=track_id,
            parameters=parameters,
            download_url=f"{base_url}/download/{track_id}",
            stream_url=f"{base_url}/stream/{track_id}"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating music: {str(e)}")

@app.get("/track/{track_id}", response_model=MusicResponse)
async def get_track(track_id: str):
    """Retrieve information about a previously generated track"""
    if track_id not in generated_tracks:
        raise HTTPException(status_code=404, detail="Track not found")
    
    parameters = generated_tracks[track_id]
    base_url = "https://api.yourappdomain.com/music"
    
    return MusicResponse(
        track_id=track_id,
        parameters=parameters,
        download_url=f"{base_url}/download/{track_id}",
        stream_url=f"{base_url}/stream/{track_id}"
    )

if __name__ == "__main__":
    uvicorn.run("music_generator_api:app", host="0.0.0.0", port=8000, reload=True)