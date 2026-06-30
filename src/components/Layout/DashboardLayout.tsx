import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppSelector } from '../../store/hooks';

export const DashboardLayout: React.FC = () => {
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  return (
    <div className="flex min-h-screen bg-[#111111]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        {/* Mobile Sidebar overlay */}
        <div className="lg:hidden">
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 flex">
              <div className="fixed inset-0 bg-black/50" />
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#111111]">
                <Sidebar />
              </div>
            </div>
          )}
        </div>

        <main className="flex-1 overflow-y-auto bg-[#111111]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
