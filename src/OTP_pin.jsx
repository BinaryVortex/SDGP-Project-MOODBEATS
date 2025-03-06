import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pressedKey, setPressedKey] = useState(null);

  const handleNumberPress = (number) => {
    setPressedKey(number);
    setTimeout(() => setPressedKey(null), 200);
    
    if (currentIndex < 4) {
      const newOtp = [...otp];
      newOtp[currentIndex] = number.toString();
      setOtp(newOtp);
      if (currentIndex < 3) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handleDelete = () => {
    if (currentIndex > 0 || otp[0]) {
      const newOtp = [...otp];
      const deleteIndex = otp[currentIndex] ? currentIndex : currentIndex - 1;
      newOtp[deleteIndex] = '';
      setOtp(newOtp);
      if (currentIndex > 0 && !otp[currentIndex]) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  return (
    <LinearGradient colors={["#000", "#800080"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Enter Your OTP</Text>
      </View>

      {/* OTP Description */}
      <Text style={styles.description}>
        We've sent a One-Time Password (OTP) to your registered phone/email.
      </Text>

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <View
            key={index}
            style={[
              styles.otpBox,
              index === currentIndex && styles.otpActive,
            ]}>
            <Text style={styles.otpText}>{digit}</Text>
          </View>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[styles.submitButton, otp.every(digit => digit) ? styles.activeButton : styles.disabledButton]} 
        disabled={!otp.every(digit => digit)}>
        <Text style={styles.submitText}>Continue</Text>
      </TouchableOpacity>

      {/* Number Pad */}
      <View style={styles.numberPad}>
        {[...Array(9).keys()].map(i => (
          <TouchableOpacity
            key={i + 1}
            onPress={() => handleNumberPress(i + 1)}
            style={[styles.numberButton, pressedKey === i + 1 && styles.pressedButton]}>
            <Text style={styles.numberText}>{i + 1}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleDelete} style={styles.numberButton}>
          <Feather name="delete" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberPress(0)} style={styles.numberButton}>
          <Text style={styles.numberText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.numberButton}>
          <Feather name="delete" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
  },

  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 30,
    marginTop: 30,
  },

  backButton: { 
    padding: 10,
    marginRight: 10,
  },
  
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff',
    marginRight: 45,
  },

  description: { 
    textAlign: 'center', 
    color: '#fff', 
    marginBottom: 20, 
    fontSize: 14 
  },

  otpContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 10, 
    marginBottom: 40 
  },

  otpBox: { 
    width: 50, 
    height: 50, 
    borderRadius: 10, 
    backgroundColor: '#000', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#000' 
  },

  otpActive: { 
    borderColor: '#fffaf0' 
  },

  otpText: { 
    fontSize: 20, 
    color: '#fff' 
  },

  submitButton: { 
    width: '100%', 
    padding: 15, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 30
  },

  activeButton: { 
    backgroundColor: '#800080' 
  },

  disabledButton: { 
    backgroundColor: '#000' 
  },

  submitText: { 
    fontSize: 16, 
    color: '#fff', 
    fontWeight: 'bold' 
  },

  numberPad: { 
    width: '80%', 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },

  numberButton: { 
    width: '30%', 
    aspectRatio: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000', 
    borderRadius: 10, 
    marginBottom: 20 
  },
  
  pressedButton: { 
    backgroundColor: '#800080' 
  },

  numberText: { 
    fontSize: 24, 
    color: '#fff' 
  }
  
});