import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, DollarSign, Users, Clock, TrendingUp } from 'lucide-react';
import MyJobListings from '../components/MyJobListings';
import CreateJobListing from '../components/CreateJobListing';
import ProfileView from '../components/ProfileView';
import ProfileForm from '../components/ProfileForm';

const RecruiterDashboard = () => {
  const { userProfile, logout, backendActor } = useAuth();
  const [myJobs, setMyJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a complete profile
    const checkProfile = async () => {
      if (!userProfile) {
        navigate('/create-profile');
        return;
      }
      
      if (!userProfile.isComplete) {
        navigate('/recruiter-dashboard/profile');
      }
    };
    
    checkProfile();
  }, [userProfile, navigate]);
  
  useEffect(() => {
    const fetchMyJobs = async () => {
      if (!backendActor || !userProfile) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        const jobs = await backendActor.getAllJobListings();
        
        // Filter jobs created by this recruiter
        const filteredJobs = jobs.filter(job => 
          job.recruiterPrincipal.toString() === userProfile.principal.toString()
        );
        
        // Sort jobs by creation date (newest first)
        filteredJobs.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
        
        setMyJobs(filteredJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load your job listings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMyJobs();
  }, [backendActor, userProfile]);
  
  const handleRefreshJobs = () => {
    if (!backendActor || !userProfile) return;
    
    setIsLoading(true);
    backendActor.getAllJobListings()
      .then(jobs => {
        const filteredJobs = jobs.filter(job => 
          job.recruiterPrincipal.toString() === userProfile.principal.toString()
        );
        filteredJobs.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
        setMyJobs(filteredJobs);
        setError('');
      })
      .catch(err => {
        console.error('Error refreshing jobs:', err);
        setError('Failed to refresh job listings.');
      })
      .finally(() => setIsLoading(false));
  };

  const stats = [
    { label: 'Active Jobs', value: '4', icon: Briefcase },
    { label: 'Total Spent', value: '$25,000', icon: DollarSign },
    { label: 'Hired Freelancers', value: '12', icon: Users },
    { label: 'Avg. Time to Hire', value: '3.5 days', icon: Clock },
  ];

  const hiredFreelancers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Smart Contract Developer',
      rating: 4.9,
      projectCount: 3,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Frontend Developer',
      rating: 4.8,
      projectCount: 2,
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gold">
      {/* Enhanced Navigation */}
      {/* <nav className="bg-gray-900 border-b border-gold/20 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-gold to-orange-500 bg-clip-text text-transparent">
            AfroTalent
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/recruiter-dashboard" className="text-gray-300 hover:text-gold transition-colors">
              Jobs
            </Link>
            <Link to="/recruiter-dashboard/create-job" className="text-gray-300 hover:text-gold transition-colors">
              Post Job
            </Link>
            <Link to="/recruiter-dashboard/profile" className="text-gray-300 hover:text-gold transition-colors">
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
      </nav> */}

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
                    <h2 className="text-2xl font-bold">Active Job Postings</h2>
                    <Link 
                      to="/recruiter-dashboard/create-job"
                      className="bg-gold/10 hover:bg-gold/20 text-gold px-4 py-2 rounded-lg"
                    >
                      Post New Job
                    </Link>
                  </div>
                  <MyJobListings 
                    jobs={myJobs} 
                    isLoading={isLoading} 
                    backendActor={backendActor} 
                    onRefresh={handleRefreshJobs}
                  />
                </div>
              } />
              <Route path="/create-job" element={
                <CreateJobListing 
                  backendActor={backendActor} 
                  onSuccess={handleRefreshJobs}
                />
              } />
              <Route path="/profile" element={
                userProfile && !userProfile.isComplete ? (
                  <ProfileForm 
                    backendActor={backendActor} 
                    initialData={userProfile} 
                    userRole="Recruiter" 
                  />
                ) : (
                  <ProfileView 
                    profile={userProfile} 
                    backendActor={backendActor} 
                    onEdit={() => navigate('/recruiter-dashboard/edit-profile')} 
                  />
                )
              } />
              <Route path="/edit-profile" element={
                <ProfileForm 
                  backendActor={backendActor} 
                  initialData={userProfile} 
                  userRole="Recruiter" 
                  isEditing={true} 
                />
              } />
            </Routes>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <h2 className="text-xl font-bold mb-4">Hired Talent</h2>
              <div className="space-y-6">
                {hiredFreelancers.map((freelancer) => (
                  <div key={freelancer.id} className="flex items-center gap-4">
                    <img
                      src={freelancer.image}
                      alt={freelancer.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{freelancer.name}</h3>
                      <p className="text-sm text-gray-400">{freelancer.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-gold">
                        <span>★</span>
                        <span>{freelancer.rating}</span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {freelancer.projectCount} projects
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { text: 'New application for Smart Contract Developer', time: '1 hour ago' },
                  { text: 'Project milestone completed by Sarah', time: '3 hours ago' },
                  { text: 'New message from Michael Chen', time: '5 hours ago' },
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

export default RecruiterDashboard;