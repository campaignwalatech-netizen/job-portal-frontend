import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'employee', 'employer', 'mobile', 'otp'
  const [tempUserType, setTempUserType] = useState('');
  const [tempMobile, setTempMobile] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const profileComplete = localStorage.getItem('profileComplete');
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsProfileComplete(profileComplete === 'true');
    }
    setIsLoading(false);
  }, []);

  const openAuthModal = (type) => {
    setTempUserType(type);
    setAuthModal('mobile');
  };

  const handleMobileSubmit = (mobile) => {
    setTempMobile(mobile);
    setAuthModal('otp');
  };

  const handleOtpVerify = () => {
    // Create user with mobile and userType
    const userInfo = {
      id: Date.now().toString(),
      mobile: tempMobile,
      userType: tempUserType,
      joinedAt: new Date().toISOString(),
      profileCompleted: false
    };
    
    console.log('Creating user:', userInfo);
    
    setUser(userInfo);
    setIsProfileComplete(false); // Ensure profile is marked as incomplete
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('profileComplete', 'false');
    
    // Close modal - user will be redirected to onboarding via routing
    setAuthModal(null);
    setTempUserType('');
    setTempMobile('');
  };

  const completeProfile = () => {
    console.log('Completing profile...');
    setIsProfileComplete(true);
    localStorage.setItem('profileComplete', 'true');
    
    const updatedUser = { ...user, profileCompleted: true };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setIsProfileComplete(false);
    setAuthModal(null);
    setTempUserType('');
    setTempMobile('');
    localStorage.removeItem('user');
    localStorage.removeItem('profileComplete');
  };

  const value = {
    user,
    isProfileComplete,
    authModal,
    tempUserType,
    tempMobile,
    isLoading,
    openAuthModal,
    handleMobileSubmit,
    handleOtpVerify,
    completeProfile,
    logout,
    closeAuthModal: () => setAuthModal(null)
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
