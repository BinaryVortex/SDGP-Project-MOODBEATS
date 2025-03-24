// PlaylistRecommendation.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

// Mock data for recommended playlists
const MOCK_PLAYLISTS = [
  {
    id: '1',
    title: 'Your Daily Mix 1',
    description: 'Based on your listening history',
    songs: [
      { id: '101', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
      { id: '102', title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35' },
      { id: '103', title: 'Starboy', artist: 'The Weeknd, Daft Punk', duration: '3:50' },
      { id: '104', title: 'Take My Breath', artist: 'The Weeknd', duration: '3:42' },
    ]
  },
  {
    id: '2',
    title: 'Throwback Hits',
    description: 'Songs you loved from the past',
    songs: [
      { id: '201', title: 'Billie Jean', artist: 'Michael Jackson', duration: '4:54' },
      { id: '202', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', duration: '5:56' },
      { id: '203', title: 'Smells Like Teen Spirit', artist: 'Nirvana', duration: '5:01' },
      { id: '204', title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
    ]
  },
  {
    id: '3',
    title: 'Chill Vibes',
    description: 'Perfect for relaxing',
    songs: [
      { id: '301', title: 'Sunset Lover', artist: 'Petit Biscuit', duration: '3:57' },
      { id: '302', title: 'Flume', artist: 'Bon Iver', duration: '3:39' },
      { id: '303', title: 'Youth', artist: 'Glass Animals', duration: '3:51' },
      { id: '304', title: 'Breathe', artist: 'Télépopmusik', duration: '4:41' },
    ]
  },
  {
    id: '4',
    title: 'Workout Energy',
    description: 'Keep your energy high while exercising',
    songs: [
      { id: '401', title: 'Eye of the Tiger', artist: 'Survivor', duration: '4:05' },
      { id: '402', title: 'Lose Yourself', artist: 'Eminem', duration: '5:26' },
      { id: '403', title: 'Can\'t Hold Us', artist: 'Macklemore & Ryan Lewis', duration: '4:18' },
      { id: '404', title: 'Till I Collapse', artist: 'Eminem', duration: '4:57' },
    ]
  },
];

// Components
const PlaylistCard = ({ playlist, onPress }) => (
  <TouchableOpacity 
    style={styles.playlistCard} 
    onPress={() => onPress(playlist)}
  >
    <View style={styles.playlistCoverPlaceholder}>
      <Text style={styles.playlistCoverText}>{playlist.title.charAt(0)}</Text>
    </View>
    <View style={styles.playlistInfo}>
      <Text style={styles.playlistTitle}>{playlist.title}</Text>
      <Text style={styles.playlistDescription}>{playlist.description}</Text>
      <Text style={styles.songCount}>{playlist.songs.length} songs</Text>
    </View>
  </TouchableOpacity>
);

const SongItem = ({ song, onPress }) => (
  <TouchableOpacity style={styles.songItem} onPress={() => onPress(song)}>
    <View style={styles.songInfo}>
      <Text style={styles.songTitle}>{song.title}</Text>
      <Text style={styles.songArtist}>{song.artist}</Text>
    </View>
    <Text style={styles.songDuration}>{song.duration}</Text>
  </TouchableOpacity>
);

const PlaylistDetailScreen = ({ playlist, onBack }) => (
  <View style={styles.detailContainer}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{playlist.title}</Text>
    </View>
    
    <View style={styles.playlistHeader}>
      <View style={styles.detailCoverPlaceholder}>
        <Text style={styles.detailCoverText}>{playlist.title.charAt(0)}</Text>
      </View>
      <View style={styles.playlistHeaderInfo}>
        <Text style={styles.detailTitle}>{playlist.title}</Text>
        <Text style={styles.detailDescription}>{playlist.description}</Text>
        <Text style={styles.detailSongs}>{playlist.songs.length} songs</Text>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playButtonText}>Play All</Text>
        </TouchableOpacity>
      </View>
    </View>
    
    <FlatList
      data={playlist.songs}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <SongItem 
          song={item} 
          onPress={(song) => console.log('Playing song:', song.title)}
        />
      )}
    />
  </View>
);

// Main PlaylistRecommendation Component
const PlaylistRecommendation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Simulating API fetch
  useEffect(() => {
    const fetchRecommendedPlaylists = async () => {
      try {
        // In a real app, this would be an API call
        // await fetch('https://your-api.com/recommendations')
        
        // Simulating network delay
        setTimeout(() => {
          setPlaylists(MOCK_PLAYLISTS);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setIsLoading(false);
      }
    };

    fetchRecommendedPlaylists();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.loadingText}>Finding the perfect playlists for you...</Text>
      </View>
    );
  }

  if (selectedPlaylist) {
    return (
      <PlaylistDetailScreen 
        playlist={selectedPlaylist} 
        onBack={() => setSelectedPlaylist(null)}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recommended Playlists</Text>
      </View>
      <Text style={styles.subheader}>Based on your listening habits</Text>
      
      <FlatList
        data={playlists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PlaylistCard 
            playlist={item} 
            onPress={(playlist) => setSelectedPlaylist(playlist)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    fontSize: 16,
    color: '#1DB954',
  },
  subheader: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  playlistCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 8,
    marginHorizontal: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  playlistCoverPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistCoverText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  playlistDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  songCount: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  playlistHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  detailCoverPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 4,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCoverText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  playlistHeaderInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  detailDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  detailSongs: {
    fontSize: 14,
    color: '#888888',
    marginTop: 4,
  },
  playButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  songItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center',
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  songArtist: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  songDuration: {
    fontSize: 14,
    color: '#888888',
  },
});

export default PlaylistRecommendation;