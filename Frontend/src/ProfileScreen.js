import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Function to request permission and pick an image
  const pickImage = async () => {
    // Request permission for accessing media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  
  // Validate form
  const isFormValid = () => {
    return firstName.trim() !== '' && 
           surname.trim() !== '' && 
           email.trim() !== '' && 
           email.includes('@');
  };
  
  // Handle continue button press
  const handleContinue = async () => {
    if (isFormValid()) {
      // Collect profile data
      const profileData = {
        firstName,
        surname,
        email,
        birthDate,
        profileImage,
        phoneNumber
      };
      
      // Send data to backend
      try {
        const response = await fetch('http://10.31.36.174:8000/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        });
        
        const responseJson = await response.json();
        
        if (response.ok) {
          console.log('Profile saved successfully:', responseJson);
          navigation.navigate('NextScreen', { profileData });
        } else {
          alert('Failed to save profile');
        }
      } catch (error) {
        console.error('Error sending profile data:', error);
        alert('Error connecting to the server');
      }
    } else {
      alert('Please fill in all required fields correctly');
    }
  };
  
  // Handle skip button press
  const handleSkip = () => {
    navigation.navigate('NextScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create Your Profile</Text>
        
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderContainer}>
                <Ionicons name="person-outline" size={40} color="#888" />
                <Text style={styles.uploadText}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
          />
          
          <Text style={styles.label}>Surname</Text>
          <TextInput
            style={styles.input}
            value={surname}
            onChangeText={setSurname}
            placeholder="Enter your surname"
          />
          
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
          
          <Text style={styles.label}>Birthday</Text>
          <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="DD/MM/YYYY"
          />
        </View>
        
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.continueButton, !isFormValid() && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!isFormValid()}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#800080',
    backgroundColor: 'transparent',
    width: '45%',
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#800080',
    fontSize: 16,
    fontWeight: '500',
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#800080',
    width: '45%',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#800080',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;
