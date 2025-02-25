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

export default LoginScreenPreview;
