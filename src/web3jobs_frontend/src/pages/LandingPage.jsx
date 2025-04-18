import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen';
import { Briefcase, Shield, Users, Globe, Lock, Coins, Code, Medal } from 'lucide-react';

const LandingPage = () => {
  const { isAuthenticated, isLoading, login, userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      if (userProfile.role === "Freelancer") {
        navigate('/freelancer-dashboard');
      } else if (userProfile.role === "Recruiter") {
        navigate('/recruiter-dashboard');
      }
    }
  }, [isAuthenticated, userProfile, navigate]);

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

  const faqItems = [
    {
      question: "Is Worka only for Web3 professionals?",
      answer: "While we specialize in Web3 opportunities, we welcome all African digital professionals looking to transition into blockchain technologies."
    },
    {
      question: "Which payment methods are supported?",
      answer: "We support Bitcoin, Ethereum, Internet Computer (ICP), and stablecoins. Fiat options coming Q1 2024."
    },
    {
      question: "How do you protect my earnings?",
      answer: "All contracts use smart escrow systems with 2/3 multisig dispute resolution handled by verified DAO members."
    },
    {
      question: "What makes Worka different?",
      answer: "First platform built on ICP with true African context - supporting local languages and mobile-first access."
    }
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black-600 text-white">
      {/* Enhanced Hero Section */}
      <section className="relative py-[120px] px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gold to-orange-500 bg-clip-text text-transparent">
            Empower Your Tech Career Across Africa & Beyond
          </h1>
          <p className="text-sm md:text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join Africa's Premier Web3 Talent Marketplace - Get Paid in Crypto, Build Verifiable Credentials, 
            and Connect with Blockchain Opportunities Continent-Wide
          </p>

          <div className="flex justify-center gap-6 mb-24">
            <button 
              onClick={login}
              className="bg-gold hover:bg-gold-dark text-black font-bold py-4 px-8 rounded-lg transition-all"
            >
              Start Earning Now
            </button>
            <button
              onClick={login}
              className="border-2 border-gold hover:bg-gold/10 text-gold font-bold py-4 px-8 rounded-lg transition-all"
            >
              Hire Top Talent
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-all">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by African Tech Leaders</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Tripled my Web3 consulting clients across Africa in 2 weeks",
              "Found 4 top Solidity developers for our NFT startup in 72 hours",
              "Finally a platform that understands African tech potential"
            ].map((text, index) => (
              <div key={index} className="p-6 border-l-4 border-gold bg-gray-800/50 text-left">
                <p className="text-gray-300 italic">"{text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing Authentication Section */}
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

      {/* Enhanced FAQ Section */}
      <section className="py-24 px-6 bg-black-600">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Your Questions Answered</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <div key={index} className="p-8 bg-gray-900 rounded-xl border border-gold/20 hover:border-gold/50 transition-all">
                <h3 className="text-xl font-bold mb-3 text-gold">{item.question}</h3>
                <p className="text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiter CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold/20 to-orange-500/20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <div className="bg-black-600 p-12 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Access Africa's Top 1% Tech Talent</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Source verified developers and blockchain experts with African market expertise. 
              Only pay for delivered milestones through our smart contract system.
            </p>
            <button
              onClick={login}
              className="bg-gold hover:bg-gold-dark text-black font-bold py-4 px-8 rounded-lg transition-all"
            >
              Post Opportunity (Zero Fees)
            </button>
          </div>
        </div>
      </section>

      {/* Existing DAO Governance Section remains unchanged */}
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