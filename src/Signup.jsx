import React, { useState, useRef } from 'react';
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
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation values for button color and brightness
  const buttonColorAnim = useRef(new Animated.Value(0)).current;
  
  // Interpolate animation value to color
  const buttonBackgroundColor = buttonColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#800080', '#FF00FF']
  });
  
  // Brightness/scale effect
  const buttonScale = buttonColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05]
  });

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(buttonColorAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.timing(buttonColorAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSignUp = () => {
    // Reset error state
    setError('');
    setIsLoading(true);
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setIsLoading(false);
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    
    console.log('Sign up with:', name, email, password);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically call an API to register the user
    }, 1500);
  };

  const handleSocialSignUp = (platform) => {
    console.log(`Signing up with ${platform}`);
    // Implement social sign-up logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['black', '#800080', 'black']}
        locations={[0, 0.6, 1.0]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
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
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              
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
              
              {/* Enhanced Sign Up Button with Animation */}
              <Animated.View style={{
                shadowColor: '#FF00FF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: buttonColorAnim,
                shadowRadius: 10,
                transform: [{ scale: buttonScale }],
                marginTop: 10,
              }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={handleSignUp}
                  disabled={isLoading}
                >
                  <Animated.View style={[
                    styles.signUpButton,
                    { 
                      backgroundColor: buttonBackgroundColor,
                    }
                  ]}>
                    <LinearGradient
                      colors={isPressed ? 
                        ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)'] : 
                        ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                      style={styles.buttonGradient}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="#ffffff" />
                      ) : (
                        <Animated.Text style={[
                          styles.buttonText,
                          { 
                            color: isPressed ? '#FFFFFF' : '#F0F0F0',
                            textShadowColor: 'rgba(255,255,255,0.5)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: isPressed ? 10 : 0,
                          }
                        ]}>Sign Up to MOODBEATS</Animated.Text>
                      )}
                    </LinearGradient>
                  </Animated.View>
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* Social Sign Up Options */}
            <View style={styles.socialContainer}>
              {/* Divider with text */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialButtons}>
                {/* Google Login */}
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialSignUp('Google')}
                >
                  <AntDesign name="google" size={20} color="#ffffff" style={styles.socialIcon} />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                
                {/* Facebook Login */}
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialSignUp('Facebook')}
                >
                  <FontAwesome name="facebook" size={20} color="#ffffff" style={styles.socialIcon} />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
                
                {/* Instagram Login */}
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialSignUp('Instagram')}
                >
                  <AntDesign name="instagram" size={20} color="#ffffff" style={styles.socialIcon} />
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
    paddingBottom: 60, // Adding padding at the bottom for better visibility with black gradient
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
    marginTop: 40,
    marginBottom: 20,
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
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    fontWeight: 'bold',
  },
  signUpButton: {
    width: '100%',
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialContainer: {
    marginTop: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 20,
  },
  dividerText: {
    color: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 16,
    fontSize: 14,
    marginTop: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 30,
  },
  socialButton: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  socialButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  socialIcon: {
    marginRight: 8,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  signInText: {
    color: '#cccccc',
    fontSize: 14,
  },
  signInLink: {
    color: '#FF00FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4757',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SignUpScreen;