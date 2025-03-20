import { useState, useCallback } from 'react';
import { fetchBotResponse } from '../services/api';

const useChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      text: 'Hey there\nHow can I help you today?',
      timestamp: new Date(),
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  
  // Add a new message to the chat
  const addMessage = useCallback(async (messageText, attachment = null) => {
    if (!messageText.trim() && !attachment) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: messageText,
      attachment: attachment,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      // Get bot response
      const response = await fetchBotResponse(messageText, attachment);
      
      // Add bot response
      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      // Add error message
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again later.',
        isError: true,
        timestamp: new Date(),
      };
    
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Handle attachment selection
  const handleAttachment = useCallback((uri, type) => {
    setAttachmentPreview({ uri, type });
  }, []);
  
  // Clear attachment preview
  const clearAttachment = useCallback(() => {
    setAttachmentPreview(null);
  }, []);
  
  // Clear all messages (reset chat)
  const resetChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        text: 'Hey there\nHow can I help you today?',
        timestamp: new Date(),
      },
    ]);
    setAttachmentPreview(null);
  }, []);
  
  return {
    messages,
    isLoading,
    attachmentPreview,
    addMessage,
    handleAttachment,
    clearAttachment,
    resetChat,
  };
};

export default useChatBot;