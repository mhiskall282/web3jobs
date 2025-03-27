// import React from 'react';
import { Search, Filter, Briefcase } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Smart Contract Developer',
    company: 'DeFi Protocol',
    location: 'Remote',
    type: 'Full-time',
    salary: '$80k - $120k',
    skills: ['Solidity', 'Web3.js', 'React'],
    posted: '2 days ago',
    description: 'Looking for an experienced smart contract developer to build and audit DeFi protocols.',
  },
  {
    id: 2,
    title: 'Blockchain Frontend Engineer',
    company: 'NFT Marketplace',
    location: 'Remote',
    type: 'Contract',
    salary: '$70k - $90k',
    skills: ['React', 'TypeScript', 'Web3'],
    posted: '1 week ago',
    description: 'Join our team to build the next generation NFT marketplace interface.',
  },
  {
    id: 3,
    title: 'Full Stack Web3 Developer',
    company: 'Crypto Exchange',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90k - $130k',
    skills: ['Node.js', 'React', 'Solidity'],
    posted: '3 days ago',
    description: 'Build and maintain our decentralized exchange platform.',
  },
];

export const JobListings = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-display font-bold mb-8">Web3 Job Opportunities</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 bg-secondary-light border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-secondary-light p-6 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                  <span>{job.company}</span>
                  <span>{job.location}</span>
                  <span>{job.type}</span>
                  <span className="text-primary font-semibold">{job.salary}</span>
                </div>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary rounded-full text-sm text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <button className="btn-primary flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Apply Now
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <span className="text-sm text-gray-400">Posted {job.posted}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};