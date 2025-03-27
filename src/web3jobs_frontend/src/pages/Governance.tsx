// import React from 'react';
import { Vote, TrendingUp, Users, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const proposals = [
  {
    id: 1,
    title: 'Increase Platform Fee Distribution to Stakers',
    description: 'Proposal to increase the percentage of platform fees distributed to AFRI token stakers from 50% to 70%.',
    status: 'active',
    votes: {
      for: 125000,
      against: 75000,
      abstain: 25000,
    },
    deadline: '2024-03-20',
    proposer: {
      address: '0x1234...5678',
      name: 'Community DAO',
    },
  },
  {
    id: 2,
    title: 'Add New Skill Verification System',
    description: 'Implement on-chain skill verification through peer reviews and completed projects.',
    status: 'passed',
    votes: {
      for: 180000,
      against: 20000,
      abstain: 10000,
    },
    deadline: '2024-03-15',
    proposer: {
      address: '0x8765...4321',
      name: 'Tech Council',
    },
  },
  {
    id: 3,
    title: 'Reduce Minimum Stake Requirement',
    description: 'Lower the minimum stake requirement for freelancers from 1000 AFRI to 500 AFRI.',
    status: 'failed',
    votes: {
      for: 90000,
      against: 110000,
      abstain: 15000,
    },
    deadline: '2024-03-10',
    proposer: {
      address: '0x9876...5432',
      name: 'Freelancer Guild',
    },
  },
];

const stats = [
  {
    label: 'Total Value Locked',
    value: '$2.5M',
    change: '+12.5%',
    icon: TrendingUp,
  },
  {
    label: 'Active Voters',
    value: '1,234',
    change: '+5.2%',
    icon: Users,
  },
  {
    label: 'Proposals Created',
    value: '45',
    change: '+8.7%',
    icon: Vote,
  },
];

export const Governance = () => {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Proposals */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Governance Proposals</h2>
            <div className="space-y-6">
              {proposals.map((proposal) => (
                <div key={proposal.id} className="bg-secondary-light rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{proposal.title}</h3>
                      <p className="text-gray-400">{proposal.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      proposal.status === 'active' ? 'bg-primary/10 text-primary' :
                      proposal.status === 'passed' ? 'bg-accent-green/10 text-accent-green' :
                      'bg-accent-red/10 text-accent-red'
                    }`}>
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Votes</span>
                        <span className="text-primary">
                          {((proposal.votes.for / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100).toFixed(1)}% Approval
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-2 bg-accent-green rounded-full" style={{
                          width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100}%`
                        }} />
                        <div className="h-2 bg-accent-red rounded-full" style={{
                          width: `${(proposal.votes.against / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100}%`
                        }} />
                        <div className="h-2 bg-gray-600 rounded-full" style={{
                          width: `${(proposal.votes.abstain / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100}%`
                        }} />
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-accent-green">{proposal.votes.for.toLocaleString()} For</span>
                        <span className="text-accent-red">{proposal.votes.against.toLocaleString()} Against</span>
                        <span className="text-gray-400">{proposal.votes.abstain.toLocaleString()} Abstain</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>Proposed by</span>
                        <span className="font-mono">{proposal.proposer.address}</span>
                        <span className="text-primary">{proposal.proposer.name}</span>
                      </div>
                      <div className="text-gray-400">
                        Deadline: {proposal.deadline}
                      </div>
                    </div>

                    {proposal.status === 'active' && (
                      <div className="flex gap-4">
                        <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" /> Vote For
                        </button>
                        <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                          <XCircle className="w-4 h-4" /> Vote Against
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Governance Stats */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Governance Overview</h2>
            <div className="space-y-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-semibold">{stat.value}</p>
                        <span className="text-sm text-accent-green">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Your Voting Power */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Your Voting Power</h2>
            <div className="space-y-4">
              <div className="bg-secondary p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">AFRI Balance</span>
                  <span className="font-semibold">5,000 AFRI</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Voting Power</span>
                  <span className="font-semibold text-primary">50 Votes</span>
                </div>
              </div>
              <button className="w-full btn-primary">
                Stake More AFRI
              </button>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <div className="flex items-center gap-2 text-primary mb-4">
              <AlertCircle className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Important Information</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Minimum 1000 AFRI required to create proposals</li>
              <li>• Voting power is proportional to staked AFRI</li>
              <li>• Proposals need 60% approval to pass</li>
              <li>• 3-day minimum voting period</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
