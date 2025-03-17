import React, { createContext, useState, useContext } from 'react';
import { fetchBotResponse } from '../services/api';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
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
  const addMessage = async (message, attachment = null) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: message,
      attachment: attachment,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      // Get bot response
      const response = await fetchBotResponse(message, attachment);
      
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
  };
  
  // Handle attachment selection
  const handleAttachment = (uri, type) => {
    setAttachmentPreview({ uri, type });
  };
  
  // Clear attachment preview
  const clearAttachment = () => {
    setAttachmentPreview(null);
  };
  
  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        attachmentPreview,
        addMessage,
        handleAttachment,
        clearAttachment,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;