// src/config.js

// API Configuration
export const API_URL = 'http://192.168.x.x:5000/api';  // Replace with your computer's IP

// App Configuration
export const APP_CONFIG = {
  name: 'Music App',
  version: '1.0.0',
  defaultImagePlaceholder: 'https://via.placeholder.com/400',
};

// Feature Flags
export const FEATURES = {
  enableVoicePrompts: true,
  enableImageSaving: true,
  maxRecentImages: 5,
};

// Styling Constants
export const THEME = {
  primaryColor: '#6200ee',
  secondaryColor: '#03dac6',
  textColor: '#1d1d1f',
  backgroundColor: '#f5f5f7',
};

// Storage Keys
export const STORAGE_KEYS = {
  recentCovers: 'recent_ai_covers',
  userPreferences: 'user_preferences',
};