// ChatFooter.jsx
import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import EmojiPicker from './EmojiPicker';

const ChatFooter = ({
  onSendMessage,
  onAttachmentSelect,
  onAttachmentCancel,
  attachmentPreview,
  isLoading,
}) => {
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(47);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  
  const handleContentSizeChange = (event) => {
    const { height } = event.nativeEvent.contentSize;
    setInputHeight(Math.min(Math.max(47, height), 180));
  };
  
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim(), attachmentPreview);
      setMessage('');
      onAttachmentCancel();
    }
  };
  
  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };
  
  const handleAttachment = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      onAttachmentSelect(result.assets[0].uri, 'image/jpeg');
    }
  };
  
  return (
    <View style={styles.container}>
      {showEmojiPicker && (
        <View style={styles.emojiPickerContainer}>
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        </View>
      )}
      
      <View style={[styles.chatForm, { borderRadius: inputHeight > 47 ? 15 : 32 }]}>
        <TextInput
          ref={inputRef}
          style={[styles.input, { height: inputHeight }]}
          placeholder="Message..."
          value={message}
          onChangeText={setMessage}
          multiline
          onContentSizeChange={handleContentSizeChange}
          editable={!isLoading}
        />
        
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              setShowEmojiPicker(!showEmojiPicker);
              if (showEmojiPicker) {
                inputRef.current?.focus();
              }
            }}
          >
            <Ionicons name="happy-outline" size={24} color="#706DB0" />
          </TouchableOpacity>
          
          <View style={styles.attachmentWrapper}>
            {attachmentPreview ? (
              <>
                <Image source={{ uri: attachmentPreview.uri }} style={styles.previewImage} />
                <TouchableOpacity
                  style={[styles.iconButton, styles.cancelButton]}
                  onPress={onAttachmentCancel}
                >
                  <Ionicons name="close" size={20} color="#FF0000" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleAttachment}
                disabled={isLoading}
              >
                <Ionicons name="attach" size={24} color="#706DB0" />
              </TouchableOpacity>
            )}
          </View>
          
          {message.trim() ? (
            <TouchableOpacity
              style={[styles.iconButton, styles.sendButton]}
              onPress={handleSendMessage}
              disabled={isLoading}
            >
              <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};
