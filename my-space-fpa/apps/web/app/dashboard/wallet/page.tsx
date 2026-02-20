"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard, Button, Badge } from '@msf/ui';

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'withdraw'>('overview');

  const wallet = {
    balance_ngn: 245000.00,
    balance_usd: 520.50,
    balance_gbp: 180.00,
    balance_eur: 150.00,
    tier: 'TIER_2',
    daily_limit: 5000000.00,
    kyc_verified: true,
  };

  const transactions = [
    { id: '1', type: 'DEPOSIT', amount: 50000, currency: 'NGN', status: 'COMPLETED', date: '2026-02-20', from: 'Bank Transfer' },
    { id: '2', type: 'ESCROW_RELEASE', amount: 120000, currency: 'NGN', status: 'COMPLETED', date: '2026-02-19', from: 'Project: E-commerce App' },
    { id: '3', type: 'WITHDRAWAL', amount: 75000, currency: 'NGN', status: 'PROCESSING', date: '2026-02-18', to: 'Access Bank ****1234' },
    { id: '4', type: 'TRANSFER', amount: 25000, currency: 'NGN', status: 'COMPLETED', date: '2026-02-17', from: 'MSF12345678C' },
    { id: '5', type: 'COMMISSION', amount: 12000, currency: 'NGN', status: 'COMPLETED', date: '2026-02-17', description: 'Platform commission (10%)' },
  ];

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'PROCESSING': return 'warning';
      case 'PENDING': return 'info';
      case 'FAILED': return 'danger';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout title="Wallet">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Wallet & Payments</h1>
            <p className="text-msf-mist">Manage your earnings, withdrawals, and transactions</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" icon="📊">Statement</Button>
            <Button variant="primary" icon="💳">Add Funds</Button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="p-6 bg-gradient-to-br from-msf-cosmic-purple/20 to-msf-neon-cyan/20 border-msf-cosmic-purple/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-msf-mist">NGN Balance</span>
              <Badge variant="info">Primary</Badge>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {formatCurrency(wallet.balance_ngn, 'NGN')}
            </div>
            <div className="text-xs text-msf-mist">≈ ${wallet.balance_usd.toFixed(2)} USD</div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-msf-mist">USD Balance</span>
              <span className="text-xs text-msf-mist">🇺🇸</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {formatCurrency(wallet.balance_usd, 'USD')}
            </div>
            <div className="text-xs text-msf-mist">≈ ₦{(wallet.balance_usd * 470).toFixed(2)}</div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-msf-mist">GBP Balance</span>
              <span className="text-xs text-msf-mist">🇬🇧</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {formatCurrency(wallet.balance_gbp, 'GBP')}
            </div>
            <div className="text-xs text-msf-mist">≈ ₦{(wallet.balance_gbp * 590).toFixed(2)}</div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-msf-mist">EUR Balance</span>
              <span className="text-xs text-msf-mist">🇪🇺</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {formatCurrency(wallet.balance_eur, 'EUR')}
            </div>
            <div className="text-xs text-msf-mist">≈ ₦{(wallet.balance_eur * 510).toFixed(2)}</div>
          </GlassCard>
        </div>

        {/* Wallet Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 rounded-2xl bg-msf-elevation-1/50 border border-white/5 hover:border-msf-cosmic-purple/30 transition-all group">
                <div className="text-2xl mb-2">💸</div>
                <div className="text-xs text-msf-mist group-hover:text-white transition-colors">Withdraw</div>
              </button>
              <button className="p-4 rounded-2xl bg-msf-elevation-1/50 border border-white/5 hover:border-msf-cosmic-purple/30 transition-all group">
                <div className="text-2xl mb-2">💳</div>
                <div className="text-xs text-msf-mist group-hover:text-white transition-colors">Deposit</div>
              </button>
              <button className="p-4 rounded-2xl bg-msf-elevation-1/50 border border-white/5 hover:border-msf-cosmic-purple/30 transition-all group">
                <div className="text-2xl mb-2">🔄</div>
                <div className="text-xs text-msf-mist group-hover:text-white transition-colors">Transfer</div>
              </button>
              <button className="p-4 rounded-2xl bg-msf-elevation-1/50 border border-white/5 hover:border-msf-cosmic-purple/30 transition-all group">
                <div className="text-2xl mb-2">💱</div>
                <div className="text-xs text-msf-mist group-hover:text-white transition-colors">Convert</div>
              </button>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Wallet Tier</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="ai">Tier 2</Badge>
                <span className="text-xs text-msf-mist">Verified</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">₦5,000,000</div>
              <div className="text-xs text-msf-mist">Daily Limit</div>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-msf-cosmic-purple to-msf-neon-cyan w-[35%]" />
            </div>
            <div className="text-xs text-msf-mist mt-2">₦1,750,000 used today</div>
          </GlassCard>
        </div>

        {/* Transactions Table */}
        <GlassCard className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-msf-mist uppercase tracking-widest border-b border-white/5">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Details</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-msf-elevation-2 flex items-center justify-center">
                          {tx.type === 'DEPOSIT' && '💳'}
                          {tx.type === 'WITHDRAWAL' && '💸'}
                          {tx.type === 'TRANSFER' && '🔄'}
                          {tx.type === 'ESCROW_RELEASE' && '✅'}
                          {tx.type === 'COMMISSION' && '📊'}
                        </div>
                        <span className="text-white font-medium">{tx.type.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-white font-bold">
                        {tx.type === 'COMMISSION' ? '-' : '+'}{formatCurrency(tx.amount, tx.currency)}
                      </span>
                    </td>
                    <td className="py-4 text-msf-mist">
                      {tx.from || tx.to || tx.description}
                    </td>
                    <td className="py-4 text-msf-mist">{tx.date}</td>
                    <td className="py-4">
                      <Badge variant={getStatusColor(tx.status)} size="sm">
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
