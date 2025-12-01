import { useState, useEffect } from 'react';
import { FiUser, FiBriefcase, FiCode, FiTrendingUp, FiBook, FiArrowUp, FiLayout, FiActivity, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getStatistics } from '../services/firestoreService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    education: 0,
    experience: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const result = await getStatistics();
      
      if (result.success) {
        setStats(result.data);
      } else {
        toast.error('Failed to load statistics');
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Projects',
      value: stats.projects,
      icon: FiLayout,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      link: '/projects'
    },
    {
      title: 'Skills',
      value: stats.skills,
      icon: FiCode,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      link: '/skills'
    },
    {
      title: 'Experience',
      value: stats.experience,
      icon: FiBriefcase,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      link: '/experience'
    },
    {
      title: 'Education',
      value: stats.education,
      icon: FiBook,
      gradient: 'from-orange-500 to-yellow-500',
      bgGradient: 'from-orange-50 to-yellow-50',
      link: '/education'
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: FiMail,
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50',
      link: '/messages'
    }
  ];

  const quickActions = [
    {
      title: 'Personal Info',
      description: 'Update your profile details',
      icon: FiUser,
      link: '/personal',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Messages',
      description: 'View user inquiries',
      icon: FiMail,
      link: '/messages',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Projects',
      description: 'Manage your portfolio',
      icon: FiLayout,
      link: '/projects',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Skills',
      description: 'Update your abilities',
      icon: FiCode,
      link: '/skills',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-violet-600"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FiActivity className="text-violet-600 animate-pulse" size={24} />
          </div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome Back! 👋
            </h1>
            <p className="text-violet-100">
              Here's what's happening with your portfolio today
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FiTrendingUp className="text-4xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statsCards.map((stat, index) => (
          <Link key={index} to={stat.link}>
            <div className={`group relative bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 border-2 border-transparent hover:border-violet-500 transition-all duration-300 cursor-pointer overflow-hidden`}>
              {/* Decorative circle */}
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              
              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white mb-4 shadow-lg`}>
                  <stat.icon className="text-2xl" />
                </div>
                
                <h3 className="text-slate-600 font-medium mb-1">{stat.title}</h3>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <div className="flex items-center gap-1 text-green-600 text-sm mb-1">
                    <FiArrowUp size={16} />
                    <span>Active</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <div className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-violet-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${action.gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-slate-600">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">System Status</h2>
          <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            All Systems Operational
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-2xl font-bold text-slate-900">{stats.projects}</p>
            <p className="text-sm text-slate-600">Total Projects</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-2xl font-bold text-slate-900">{stats.skills}</p>
            <p className="text-sm text-slate-600">Skills Listed</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-2xl font-bold text-slate-900">{stats.experience + stats.education}</p>
            <p className="text-sm text-slate-600">Timeline Items</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-2xl font-bold text-green-600">100%</p>
            <p className="text-sm text-slate-600">Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

