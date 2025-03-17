import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BotAvatar = () => (
  <View style={styles.botAvatarContainer}>
    <Svg width={24} height={24} viewBox="0 0 1024 1024" style={styles.botAvatar}>
      <Path
        fill="#FFFFFF"
        d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"
      />
    </Svg>
  </View>
);

const ThinkingIndicator = () => (
  <View style={styles.thinkingIndicator}>
    <View style={[styles.dot, styles.dot1]} />
    <View style={[styles.dot, styles.dot2]} />
    <View style={[styles.dot, styles.dot3]} />
  </View>
);

const MessageItem = ({ message }) => {
  const isBot = message.type === 'bot';
  const isUser = message.type === 'user';
  const isThinking = message.isThinking;
  const hasAttachment = message.attachment;
  
  return (
    <View style={[styles.container, isUser && styles.userContainer]}>
      {isBot && <BotAvatar />}
      
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.messageText,
            isBot ? styles.botMessageText : styles.userMessageText,
            message.isError && styles.errorMessageText,
          ]}
        >
          {isThinking ? (
            <ThinkingIndicator />
          ) : (
            <Text style={[
              styles.messageTextContent,
              isUser && styles.userMessageTextContent,
              message.isError && styles.errorMessageTextContent,
            ]}>
              {message.text}
            </Text>
          )}
        </View>
        
        {hasAttachment && (
          <Image
            source={{ uri: message.attachment.uri }}
            style={styles.attachmentImage}
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botAvatarContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#5350C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  botAvatar: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    maxWidth: '75%',
  },
  messageText: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 2,
  },
  botMessageText: {
    backgroundColor: '#F2F2FF',
    borderTopLeftRadius: 3,
  },
  userMessageText: {
    backgroundColor: '#5350C4',
    borderBottomRightRadius: 3,
  },
  errorMessageText: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FFD0D0',
    borderWidth: 1,
  },
  messageTextContent: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  userMessageTextContent: {
    color: '#FFFFFF',
  },
  errorMessageTextContent: {
    color: '#FF0000',
  },
  attachmentImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginTop: 4,
  },
  thinkingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
    paddingVertical: 8,
    gap: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#6F6BC2',
    opacity: 0.7,
  },
  dot1: {
    animationName: 'dotPulse',
    animationDuration: '1.8s',
    animationIterationCount: 'infinite',
    animationDelay: '0.2s',
  },
  dot2: {
    animationName: 'dotPulse',
    animationDuration: '1.8s',
    animationIterationCount: 'infinite',
    animationDelay: '0.3s',
  },
  dot3: {
    animationName: 'dotPulse',
    animationDuration: '1.8s',
    animationIterationCount: 'infinite',
    animationDelay: '0.4s',
  },
});

export default MessageItem;