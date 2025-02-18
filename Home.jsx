import React from 'react';
import { Home, Heart, ListMusic, Search } from 'lucide-react';

export default function Preview() {
  const artists = [
    "The Weeknd", "Travis Scott", "Central Cee", "Ariana Grande",
    "Drake", "Taylor Swift", "Post Malone", "Bad Bunny",
    "Ed Sheeran", "Doja Cat", "Justin Bieber", "Billie Eilish"
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-gray-900 to-black text-white min-h-[600px] relative">
      {/* Header */}
      <div className="p-4 bg-gradient-to-b from-purple-900/30">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            MOODBEATS
          </div>
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-40 bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 outline-none p-1.5 pl-9 rounded-full text-sm border border-white/10"
            />
          </div>
        </div>
      </div>

      {/* Recently Played */}
      <div className="mb-6">
        <div className="flex justify-between items-center px-4 mb-2">
          <div className="text-lg font-bold text-white/90">Recently Played</div>
          <div className="text-purple-400 text-sm">See All</div>
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-3 overflow-x-auto px-4 pb-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-32 group cursor-pointer">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl backdrop-blur-lg border border-white/5 group-hover:border-purple-500/50 transition-all duration-300"></div>
              <div className="mt-2 text-sm text-white/80 group-hover:text-purple-400 transition-colors">Track {i + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Artists */}
      <div className="mb-6">
        <div className="flex justify-between items-center px-4 mb-2">
          <div className="text-lg font-bold text-white/90">Artists</div>
          <div className="text-purple-400 text-sm">See All</div>
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto px-4">
          {artists.map((artist, i) => (
            <div key={i} className="flex-shrink-0 items-center w-20 group cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-full backdrop-blur-lg border border-white/5 group-hover:border-purple-500/50 transition-all duration-300"></div>
              <div className="mt-2 text-xs text-center text-white/80 group-hover:text-purple-400 transition-colors truncate">{artist}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="mb-12">
        <div className="flex justify-between items-center px-4 mb-2">
          <div className="text-lg font-bold text-white/90">Trending</div>
          <div className="text-purple-400 text-sm">Play All</div>
        </div>
        <div className="flex overflow-x-auto px-4 space-x-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-shrink-0 group cursor-pointer">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg backdrop-blur-lg border border-white/5 group-hover:border-purple-500/50 transition-all duration-300"></div>
              <div className="mt-2 text-xs text-white/80 group-hover:text-purple-400 transition-colors">Track {i + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full max-w-md bg-black/70 backdrop-blur-lg border-t border-white/5 flex justify-around py-1.5">
        <div className="flex flex-col items-center group cursor-pointer">
          <Home className="text-white/70 group-hover:text-purple-400 transition-colors" size={16} />
          <div className="text-[8px] mt-0.5 text-white/70 group-hover:text-purple-400 transition-colors">Home</div>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <Heart className="text-white/70 group-hover:text-purple-400 transition-colors" size={16} />
          <div className="text-[8px] mt-0.5 text-white/70 group-hover:text-purple-400 transition-colors">Mood</div>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <ListMusic className="text-white/70 group-hover:text-purple-400 transition-colors" size={16} />
          <div className="text-[8px] mt-0.5 text-white/70 group-hover:text-purple-400 transition-colors">Playlist</div>
        </div>
      </div>
    </div>
  );
}