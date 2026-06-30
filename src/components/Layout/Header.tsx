import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu, LogOut, Bell, Search } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { useAppSelector } from '../../store/hooks';
import { toast } from 'sonner';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="h-16 bg-[#1A1A1A] border-b border-white/5 flex items-center justify-between px-4 lg:px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-gray-100">Orders</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-64 pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            placeholder="Search..."
          />
        </div>

        <button 
          onClick={() => toast.info('No new notifications')}
          className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors relative"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-blue-500 rounded-full border border-[#1A1A1A]"></span>
        </button>

        <div className="h-6 w-px bg-white/10"></div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-medium text-white">{user?.name}</span>
            <span className="text-xs text-gray-400">{user?.email}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 ml-1 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-gray-400 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
