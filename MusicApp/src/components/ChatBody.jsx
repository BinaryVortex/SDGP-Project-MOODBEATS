// ChatBody.jsx
import React, { useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import MessageItem from './MessageItem';

const ChatBody = ({ messages, isLoading }) => {
  const scrollViewRef = useRef(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
  
  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {messages.map((message) => (
        <MessageItem 
          key={message.id} 
          message={message} 
        />
      ))}
      
      {isLoading && (
        <MessageItem
          message={{
            id: 'thinking',
            type: 'bot',
            isThinking: true,
          }}
        />
      )}
    </ScrollView>
  );
};
