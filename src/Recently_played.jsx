import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Home, Music, Smile, Heart, Clock, MoreVertical, Play, Pause } from 'lucide-react-native';

const tracks = [
  { id: 1, title: 'Sprinter', artist: 'Central Cee x Dave', img: 'https://via.placeholder.com/40', duration: '3:42', liked: true },
  { id: 2, title: 'MoonLight', artist: 'XXXTENTACION', img: 'https://via.placeholder.com/40', duration: '2:18', liked: false },
  { id: 3, title: 'Daylight', artist: 'David Kushner', img: 'https://via.placeholder.com/40', duration: '4:05', liked: true },
  { id: 4, title: 'Circles', artist: 'Post Malone', img: 'https://via.placeholder.com/40', duration: '3:35', liked: false },
  { id: 5, title: 'Save your tears', artist: 'The Weeknd', img: 'https://via.placeholder.com/40', duration: '3:56', liked: true },
];

const PlayButton = ({ isPlaying, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.playButton}>
    {isPlaying ? <Pause size={14} color="white" /> : <Play size={14} color="white" />}
  </TouchableOpacity>
);

export default function MoodBeatsPreview() {
  const [playingTrack, setPlayingTrack] = useState(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.header}>
        <Text style={styles.logo}>🎵 MOODBEATS</Text>
        <TextInput placeholder="Search songs, artists, or moods..." placeholderTextColor="white" style={styles.searchInput} />
      </LinearGradient>

      {/* Recently Played */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Clock size={16} color="#FF007F" />
          <Text style={styles.sectionTitle}>Recently Played</Text>
        </View>
        <FlatList
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
                <PlayButton isPlaying={playingTrack === item.id} onPress={() => setPlayingTrack(playingTrack === item.id ? null : item.id)} />
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
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Home size={24} color="#FF007F" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Smile size={24} color="gray" />
          <Text style={styles.navText}>Mood</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Music size={24} color="gray" />
          <Text style={styles.navText}>Playlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#111' 
  },

  header: { 
    padding: 20, 
    paddingTop: 50 
  },

  logo: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },

  searchInput: { 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    borderRadius: 20, 
    padding: 10, 
    color: 'white' 
  },

  content: { 
    flex: 1, 
    padding: 20 
  },

  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
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
    backgroundColor: 'rgba(255,255,255,0.1)' 
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
    backgroundColor: '#FF007F', 
    padding: 10, 
    borderRadius: 20 
  },

  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    backgroundColor: '#222', 
    paddingVertical: 15 
  },

  navButton: { 
    alignItems: 'center' 
  },

  navTextActive: { 
    color: '#FF007F', 
    fontSize: 12, 
    marginTop: 5 
  },

  navText: { 
    color: 'gray', 
    fontSize: 12, 
    marginTop: 5 
  },
  
});
