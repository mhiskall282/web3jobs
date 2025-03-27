// import React from 'react';
import { Link } from 'react-router-dom';
import { Users, DollarSign, Briefcase, Clock, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

const stats = [
  { label: 'Active Jobs', value: '4', icon: Briefcase },
  { label: 'Total Spent', value: formatCurrency(25000), icon: DollarSign },
  { label: 'Hired Freelancers', value: '12', icon: Users },
  { label: 'Avg. Time to Hire', value: '3.5 days', icon: Clock },
];

const activeJobs = [
  {
    id: 1,
    title: 'Smart Contract Developer',
    applications: 15,
    views: 234,
    budget: 5000,
    posted: '5 days ago',
    status: 'Accepting Applications',
  },
  {
    id: 2,
    title: 'Web3 Frontend Engineer',
    applications: 8,
    views: 156,
    budget: 4000,
    posted: '3 days ago',
    status: 'Interviewing',
  },
  {
    id: 3,
    title: 'Blockchain Security Auditor',
    applications: 6,
    views: 89,
    budget: 6000,
    posted: '1 day ago',
    status: 'Accepting Applications',
  },
];

const hiredFreelancers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Smart Contract Developer',
    rating: 4.9,
    projectCount: 3,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Frontend Developer',
    rating: 4.8,
    projectCount: 2,
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export const ClientDashboard = () => {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold">Client Dashboard</h1>
        <Link to="/post-job" className="btn-primary">
          Post New Job
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
          <h2 className="text-xl font-semibold mb-4">Active Job Postings</h2>
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <div key={job.id} className="bg-secondary-light p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-gray-400">Posted {job.posted}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {job.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Applications</p>
                    <p className="text-lg font-semibold">{job.applications}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Views</p>
                    <p className="text-lg font-semibold">{job.views}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Budget</p>
                    <p className="text-lg font-semibold text-primary">
                      {formatCurrency(job.budget)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/jobs/${job.id}`} className="btn-secondary text-sm">
                    View Applications
                  </Link>
                  <button className="btn-secondary text-sm">
                    Edit Posting
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Hired Freelancers</h2>
          <div className="bg-secondary-light p-6 rounded-lg">
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
                    <div className="flex items-center gap-1 text-primary">
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

          <h2 className="text-xl font-semibold mt-8 mb-4">Recent Activity</h2>
          <div className="bg-secondary-light p-6 rounded-lg">
            <div className="space-y-4">
              {[
                { text: 'New application for Smart Contract Developer', time: '1 hour ago' },
                { text: 'Project milestone completed by Sarah', time: '3 hours ago' },
                { text: 'New message from Michael Chen', time: '5 hours ago' },
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