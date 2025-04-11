
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
import { Escrow } from './pages/Escrow';
import JobListings from './components/JobListings';
import CreateJobListing from './components/CreateJobListing';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Authenticated routes */}
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/create-profile" element={<ProfileCreation />} />
            <Route path="/learning" element={<LearningHub />} />
            <Route path="/governance" element={<Governance />} />
            <Route path='/escrow' element={<Escrow/>} />
          {/* </Route> */}

          {/* Profile-complete routes */}
          {/* <Route element={<ProtectedRoute requireProfile />}> */}
            <Route path="/profile" element={<ProfileView />} />
            
            {/* Role-specific routes */}
            {/* <Route element={<ProtectedRoute roleType="Freelancer" />}> */}
              <Route path="/freelancer-dashboard/*" element={<FreelancerDashboard />} />
              <Route path='/jobs' element={<JobListings />} />
            {/* </Route> */}

            {/* <Route element={<ProtectedRoute roleType="Recruiter" />}> */}
              <Route path="/recruiter-dashboard/*" element={<RecruiterDashboard />} />
              <Route path='/post-jobs' element={<CreateJobListing />} />
            {/* </Route> */}
          {/* </Route> */}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;