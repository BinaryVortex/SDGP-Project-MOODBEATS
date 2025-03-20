import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

// Import app navigators
import AppNavigator from './src/navigation/AppNavigator';

// Import context providers
import { ChatProvider } from './src/contexts/ChatContext';

// Import existing components
import MusicApp from './src/MusicApp';
import MusicappPlaylist from './src/MusicappPlaylist';
import AiCoverart from './src/AiCoverart';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Comment out this section
  /*
  return (
    <SafeAreaProvider>
      <ChatProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <AppNavigator />
        </NavigationContainer>
      </ChatProvider>
    </SafeAreaProvider>
  );
  */

  // Uncomment this line instead
  return <AiCoverart />;
  
  // Other options:
  // return <MusicApp />;
  // return <MusicappPlaylist />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});