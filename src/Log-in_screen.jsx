import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LoginScreenPreview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.phoneMockup}>
        {/* Notch */}
        <View style={styles.notch} />

        {/* Screen content */}
        <View style={styles.screenContent}>
          {/* Status bar */}
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>iPhone 16 Plus • 10</Text>
            <View style={styles.statusIcons}>
              <View style={styles.statusBarItem} />
              <View style={styles.statusBarCircle} />
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            {/* Circle with illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.phoneIllustration}>
                <View style={styles.phoneScreen}>
                  <View style={styles.phoneDetailTop} />
                  <View style={styles.phoneDetailLine} />
                  <View style={styles.phoneDetailLine} />
                </View>
              </View>
              {/* People illustrations */}
              <View style={[styles.people, styles.personLeft]}>
                <View style={styles.headYellow} />
                <View style={styles.bodyYellow} />
              </View>
              <View style={[styles.people, styles.personRight]}>
                <View style={styles.headBlue} />
                <View style={styles.bodyBlue} />
              </View>
            </View>

            {/* "Let's You In" text */}
            <Text style={styles.title}>Let's You In</Text>

            {/* Social login buttons */}
            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.fbIcon}><Text style={styles.fbText}>f</Text></View>
              <Text style={styles.buttonText}>Continue With Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.googleIcon} />
              <Text style={styles.buttonText}>Continue With Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.appleIcon} />
              <Text style={styles.buttonText}>Continue With Apple</Text>
            </TouchableOpacity>

            {/* Or divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.divider} />
            </View>

            {/* Password login button */}
            <TouchableOpacity style={styles.passwordButton}>
              <Text style={styles.passwordButtonText}>Sign In With Password</Text>
            </TouchableOpacity>

            {/* Account registration link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already Have An Account?</Text>
              <Text style={styles.loginLink}>Login</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5' 
  },

  phoneMockup: { 
    width: 300, 
    height: 600, 
    backgroundColor: '#000', 
    borderRadius: 30, 
    padding: 10 
  },

  notch: { 
    width: 80, 
    height: 20, 
    backgroundColor: '#000', 
    alignSelf: 'center', 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10 
  },

  screenContent: { 
    flex: 1, 
    backgroundColor: '#222', 
    padding: 20 
  },

  statusBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },

  statusText: { 
    color: '#bbb', 
    fontSize: 12 
  },

  statusIcons: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },

  statusBarItem: { 
    width: 16, 
    height: 4, 
    backgroundColor: '#bbb', 
    borderRadius: 2 
  },
  
  statusBarCircle: { 
    width: 4, 
    height: 4, 
    backgroundColor: '#bbb', 
    borderRadius: 2, 
    marginLeft: 5 
  },

  mainContent: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },

  illustrationContainer: { 
    width: 120, 
    height: 120, 
    backgroundColor: '#fff', 
    borderRadius: 60, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },

  phoneIllustration: { 
    width: 40, 
    height: 60, 
    backgroundColor: '#666', 
    borderRadius: 5, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },

  phoneScreen: { 
    width: 36, 
    height: 56, 
    backgroundColor: '#4a90e2', 
    borderRadius: 4, 
    paddingTop: 5 
  },

  phoneDetailTop: { 
    width: 24, 
    height: 10, 
    backgroundColor: '#f4a261', 
    borderRadius: 2, 
    alignSelf: 'center', 
    marginBottom: 5 
  },

  phoneDetailLine: { 
    width: 24, 
    height: 2, 
    backgroundColor: '#fff', 
    alignSelf: 'center', 
    marginBottom: 2 
  },

  people: { 
    position: 'absolute', 
    bottom: 0 
  },

  personLeft: { 
    left: 10 
  },

  personRight: { 
    right: 10 
  },

  headYellow: { 
    width: 8, 
    height: 8, 
    backgroundColor: '#f4c542', 
    borderRadius: 4 
  },

  bodyYellow: { 
    width: 6, 
    height: 12, 
    backgroundColor: '#f4a261', 
    borderRadius: 3 
  },

  headBlue: { 
    width: 8, 
    height: 8, 
    backgroundColor: '#42a5f5', 
    borderRadius: 4 
  },

  bodyBlue: { 
    width: 6, 
    height: 12, 
    backgroundColor: '#1e88e5', 
    borderRadius: 3 
  },

  title: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginVertical: 10 
  },
  
  socialButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 20, 
    marginBottom: 10, 
    width: '90%', 
    justifyContent: 'center' 
  },

  buttonText: { 
    color: '#222', 
    fontWeight: '500' 
  },

  dividerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10 
  },

  divider: { 
    flex: 1, 
    height: 1, 
    backgroundColor: '#444' 
  },

  orText: { 
    color: '#bbb', 
    marginHorizontal: 5 
  },

  passwordButton: { 
    backgroundColor: '#f76b1c', 
    padding: 10, 
    borderRadius: 20, 
    width: '90%', 
    alignItems: 'center' 
  },

  passwordButtonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },

  loginContainer: { 
    flexDirection: 'row', 
    marginTop: 10 
  },
  
  loginText: { 
    color: '#bbb' 
  },

  loginLink: { 
    color: '#42a5f5', 
    marginLeft: 5 
  }
  
});

export default LoginScreenPreview;
