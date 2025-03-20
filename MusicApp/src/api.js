// API configuration for the application
import { Platform } from 'react-native';

// Your specific IP address for testing on physical devices
const YOUR_LOCAL_IP = '192.168.8.114';
const API_PORT = '5000';

// Determine the appropriate API URL based on the platform
let API_URL = `http://${YOUR_LOCAL_IP}:${API_PORT}/api`;

// For emulators/simulators, uncomment these lines as needed
if (Platform.OS === 'android') {
  // Use 10.0.2.2 for Android emulator to connect to localhost
  // API_URL = 'http://10.0.2.2:5000/api';
} else if (Platform.OS === 'ios') {
  // Use localhost for iOS simulator
  // API_URL = 'http://localhost:5000/api';
}

// For production, use your deployed backend URL
// API_URL = 'https://your-production-backend.com/api';

// Export the URL to be used throughout the app
export { API_URL };