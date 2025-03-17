import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatBot from '../components/ChatBot';
import { useChatContext } from '../contexts/ChatContext';

const ChatScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const handleClose = () => {
    // Navigate back or minimize the chat
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  
  return (
    <LinearGradient 
      colors={['#EEEEFF', '#FFFFFF']} 
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.chatWrapper}>
        <ChatBot onClose={handleClose} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default ChatScreen;