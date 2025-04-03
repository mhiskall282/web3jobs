// import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireProfile = false, roleType = null }) => {
  const { isAuthenticated, userProfile, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireProfile) {
    if (!userProfile) {
      return <Navigate to="/create-profile" state={{ from: location }} replace />;
    }
    
    if (!userProfile.isComplete) {
      return <Navigate to="/create-profile" state={{ from: location }} replace />;
    }
  }

  if (roleType && userProfile?.role !== roleType) {
    return <Navigate to={
      userProfile?.role === 'Freelancer' 
        ? '/freelancer-dashboard' 
        : '/recruiter-dashboard'
    } replace />;
  }

  return children;
};

export default ProtectedRoute;