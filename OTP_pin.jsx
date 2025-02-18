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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-4 max-w-md mx-auto relative overflow-hidden">
      {/* Previous ambient background and content wrapper code remains the same */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Previous header, message, OTP fields, buttons code remains the same until the keypad */}
        <div className="flex items-center mb-8">
          <button className="p-1.5 hover:bg-white/5 rounded-full transition-all backdrop-blur-sm">
            <ChevronLeft size={20} className="text-slate-300" />
          </button>
          <div className="ml-2 flex items-center gap-2">
            <div className="relative">
              <Music2 className="text-emerald-400" size={20} />
              <Sparkles className="absolute -top-2 -right-2 text-emerald-400/50" size={12} />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Enter Your OTP
            </h1>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/5 blur-xl rounded-xl"></div>
          <p className="text-center text-slate-300 px-4 text-xs leading-relaxed backdrop-blur-sm py-4 rounded-xl bg-white/5 border border-white/10">
            We've sent a One-Time Password (OTP) to your registered
            phone number/email address. Please enter the code below to
            verify your account
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <div
              key={index}
              className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center text-lg font-bold
                transition-all duration-300 transform
                ${index === currentIndex ? 'border-emerald-400 scale-110' : 'border-slate-700'}
                ${digit ? 'bg-slate-800/80 backdrop-blur-sm' : 'bg-white/5 backdrop-blur-sm'}
                ${digit ? 'shadow-lg shadow-emerald-500/10' : ''}`}
            >
              {digit}
            </div>
          ))}
        </div>

        <button 
          className={`w-full py-3 rounded-lg mb-3 font-medium transition-all duration-300 text-sm
            backdrop-blur-sm relative overflow-hidden
            ${otp.every(digit => digit) 
              ? 'bg-gradient-to-r from-emerald-400 to-cyan-500 hover:scale-[1.02]' 
              : 'bg-slate-800/50 text-slate-400 cursor-not-allowed'}`}
          disabled={!otp.every(digit => digit)}
        >
          Continue
          {otp.every(digit => digit) && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
          )}
        </button>

        <button className="w-full text-center text-cyan-400 hover:text-cyan-300 transition-colors text-xs mb-8 relative group">
          Resend It
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cyan-400/30 group-hover:w-16 transition-all duration-300 transform -translate-x-1/2"></span>
        </button>

        {/* Updated Compact Number Pad */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl p-1.5 max-w-md mx-auto border-t border-slate-800">
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <button
                key={number}
                onClick={() => handleNumberPress(number)}
                className={`px-0.5 py-1 text-sm font-medium rounded-md transition-all duration-200
                  ${pressedKey === number 
                    ? 'bg-gradient-to-b from-emerald-500 to-cyan-500 scale-95' 
                    : 'bg-slate-800 hover:bg-slate-700'}
                  shadow-sm shadow-black/20`}
              >
                {number}
                <div className="text-[6px] text-slate-400 -mt-0.5">
                  {number === 2 ? 'ABC' : number === 3 ? 'DEF' : 
                   number === 4 ? 'GHI' : number === 5 ? 'JKL' : 
                   number === 6 ? 'MNO' : number === 7 ? 'PQRS' : 
                   number === 8 ? 'TUV' : number === 9 ? 'WXYZ' : ''}
                </div>
              </button>
            ))}
            <button
              onClick={() => handleDelete()}
              className="px-0.5 py-1 text-sm font-medium rounded-md bg-slate-800 hover:bg-slate-700 shadow-sm shadow-black/20"
            >
              ←
            </button>
            <button
              onClick={() => handleNumberPress(0)}
              className="px-0.5 py-1 text-sm font-medium rounded-md bg-slate-800 hover:bg-slate-700 shadow-sm shadow-black/20"
            >
              0
            </button>
            <button
              onClick={() => handleDelete()}
              className="px-0.5 py-1 text-sm font-medium rounded-md bg-slate-800 hover:bg-slate-700 shadow-sm shadow-black/20"
            >
              ←
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default OTPVerification;