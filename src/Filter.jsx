// import React, { useState } from 'react';
// import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { Home, Music, Smile, Clock, MoreVertical, Play, Pause, Filter } from 'lucide-react-native';

// const tracks = [
//   { id: 1, title: 'Sprinter', artist: 'Central Cee x Dave', img: 'https://via.placeholder.com/40', duration: '3:42', liked: true },
//   { id: 2, title: 'MoonLight', artist: 'XXXTENTACION', img: 'https://via.placeholder.com/40', duration: '2:18', liked: false },
//   { id: 3, title: 'Daylight', artist: 'David Kushner', img: 'https://via.placeholder.com/40', duration: '4:05', liked: true },
//   { id: 4, title: 'Circles', artist: 'Post Malone', img: 'https://via.placeholder.com/40', duration: '3:35', liked: false },
//   { id: 5, title: 'Save your tears', artist: 'The Weeknd', img: 'https://via.placeholder.com/40', duration: '3:56', liked: true },
//   { id: 6, title: 'The Lazy Song', artist: 'Bruno Mars', img: 'https://via.placeholder.com/40', duration: '3:15', liked: false },
//   { id: 7, title: 'Better Now', artist: 'Post Malone', img: 'https://via.placeholder.com/40', duration: '3:50', liked: true },
//   { id: 8, title: 'Stitches', artist: 'Shawn Mendes', img: 'https://via.placeholder.com/40', duration: '3:26', liked: false },
// ];

// const PlayButton = ({ isPlaying, onPress }) => (
//   <TouchableOpacity onPress={onPress} style={styles.playButton}>
//     {isPlaying ? <Pause size={14} color="white" /> : <Play size={14} color="white" />}
//   </TouchableOpacity>
// );

// export default function MoodBeatsPreview() {
//   const [playingTrack, setPlayingTrack] = useState(null);
//   const [showFilter, setShowFilter] = useState(false);

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <LinearGradient colors={['#FF8000', '#FF5500']} style={styles.header}>
//         <Text style={styles.logo}>🎵 MOODBEATS</Text>
//         <TextInput placeholder="Search" placeholderTextColor="black" style={styles.searchInput} />
//       </LinearGradient>

//       {/* Filter Button */}
//       <View style={styles.filterContainer}>
//         <TouchableOpacity onPress={() => setShowFilter(!showFilter)} style={styles.filterButton}>
//           <Text style={styles.filterText}>Filter</Text>
//           <Filter size={16} color="white" />
//         </TouchableOpacity>
//       </View>

//       {/* Filter Options */}
//       {showFilter && (
//         <View style={styles.filterMenu}>
//           {['Title', 'Dates', 'Latest', 'Most Viewed'].map((option) => (
//             <TouchableOpacity key={option} style={styles.filterOption}>
//               <Text style={styles.filterOptionText}>{option}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}

//       {/* Recently Played */}
//       <View style={styles.content}>
//         <View style={styles.sectionHeader}>
//           <Clock size={16} color="#FF8000" />
//           <Text style={styles.sectionTitle}>Recently Played</Text>
//         </View>
//         <FlatList
//           data={tracks}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.trackItem}>
//               <Image source={{ uri: item.img }} style={styles.trackImage} />
//               <View style={styles.trackDetails}>
//                 <Text style={styles.trackTitle}>{item.title}</Text>
//                 <Text style={styles.trackSubtitle}>{item.artist} • {item.duration}</Text>
//               </View>
//               <View style={styles.trackActions}>
//                 <PlayButton isPlaying={playingTrack === item.id} onPress={() => setPlayingTrack(playingTrack === item.id ? null : item.id)} />
//                 <TouchableOpacity>
//                   <MoreVertical size={16} color="#ccc" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#111' 
//   },

//   header: { 
//     padding: 20, 
//     paddingTop: 50 
//   },

//   logo: { 
//     color: 'white', 
//     fontSize: 18, 
//     fontWeight: 'bold', 
//     marginBottom: 10 
//   },

//   searchInput: { 
//     backgroundColor: 'white', 
//     borderRadius: 20, 
//     padding: 10, 
//     color: 'black' 
//   },
  
//   filterContainer: { flexDirection: 'row', justifyContent: 'flex-end', padding: 10 },
//   filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF8000', padding: 8, borderRadius: 20 },
//   filterText: { color: 'white', marginRight: 5 },
//   filterMenu: { position: 'absolute', right: 20, top: 100, backgroundColor: '#333', borderRadius: 10, padding: 10 },
//   filterOption: { padding: 5 },
//   filterOptionText: { color: 'white' },
//   content: { flex: 1, padding: 20 },
//   sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   sectionTitle: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 5 },
//   trackItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 10, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)' },
//   trackImage: { width: 40, height: 40, borderRadius: 5, marginRight: 10 },
//   trackDetails: { flex: 1 },
//   trackTitle: { color: 'white', fontSize: 14, fontWeight: 'bold' },
//   trackSubtitle: { color: 'gray', fontSize: 12 },
//   trackActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   playButton: { backgroundColor: '#FF8000', padding: 10, borderRadius: 20 },
// });
