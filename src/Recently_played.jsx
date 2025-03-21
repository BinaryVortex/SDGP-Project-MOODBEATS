import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Home, Music, Smile, Heart, Clock, MoreVertical, Play, Pause } from 'lucide-react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './constants/theme';

const tracks = [
  { id: 1, title: 'Sprinter', artist: 'Central Cee x Dave', img: 'https://via.placeholder.com/40', duration: '3:42', liked: true },
  { id: 2, title: 'MoonLight', artist: 'XXXTENTACION', img: 'https://via.placeholder.com/40', duration: '2:18', liked: false },
  { id: 3, title: 'Daylight', artist: 'David Kushner', img: 'https://via.placeholder.com/40', duration: '4:05', liked: true },
  { id: 4, title: 'Circles', artist: 'Post Malone', img: 'https://via.placeholder.com/40', duration: '3:35', liked: false },
  { id: 5, title: 'Save your tears', artist: 'The Weeknd', img: 'https://via.placeholder.com/40', duration: '3:56', liked: true },
  { id: 6, title: 'Save your tears', artist: 'The Weeknd', img: 'https://via.placeholder.com/40', duration: '3:56', liked: true },
  { id: 7, title: 'Save your tears', artist: 'The Weeknd', img: 'https://via.placeholder.com/40', duration: '3:56', liked: true },
  { id: 8, title: 'Save your tears', artist: 'The Weeknd', img: 'https://via.placeholder.com/40', duration: '3:56', liked: false },
  { id: 9, title: 'Save your tears', artist: 'The Weeknd', img: 'https://via.placeholder.com/40', duration: '3:56', liked: true },
  { id: 10, title: 'Save your tears', artist: 'The Weeknd', img: 'https://via.placeholder.com/40', duration: '3:56', liked: true },
  { id: 11, title: 'Save your tears', artist: 'The Weeknd', img: 'https://via.placeholder.com/40', duration: '3:56', liked: true },
];

const PlayButton = ({ isPlaying, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.playButton}>
    {isPlaying ? <Pause size={14} color="white" /> : <Play size={14} color="white" />}
  </TouchableOpacity>
);

export default function MoodBeatsPreview() {
  const navigation = useNavigation();
  const [playingTrack, setPlayingTrack] = useState(null);

  const handlePlayTrack = (trackId) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
    // Could navigate to music player in a real app
    if (playingTrack !== trackId) {
      navigation.navigate('Playlist', { 
        screen: 'MusicPlayer', 
        params: { trackId }
      });
    }
  };

  return (
    <LinearGradient colors={["#000", COLORS.primary]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>MOODBEATS</Text>
        <View style={styles.searchContainer}>
          <Feather name="search" size={16} color="#fff" style={styles.searchIcon} />
          <TextInput placeholder="Search" placeholderTextColor="#fff" style={styles.searchInput} />
        </View>
      </View>
      
      {/* Recently Played */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Clock size={16} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>Recently Played</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 90 }} showsVerticalScrollIndicator={false}>
          <FlatList
            nestedScrollEnabled={true} 
            data={tracks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.trackItem}>
                <Image source={{ uri: item.img }} style={styles.trackImage} />
                <View style={styles.trackDetails}>
                  <Text style={styles.trackTitle}>{item.title}</Text>
                  <Text style={styles.trackSubtitle}>{item.artist} • {item.duration}</Text>
                </View>
                <View style={styles.trackActions}>
                  <PlayButton 
                    isPlaying={playingTrack === item.id} 
                    onPress={() => handlePlayTrack(item.id)} 
                  />
                  <TouchableOpacity>
                    <Heart size={16} color={item.liked ? '#FF007F' : '#ccc'} fill={item.liked ? '#FF007F' : 'none'} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MoreVertical size={16} color="#ccc" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>

      {/* Bottom Navigation Bar is now handled by the NavigationBar component */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 45,
  },

  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    marginBottom: 35, 
  },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff' 
  },

  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 20, 
    paddingHorizontal: 10, 
    width: 150,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', 
  },
  
  searchIcon: { 
    marginRight: 6,
  },

  searchInput: {
    color: '#fff', 
    fontSize: 14, 
    flex: 1 
  },

  content: { 
    flex: 1, 
    padding: 10,
    marginTop: -20,
  },

  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },

  sectionTitle: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginLeft: 5 
  },

  trackItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
    padding: 10, 
    borderRadius: 10, 
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)', 
  },

  trackImage: { 
    width: 40, 
    height: 40, 
    borderRadius: 5, 
    marginRight: 10 
  },

  trackDetails: { 
    flex: 1 
  },

  trackTitle: { 
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },

  trackSubtitle: { 
    color: 'gray', 
    fontSize: 12 
  },

  trackActions: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },

  playButton: { 
    backgroundColor: '#800080', 
    padding: 10, 
    borderRadius: 20 
  },

  navbar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 10, 
    backgroundColor: '#111', 
    position: 'absolute', 
    bottom: 0, 
    width: '100%' 
  },

  navItem: { 
    alignItems: 'center' 
  },

  navLabel: { 
    fontSize: 10, 
    color: '#fff', 
    marginTop: 5 
  }
});