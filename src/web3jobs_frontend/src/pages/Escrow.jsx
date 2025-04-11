import React from 'react';
import { Shield, Clock, CheckCircle, AlertTriangle, ArrowRight, Lock, HandCoins, Users } from 'lucide-react';

const escrowContracts = [
  {
    id: 1,
    project: 'DeFi Dashboard Development',
    client: 'CryptoTech Solutions',
    amount: 3000,
    status: 'active',
    milestones: [
      { id: 1, title: 'Frontend Implementation', amount: 1000, status: 'released' },
      { id: 2, title: 'Smart Contract Integration', amount: 1000, status: 'locked' },
      { id: 3, title: 'Testing & Deployment', amount: 1000, status: 'pending' },
    ],
    deadline: '2024-03-25',
    contractAddress: '0x1234...5678',
  },
  {
    id: 2,
    project: 'NFT Marketplace Development',
    client: 'Digital Arts DAO',
    amount: 5000,
    status: 'dispute',
    milestones: [
      { id: 1, title: 'Smart Contract Development', amount: 2000, status: 'released' },
      { id: 2, title: 'Frontend Development', amount: 2000, status: 'dispute' },
      { id: 3, title: 'Launch & Marketing', amount: 1000, status: 'pending' },
    ],
    deadline: '2024-04-10',
    contractAddress: '0x8765...4321',
  }
];

const stats = [
  { label: 'Total Value Locked', value: '$12,000', change: '+15.3%' },
  { label: 'Active Contracts', value: '5', change: '+2' },
  { label: 'Completed Projects', value: '12', change: '+3' }
];

export const Escrow = () => {
  return (
    <div className="bg-black text-gold min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-orange-500 bg-clip-text text-transparent">
            Secure Escrow Management
          </h1>
          <p className="text-xl text-gray-300">
            Blockchain-powered payment protection for Web3 collaborations
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Contracts */}
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Lock className="w-8 h-8 text-gold" />
                Active Contracts
              </h2>
              <div className="space-y-6">
                {escrowContracts.map((contract) => (
                  <div key={contract.id} className="bg-gray-900 rounded-xl border border-gold/20 p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{contract.project}</h3>
                        <p className="text-gray-300">Client: {contract.client}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        contract.status === 'active' ? 'bg-gold/10 text-gold' :
                        contract.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm text-gray-400">Total Value</p>
                          <p className="text-xl font-semibold">${contract.amount}</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm text-gray-400">Deadline</p>
                          <p className="text-xl font-semibold">{contract.deadline}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Milestones</h4>
                        <div className="space-y-3">
                          {contract.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                              <div className="flex items-center gap-3">
                                {milestone.status === 'released' ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : milestone.status === 'dispute' ? (
                                  <AlertTriangle className="w-5 h-5 text-red-500" />
                                ) : (
                                  <Clock className="w-5 h-5 text-gold" />
                                )}
                                <span>{milestone.title}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-semibold">${milestone.amount}</span>
                                <span className={`text-sm ${
                                  milestone.status === 'released' ? 'text-green-500' :
                                  milestone.status === 'dispute' ? 'text-red-500' :
                                  'text-gold'
                                }`}>
                                  {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Shield className="w-5 h-5 text-gold" />
                          <span className="font-mono">{contract.contractAddress}</span>
                        </div>
                        <button className="bg-gold/10 hover:bg-gold/20 text-gold px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                          Details <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Escrow Stats */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <h2 className="text-2xl font-bold mb-6">Escrow Overview</h2>
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-xl font-semibold">{stat.value}</p>
                    </div>
                    <span className="text-sm text-green-500">{stat.change}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full bg-gold/10 hover:bg-gold/20 text-gold py-3 rounded-lg transition-all">
                  Create New Contract
                </button>
                <button className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-500 py-3 rounded-lg transition-all">
                  Release Payment
                </button>
                <button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 py-3 rounded-lg transition-all">
                  Raise Dispute
                </button>
              </div>
            </section>

            {/* Security Info */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <div className="flex items-center gap-2 text-gold mb-4">
                <Shield className="w-6 h-6" />
                <h2 className="text-xl font-bold">Security Assurance</h2>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gold" />
                  Audited smart contracts
                </li>
                <li className="flex items-center gap-2">
                  <HandCoins className="w-5 h-5 text-gold" />
                  Multi-sig transaction protection
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-gold" />
                  24h withdrawal cooldown
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gold" />
                  Community dispute resolution
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};