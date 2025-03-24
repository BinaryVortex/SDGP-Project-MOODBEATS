import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  RefreshControl,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://192.168.1.6:8000/';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchSongs = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      console.log("Fetching songs from:", `${API_URL}songs/`);
      const response = await axios.get(`${API_URL}songs/`);
      console.log("Raw response:", JSON.stringify(response.data));
      
      const songsWithMetadata = (response.data.songs || []).map(song => ({
        ...song,
        duration: song.duration || '0:00',
        artist: song.artist || 'Unknown Artist',
      }));
      setSongs(songsWithMetadata);
    } catch (error) {
      console.error('Error fetching songs:', error.response?.data || error.message);
      setErrorMessage('Error fetching songs: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [fetchSongs]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSongs();
  }, [fetchSongs]);

  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      setCurrentSongId(null);
    }
  };

  const togglePlayback = async (songId) => {
    try {
      if (currentSongId === songId && sound && isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
        return;
      }
      
      if (currentSongId === songId && sound && !isPlaying) {
        await sound.playAsync();
        setIsPlaying(true);
        return;
      }
      
      await stopPlayback();
      setCurrentSongId(songId);

      // Enhanced Logging
      const songUrl = `${API_URL}songs/${songId}`;
      console.log(`Requesting song from: ${songUrl}`);

      // Improved error handling for missing audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: songUrl },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing song:', error);
      setErrorMessage('Error playing song. Check the song URL or backend settings.');

      if (error.message.includes('404')) {
        Alert.alert('Song Not Found', 'The song file could not be found on the server.');
      }
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  };

  const renderSongItem = ({ item }) => {
    const isCurrentSong = item._id === currentSongId;
    
    return (
      <TouchableOpacity 
        onPress={() => togglePlayback(item._id)} 
        style={[
          styles.songItem,
          isCurrentSong && styles.currentSongItem
        ]}
        activeOpacity={0.7}
      >
        <View style={styles.songRow}>
          <View style={styles.songImageContainer}>
            {item.artwork ? (
              <Image source={{ uri: `${API_URL}artwork/${item._id}` }} style={styles.songImage} />
            ) : (
              <View style={styles.songImagePlaceholder}>
                <Ionicons name="musical-note" size={24} color="#800080" />
              </View>
            )}
          </View>
          
          <View style={styles.songDetails}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {item.title || item.filename}
            </Text>
            <Text style={styles.songArtist} numberOfLines={1}>
              {item.artist}
            </Text>
            <Text style={styles.songDuration}>{item.duration}</Text>
          </View>
          
          <View style={styles.playButtonContainer}>
            <Ionicons 
              name={isCurrentSong && isPlaying ? "pause-circle" : "play-circle"} 
              size={42} 
              color={isCurrentSong ? "#800080" : "#666"}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Music</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="musical-notes-outline" size={64} color="#9e9e9e" />
      <Text style={styles.emptyText}>No songs found</Text>
      <Text style={styles.emptySubtext}>Your music library appears to be empty</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      {renderHeader()}
      
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={24} color="#e53935" />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
      
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7047eb" />
          <Text style={styles.loadingText}>Loading songs...</Text>
        </View>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item._id}
          renderItem={renderSongItem}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={songs.length === 0 ? { flex: 1 } : styles.listContainer}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={["#7047eb"]} 
              tintColor="#7047eb"
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#800060',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  listContainer: {
    paddingBottom: 16,
  },
  songItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  currentSongItem: {
    backgroundColor: '#f0ebff',
    borderLeftWidth: 4,
    borderLeftColor: '#800080',
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  songImageContainer: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  songImage: {
    width: '100%',
    height: '100%',
  },
  songImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0ebff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e6e0ff',
  },
  songDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 4,
  },
  songDuration: {
    fontSize: 13,
    color: '#9e9e9e',
    fontWeight: '500',
  },
  playButtonContainer: {
    padding: 8,
  },
  errorContainer: {
    margin: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e53935',
  },
  errorText: {
    marginLeft: 8,
    color: '#c62828',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7047eb',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9e9e9e',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#bdbdbd',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default Moodbasedsongs;