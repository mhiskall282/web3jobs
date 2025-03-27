// import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, DollarSign, Star, Award, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

const stats = [
  { label: 'Active Projects', value: '3', icon: Briefcase },
  { label: 'Total Earnings', value: formatCurrency(12500), icon: DollarSign },
  { label: 'Average Rating', value: '4.8', icon: Star },
  { label: 'Completed Projects', value: '15', icon: Award },
];

const activeProjects = [
  {
    id: 1,
    title: 'DeFi Dashboard Development',
    client: 'CryptoTech Solutions',
    deadline: '2024-03-25',
    budget: 3000,
    progress: 65,
  },
  {
    id: 2,
    title: 'Smart Contract Integration',
    client: 'BlockChain Ventures',
    deadline: '2024-04-10',
    budget: 4500,
    progress: 30,
  },
  {
    id: 3,
    title: 'NFT Marketplace Frontend',
    client: 'Digital Arts DAO',
    deadline: '2024-03-15',
    budget: 2800,
    progress: 85,
  },
];

export const FreelancerDashboard = () => {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold">Freelancer Dashboard</h1>
        <Link to="/jobs" className="btn-primary">
          Find New Projects
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-secondary-light p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <Icon className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="bg-secondary-light p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-gray-400">{project.client}</p>
                  </div>
                  <span className="text-primary font-semibold">
                    {formatCurrency(project.budget)}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-gray-300">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Deadline</span>
                    <span className="text-gray-300">{project.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Skills Progress</h2>
          <div className="bg-secondary-light p-6 rounded-lg">
            <div className="space-y-4">
              {[
                { skill: 'Smart Contracts', progress: 85 },
                { skill: 'React/Web3.js', progress: 90 },
                { skill: 'DeFi Protocols', progress: 75 },
                { skill: 'Blockchain Security', progress: 70 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.skill}</span>
                    <span className="text-primary">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Recent Activity</h2>
          <div className="bg-secondary-light p-6 rounded-lg">
            <div className="space-y-4">
              {[
                { text: 'Completed milestone for DeFi Dashboard', time: '2 hours ago' },
                { text: 'Received 5-star rating from BlockChain Ventures', time: '1 day ago' },
                { text: 'Submitted proposal for NFT marketplace', time: '2 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <TrendingUp className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};