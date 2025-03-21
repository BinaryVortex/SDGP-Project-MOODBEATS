import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import NavigationBar from '../components/NavigationBar';

// Import all screens
import Home from '../Home';
import Signup from '../Signup';
import Login from '../login';
import OTPPin from '../OTP_pin';
import Mood from '../Moodpage';
import ProfileSetup from '../Sign-in_profile';
import FaceRecognition from '../FaceRecognition';
import VoiceRecognition from '../VoiceReco';
import Playlist from '../Playlist';
import MusicPlayer from '../musicplay';
import LyricsPlayer from '../Lyricsplayer';
import RecentlyPlayed from '../Recently_played';
import SearchBar from '../Search_bar';
import Folders from '../Folders';
import Filter from '../Filter';
import EmotionBased from '../emotionbased';
import MusicGenerator from '../MusicGenerator';

const Stack = createNativeStackNavigator();

// Hide navigation bar on these screens
const hideNavBarScreens = [
  'Login', 'Signup', 'OTPPin', 'MusicPlayer', 'LyricsPlayer', 
  'FaceRecognition', 'SearchBar', 'Filter', 'MusicGenerator', 'EmotionBased'
];

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'black' }
          }}
        >
          {/* Authentication screens */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="OTPPin" component={OTPPin} />
          
          {/* Main screens with navigation bar spacing */}
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ 
              contentStyle: { paddingBottom: 60 } 
            }} 
          />
          <Stack.Screen 
            name="Mood" 
            component={Mood} 
            options={{ 
              contentStyle: { paddingBottom: 60 } 
            }} 
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileSetup} 
            options={{ 
              contentStyle: { paddingBottom: 60 } 
            }} 
          />
          <Stack.Screen 
            name="Playlist" 
            component={Playlist} 
            options={{ 
              contentStyle: { paddingBottom: 60 } 
            }} 
          />
          <Stack.Screen 
            name="RecentlyPlayed" 
            component={RecentlyPlayed}
            options={{ 
              contentStyle: { paddingBottom: 60 } 
            }}  
          />
          <Stack.Screen 
            name="Folders" 
            component={Folders}
            options={{ 
              contentStyle: { paddingBottom: 60 } 
            }}  
          />
          
          {/* Content-focused screens without nav bar spacing */}
          <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
          <Stack.Screen name="LyricsPlayer" component={LyricsPlayer} />
          <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
          <Stack.Screen name="VoiceRecognition" component={VoiceRecognition} />
          <Stack.Screen name="SearchBar" component={SearchBar} />
          <Stack.Screen name="Filter" component={Filter} />
          <Stack.Screen name="EmotionBased" component={EmotionBased} />
          <Stack.Screen name="MusicGenerator" component={MusicGenerator} />
        </Stack.Navigator>
        
        {/* Navigation bar that will check if it should be shown */}
        <NavigationBarWrapper />
      </View>
    </NavigationContainer>
  );
};

// A wrapper component that conditionally renders the NavigationBar
const NavigationBarWrapper = () => {
  // Check current route and decide if navigation bar should be shown
  // This is a separate component so it can use navigation hooks properly
  return <NavigationBar />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default AppNavigation;
