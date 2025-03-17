import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useChatContext } from '../contexts/ChatContext';

const ChatBot = ({ onClose }) => {
  const insets = useSafeAreaInsets();
  const { 
    messages, 
    isLoading, 
    attachmentPreview, 
    addMessage, 
    handleAttachment, 
    clearAttachment 
  } = useChatContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <View style={[styles.chatContainer, { paddingBottom: insets.bottom }]}>
        <ChatHeader onClose={onClose} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default ChatBot;