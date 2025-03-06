import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MusicPlayer from './src/Musicplayer'; // Adjust the path based on your file structure


const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}