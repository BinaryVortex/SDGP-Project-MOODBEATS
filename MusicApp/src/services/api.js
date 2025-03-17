import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

// API configuration - adjust these URLs as needed for your environment
const API_URL = Platform.OS === 'ios' 
  ? 'http://localhost:8000/api/v1' 
  : Platform.OS === 'android' 
    ? 'http://10.0.2.2:8000/api/v1'     // For Android emulator
    : 'http://192.168.1.114:8000/api/v1'; // Replace with your computer's actual IP

/**
 * Fetch bot response from the API
 * @param {string} message - User message text
 * @param {object} attachment - Optional attachment object {uri, type}
 * @param {string} userId - Optional user ID for tracking conversation history
 * @returns {Promise<string>} The bot's response text
 */
export const fetchBotResponse = async (message, attachment = null, userId = null) => {
  try {
    const requestBody = {
      message,
      user_id: userId || 'default',
    };

    // If there's an attachment, process it
    if (attachment) {
      try {
        // Convert file URI to base64
        const base64Data = await fileToBase64(attachment.uri);
        
        requestBody.attachment = {
          data: base64Data,
          mime_type: attachment.type || 'image/jpeg', // Default to image/jpeg if type is not provided
        };
      } catch (error) {
        console.error('Error processing attachment:', error);
        // Continue without attachment if there's an error
      }
    }

    console.log('Sending message to API:', message);
    
    const response = await fetch(`${API_URL}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error fetching bot response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

/**
 * Upload a file to the API
 * @param {string} uri - File URI
 * @param {string} type - File MIME type
 * @param {string} userId - Optional user ID for tracking
 * @returns {Promise<object>} File information {filename, path, url}
 */
export const uploadFile = async (uri, type = 'image/jpeg', userId = null) => {
  try {
    const formData = new FormData();
    
    const fileInfo = {
      uri,
      type,
      name: uri.split('/').pop(),
    };
    
    formData.append('file', fileInfo);
    
    if (userId) {
      formData.append('user_id', userId);
    }
    
    const response = await fetch(`${API_URL}/files/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error uploading file');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

/**
 * Clear chat history for a user
 * @param {string} userId - User identifier
 * @returns {Promise<object>} Status response
 */
export const clearChatHistory = async (userId = 'default') => {
  try {
    const response = await fetch(`${API_URL}/chat/clear-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error clearing chat history');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Clear history error:', error);
    throw error;
  }
};

/**
 * Convert a file URI to base64
 * @param {string} uri - File URI
 * @returns {Promise<string>} Base64 string (without prefix)
 */
const fileToBase64 = async (uri) => {
  try {
    // Read file content using Expo FileSystem
    const fileContent = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    return fileContent;
  } catch (error) {
    console.error('Error converting file to base64:', error);
    throw error;
  }
};

/**
 * Check API health
 * @returns {Promise<boolean>} True if API is healthy
 */
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL.split('/api')[0]}/health`, { 
      method: 'GET',
      timeout: 5000 // 5 second timeout
    });
    
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};