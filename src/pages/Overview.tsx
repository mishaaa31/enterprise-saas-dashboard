import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export const Overview: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
          <LayoutDashboard size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-sm text-gray-400 mt-1">High-level summary of your business performance.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {['Total Revenue', 'Active Users', 'New Subscriptions'].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-xl">
            <h4 className="text-sm font-medium text-gray-400 mb-2">{stat}</h4>
            <div className="text-3xl font-bold text-white">
              {i === 0 ? '$124,563' : i === 1 ? '14,231' : '892'}
            </div>
            <div className="text-sm text-emerald-400 mt-2 flex items-center gap-1">
              <span>↑</span> 12% from last month
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
        <LayoutDashboard size={48} className="text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-300 mb-2">Detailed Overview</h3>
        <p className="text-gray-500 max-w-md">
          More detailed overview widgets and charts will be placed here soon.
        </p>
      </div>
    </div>
  );
};
