import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiLogOut,
  FiCode,
  FiBook,
  FiFileText,
  FiTrendingUp,
  FiLayout,
  FiMail
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  // Check for unread messages count
  useEffect(() => {
    const checkUnreadCount = () => {
      const count = localStorage.getItem('unreadMessagesCount');
      setUnreadCount(count ? parseInt(count) : 0);
    };

    // Initial check
    checkUnreadCount();

    // Listen for storage changes
    window.addEventListener('storage', checkUnreadCount);
    
    // Poll every 5 seconds for updates
    const interval = setInterval(checkUnreadCount, 5000);

    return () => {
      window.removeEventListener('storage', checkUnreadCount);
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard', description: 'Overview & Stats' },
    { path: '/personal', icon: FiUser, label: 'Personal Info', description: 'Profile details' },
    { path: '/messages', icon: FiMail, label: 'Messages', description: 'User inquiries' },
    { path: '/projects', icon: FiLayout, label: 'Projects', description: 'Manage portfolio' },
    { path: '/skills', icon: FiCode, label: 'Skills', description: 'Technical abilities' },
    { path: '/experience', icon: FiBriefcase, label: 'Experience', description: 'Work history' },
    { path: '/education', icon: FiBook, label: 'Education', description: 'Academic background' },
    { path: '/blogs', icon: FiFileText, label: 'Blogs', description: 'Articles & posts' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white w-72 min-h-screen flex flex-col shadow-2xl border-r border-slate-700/50">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FiTrendingUp className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-xs text-slate-400">Portfolio Management</p>
          </div>
        </div>
        
        {/* User Info */}
        {user && (
          <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.email?.split('@')[0]}</p>
                <p className="text-xs text-slate-400">Eng/Eslam Zayed</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">
          Navigation
        </p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/50'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-2 rounded-lg transition-all ${
                  isActive ? 'bg-white/20' : 'bg-slate-800/50 group-hover:bg-slate-700/50'
                }`}>
                  <item.icon className="text-lg" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs opacity-70">{item.description}</p>
                </div>
                {/* Badge for Messages */}
                {item.path === '/messages' && unreadCount > 0 && (
                  <div className="flex items-center justify-center min-w-[24px] h-6 px-2 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={logout}
          className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 border border-transparent hover:border-red-500/30"
        >
          <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-all">
            <FiLogOut className="text-lg" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-sm">Logout</p>
            <p className="text-xs opacity-70">Sign out of panel</p>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <p className="text-xs text-slate-500 text-center">
          © 2025 Portfolio Admin Panel
        </p>
        <p className="text-xs text-slate-600 text-center mt-1">
          v2.0.0
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

