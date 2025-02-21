import React, { useState } from 'react';
import { Camera, ChevronLeft, Music2, Disc3 } from 'lucide-react';

const ProfileSetup = () => {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white p-4 max-w-md mx-auto relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-1/2 h-1/2 bg-purple-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-1/2 h-1/2 bg-blue-500 rounded-full blur-[100px] opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="flex items-center mb-8 relative">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2 flex items-center gap-2">
          <Music2 className="text-orange-500" size={24} />
          MOODBEAST
        </h1>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-12">
        <div className="relative group">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-orange-500 rounded-full p-1 animate-pulse">
            <div className="w-full h-full bg-black/90 rounded-full flex items-center justify-center relative overflow-hidden group-hover:bg-black/70 transition-colors">
              <Camera size={32} className="text-gray-400 group-hover:text-white transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <button className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full hover:bg-orange-400 transition-colors shadow-lg">
            <Camera size={16} className="text-white" />
          </button>
          <Disc3 size={20} className="absolute top-0 right-0 text-orange-500 animate-spin-slow" />
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6 relative">
        {['First Name', 'Surname', 'Date of Birth', 'Email', 'Phone Number'].map((label, index) => (
          <div
            key={label}
            className={`transform transition-all duration-300 ${
              focusedField === label ? 'scale-105' : ''
            }`}
          >
            <div className="relative">
              <input
                type={label === 'Date of Birth' ? 'date' : label === 'Email' ? 'email' : 'text'}
                placeholder={label}
                onFocus={() => setFocusedField(label)}
                onBlur={() => setFocusedField(null)}
                className={`w-full p-4 rounded-xl bg-white/10 backdrop-blur-md border-2 transition-all
                  ${focusedField === label ? 'border-orange-500 bg-white/20' : 'border-transparent'}
                  focus:outline-none focus:border-orange-500 placeholder-gray-400
                  hover:bg-white/15`}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-orange-500/20 opacity-0 transition-opacity pointer-events-none" />
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-4 mt-12">
          <button className="flex-1 py-4 px-6 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all transform hover:scale-105 backdrop-blur-md">
            Skip
          </button>
          <button className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium hover:from-orange-400 hover:to-pink-400 transition-all transform hover:scale-105 shadow-xl">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetup;