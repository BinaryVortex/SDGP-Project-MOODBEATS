import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import { ChevronLeft, Camera, Music2, Disc3 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ProfileSetup = () => {
  const [focusedField, setFocusedField] = useState(null);
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#000", "#800080"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>MOODBEAST</Text>
      </View>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 70 }} 
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}>
          <Image source={require("../assets/Profile_photo.png")} size={70} style={{width: 60, height: 60}}/>
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
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* No NavigationBar here - it's handled in AppNavigation.jsx */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 40, 
    backgroundColor: "#000"
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
    marginBottom: 25
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
    bottom: 5, 
    right: 85, 
    backgroundColor: '#000', 
    padding: 10, 
    borderRadius: 20 
},

  iconSpin: { 
    position: 'absolute', 
    top: 2, 
    right: 115, 
    transform: [{ rotate: '360deg' }] 
},

  form: { 
    marginBottom: 65,
    marginRight: 20,
    marginLeft: 20, 
},

  input: { 
    backgroundColor: '#222', 
    padding: 15, 
    borderRadius: 20, 
    color: 'white', 
    marginBottom: 25
},

  inputFocused: { 
    borderColor: 'white', 
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
    marginRight: 20,
    marginLeft: 20,
 },

  continueButton: { 
    flex: 1, 
    padding: 15, 
    borderRadius: 10, 
    backgroundColor: '#000', 
    alignItems: 'center', 
    marginRight: 20
},

  buttonText: { 
    color: 'white', 
    fontWeight: 'bold' 
}

});

export default ProfileSetup;
