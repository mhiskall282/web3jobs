import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen';
import { Briefcase, Shield, Users, Globe, Lock, Coins, Code, Medal } from 'lucide-react';
import AfricanPattern from '../../assets/african-pattern.png';


const LandingPage = () => {
  const { isAuthenticated, isLoading, login, userProfile } = useAuth();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   // If user is authenticated and has a profile, redirect to appropriate dashboard
  //   if (isAuthenticated && userProfile) {
  //     if (userProfile.role === "Freelancer") {
  //       navigate('/freelancer-dashboard');
  //     } else if (userProfile.role === "Recruiter") {
  //       navigate('/recruiter-dashboard');
  //     }
  //   } else if (isAuthenticated && !userProfile) {
  //     // If authenticated but no profile, redirect to profile creation
  //     navigate('/create-profile');
  //   }
  // }, [isAuthenticated, userProfile, navigate]);
  useEffect(() => {
    // Only redirect if authenticated and has a profile
    if (isAuthenticated && userProfile) {
      if (userProfile.role === "Freelancer") {
        navigate('/freelancer-dashboard');
      } else if (userProfile.role === "Recruiter") {
        navigate('/recruiter-dashboard');
      }
    }
  }, [isAuthenticated, userProfile, navigate]);
  
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  const features = [
    { 
      icon: <Globe className="w-12 h-12 text-gold"/>,
      title: "Pan-African Reach",
      description: "Connect with opportunities from Lagos to Nairobi in our unified Web3 space"
    },
    {
      icon: <Lock className="w-12 h-12 text-gold"/>,
      title: "Crypto-Secured",
      description: "Smart contract escrow & multi-chain payments in ICP, BTC, ETH"
    },
    {
      icon: <Code className="w-12 h-12 text-gold"/>,
      title: "Skill Verification",
      description: "On-chain proof of work & decentralized skill badges"
    }
  ];
  
  return (
    // style={{ backgroundImage: `url(${AfricanPattern})` }}
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gold to-orange-500 bg-clip-text text-transparent">
            Worka
          </h1>
          <p className="text-xl md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Africa's Decentralized Gateway to Web3 Opportunities
          </p>
          
          <div className="flex justify-center gap-6 mb-24">
            <button 
              onClick={login}
              className="bg-gold hover:bg-gold-dark text-black font-bold py-4 px-8 rounded-lg transition-all"
            >
              Start Earning
            </button>
            <button
              onClick={login}
              className="border-2 border-gold hover:bg-gold/10 text-gold font-bold py-4 px-8 rounded-lg transition-all"
            >
              Hire Talent
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-xl">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12">Web3-Native Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Internet Identity', 'Plug Wallet', 'MetaMask', 'NFID'].map((method) => (
              <div 
                key={method}
                className="p-6 border border-gold/30 rounded-xl hover:bg-gold/5 cursor-pointer transition-all"
              >
                <Medal className="w-8 h-8 text-gold mx-auto mb-4"/>
                <span className="text-gray-300">{method}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAO Governance Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Community-Powered Ecosystem</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div className="bg-gray-900 p-8 rounded-xl">
              <Coins className="w-12 h-12 text-gold mb-6"/>
              <h3 className="text-2xl font-bold mb-4">Earn Governance Tokens</h3>
              <p className="text-gray-400">
                Participate in platform decisions and earn rewards through our DAO structure
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <Users className="w-12 h-12 text-gold mb-6"/>
              <h3 className="text-2xl font-bold mb-4">Freelancer Collectives</h3>
              <p className="text-gray-400">
                Form decentralized teams with other African Web3 professionals
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;