
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import ProfileCreation from './pages/ProfileCreation';
import FreelancerDashboard from './pages/FreelancerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import { LearningHub } from './pages/LearningHub';
import { Governance } from './pages/Governance';
import ProfileView from './components/ProfileView';

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          {/* Public Routes without Layout */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
          
          {/* Main Layout Wrapper */}
          <Route element={<Layout />}>
            {/* Public Routes within Layout */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/create-profile" element={<ProfileCreation />} />
              {/* <Route path="/messages" element={<Messages />} /> */}
              <Route path="/profile" element={<ProfileView />} />
              <Route path="/learning" element={<LearningHub />} />
              <Route path="/governance" element={<Governance />} />
            </Route>

            {/* Role-Specific Protected Routes */}
            <Route element={<ProtectedRoute requireProfile roleType="#Freelancer" />}>
              <Route path="/freelancer/*" element={<FreelancerDashboard />} />
            </Route>

            <Route element={<ProtectedRoute requireProfile roleType="#Recruiter" />}>
              <Route path="/recruiter/*" element={<RecruiterDashboard />} />
              {/* <Route path="/post-job" element={<PostJobPage />} /> */}
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
};

export default App;