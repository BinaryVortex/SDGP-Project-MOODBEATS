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

const ALBUMS = [
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
    title: "1989 (Taylor's Version)",
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

const MusicApp = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');

  const renderAlbumItem = ({ item }) => (
    <TouchableOpacity style={styles.albumContainer}>
      <Image
        source={{ uri: item.cover }}
        style={styles.albumCover}
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

      <View style={styles.tabContainer}>
        {['Home', 'Mood Recognition', 'Playlist'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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

export default MusicApp;
