import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FaceRecognition from './src/FaceRecognition';
import MusicGenerator from './src/MusicGenerator';

// Placeholder for Playlist screen
const PlaylistScreen = ({ route }) => {
  const { mood } = route.params || {};
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Playlist for mood: {mood}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FaceRecognition" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
        <Stack.Screen name="MusicGenerator" component={MusicGenerator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}