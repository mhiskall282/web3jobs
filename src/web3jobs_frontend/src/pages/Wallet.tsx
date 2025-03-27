// import React from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, RefreshCw, Copy, ExternalLink } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

const transactions = [
  {
    id: 1,
    type: 'received',
    amount: 2500,
    from: '0x1234...5678',
    to: '0xabcd...efgh',
    date: '2024-03-10T14:30:00',
    status: 'completed',
    currency: 'ETH',
  },
  {
    id: 2,
    type: 'sent',
    amount: 1800,
    from: '0xabcd...efgh',
    to: '0x8765...4321',
    date: '2024-03-09T09:15:00',
    status: 'completed',
    currency: 'USDC',
  },
  {
    id: 3,
    type: 'received',
    amount: 3200,
    from: '0x9876...5432',
    to: '0xabcd...efgh',
    date: '2024-03-08T16:45:00',
    status: 'pending',
    currency: 'ETH',
  },
];

const tokens = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 2.5,
    value: 5000,
    change: 3.2,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: 3000,
    value: 3000,
    change: 0,
  },
  {
    symbol: 'AFRI',
    name: 'AfriJob Token',
    balance: 1000,
    value: 2000,
    change: -1.5,
  },
];

export const Wallet = () => {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Wallet Overview */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <WalletIcon className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Wallet Balance</h2>
                  <p className="text-gray-400">Connected to MetaMask</p>
                </div>
              </div>
              <button className="btn-secondary flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-gray-400">Total Balance</p>
                <p className="text-2xl font-semibold">{formatCurrency(10000)}</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-gray-400">Wallet Address</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono">0xabcd...efgh</p>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Token Balances */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Token Balances</h2>
            <div className="space-y-4">
              {tokens.map((token) => (
                <div key={token.symbol} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold">{token.symbol}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{token.name}</p>
                      <p className="text-sm text-gray-400">{token.balance} {token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(token.value)}</p>
                    <p className={`text-sm ${token.change >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                      {token.change >= 0 ? '+' : ''}{token.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'received' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'
                    }`}>
                      {tx.type === 'received' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {tx.type === 'received' ? 'Received' : 'Sent'} {tx.currency}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{tx.type === 'received' ? 'From:' : 'To:'}</span>
                        <span className="font-mono">{tx.type === 'received' ? tx.from : tx.to}</span>
                        <ExternalLink className="w-4 h-4 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {tx.type === 'received' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                    <p className={`text-sm ${tx.status === 'completed' ? 'text-accent-green' : 'text-primary'}`}>
                      {tx.status === 'completed' ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          <div className="bg-secondary-light p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="btn-primary py-4">Send</button>
              <button className="btn-secondary py-4">Receive</button>
              <button className="btn-secondary py-4">Swap</button>
              <button className="btn-secondary py-4">Bridge</button>
            </div>
          </div>

          {/* Network Status */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Network Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Network</span>
                <span className="font-semibold">Ethereum Mainnet</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Gas Price</span>
                <span className="font-semibold">25 Gwei</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Block Height</span>
                <span className="font-semibold">#18,245,678</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
