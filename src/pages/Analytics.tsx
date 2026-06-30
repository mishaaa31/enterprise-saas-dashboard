import React from 'react';
import { BarChart3 } from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
          <BarChart3 size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Analytics</h1>
          <p className="text-sm text-gray-400 mt-1">View comprehensive business reports and charts.</p>
        </div>
      </div>
      
      <div className="glass-panel rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <BarChart3 size={48} className="text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-300 mb-2">Analytics Dashboard</h3>
        <p className="text-gray-500 max-w-md">
          This section is currently under development. Soon you'll be able to see MRR, churn rate, and detailed revenue charts here.
        </p>
      </div>
    </div>
  );
};
