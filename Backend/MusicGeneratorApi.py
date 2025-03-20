from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
import numpy as np
import soundfile as sf
import os
from datetime import datetime
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this in production for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "FastAPI is working!"}




# Create directory for storing generated audio files
os.makedirs("audio_files", exist_ok=True)

class MusicRequest(BaseModel):
    mood: str
    duration: int

class MusicResponse(BaseModel):
    file_path: str
    mood: str
    duration: int

# Simple music generation based on mood
def generate_music_for_mood(mood: str, duration: int) -> str:
    """Generate simple music based on mood and duration"""
    sample_rate = 44100
    t = np.linspace(0, duration, duration * sample_rate, False)
    
    # Base frequency for different moods
    if mood == "happy":
        base_freq = 440  # A4 - Major scale frequencies
        note_freqs = [base_freq, base_freq * 9/8, base_freq * 5/4, base_freq * 4/3, 
                     base_freq * 3/2, base_freq * 5/3, base_freq * 15/8, base_freq * 2]
        tempo = 0.25  # Faster tempo
    elif mood == "sad":
        base_freq = 392  # G4 - Minor scale frequencies
        note_freqs = [base_freq, base_freq * 9/8, base_freq * 6/5, base_freq * 4/3, 
                     base_freq * 3/2, base_freq * 8/5, base_freq * 9/5, base_freq * 2]
        tempo = 0.5  # Slower tempo
    elif mood == "relaxed":
        base_freq = 329.63  # E4 - Pentatonic scale
        note_freqs = [base_freq, base_freq * 9/8, base_freq * 5/4, base_freq * 3/2, 
                     base_freq * 5/3, base_freq * 2]
        tempo = 0.4  # Medium-slow tempo
    elif mood == "energetic":
        base_freq = 523.25  # C5 - Major scale with emphasis on fifth
        note_freqs = [base_freq, base_freq * 9/8, base_freq * 5/4, base_freq * 4/3, 
                     base_freq * 3/2, base_freq * 5/3, base_freq * 15/8, base_freq * 2]
        tempo = 0.15  # Fast tempo
    else:
        # Default to happy if mood not recognized
        base_freq = 440
        note_freqs = [base_freq, base_freq * 9/8, base_freq * 5/4, base_freq * 4/3, 
                     base_freq * 3/2, base_freq * 5/3, base_freq * 15/8, base_freq * 2]
        tempo = 0.25
    
    # Generate a sequence of notes
    notes = []
    current_time = 0
    
    while current_time < duration:
        # Choose a random note from our frequency list
        freq = random.choice(note_freqs)
        # Note duration (in seconds)
        note_duration = tempo * random.choice([1, 1, 1, 2, 2, 3])  # Favor shorter notes
        
        if current_time + note_duration > duration:
            note_duration = duration - current_time
        
        # Generate samples for this note
        note_samples = int(note_duration * sample_rate)
        note_t = t[int(current_time * sample_rate):int(current_time * sample_rate) + note_samples]
        
        # Simple sine wave for the note
        note = 0.5 * np.sin(2 * np.pi * freq * note_t)
        
        # Add some harmonics for richness
        note += 0.25 * np.sin(2 * np.pi * freq * 2 * note_t)  # First harmonic
        note += 0.125 * np.sin(2 * np.pi * freq * 3 * note_t)  # Second harmonic
        
        # Apply ADSR envelope
        attack = int(0.1 * note_samples)
        decay = int(0.2 * note_samples)
        release = int(0.2 * note_samples)
        sustain_level = 0.7
        
        # Attack
        if attack > 0:
            note[:attack] *= np.linspace(0, 1, attack)
        # Decay
        if decay > 0:
            note[attack:attack+decay] *= np.linspace(1, sustain_level, decay)
        # Sustain happens automatically
        # Release
        if release > 0 and note_samples - release > 0:
            note[-release:] *= np.linspace(sustain_level, 0, release)
        
        notes.append(note)
        current_time += note_duration
    
    # Combine all notes
    audio_data = np.concatenate(notes)
    
    # Add some reverb effect (simple implementation)
    reverb_amount = 0.2
    delay_samples = int(0.1 * sample_rate)  # 100ms delay
    reverb = np.zeros_like(audio_data)
    reverb[delay_samples:] = audio_data[:-delay_samples] * reverb_amount
    audio_data = audio_data + reverb
    
    # Normalize audio
    audio_data = audio_data / np.max(np.abs(audio_data))
    
    # Save to file
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"audio_files/{mood}_{duration}_{timestamp}.wav"
    sf.write(filename, audio_data, sample_rate)
    
    return filename

@app.post("/generate-music/", response_model=MusicResponse)
async def generate_music(music_request: MusicRequest, background_tasks: BackgroundTasks):
    """
    Generate music based on mood and duration
    """
    try:
        # Validate request
        if music_request.mood not in ["happy", "sad", "relaxed", "energetic"]:
            raise HTTPException(status_code=400, detail="Invalid mood. Choose from: happy, sad, relaxed, energetic")
        
        if not (5 <= music_request.duration <= 60):
            raise HTTPException(status_code=400, detail="Duration must be between 5 and 60 seconds")
        
        # Generate music
        file_path = generate_music_for_mood(music_request.mood, music_request.duration)
        
        return MusicResponse(
            file_path=file_path,
            mood=music_request.mood,
            duration=music_request.duration
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating music: {str(e)}")

@app.get("/audio/{file_path:path}")
async def get_audio(file_path: str):
    """
    Serve the generated audio file
    """
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    return FileResponse(file_path)

# Background cleanup task to delete old files
def cleanup_old_files():
    """Delete audio files older than 1 hour"""
    current_time = datetime.now().timestamp()
    for filename in os.listdir("audio_files"):
        file_path = os.path.join("audio_files", filename)
        # Check if file is older than 1 hour
        if os.path.isfile(file_path) and (current_time - os.path.getmtime(file_path)) > 3600:
            os.remove(file_path)

@app.on_event("startup")
async def startup_event():
    # Clean up old files on startup
    cleanup_old_files()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)