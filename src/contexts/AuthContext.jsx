// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [onboardingData, setOnboardingData] = useState({
    mobile: '',
    userType: '',
    otp: ''
  });

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const profileComplete = localStorage.getItem('profileComplete');
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsProfileComplete(profileComplete === 'true');
    }
  }, []);

  const updateOnboardingData = (data) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const completeOnboarding = (userData) => {
    const userInfo = {
      userType: onboardingData.userType,
      mobile: onboardingData.mobile,
      ...userData,
      id: Date.now().toString(),
      joinedAt: new Date().toISOString()
    };
    
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  const completeProfile = () => {
    setIsProfileComplete(true);
    localStorage.setItem('profileComplete', 'true');
    
    const updatedUser = { ...user, profileCompleted: true };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setIsProfileComplete(false);
    setOnboardingData({
      mobile: '',
      userType: '',
      otp: ''
    });
    localStorage.removeItem('user');
    localStorage.removeItem('profileComplete');
  };

  const value = {
    user,
    isProfileComplete,
    onboardingData,
    updateOnboardingData,
    completeOnboarding,
    completeProfile,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};