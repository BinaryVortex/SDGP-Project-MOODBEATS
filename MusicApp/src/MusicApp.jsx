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
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const albumsData = [
  { id: '1', title: 'Dawn FM', artist: 'The Weeknd', year: '2022', cover: 'https://example.com/dawn-fm.jpg' },
  { id: '2', title: 'Sweetener', artist: 'Ariana Grande', year: '2018', cover: 'https://example.com/sweetener.jpg' },
  { id: '3', title: 'Future Nostalgia', artist: 'Dua Lipa', year: '2020', cover: 'https://example.com/future-nostalgia.jpg' },
  { id: '4', title: "1989 (Taylor's Version)", artist: 'Taylor Swift', year: '2023', cover: 'https://example.com/1989.jpg' },
  { id: '5', title: 'Happier Than Ever', artist: 'Billie Eilish', year: '2021', cover: 'https://example.com/happier-than-ever.jpg' },
  { id: '6', title: 'Album 6', artist: 'Artist 6', year: '2024', cover: 'https://example.com/album6.jpg' },
];

const { width } = Dimensions.get('window');
const ALBUM_SIZE = (width - 48) / 2;

const TabBar = ({ activeTab, onTabPress }) => (
  <View style={styles.tabBar}>
    {['Home', 'Mood Recognition', 'Playlist'].map(tab => (
      <TouchableOpacity
        key={tab}
        style={[styles.tab, activeTab === tab && styles.activeTab]}
        onPress={() => onTabPress(tab)}
      >
        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const AlbumItem = ({ album }) => (
  <TouchableOpacity style={styles.albumItem}>
    <Image source={{ uri: album.cover }} style={styles.albumCover} />
    <Text style={styles.albumTitle}>{album.title}</Text>
    <Text style={styles.albumDetails}>{album.artist} | {album.year}</Text>
  </TouchableOpacity>
);

const MusicApp = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>Logo</Text>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Feather name="search" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <TabBar activeTab={activeTab} onTabPress={setActiveTab} />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>50 Albums</Text>
        <FlatList
          data={albumsData}
          renderItem={({ item }) => <AlbumItem album={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.albumList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { backgroundColor: '#FF5722', padding: 16, flexDirection: 'row', alignItems: 'center' },
  logo: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  searchBox: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 20, flex: 1, marginLeft: 16, paddingHorizontal: 10, alignItems: 'center' },
  searchInput: { flex: 1, height: 36, color: '#000' },
  tabBar: { flexDirection: 'row', backgroundColor: '#FF5722' },
  tab: { paddingVertical: 12, paddingHorizontal: 16 },
  activeTab: { borderBottomWidth: 3, borderBottomColor: 'white' },
  tabText: { color: 'rgba(255, 255, 255, 0.8)' },
  activeTabText: { color: 'white', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  albumList: { paddingBottom: 16 },
  albumItem: { width: ALBUM_SIZE, marginBottom: 16, marginRight: 16 },
  albumCover: { width: ALBUM_SIZE, height: ALBUM_SIZE, borderRadius: 8 },
  albumTitle: { color: 'white', fontWeight: 'bold' },
  albumDetails: { color: '#999' },
});

export default MusicApp;
