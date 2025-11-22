import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'employee', 'employer', 'mobile', 'otp'
  const [tempUserType, setTempUserType] = useState('');
  const [tempMobile, setTempMobile] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [authStep, setAuthStep] = useState('mobile'); // 'mobile' or 'otp' for employer flow
  const [error, setError] = useState(''); // Added missing error state

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const profileComplete = localStorage.getItem('profileComplete');
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsProfileComplete(profileComplete === 'true');
      } catch (err) {
        console.error('Error parsing saved user data:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('profileComplete');
      }
    }
    setIsLoading(false);
  }, []);

  // Open auth modal for employee/employer selection
  const openAuthModal = (type) => {
    setTempUserType(type);
    setAuthModal(type);
    setAuthStep('mobile');
    setError('');
  };

  // Handle mobile submission for modal flow
  const handleMobileSubmit = (mobile) => {
    setTempMobile(mobile);
    setAuthStep('otp');
    setError('');
  };

  // Handle OTP verification for modal flow
  const handleOtpVerify = () => {
    // Create user with mobile and userType
    const userInfo = {
      id: Date.now().toString(),
      mobile: tempMobile,
      userType: tempUserType,
      joinedAt: new Date().toISOString(),
      profileCompleted: false,
      isEmployer: tempUserType === 'employer'
    };
    
    console.log('Creating user:', userInfo);
    
    setUser(userInfo);
    setIsProfileComplete(false);
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('profileComplete', 'false');
    
    // Reset auth state
    setAuthModal(null);
    setAuthStep('mobile');
    setTempUserType('');
    setTempMobile('');
    setError('');
    
    // Redirect based on user type
    if (tempUserType === 'employer') {
      window.location.href = '/employer/onboarding';
    } else {
      window.location.href = '/onboarding';
    }
  };

  // Handle direct employer login (from employer landing page)
  const handleEmployerLogin = (mobile) => {
    setTempUserType('employer');
    setTempMobile(mobile);
    setAuthStep('otp');
    setError('');
  };

  // Handle direct employer OTP verification
  const handleEmployerOtpVerify = (otp) => {
    // Simulate OTP verification
    if (otp === '123456' || otp.startsWith('1')) {
      const userInfo = {
        id: Date.now().toString(),
        mobile: tempMobile,
        userType: 'employer',
        joinedAt: new Date().toISOString(),
        profileCompleted: false,
        isEmployer: true
      };
      
      console.log('Creating employer user:', userInfo);
      
      setUser(userInfo);
      setIsProfileComplete(false);
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('profileComplete', 'false');
      
      // Reset and redirect
      setAuthStep('mobile');
      setTempUserType('');
      setTempMobile('');
      setError('');
      
      // Redirect to employer onboarding
      window.location.href = '/employer/onboarding';
      return true;
    }
    return false;
  };

  // Handle direct employee login (from employee landing page)
  const handleEmployeeLogin = (mobile) => {
    setTempUserType('employee');
    setTempMobile(mobile);
    setAuthStep('otp');
    setError('');
  };

  // Handle direct employee OTP verification
  const handleEmployeeOtpVerify = (otp) => {
    // Simulate OTP verification
    if (otp === '123456' || otp.startsWith('1')) {
      const userInfo = {
        id: Date.now().toString(),
        mobile: tempMobile,
        userType: 'employee',
        joinedAt: new Date().toISOString(),
        profileCompleted: false,
        isEmployer: false
      };
      
      console.log('Creating employee user:', userInfo);
      
      setUser(userInfo);
      setIsProfileComplete(false);
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('profileComplete', 'false');
      
      // Reset and redirect
      setAuthStep('mobile');
      setTempUserType('');
      setTempMobile('');
      setError('');
      
      // Redirect to employee onboarding
      window.location.href = '/onboarding';
      return true;
    }
    return false;
  };

  // Reset auth flow
  const resetAuthFlow = () => {
    setAuthStep('mobile');
    setTempMobile('');
    setError('');
  };

  // Go back to mobile input
  const goBackToMobile = () => {
    setAuthStep('mobile');
    setError('');
  };

  const completeProfile = () => {
    console.log('Completing profile...');
    setIsProfileComplete(true);
    localStorage.setItem('profileComplete', 'true');
    
    const updatedUser = { 
      ...user, 
      profileCompleted: true,
      profileCompletedAt: new Date().toISOString()
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setIsProfileComplete(false);
    setAuthModal(null);
    setAuthStep('mobile');
    setTempUserType('');
    setTempMobile('');
    setError('');
    localStorage.removeItem('user');
    localStorage.removeItem('profileComplete');
    
    // Redirect to home page after logout
    window.location.href = '/';
  };

  const closeAuthModal = () => {
    setAuthModal(null);
    setAuthStep('mobile');
    setTempUserType('');
    setTempMobile('');
    setError('');
  };

  const value = {
    // State
    user,
    isProfileComplete,
    authModal,
    tempUserType,
    tempMobile,
    isLoading,
    authStep,
    error,
    setError,
    
    // Actions
    openAuthModal,
    handleMobileSubmit,
    handleOtpVerify,
    completeProfile,
    updateUser,
    logout,
    closeAuthModal,
    
    // Employer-specific actions
    handleEmployerLogin,
    handleEmployerOtpVerify,
    
    // Employee-specific actions
    handleEmployeeLogin,
    handleEmployeeOtpVerify,
    
    // Common actions
    resetAuthFlow,
    goBackToMobile,
    setAuthStep
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