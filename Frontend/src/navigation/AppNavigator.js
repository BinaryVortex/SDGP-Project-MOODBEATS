// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MuPlayer from '../screens/MuPlayer';
import LyPlayer from '../screens/LyPlayer';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MuPlayer" component={MuPlayer} />
        <Stack.Screen name="LyPlayer" component={LyPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
