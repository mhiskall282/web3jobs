import React from 'react';
import { Vote, TrendingUp, Users, AlertCircle, CheckCircle, XCircle, Coins, Scale } from 'lucide-react';

const proposals = [
  {
    id: 1,
    title: 'Increase Staking Rewards Distribution',
    description: 'Raise staking rewards from 50% to 70% of platform fees to benefit long-term AFRI holders',
    status: 'active',
    votes: { for: 250000, against: 150000, abstain: 50000 },
    deadline: '2024-04-25',
    proposer: { address: '0xaf12...be45', name: 'Community DAO' }
  },
  {
    id: 2,
    title: 'Implement Skill Verification DAO',
    description: 'Create decentralized skill validation through peer reviews and project milestones',
    status: 'passed',
    votes: { for: 420000, against: 80000, abstain: 30000 },
    deadline: '2024-04-18',
    proposer: { address: '0xtech...789a', name: 'Tech Council' }
  },
  {
    id: 3,
    title: 'Lower Freelancer Stake Requirement',
    description: 'Reduce minimum stake from 1000 AFRI to 500 AFRI for new members',
    status: 'failed',
    votes: { for: 180000, against: 220000, abstain: 40000 },
    deadline: '2024-04-10',
    proposer: { address: '0xfree...1234', name: 'Freelancer Guild' }
  }
];

const stats = [
  { label: 'Total Value Locked', value: '$5.2M', change: '+18.4%', icon: TrendingUp },
  { label: 'Active Voters', value: '2,891', change: '+7.1%', icon: Users },
  { label: 'Proposals Created', value: '68', change: '+12.3%', icon: Vote }
];

export const Governance = () => {
  return (
    <div className="bg-black text-gold min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-orange-500 bg-clip-text text-transparent">
            Community Governance
          </h1>
          <p className="text-xl text-gray-300">
            Shape the future of AfroTalent through decentralized decision-making
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Proposals Section */}
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Scale className="w-8 h-8 text-gold" />
                Active Proposals
              </h2>
              <div className="space-y-6">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="bg-gray-900 rounded-xl border border-gold/20 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{proposal.title}</h3>
                        <p className="text-gray-300">{proposal.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        proposal.status === 'active' ? 'bg-gold/10 text-gold' :
                        proposal.status === 'passed' ? 'bg-green-500/10 text-green-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </span>
                    </div>

                    {/* Voting Progress */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Consensus</span>
                          <span className="text-gold">
                            {((proposal.votes.for / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-2 bg-gold rounded-full" 
                            style={{ width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100}%` }} />
                          <div className="h-2 bg-red-500 rounded-full" 
                            style={{ width: `${(proposal.votes.against / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100}%` }} />
                          <div className="h-2 bg-gray-600 rounded-full" 
                            style={{ width: `${(proposal.votes.abstain / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100}%` }} />
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                          <span className="text-gold">{proposal.votes.for.toLocaleString()} For</span>
                          <span className="text-red-500">{proposal.votes.against.toLocaleString()} Against</span>
                          <span className="text-gray-400">{proposal.votes.abstain.toLocaleString()} Abstain</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <span>Proposed by</span>
                          <span className="font-mono text-gold">{proposal.proposer.address}</span>
                          <span className="text-gold">{proposal.proposer.name}</span>
                        </div>
                        <span>Deadline: {proposal.deadline}</span>
                      </div>

                      {proposal.status === 'active' && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <button className="w-full bg-gold/10 hover:bg-gold/20 text-gold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                            <CheckCircle className="w-5 h-5" /> Vote For
                          </button>
                          <button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                            <XCircle className="w-5 h-5" /> Vote Against
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Governance Stats */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <h2 className="text-2xl font-bold mb-6">Network Status</h2>
              <div className="space-y-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-semibold">{stat.value}</p>
                          <span className="text-sm text-green-500">{stat.change}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Voting Power */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <h2 className="text-2xl font-bold mb-6">Your Governance Power</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">AFRI Balance</span>
                    <span className="font-semibold">8,420 AFRI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Voting Power</span>
                    <span className="font-semibold text-gold">84 Votes</span>
                  </div>
                </div>
                <button className="w-full bg-gold/10 hover:bg-gold/20 text-gold py-3 rounded-lg transition-all">
                  Increase Stake
                </button>
              </div>
            </section>

            {/* Governance Rules */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <div className="flex items-center gap-2 text-gold mb-4">
                <AlertCircle className="w-6 h-6" />
                <h2 className="text-xl font-bold">Governance Rules</h2>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-gold" />
                  Minimum 1,000 AFRI to propose
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-gold" />
                  60% approval required
                </li>
                <li className="flex items-center gap-2">
                  <Vote className="w-5 h-5 text-gold" />
                  3-day minimum voting period
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gold" />
                  Quadratic voting weights
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};