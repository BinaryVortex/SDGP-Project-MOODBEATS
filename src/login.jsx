import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Animation values for button color and brightness
  const buttonColorAnim = useRef(new Animated.Value(0)).current;
  
  // Interpolate animation value to color - using a much brighter magenta
  const buttonBackgroundColor = buttonColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#800080', '#FF00FF']
  });
  
  // Add glow effect animation
  const buttonGlowEffect = buttonColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0px', '6px']
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

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Add your login logic here
    }, 1500);
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
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo and Welcome Text */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>MB</Text>
              </View>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subtitleText}>Login to stay in tune with your music 💫</Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Username or Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username or email"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Forgot password')}>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button with Enhanced Animation */}
              <Animated.View style={{
                shadowColor: '#FF00FF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: buttonColorAnim,
                shadowRadius: 10,
                transform: [{ scale: buttonScale }],
              }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  <Animated.View style={[
                    styles.loginButton,
                    { 
                      backgroundColor: buttonBackgroundColor,
                    }
                  ]}>
                    <LinearGradient
                      colors={isPressed ? 
                        ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)'] : 
                        ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                      style={styles.loginGradient}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="#ffffff" />
                      ) : (
                        <Animated.Text style={[
                          styles.loginText,
                          { 
                            color: isPressed ? '#FFFFFF' : '#F0F0F0',
                            textShadowColor: 'rgba(255,255,255,0.5)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: isPressed ? 10 : 0,
                          }
                        ]}>Login to MOODBEATS</Animated.Text>
                      )}
                    </LinearGradient>
                  </Animated.View>
                </TouchableOpacity>
              </Animated.View>

              {/* Social Login */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialButtons}>
                {/* Google Login */}
                <TouchableOpacity style={styles.socialButton}>
                  <AntDesign name="google" size={20} color="#ffffff" style={styles.socialIcon} />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                {/* Facebook Login */}
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="facebook" size={20} color="#ffffff" style={styles.socialIcon} />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>

                {/* Instagram Login */}
                <TouchableOpacity style={styles.socialButton}>
                  <AntDesign name="instagram" size={20} color="#ffffff" style={styles.socialIcon} />
                  <Text style={styles.socialButtonText}>Instagram</Text>
                </TouchableOpacity>
              </View>

              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>New to MOODBEATS? </Text>
                <TouchableOpacity onPress={() => console.log('Navigate to Sign Up')}>
                  <Text style={styles.signUpLink}>Create an account</Text>
                </TouchableOpacity>
              </View>
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
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 60, // Adding padding at the bottom for better visibility with black gradient
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontWeight:'bold',
    marginBottom:20,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom:25,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderRadius: 10,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    fontWeight:'bold'
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FF00FF',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF00FF',
  },
  checkmark: {
    color: 'black',
    fontSize: 12,
  },
  rememberText: {
    color: '#ffffff',
    fontSize: 14,
  },
  forgotPassword: {
    color: '#FF00FF',
    fontSize: 14,
    fontWeight:'bold',
  },
  loginButton: {
    width: '100%',
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 30,
  },
  loginGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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
    marginTop:20,
  },
  dividerText: {
    color: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 16,
    fontSize: 14,
    marginTop:20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop:30,
  },
  socialButton: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margintop:30,
  },
  signUpText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop:30,
  },
  signUpLink: {
    color: '#FF00FF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop:30,
  },
});

export default LoginScreen;
