import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { Home, Music, Smile, Heart, Clock, MoreVertical, Play, Pause } from 'lucide-react-native';
import { Feather } from '@expo/vector-icons';

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
  const [playingTrack, setPlayingTrack] = useState(null);

  return (
    <View style={styles.container}>

      {/* <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.header}> */}
      
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
          <Clock size={16} color="#800080" />
          <Text style={styles.sectionTitle}>Recently Played</Text>
          
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <NavItem icon="home" label="Home" />
        <NavItem icon="heart" label="Mood" />
       <NavItem icon="music" label="Playlist" />
        <NavItem icon="user" label="Profile"/>
      </View>
    </View>
  );
}

const NavItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.navItem}>
    <Feather name={icon} size={20} color="#fff" />
    <Text style={styles.navLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#111', 
    paddingTop: 45,
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
    padding: 10 ,
    marginTop: -45,
  },

  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
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
    backgroundColor: '#333', 
    borderRadius: 20, 
    paddingHorizontal: 10, 
    width: 150 
  },
  
  searchIcon: { 
    marginRight: 6,
   },

  searchInput: {
    color: '#fff', 
    fontSize: 14, 
    flex: 1 
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
