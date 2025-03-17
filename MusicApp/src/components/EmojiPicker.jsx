import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

// Common emoji sets
const EMOJI_SETS = {
  smileys: [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', 
    '😉', '😊', '😇', '😍', '🥰', '😘', '😗', '😚', '😙', '😋'
  ],
  gestures: [
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤙', '🤘', '👊', '👏',
    '🙌', '🙏', '🤝', '💪', '💯', '👑', '❤️', '🔥', '⭐', '✨'
  ],
  objects: [
    '📱', '💻', '🖥️', '📷', '🎮', '🎧', '🎵', '🎬', '📚', '🎨',
    '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸'
  ],
};

const EmojiPicker = ({ onEmojiSelect }) => {
  const [currentSet, setCurrentSet] = React.useState('smileys');
  const { width } = Dimensions.get('window');
  const numColumns = Math.floor(width / 40);
  
  const renderEmoji = ({ item }) => (
    <TouchableOpacity
      style={styles.emojiButton}
      onPress={() => onEmojiSelect(item)}
    >
      <Text style={styles.emoji}>{item}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.categoryButton, currentSet === 'smileys' && styles.activeCategory]} 
          onPress={() => setCurrentSet('smileys')}
        >
          <Text style={styles.categoryButtonText}>😀</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.categoryButton, currentSet === 'gestures' && styles.activeCategory]} 
          onPress={() => setCurrentSet('gestures')}
        >
          <Text style={styles.categoryButtonText}>👍</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.categoryButton, currentSet === 'objects' && styles.activeCategory]} 
          onPress={() => setCurrentSet('objects')}
        >
          <Text style={styles.categoryButtonText}>📱</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={EMOJI_SETS[currentSet]}
        renderItem={renderEmoji}
        keyExtractor={(item) => item}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        style={styles.emojiList}
        contentContainerStyle={styles.emojiListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: '#F0F0F0',
  },
  categoryButtonText: {
    fontSize: 18,
  },
  emojiList: {
    flex: 1,
  },
  emojiListContent: {
    padding: 10,
  },
  emojiButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
});

export default EmojiPicker;