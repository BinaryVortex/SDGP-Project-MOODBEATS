import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, GRADIENTS } from './constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const searchResults = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', type: 'song' },
  { id: '2', title: 'Save Your Tears', artist: 'The Weeknd', type: 'song' },
  { id: '3', title: 'After Hours', artist: 'The Weeknd', type: 'album' },
  { id: '4', title: 'Starboy', artist: 'The Weeknd', type: 'album' },
  { id: '5', title: 'The Weeknd', artist: '', type: 'artist' },
  { id: '6', title: 'Levitating', artist: 'Dua Lipa', type: 'song' },
  { id: '7', title: 'Future Nostalgia', artist: 'Dua Lipa', type: 'album' },
  { id: '8', title: 'Dua Lipa', artist: '', type: 'artist' },
  { id: '9', title: 'As It Was', artist: 'Harry Styles', type: 'song' },
  { id: '10', title: 'Harrys House', artist: 'Harry Styles', type: 'album' },
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      // Filter results based on query
      const filtered = searchResults.filter(
        item => 
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.artist.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleResultPress = (item) => {
    if (item.type === 'song') {
      navigation.navigate('Playlist', {
        screen: 'MusicPlayer',
        params: { trackId: item.id }
      });
    } else if (item.type === 'album') {
      navigation.navigate('Playlist', {
        screen: 'PlaylistScreen',
        params: { albumId: item.id }
      });
    } else if (item.type === 'artist') {
      // Navigate to artist page
      console.log('Navigate to artist:', item.title);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleResultPress(item)}
    >
      <View style={styles.resultIcon}>
        <Ionicons 
          name={
            item.type === 'song' ? 'musical-note' : 
            item.type === 'album' ? 'disc' : 'person'
          } 
          size={24} 
          color={COLORS.primary}
        />
      </View>
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        {item.artist ? (
          <Text style={styles.resultSubtitle}>{item.artist} • {item.type}</Text>
        ) : (
          <Text style={styles.resultSubtitle}>Artist</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={GRADIENTS.main} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for songs, artists, albums..."
              placeholderTextColor="#999"
              value={query}
              onChangeText={handleSearch}
              autoFocus
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearButton}>
                <Feather name="x" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {results.length > 0 ? (
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.resultsList}
          />
        ) : query.length > 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No results found for "{query}"</Text>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Feather name="search" size={64} color="#555" />
            <Text style={styles.placeholderText}>Search for your favorite music</Text>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 10,
  },
  backButton: {
    marginRight: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  resultsList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultSubtitle: {
    color: '#aaa',
    fontSize: 14,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  placeholderText: {
    color: '#777',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    color: '#777',
    fontSize: 16,
  },
});

export default SearchBar;
