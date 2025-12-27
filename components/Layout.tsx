import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  ShieldCheck, 
  Link as LinkIcon, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Download,
  Hexagon,
  Bell,
  Search,
  User as UserIcon,
  PanelLeftClose,
  PanelLeft,
  Check,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Trash2,
  Zap,
  HelpCircle,
  FileClock,
  PieChart,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GlobalSearch from './GlobalSearch';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile state
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true); // Desktop state
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportMessage, setReportMessage] = useState<string | null>(null);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, deductCredits } = useAuth();

  // Mock Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'GSTR-3B Due Soon', message: 'Your GSTR-3B filing for October is due in 3 days.', time: '2 hours ago', type: 'warning', read: false },
    { id: 2, title: 'Payment Successful', message: 'Subscription payment of ₹49 was successful.', time: '1 day ago', type: 'success', read: false },
    { id: 3, title: 'ITC Mismatch Detected', message: 'Mismatch detected for Vendor Global Solutions Ltd.', time: '1 day ago', type: 'error', read: false },
    { id: 4, title: 'New Feature Alert', message: 'Check out the new ITC reconciliation report.', time: '2 days ago', type: 'info', read: true },
    { id: 5, title: 'System Maintenance', message: 'Scheduled maintenance on Sunday 2 AM.', time: '3 days ago', type: 'info', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
        case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
        case 'success': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
        case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
        default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
        case 'warning': return 'bg-amber-50';
        case 'success': return 'bg-emerald-50';
        case 'error': return 'bg-red-50';
        default: return 'bg-blue-50';
    }
  };

  const handleGenerateReport = () => {
      if (isGenerating) return;

      const success = deductCredits(1);
      if (success) {
          setIsGenerating(true);
          // Simulate generation
          setTimeout(() => {
              setIsGenerating(false);
              setReportMessage("Report generated successfully!");
              setTimeout(() => setReportMessage(null), 3000);
          }, 2000);
      } else {
          alert('Insufficient credits! Please refer friends or upgrade to generate more reports.');
      }
  };

  // Close mobile sidebar automatically when route changes
  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
    setNotificationOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    }
    // Use mousedown to capture the start of the click to prevent race conditions
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setDesktopSidebarOpen(!desktopSidebarOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const toggleProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProfileOpen(prev => !prev);
    setNotificationOpen(false); // Close other dropdown
  };

  const toggleNotification = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setNotificationOpen(prev => !prev);
    setProfileOpen(false); // Close other dropdown
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    // Generate a safe ID for tour targeting
    const itemId = `nav-item-${label.toLowerCase().replace(/\s+/g, '-')}`;
    
    return (
      <NavLink
        to={to}
        id={itemId}
        className={({ isActive }) => `
          flex items-center px-4 py-2.5 my-1 text-sm font-medium rounded-xl transition-all duration-200
          ${isActive 
            ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
        `}
      >
        <Icon className={`w-4 h-4 mr-3 ${location.pathname === to ? 'text-indigo-600' : 'text-gray-500'}`} />
        {label}
      </NavLink>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 shadow-xl lg:shadow-none 
        transform transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:transform-none lg:static lg:inset-auto
        ${desktopSidebarOpen ? 'lg:w-72' : 'lg:w-0 lg:border-none lg:overflow-hidden'}
        w-72
      `}>
        {/* Inner Container for fixed width content to avoid squashing during transition */}
        <div className="w-72 flex flex-col h-full">
            <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform duration-300 ease-in-out">
                <Hexagon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className={`${!desktopSidebarOpen && 'lg:hidden'} transition-opacity duration-200`}>
                <span className="block font-bold text-gray-900 text-lg leading-tight">Pinnacle</span>
                <span className="block text-[10px] text-gray-500 font-medium tracking-wider uppercase">GST Analytics</span>
                </div>
            </div>
            {/* Mobile Close Button */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
            </button>
            {/* Desktop Close Button */}
            <button className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600" onClick={() => setDesktopSidebarOpen(false)}>
                <PanelLeftClose className="w-5 h-5" />
            </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scrollbar-hide" id="sidebar-nav">
            {user?.role === 'user' && (
                <>
                {/* Dashboard Group */}
                <div className="mb-2">
                    <button 
                    onClick={() => setDashboardOpen(!dashboardOpen)}
                    className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors justify-between group"
                    >
                    <div className="flex items-center">
                        <LayoutDashboard className="w-4 h-4 mr-3 text-gray-500 group-hover:text-gray-700" />
                        <span>Dashboard</span>
                    </div>
                    {dashboardOpen ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                    </button>
                    
                    {dashboardOpen && (
                    <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-100 ml-4">
                        <NavItem to="/dashboard/overview" icon={BarChart3} label="Overview" />
                        <NavItem to="/dashboard/itc" icon={FileText} label="Input Tax Credit" />
                        <NavItem to="/dashboard/sales" icon={CreditCard} label="Sales Register" />
                        <NavItem to="/dashboard/compliance" icon={ShieldCheck} label="Compliance" />
                    </div>
                    )}
                </div>
                <NavItem to="/support" icon={HelpCircle} label="Help & Support" />
                </>
            )}

            {user?.role === 'admin' && (
                <>
                <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Admin Controls
                </div>
                <NavItem to="/admin/overview" icon={PieChart} label="Dashboard" />
                <NavItem to="/admin/customers" icon={Users} label="Customers" />
                <NavItem to="/admin/subscriptions" icon={CreditCard} label="Subscriptions" />
                <NavItem to="/admin/logs" icon={FileClock} label="System Logs" />
                <NavItem to="/support" icon={HelpCircle} label="Support Tickets" />
                </>
            )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <button 
                onClick={handleLogout}
                className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-red-600 bg-white border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
            >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
            </button>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
        {/* Header */}
        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm lg:shadow-none">
          <div className="flex items-center gap-4">
            <button 
                className={`p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors ${desktopSidebarOpen ? 'lg:hidden' : ''}`} 
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                <Menu className="w-6 h-6 lg:hidden" />
                <PanelLeft className="w-6 h-6 hidden lg:block" />
            </button>
            
            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center space-x-2 group cursor-pointer">
                <Hexagon className="w-6 h-6 text-indigo-600 group-hover:rotate-12 transition-transform duration-300 ease-in-out" strokeWidth={2.5} />
                <span className="font-bold text-gray-900">Pinnacle</span>
            </div>

            {/* Global Search */}
            <div className="hidden lg:block" id="global-search-container">
               <GlobalSearch />
            </div>
          </div>
          
          {/* Top Right User Profile Section */}
          <div className="flex items-center space-x-3 md:space-x-6">
            
            {/* Generate Report Button - Consumes Credits */}
            {user?.role === 'user' && user.connectedGSTINs && user.connectedGSTINs.length > 0 && (
                <div className="hidden md:block">
                    <button 
                        onClick={handleGenerateReport}
                        disabled={isGenerating}
                        className={`
                            flex items-center px-4 py-2 rounded-lg text-sm font-bold text-white shadow-md transition-all
                            ${isGenerating ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98]'}
                        `}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : reportMessage ? (
                             <>
                                <Check className="w-4 h-4 mr-2" />
                                {reportMessage}
                             </>
                        ) : (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Generate Report (1 Credit)
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Credits Display */}
            <div id="credits-display" className="hidden md:flex items-center bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full cursor-help group relative" title="Your Credit Balance">
                <Zap className="w-4 h-4 text-indigo-600 mr-2 fill-indigo-600" />
                <span className="text-sm font-bold text-indigo-900">
                    {user?.role === 'admin' ? 'Unlimited' : `${user?.credits || 0} Credits`}
                </span>
                
                {/* Tooltip for credits */}
                <div className="absolute top-full mt-2 right-0 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {user?.role === 'admin' 
                        ? 'You have unlimited credits as an administrator.'
                        : 'Use credits for advanced reports and AI analysis.'
                    }
                </div>
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef} id="header-notification-bell">
                <button 
                    type="button"
                    onClick={toggleNotification}
                    className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors outline-none"
                >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                </button>

                {notificationOpen && (
                    <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                            {unreadCount > 0 && (
                                <button 
                                    onClick={markAllAsRead}
                                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {notifications.map((notification) => (
                                        <div 
                                            key={notification.id} 
                                            onClick={() => markAsRead(notification.id)}
                                            className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${!notification.read ? 'bg-indigo-50/30' : ''}`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationBg(notification.type)}`}>
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-0.5">
                                                    <p className={`text-sm font-medium truncate ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                                        {notification.title}
                                                    </p>
                                                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                                    {notification.message}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5 self-start"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <Bell className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                                    <p className="text-sm text-gray-500">No notifications yet</p>
                                </div>
                            )}
                        </div>
                        <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
                            <button className="text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                                View all notifications
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            <div className="relative" ref={profileRef} id="header-profile">
                <button 
                    type="button"
                    onClick={toggleProfile}
                    className="flex items-center gap-3 pl-2 cursor-pointer group focus:outline-none"
                >
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.userType || user?.role || 'Guest'}</p>
                    </div>
                    <div className="relative">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=6366f1&color=fff&bold=true`}
                            alt="Profile" 
                            className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all ${profileOpen ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-white group-hover:border-indigo-100'}`}
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-transform duration-200 hidden md:block ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
                           <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                    <div className="flex items-center mt-0.5">
                                        <Zap className="w-3 h-3 text-indigo-500 mr-1 fill-indigo-500" />
                                        <p className="text-xs text-gray-600 font-medium">
                                            {user?.role === 'admin' ? 'Unlimited' : `${user?.credits} Credits`}
                                        </p>
                                    </div>
                                </div>
                           </div>
                        </div>
                        
                        <div className="py-2 px-2">
                             {user?.role === 'user' && (
                                <>
                                    <Link to="/gst-connection" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors" onClick={() => setProfileOpen(false)}>
                                        <LinkIcon className="w-4 h-4 mr-3" />
                                        GST Connection
                                    </Link>
                                    <Link to="/subscription" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors" onClick={() => setProfileOpen(false)}>
                                        <CreditCard className="w-4 h-4 mr-3" />
                                        My Plan
                                    </Link>
                                </>
                             )}
                             
                             <Link to="/settings" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors" onClick={() => setProfileOpen(false)}>
                                <Settings className="w-4 h-4 mr-3" />
                                Settings
                             </Link>
                        </div>

                        <div className="border-t border-gray-100 my-1 mx-2"></div>
                        
                        <div className="px-2 pb-1">
                            <button 
                                onClick={handleLogout}
                                className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-4 h-4 mr-3" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
          <footer className="mt-12 text-center text-sm text-gray-400 pb-6 border-t border-gray-200 pt-6">
             © 2025 Pinnacle GST Analytics. Secure. Reliable. Compliant.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;