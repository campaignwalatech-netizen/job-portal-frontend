import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const PublicRoute = ({ children }) => {
  const { user, isProfileComplete } = useAuth();

  if (user && isProfileComplete) {
    const redirectPath = user.userType === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  if (user && !isProfileComplete) {
    const redirectPath = user.userType === 'employer' ? '/employer/onboarding' : '/onboarding';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};