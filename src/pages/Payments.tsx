import React from 'react';
import { CreditCard } from 'lucide-react';

export const Payments: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
          <CreditCard size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Payments</h1>
          <p className="text-sm text-gray-400 mt-1">Track transactions and billing history.</p>
        </div>
      </div>
      
      <div className="glass-panel rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <CreditCard size={48} className="text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-300 mb-2">Payments & Billing</h3>
        <p className="text-gray-500 max-w-md">
          This section is currently under development. Soon you'll be able to manage invoices, view payment gateways, and handle refunds here.
        </p>
      </div>
    </div>
  );
};
