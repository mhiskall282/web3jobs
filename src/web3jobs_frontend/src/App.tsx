import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { FreelancerDashboard } from './pages/dashboard/FreelancerDashboard';
import { ClientDashboard } from './pages/dashboard/ClientDashboard';
import { JobListings } from './pages/jobs/JobListings';
import { JobPost } from './pages/jobs/JobPost';
//import { FreelancerProfile } from './pages/profile/FreelancerProfile'; // Ensure this file exists at the specified path or correct the path
// If the file does not exist, create it at './pages/profile/FreelancerProfile.tsx'
// import { Escrow } from './pages/Escrow';
import { LearningHub } from './pages/LearningHub';
import { Governance } from './pages/Governance';
// import { Messages } from './pages/Messages';
// import { Wallet } from './pages/Wallet';
// import { Settings } from './pages/Settings';
// import { About } from './pages/About';
// import { Terms } from './pages/Terms';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="freelancer-dashboard" element={<FreelancerDashboard />} />
            <Route path="client-dashboard" element={<ClientDashboard />} />
            <Route path="jobs" element={<JobListings />} />
            <Route path="post-job" element={<JobPost />} />
            <Route path="learning-hub" element={<LearningHub />} />
            <Route path="governance" element={<Governance />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
