// import React from 'react';
import { Globe as Briefcase, Shield, Users } from 'lucide-react';
// GlobeAfrica,

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {/* <nav className="bg-secondary-light py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GlobeAfrica className="w-8 h-8 text-primary" />
            <span className="text-2xl font-display font-bold text-primary">AfriJob</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-primary transition-colors">How it Works</a>
            <a href="#testimonials" className="text-gray-300 hover:text-primary transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn-secondary">Log In</button>
            <button className="btn-primary">Sign Up</button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="relative bg-secondary-light">
        <div className="container section flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-display font-bold">
              <span className="text-primary">Empowering</span> African Talent in the Web3 Space
            </h1>
            <p className="text-lg text-gray-400">
              Connect with top African talent and opportunities in blockchain, DeFi, and Web3 development. 
              Secure, transparent, and powered by blockchain technology.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary">Find Talent</button>
              <button className="btn-secondary">Post a Job</button>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              alt="African professionals collaborating"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-secondary">
        <div className="container section">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Why Choose <span className="text-primary">AfriJob</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12 text-primary" />,
                title: "Secure Payments",
                description: "Smart contract escrow system ensures safe and transparent transactions for all parties."
              },
              {
                icon: <Users className="w-12 h-12 text-primary" />,
                title: "On-chain Reputation",
                description: "Build and verify your professional reputation with blockchain-backed credentials."
              },
              {
                icon: <Briefcase className="w-12 h-12 text-primary" />,
                title: "Quality Opportunities",
                description: "Access high-quality Web3 projects and top African talent in one place."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-secondary-light p-6 rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
