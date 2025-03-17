import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ChatHeader from '../components/ChatHeader';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import { useChatContext } from '../contexts/ChatContext';

const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const { messages, isLoading, attachmentPreview, addMessage, handleAttachment, clearAttachment } = useChatContext();

  return (
    <LinearGradient 
      colors={['#EEEEFF', '#FFFFFF']} 
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
      >
        <View style={styles.chatContainer}>
          <ChatHeader />
          <ChatBody 
            messages={messages}
            isLoading={isLoading}
          />
          <ChatFooter
            onSendMessage={addMessage}
            onAttachmentSelect={handleAttachment}
            onAttachmentCancel={clearAttachment}
            attachmentPreview={attachmentPreview}
            isLoading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
    overflow: 'hidden',
  },
});

export default ChatScreen;