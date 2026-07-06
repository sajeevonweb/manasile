import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '@/core/store/useStore';
import { Home, FileText, BarChart3, Menu,PanelLeftClose,MoreHorizontal  } from 'lucide-react';
import logo from "@/assets/images/logo.svg";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { currentUserId } = useStore();
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  if (!currentUserId) {
    return <>{children}</>;
  }

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/assessments', icon: FileText, label: 'Assessments' },
    { path: '/results', icon: BarChart3, label: 'Results' },
    { path: '/more', icon: MoreHorizontal, label: 'More' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Side Navigation */}
      <aside
        className={`hidden md:flex md:flex-col fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          sidebarExpanded ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo/Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {sidebarExpanded ? (
            <>
              <img
                src={logo}
                className="w-40 h-16"
              />
              <button
                onClick={() => setSidebarExpanded(false)}
                className="p-2 rounded-lg hover:bg-gray-200 bg-gray-100"
              >
                <PanelLeftClose className="w-5 h-5 text-gray-600" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarExpanded(true)}
              className="p-2 rounded-lg hover:bg-gray-100 mx-auto"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center h-14 mx-2 my-1 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-cyan-100 text-cyan-600'
                    : 'text-gray-600 hover:bg-gray-100'
                } ${sidebarExpanded ? 'px-4' : 'justify-center'}`}
              >
                <Icon className="w-6 h-6 flex-shrink-0" />
                {sidebarExpanded && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Version Badge */}
        <div className={`py-4 border-t border-gray-100 flex ${sidebarExpanded ? 'justify-start px-5' : 'justify-center'}`}>
          {sidebarExpanded ? (
            <span className="text-xs text-gray-400 font-mono">
              v{__APP_VERSION__}
            </span>
          ) : (
            <span
              className="text-[10px] text-gray-400 font-mono leading-tight text-center"
              title={`v${__APP_VERSION__}`}
            >
              v{__APP_VERSION__}
            </span>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`min-h-screen pb-20 md:pb-0 transition-all duration-300 ${
          sidebarExpanded ? 'md:ml-64' : 'md:ml-20'
        }`}
      >
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-pink-600' : 'text-gray-600'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}