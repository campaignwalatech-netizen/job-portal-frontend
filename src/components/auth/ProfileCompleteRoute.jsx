import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ProfileCompleteRoute = ({ children }) => {
  const { user, isProfileComplete } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!isProfileComplete) {
    const redirectPath = user.userType === 'employer' ? '/employer/onboarding' : '/onboarding';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};