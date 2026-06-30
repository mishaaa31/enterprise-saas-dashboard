import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3,
  CreditCard
} from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/overview' },
  { icon: ShoppingCart, label: 'Orders', path: '/' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  return (
    <aside
      className={cn(
        "bg-transparent border-r border-white/5 backdrop-blur-md transition-all duration-300 flex flex-col h-[calc(100vh-4rem)] lg:h-screen lg:sticky top-0",
        sidebarOpen ? "w-64" : "w-0 lg:w-20 overflow-hidden"
      )}
    >
      <div className="h-16 flex items-center justify-center border-b border-white/5 bg-[#1A1A1A] lg:bg-transparent">
        <div className="flex items-center gap-2 text-blue-500 font-bold text-xl">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard size={20} />
          </div>
          {sidebarOpen && <span className="text-white">Acme Inc</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                isActive 
                  ? "bg-blue-500/10 text-blue-400" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} className={cn(
                "flex-shrink-0 transition-colors",
              )} />
              {sidebarOpen && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5">
        <div className={cn(
          "bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
          !sidebarOpen && "hidden"
        )}>
          <p className="text-sm text-gray-200 font-medium mb-1">Need help?</p>
          <p className="text-xs text-gray-400 mb-3">Please check our docs</p>
          <button 
            onClick={() => toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
              loading: 'Loading documentation...',
              success: 'Documentation loaded successfully!',
              error: 'Error loading docs'
            })}
            className="w-full py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 rounded-lg text-xs font-medium text-blue-400 transition-all shadow-[0_0_15px_rgba(37,99,235,0.1)]"
          >
            Documentation
          </button>
        </div>
      </div>
    </aside>
  );
};
