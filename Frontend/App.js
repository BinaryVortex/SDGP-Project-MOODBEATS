import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MusicPlayer from './src/MusicPlayer';
import LyricsPlayer from './src/LyricsPlayer';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Stack.Navigator
          initialRouteName="MusicPlayer"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#121212',
              shadowColor: 'transparent',
            },
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="MusicPlayer"
            component={MusicPlayer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LyricsPlayer"
            component={LyricsPlayer}
            options={{ title: '', headerTransparent: true }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default App;