import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [onboardingData, setOnboardingData] = useState({
    mobile: '',
    userType: '',
    otp: ''
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Check if user already completed onboarding
  useEffect(() => {
    const savedUserType = localStorage.getItem('userType');
    const savedMobile = localStorage.getItem('mobile');
    const savedUser = localStorage.getItem('user');
    
    if (savedUserType && savedMobile) {
      const userInfo = {
        userType: savedUserType,
        mobile: savedMobile,
        ...(savedUser ? JSON.parse(savedUser) : {})
      };
      setUser(userInfo);
    }
  }, []);

  const updateOnboardingData = (data) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const completeOnboarding = (userData) => {
    const userInfo = {
      userType: onboardingData.userType,
      mobile: onboardingData.mobile,
      ...userData
    };
    setUser(userInfo);
    localStorage.setItem('userType', onboardingData.userType);
    localStorage.setItem('mobile', onboardingData.mobile);
    localStorage.setItem('user', JSON.stringify(userInfo));
    
    // Set redirect flag
    setShouldRedirect(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userType');
    localStorage.removeItem('mobile');
    localStorage.removeItem('user');
    setShouldRedirect(false);
  };

  const value = {
    user,
    setUser,
    onboardingData,
    updateOnboardingData,
    completeOnboarding,
    logout,
    shouldRedirect,
    resetRedirect: () => setShouldRedirect(false),
    resetOnboarding: () => setOnboardingData({ mobile: '', userType: '', otp: '' })
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