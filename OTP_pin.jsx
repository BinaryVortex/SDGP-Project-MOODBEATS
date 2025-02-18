import React, { useState } from 'react';
import { ChevronLeft, Music2, Sparkles } from 'lucide-react';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pressedKey, setPressedKey] = useState(null);

  const handleNumberPress = (number) => {
    setPressedKey(number);
    setTimeout(() => setPressedKey(null), 200);
    
    if (currentIndex < 4) {
      const newOtp = [...otp];
      newOtp[currentIndex] = number;
      setOtp(newOtp);
      if (currentIndex < 3) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };
}