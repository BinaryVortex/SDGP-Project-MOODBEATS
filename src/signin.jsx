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
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Add your sign-in logic here
    console.log('Sign in with:', email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#4a1259']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          {/* Logo and App Name */}
          <View style={styles.logoContainer}>
            {/* <Image
              source={require('./assets/logo.png')} // Add your logo image
              style={styles.logo}
            /> */}
            <Text style={styles.appName}>MOODBEATS</Text>
            <Text style={styles.tagline}>Your AI Music Companion</Text>
          </View>

          {/* Sign In Form */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#8e8e8e"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#8e8e8e"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={handleSignIn}
            >
              <LinearGradient
                colors={['#7c3aed', '#4f46e5']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Social Sign In Options */}
          <View style={styles.socialContainer}>
            <Text style={styles.orText}>OR</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
      padding: 20,
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    appName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#ffffff',
      letterSpacing: 2,
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
      marginBottom: 15,
      color: '#ffffff',
      fontSize: 16,
    },
    signInButton: {
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
    forgotPassword: {
      alignItems: 'center',
      marginTop: 15,
    },
    forgotPasswordText: {
      color: '#cccccc',
      fontSize: 14,
    },
    socialContainer: {
      marginTop: 20,
    },
    orText: {
      color: '#cccccc',
      textAlign: 'center',
      marginBottom: 20,
    },
    socialButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    socialButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: 15,
      borderRadius: 10,
      width: '45%',
      alignItems: 'center',
    },
    socialButtonText: {
      color: '#ffffff',
      fontSize: 16,
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 30,
    },
    signUpText: {
      color: '#cccccc',
      fontSize: 14,
    },
    signUpLink: {
      color: '#7c3aed',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  
  export default SignInScreen;