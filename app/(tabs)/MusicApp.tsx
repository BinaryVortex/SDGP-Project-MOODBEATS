import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Define TypeScript interfaces
interface Album {
  id: string;
  title: string;
  artist: string;
  year: string;
  cover: string;
}

interface AlbumItemProps {
  item: Album;
}

const ALBUMS: Album[] = [
  {
    id: '1',
    title: 'Dawn FM',
    artist: 'The Weeknd',
    year: '2022',
    cover: 'https://example.com/dawn-fm.jpg',
  },
  {
    id: '2',
    title: 'Sweetener',
    artist: 'Ariana Grande',
    year: '2018',
    cover: 'https://example.com/sweetener.jpg',
  },
  {
    id: '3',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    year: '2020',
    cover: 'https://example.com/future-nostalgia.jpg',
  },
  {
    id: '4',
    title: '1989 (Taylor\'s Version)',
    artist: 'Taylor Swift',
    year: '2023',
    cover: 'https://example.com/1989.jpg',
  },
  {
    id: '5',
    title: 'Happier Than Ever',
    artist: 'Billie Eilish',
    year: '2021',
    cover: 'https://example.com/happier-than-ever.jpg',
  },
  {
    id: '6',
    title: 'Album 6',
    artist: 'Artist 6',
    year: '2024',
    cover: 'https://example.com/album6.jpg',
  },
];

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ALBUM_WIDTH = (width - 48) / COLUMN_COUNT;

const MusicApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderAlbumItem = ({ item }: AlbumItemProps) => (
    <TouchableOpacity style={styles.albumContainer}>
      <Image
        source={{ uri: item.cover }}
        style={styles.albumCover}
        // Note: For TypeScript, we need to handle the defaultSource differently
        // You may need to add a placeholder image to your assets
      />
      <Text style={styles.albumTitle}>{item.title}</Text>
      <Text style={styles.albumArtist}>
        {item.artist} | {item.year}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Logo</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Feather name="search" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        {['Home', 'Mood Recognition', 'Playlist'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>50 Albums</Text>
        
        <FlatList
          data={ALBUMS}
          renderItem={renderAlbumItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.albumGrid}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    backgroundColor: '#FF5722',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 36,
    paddingHorizontal: 8,
    color: '#000',
  },
  searchButton: {
    padding: 6,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF5722',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  albumGrid: {
    paddingBottom: 16,
  },
  albumContainer: {
    width: ALBUM_WIDTH,
    marginBottom: 16,
    marginRight: 16,
  },
  albumCover: {
    width: ALBUM_WIDTH,
    height: ALBUM_WIDTH,
    borderRadius: 8,
    marginBottom: 8,
  },
  albumTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  albumArtist: {
    color: '#999',
    fontSize: 12,
  },
});

export default MusicApp;