import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { SvgXml } from 'react-native-svg';

// SVG icons as XML strings
const searchIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="11" r="8"></circle>
  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
</svg>
`;

const folderIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
</svg>
`;

const menuIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="1"></circle>
  <circle cx="12" cy="5" r="1"></circle>
  <circle cx="12" cy="19" r="1"></circle>
</svg>
`;

const folderSmallIcon = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
</svg>
`;

const sortIcon = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
</svg>
`;

const homeIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
</svg>
`;

const exploreIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="5.5" cy="17.5" r="2.5"></circle>
  <circle cx="18.5" cy="17.5" r="2.5"></circle>
  <path d="M5.5 17.5l4-7.5h7l4 7.5"></path>
</svg>
`;

const libraryIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 18V5l12-2v13"></path>
  <circle cx="6" cy="18" r="3"></circle>
  <circle cx="18" cy="16" r="3"></circle>
</svg>
`;

const downloadsIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
  <polyline points="7 10 12 15 17 10"></polyline>
  <line x1="12" y1="15" x2="12" y2="3"></line>
</svg>
`;

// Sample data for playlists
const playlists = [
  { id: 1, title: 'Most Popular Songs', songs: 100 },
  { id: 2, title: 'Favourite Songs', songs: 100 },
  { id: 3, title: 'Most Listened Songs', songs: 100 },
  { id: 4, title: 'Custom Playlist', songs: 100 },
  { id: 5, title: 'Custom Playlist', songs: 100 },
  { id: 6, title: 'Custom Playlist', songs: 100 },
];


export default MoodbeatsApp;