import React from 'react';
import { Users } from 'lucide-react';

export const Customers: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
          <Users size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Customers</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your customer database and profiles.</p>
        </div>
      </div>
      
      <div className="glass-panel rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <Users size={48} className="text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-300 mb-2">Customer Module</h3>
        <p className="text-gray-500 max-w-md">
          This section is currently under development. Soon you'll be able to view detailed customer profiles, activity history, and communication logs here.
        </p>
      </div>
    </div>
  );
};
