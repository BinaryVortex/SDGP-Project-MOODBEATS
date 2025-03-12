import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      return;
    }
    console.log('Sign up with:', name, email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000', '#800080', '#000']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Logo and App Name */}
            <View style={styles.logoContainer}>
              <Text style={styles.appName}>MOODBEATS</Text>
              <Text style={styles.tagline}>Sign in to stay in tune with your music💫</Text>
            </View>

            {/* Sign Up Form */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#e3e3e3"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#e3e3e3"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#e3e3e3"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#e3e3e3"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
              >
                <LinearGradient
                  colors={['#7c3aed', '#4f46e5']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Social Sign Up Options */}
            <View style={styles.socialContainer}>
              <Text style={styles.orText}>OR</Text>
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>Instagram</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signInLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
    marginTop:40,
    marginBottom:20,
  },
  tagline: {
    fontSize: 16,
    color: '#cccccc',
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    color: '#ffffff',
    fontSize: 16,
  },
  signUpButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    marginTop: 10,
  },
  orText: {
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 10,
  },
  socialButton: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  socialButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom:30,
  },
  signInText: {
    color: '#cccccc',
    fontSize: 14,
  },
  signInLink: {
    color: '#7c3aed',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
