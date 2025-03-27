// import React from 'react';
import { Shield, Clock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

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
  },
  {
    id: 3,
    project: 'Token Bridge Implementation',
    client: 'Bridge Protocol',
    amount: 4000,
    status: 'completed',
    milestones: [
      { id: 1, title: 'Architecture Design', amount: 1000, status: 'released' },
      { id: 2, title: 'Smart Contract Development', amount: 2000, status: 'released' },
      { id: 3, title: 'Security Audit', amount: 1000, status: 'released' },
    ],
    deadline: '2024-03-15',
    contractAddress: '0x9876...5432',
  },
];

const stats = [
  {
    label: 'Total Value Locked',
    value: formatCurrency(12000),
    change: '+15.3%',
  },
  {
    label: 'Active Contracts',
    value: '5',
    change: '+2',
  },
  {
    label: 'Completed Projects',
    value: '12',
    change: '+3',
  },
];

export const Escrow = () => {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Escrow Contracts */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Escrow Contracts</h2>
            <div className="space-y-6">
              {escrowContracts.map((contract) => (
                <div key={contract.id} className="bg-secondary-light rounded-lg p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{contract.project}</h3>
                      <p className="text-gray-400">Client: {contract.client}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      contract.status === 'active' ? 'bg-primary/10 text-primary' :
                      contract.status === 'completed' ? 'bg-accent-green/10 text-accent-green' :
                      'bg-accent-red/10 text-accent-red'
                    }`}>
                      {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary p-4 rounded-lg">
                        <p className="text-sm text-gray-400">Total Value</p>
                        <p className="text-xl font-semibold">{formatCurrency(contract.amount)}</p>
                      </div>
                      <div className="bg-secondary p-4 rounded-lg">
                        <p className="text-sm text-gray-400">Deadline</p>
                        <p className="text-xl font-semibold">{contract.deadline}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Milestones</h4>
                      <div className="space-y-3">
                        {contract.milestones.map((milestone) => (
                          <div key={milestone.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                            <div className="flex items-center gap-3">
                              {milestone.status === 'released' ? (
                                <CheckCircle className="w-5 h-5 text-accent-green" />
                              ) : milestone.status === 'dispute' ? (
                                <AlertTriangle className="w-5 h-5 text-accent-red" />
                              ) : (
                                <Clock className="w-5 h-5 text-gray-400" />
                              )}
                              <span>{milestone.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">{formatCurrency(milestone.amount)}</span>
                              <span className={`text-sm ${
                                milestone.status === 'released' ? 'text-accent-green' :
                                milestone.status === 'dispute' ? 'text-accent-red' :
                                'text-gray-400'
                              }`}>
                                {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Shield className="w-4 h-4" />
                        <span>Contract:</span>
                        <span className="font-mono">{contract.contractAddress}</span>
                      </div>
                      <button className="btn-secondary flex items-center gap-2">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Escrow Stats */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Overview</h2>
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-xl font-semibold">{stat.value}</p>
                  </div>
                  <span className="text-sm text-accent-green">{stat.change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full btn-primary">Create New Contract</button>
              <button className="w-full btn-secondary">Release Payment</button>
              <button className="w-full btn-secondary">Raise Dispute</button>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Shield className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Security Information</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• All contracts are audited and secure</li>
              <li>• 24-hour waiting period for large withdrawals</li>
              <li>• Disputes handled by community mediators</li>
              <li>• Multi-sig protection for all transactions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
