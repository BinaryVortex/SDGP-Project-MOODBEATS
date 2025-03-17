import { Platform } from 'react-native';

// API configuration
const API_URL = Platform.OS === 'ios' 
  ? 'http://localhost:8000/api' 
  : 'http://10.0.2.2:8000/api'; // Use 10.0.2.2 for Android emulator

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
      user_id: userId,
    };

    // If there's an attachment, process it
    if (attachment) {
      // Convert file URI to base64
      const base64Data = await fileToBase64(attachment.uri);
      
      requestBody.attachment = {
        data: base64Data,
        mime_type: attachment.type || 'image/jpeg', // Default to image/jpeg if type is not provided
      };
    }

    const response = await fetch(`${API_URL}/chat`, {
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
 * @returns {Promise<object>} File information {filename, path}
 */
export const uploadFile = async (uri, type = 'image/jpeg') => {
  try {
    const formData = new FormData();
    
    const fileInfo = {
      uri,
      type,
      name: uri.split('/').pop(),
    };
    
    formData.append('file', fileInfo);
    
    const response = await fetch(`${API_URL}/upload`, {
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
 * Convert a file URI to base64
 * @param {string} uri - File URI
 * @returns {Promise<string>} Base64 string (without prefix)
 */
const fileToBase64 = async (uri) => {
  try {
    // Fetch the image
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Convert to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Remove the "data:image/jpeg;base64," part
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting to base64:', error);
    throw error;
  }
};