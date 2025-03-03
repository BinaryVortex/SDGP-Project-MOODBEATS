const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store for playlists
const moodPlaylists = {
  happy: [
    { id: 'h1', title: 'Happy Days', artist: 'The Sunshine Band', duration: '3:24', coverUrl: 'https://example.com/covers/happy1.jpg' },
    { id: 'h2', title: 'Upbeat Morning', artist: 'Joy Division', duration: '2:58', coverUrl: 'https://example.com/covers/happy2.jpg' },
    { id: 'h3', title: 'Walking on Sunshine', artist: 'Katrina & The Waves', duration: '3:54', coverUrl: 'https://example.com/covers/happy3.jpg' },
    { id: 'h4', title: 'Good Feeling', artist: 'Flo Rida', duration: '4:08', coverUrl: 'https://example.com/covers/happy4.jpg' },
    { id: 'h5', title: 'Best Day of My Life', artist: 'American Authors', duration: '3:14', coverUrl: 'https://example.com/covers/happy5.jpg' }
  ],
  sad: [
    { id: 's1', title: 'Blue Monday', artist: 'New Order', duration: '7:29', coverUrl: 'https://example.com/covers/sad1.jpg' },
    { id: 's2', title: 'Hurt', artist: 'Johnny Cash', duration: '3:38', coverUrl: 'https://example.com/covers/sad2.jpg' },
    { id: 's3', title: 'Mad World', artist: 'Gary Jules', duration: '3:09', coverUrl: 'https://example.com/covers/sad3.jpg' },
    { id: 's4', title: 'Someone Like You', artist: 'Adele', duration: '4:45', coverUrl: 'https://example.com/covers/sad4.jpg' },
    { id: 's5', title: 'Fix You', artist: 'Coldplay', duration: '4:55', coverUrl: 'https://example.com/covers/sad5.jpg' }
  ],
  relaxed: [
    { id: 'r1', title: 'Weightless', artist: 'Marconi Union', duration: '8:10', coverUrl: 'https://example.com/covers/relaxed1.jpg' },
    { id: 'r2', title: 'Clair de Lune', artist: 'Claude Debussy', duration: '5:12', coverUrl: 'https://example.com/covers/relaxed2.jpg' },
    { id: 'r3', title: 'Breathe', artist: 'Télépopmusik', duration: '4:39', coverUrl: 'https://example.com/covers/relaxed3.jpg' },
    { id: 'r4', title: 'Porcelain', artist: 'Moby', duration: '4:01', coverUrl: 'https://example.com/covers/relaxed4.jpg' },
    { id: 'r5', title: 'Gymnopédie No.1', artist: 'Erik Satie', duration: '3:05', coverUrl: 'https://example.com/covers/relaxed5.jpg' }
  ],
  angry: [
    { id: 'a1', title: 'Break Stuff', artist: 'Limp Bizkit', duration: '2:47', coverUrl: 'https://example.com/covers/angry1.jpg' },
    { id: 'a2', title: 'Bulls on Parade', artist: 'Rage Against the Machine', duration: '3:51', coverUrl: 'https://example.com/covers/angry2.jpg' },
    { id: 'a3', title: 'Master of Puppets', artist: 'Metallica', duration: '8:35', coverUrl: 'https://example.com/covers/angry3.jpg' },
    { id: 'a4', title: 'Killing In The Name', artist: 'Rage Against the Machine', duration: '5:13', coverUrl: 'https://example.com/covers/angry4.jpg' },
    { id: 'a5', title: 'The Way I Am', artist: 'Eminem', duration: '4:50', coverUrl: 'https://example.com/covers/angry5.jpg' }
  ],
  content: [
    { id: 'c1', title: 'Sunday Morning', artist: 'Maroon 5', duration: '4:06', coverUrl: 'https://example.com/covers/content1.jpg' },
    { id: 'c2', title: 'Three Little Birds', artist: 'Bob Marley', duration: '3:01', coverUrl: 'https://example.com/covers/content2.jpg' },
    { id: 'c3', title: 'I\'m Yours', artist: 'Jason Mraz', duration: '4:02', coverUrl: 'https://example.com/covers/content3.jpg' },
    { id: 'c4', title: 'Banana Pancakes', artist: 'Jack Johnson', duration: '3:11', coverUrl: 'https://example.com/covers/content4.jpg' },
    { id: 'c5', title: 'What a Wonderful World', artist: 'Louis Armstrong', duration: '2:21', coverUrl: 'https://example.com/covers/content5.jpg' }
  ],
  // Default playlist for fallback
  neutral: [
    { id: 'n1', title: 'Imagine', artist: 'John Lennon', duration: '3:01', coverUrl: 'https://example.com/covers/neutral1.jpg' },
    { id: 'n2', title: 'Yesterday', artist: 'The Beatles', duration: '2:05', coverUrl: 'https://example.com/covers/neutral2.jpg' },
    { id: 'n3', title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', coverUrl: 'https://example.com/covers/neutral3.jpg' },
    { id: 'n4', title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02', coverUrl: 'https://example.com/covers/neutral4.jpg' },
    { id: 'n5', title: 'Hotel California', artist: 'Eagles', duration: '6:30', coverUrl: 'https://example.com/covers/neutral5.jpg' }
  ]
};

// Store for user mood history
const userMoodHistory = [];

// Routes

// Get playlist based on mood
app.get('/api/playlists/:mood', (req, res) => {
  const { mood } = req.params;
  const playlist = moodPlaylists[mood] || moodPlaylists.neutral;
  
  // Add some delay to simulate network latency
  setTimeout(() => {
    res.json({
      success: true,
      mood,
      playlist,
      count: playlist.length
    });
  }, 800);
});

// Record user mood
app.post('/api/mood', (req, res) => {
  const { mood, userId, method } = req.body;
  
  if (!mood) {
    return res.status(400).json({
      success: false,
      message: 'Mood is required'
    });
  }
  
  // Store mood entry with timestamp
  const newMoodEntry = {
    id: Date.now().toString(),
    mood,
    userId: userId || 'anonymous',
    method: method || 'manual', // 'face' or 'manual'
    timestamp: new Date().toISOString()
  };
  
  userMoodHistory.push(newMoodEntry);
  
  // Keep only the last 100 entries to prevent memory issues
  if (userMoodHistory.length > 100) {
    userMoodHistory.shift();
  }
  
  res.status(201).json({
    success: true,
    moodEntry: newMoodEntry
  });
});

// Get mood history (with optional filtering by userId)
app.get('/api/mood/history', (req, res) => {
  const { userId } = req.query;
  
  let history = userMoodHistory;
  
  if (userId) {
    history = history.filter(entry => entry.userId === userId);
  }
  
  res.json({
    success: true,
    history
  });
});

// Get available moods
app.get('/api/moods', (req, res) => {
  const availableMoods = Object.keys(moodPlaylists);
  
  res.json({
    success: true,
    moods: availableMoods
  });
});

// Search tracks across all playlists
app.get('/api/search', (req, res) => {
  const { query } = req.query;
  
  if (!query || query.length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Search query must be at least 2 characters'
    });
  }
  
  const searchResults = [];
  const lowerQuery = query.toLowerCase();
  
  // Search through all mood playlists
  Object.entries(moodPlaylists).forEach(([mood, tracks]) => {
    tracks.forEach(track => {
      if (
        track.title.toLowerCase().includes(lowerQuery) ||
        track.artist.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          ...track,
          mood
        });
      }
    });
  });
  
  res.json({
    success: true,
    query,
    results: searchResults,
    count: searchResults.length
  });
});

// Get track by ID
app.get('/api/tracks/:trackId', (req, res) => {
  const { trackId } = req.params;
  let foundTrack = null;
  let foundMood = null;
  
  // Search through all playlists
  Object.entries(moodPlaylists).some(([mood, tracks]) => {
    foundTrack = tracks.find(track => track.id === trackId);
    if (foundTrack) {
      foundMood = mood;
      return true;
    }
    return false;
  });
  
  if (!foundTrack) {
    return res.status(404).json({
      success: false,
      message: 'Track not found'
    });
  }
  
  res.json({
    success: true,
    track: {
      ...foundTrack,
      mood: foundMood
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;