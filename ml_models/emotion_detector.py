import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import librosa

class VoiceEmotionDetector:
    def __init__(self, model_path="models/voice_emotion_model.h5"):
        """Initialize the emotion detector with a pre-trained model."""
        # Load the model
        self.model = load_model(model_path)
        
        # Emotion mapping (same as in training)
        self.emotion_labels = {
            0: "calm", 1: "calm", 2: "happy", 3: "sad",
            4: "angry", 5: "fearful", 6: "disgust", 7: "surprised"
        }
        
        # Reverse mapping for index lookup
        self.emotion_indices = {
            "calm": [0, 1], "happy": [2], "sad": [3],
            "angry": [4], "fearful": [5], "disgust": [6], "surprised": [7]
        }
        
        print(f"✅ Voice Emotion Detection model loaded successfully!")

    def extract_features(self, audio_path, max_pad_len=100):
        """Extract MFCC features from an audio file."""
        try:
            # Load audio file
            y, sr = librosa.load(audio_path, sr=16000)
            
            # Extract MFCCs
            mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
            
            # Pad or truncate to fixed size
            pad_width = max_pad_len - mfccs.shape[1]
            if pad_width > 0:
                mfccs = np.pad(mfccs, pad_width=((0, 0), (0, pad_width)), mode='constant')
            else:
                mfccs = mfccs[:, :max_pad_len]
            
            # Reshape for model input
            return mfccs.reshape(1, 40, 100, 1)
            
        except Exception as e:
            print(f"Error extracting features: {str(e)}")
            return None

    def predict_emotion(self, audio_path):
        """Predict emotion from an audio file."""
        try:
            # Extract features
            features = self.extract_features(audio_path)
            
            if features is None:
                return {"error": "Failed to extract features from audio"}
            
            # Make prediction
            prediction = self.model.predict(features)
            emotion_index = np.argmax(prediction)
            
            # Find the emotion with highest probability
            emotion = list(self.emotion_labels.values())[emotion_index]
            confidence = float(prediction[0][emotion_index])
            
            # Get all emotions with probabilities
            emotion_probabilities = {
                emotion: float(prob) 
                for emotion, prob in zip(set(self.emotion_labels.values()), prediction[0])
            }
            
            return {
                "primary_emotion": emotion,
                "confidence": confidence,
                "all_emotions": emotion_probabilities
            }
            
        except Exception as e:
            return {"error": str(e)}

# Singleton instance
_detector = None

def get_detector():
    """Get or create a singleton instance of the emotion detector."""
    global _detector
    if _detector is None:
        _detector = VoiceEmotionDetector()
    return _detector