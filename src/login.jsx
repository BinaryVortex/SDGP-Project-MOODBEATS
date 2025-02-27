import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        colors={['#1a1a1a', '#4a1259', '#1a1a1a']}
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
              <LinearGradient
                colors={['#7c3aed', '#4f46e5']}
                style={styles.logoCircle}
              >
                <Text style={styles.logoText}>MB</Text>
              </LinearGradient>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subtitleText}>Login to continue your musical journey</Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Username or Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username or email"
                  placeholderTextColor="#9ca3af"
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
                  placeholderTextColor="#9ca3af"
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

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#7c3aed', '#4f46e5']}
                  style={styles.loginGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.loginText}>Login to MOODBEATS</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Social Login */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialButtons}>
              {/* Google Login */}
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              {/* Facebook Login */}
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>

              {/* Instagram Login */}
              <TouchableOpacity style={styles.socialButton}>
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
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    logoCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
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
      marginBottom: 8,
    },
    subtitleText: {
      fontSize: 16,
      color: '#9ca3af',
    },
    formContainer: {
      width: '100%',
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      color: '#d1d5db',
      marginBottom: 8,
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 12,
      padding: 16,
      color: '#ffffff',
      fontSize: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
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
      borderColor: '#7c3aed',
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: '#7c3aed',
    },
    checkmark: {
      color: '#ffffff',
      fontSize: 12,
    },
    rememberText: {
      color: '#d1d5db',
      fontSize: 14,
    },
    forgotPassword: {
      color: '#7c3aed',
      fontSize: 14,
    },
    loginButton: {
      width: '100%',
      height: 56,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 24,
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
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    dividerText: {
      color: '#9ca3af',
      paddingHorizontal: 16,
      fontSize: 14,
    },
    socialButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
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
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signUpText: {
      color: '#9ca3af',
      fontSize: 14,
    },
    signUpLink: {
      color: '#7c3aed',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  
  export default LoginScreen;
