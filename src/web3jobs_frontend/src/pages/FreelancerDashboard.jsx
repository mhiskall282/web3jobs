import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, DollarSign, Star, Award, TrendingUp } from 'lucide-react';
import JobListings from '../components/JobListings';
import MyApplications from '../components/MyApplications';
import ProfileView from '../components/ProfileView';
import ProfileForm from '../components/ProfileForm';

const FreelancerDashboard = () => {
  const { userProfile, logout, backendActor } = useAuth();
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a complete profile
    const checkProfile = async () => {
      if (!userProfile) {
        navigate('/profile-setup');
        return;
      }
      
      if (!userProfile.isComplete) {
        navigate('/freelancer-dashboard/profile');
      }
    };
    
    checkProfile();
  }, [userProfile, navigate]);
  
  useEffect(() => {
    const fetchJobs = async () => {
      if (!backendActor) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        // Call the getAllJobListings function from your backend
        const jobs = await backendActor.getAllJobListings();
        
        // Filter to only show open jobs
        const openJobs = jobs.filter(job => job.isOpen);
        setJobListings(openJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load job listings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, [backendActor]);
  
  const handleRefreshJobs = () => {
    setIsLoading(true);
    backendActor.getAllJobListings()
      .then(jobs => {
        const openJobs = jobs.filter(job => job.isOpen);
        setJobListings(openJobs);
        setError('');
      })
      .catch(err => {
        console.error('Error refreshing jobs:', err);
        setError('Failed to refresh job listings.');
      })
      .finally(() => setIsLoading(false));
  };

  const stats = [
    { label: 'Active Projects', value: '3', icon: Briefcase },
    { label: 'Total Earnings', value: '$12,500', icon: DollarSign },
    { label: 'Average Rating', value: '4.8', icon: Star },
    { label: 'Completed Projects', value: '15', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-black text-gold">
      {/* Enhanced Navigation */}
      <nav className="bg-gray-900 border-b border-gold/20 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-gold to-orange-500 bg-clip-text text-transparent">
            AfroTalent
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/freelancer-dashboard" className="text-gray-300 hover:text-gold transition-colors">
              Dashboard
            </Link>
            <Link to="/freelancer-dashboard/applications" className="text-gray-300 hover:text-gold transition-colors">
              Applications
            </Link>
            <Link to="/freelancer-dashboard/profile" className="text-gray-300 hover:text-gold transition-colors">
              Profile
            </Link>
            <button 
              onClick={logout}
              className="bg-gold/10 hover:bg-gold/20 text-gold px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gold/20">
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-gold" />
                  <div>
                    <p className="text-sm text-gray-300">{stat.label}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Job Listings Section */}
            {error && (
              <div className="bg-red-500/10 text-red-500 p-4 rounded-xl mb-4">
                {error}
                <button 
                  onClick={handleRefreshJobs}
                  className="ml-4 underline hover:text-red-400"
                >
                  Try Again
                </button>
              </div>
            )}

            <Routes>
              <Route path="/" element={
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Active Opportunities</h2>
                    <button 
                      onClick={handleRefreshJobs}
                      className="bg-gold/10 hover:bg-gold/20 text-gold px-4 py-2 rounded-lg"
                    >
                      Refresh Listings
                    </button>
                  </div>
                  <JobListings 
                    jobs={jobListings} 
                    isLoading={isLoading} 
                    backendActor={backendActor} 
                  />
                </div>
              } />
              <Route path="/applications" element={<MyApplications backendActor={backendActor} />} />
              <Route path="/profile" element={
                userProfile && !userProfile.isComplete ? (
                  <ProfileForm 
                    backendActor={backendActor} 
                    initialData={userProfile} 
                    userRole="#Freelancer" 
                  />
                ) : (
                  <ProfileView 
                    profile={userProfile} 
                    backendActor={backendActor} 
                    onEdit={() => navigate('/freelancer-dashboard/edit-profile')} 
                  />
                )
              } />
              <Route path="/edit-profile" element={
                <ProfileForm 
                  backendActor={backendActor} 
                  initialData={userProfile} 
                  userRole="#Freelancer" 
                  isEditing={true} 
                />
              } />
            </Routes>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <h2 className="text-xl font-bold mb-4">Skills Progress</h2>
              <div className="space-y-4">
                {[
                  { skill: 'Smart Contracts', progress: 85 },
                  { skill: 'Web3 Integration', progress: 90 },
                  { skill: 'DeFi Protocols', progress: 75 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{item.skill}</span>
                      <span className="text-gold">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gold rounded-full h-2 transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { text: 'Submitted proposal for NFT marketplace', time: '2 days ago' },
                  { text: 'Received new project inquiry', time: '1 day ago' },
                  { text: 'Updated profile skills', time: '4 hours ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <TrendingUp className="w-5 h-5 text-gold mt-1" />
                    <div>
                      <p className="text-sm text-gray-300">{activity.text}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;