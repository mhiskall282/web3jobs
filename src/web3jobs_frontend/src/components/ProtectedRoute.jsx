// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from './LoadingScreen';

const ProtectedRoute = ({ children, requireProfile = false, roleType = null }) => {
  const { isAuthenticated, isLoading, userProfile } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requireProfile) {
    // If profile is required but doesn't exist
    if (!userProfile) {
      return <Navigate to="/create-profile" replace />;
    }
    
    // If specific role is required
    if (roleType && userProfile.role !== roleType) {
      // Redirect to appropriate dashboard based on role
      if (userProfile.role === "#Freelancer") {
        return <Navigate to="/freelancer-dashboard" replace />;
      } else if (userProfile.role === "#Recruiter") {
        return <Navigate to="/recruiter-dashboard" replace />;
      }
    }
  }
  
  return children;
};

export default ProtectedRoute;