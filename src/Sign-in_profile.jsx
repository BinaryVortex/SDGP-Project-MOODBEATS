import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import { ChevronLeft, Camera, Music2, Disc3 } from 'lucide-react-native';

const ProfileSetup = () => {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <ImageBackground
      source={require('../assets/Back02.jpg')}
      style={styles.container}
    >
    
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}><Music2 size={20} color="orange" /> MOODBEAST</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <View style={styles.profilePicture}>
        <Image source={require("../assets/Profile_photo.png")} size={70} style={{width: 60, height: 60}}/>

        
          {/* <Camera size={35} color="#fff" /> */}
        </View>
        <TouchableOpacity style={styles.cameraButton}>
          <Camera size={16} color="white" />
        </TouchableOpacity>
        <Disc3 size={20} color="orange" style={styles.iconSpin} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        {['First Name', 'Surname', 'Date of Birth', 'Email', 'Phone Number'].map((label) => (
          <TextInput
            key={label}
            placeholder={label}
            placeholderTextColor="#fff"
            style={[
              styles.input,
              focusedField === label && styles.inputFocused
            ]}
            onFocus={() => setFocusedField(label)}
            onBlur={() => setFocusedField(null)}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#000' 
},

  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 80 
},

  backButton: { 
    padding: 10
},

  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white', 
    marginLeft: 0 
},

  profileContainer: { 
    alignItems: 'center', 
    marginBottom: 30
},

  profilePicture: { 
    width: 150, 
    height: 150, 
    borderRadius: 50, 
    backgroundColor: '#000', 
    justifyContent: 'center', 
    alignItems: 'center' 
},

  cameraButton: { 
    position: 'absolute', 
    bottom: 0, 
    right: 75, 
    backgroundColor: 'orange', 
    padding: 10, 
    borderRadius: 20 
},

  iconSpin: { 
    position: 'absolute', 
    top: 0, 
    right: 100, 
    transform: [{ rotate: '360deg' }] 
},

  form: { 
    marginBottom: 55 
},

  input: { 
    backgroundColor: '#222', 
    padding: 15, 
    borderRadius: 20, 
    color: 'white', 
    marginBottom: 25
},

  inputFocused: { 
    borderColor: '#0ef', 
    borderWidth: 2 
},

  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
},

  skipButton: { 
    flex: 1, 
    padding: 15, 
    borderRadius: 10, 
    backgroundColor: '#444', 
    alignItems: 'center', 
    marginRight: 10
 },

  continueButton: { 
    flex: 1, 
    padding: 15, 
    borderRadius: 10, 
    backgroundColor: 'orange', 
    alignItems: 'center' 
},

  buttonText: { 
    color: 'white', 
    fontWeight: 'bold' 
}

});

export default ProfileSetup;
