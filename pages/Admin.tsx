import React, { useState, useEffect, useRef } from 'react';
import { MOCK_CUSTOMERS, MOCK_SUBSCRIPTIONS, CHART_DATA_OVERVIEW, CHART_DATA_LINE } from '../constants';
import { Search, Download, Settings, ChevronLeft, ChevronRight, Mail, BarChart3, Users, DollarSign, Activity, AlertCircle, Server, Shield, FileText, Plus, X, MoreVertical, Edit2, Trash2, CheckCircle, Ban, Eye, Zap, ArrowUpRight, Copy, Check } from 'lucide-react';
import { FinancialChart, LiabilityChart } from '../components/Charts';

// --- Shared Local Components ---

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center px-4 py-3 rounded-xl shadow-lg border animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            type === 'success' ? 'bg-white border-emerald-100 text-emerald-800' : 'bg-white border-red-100 text-red-800'
        }`}>
            <div className={`p-1 rounded-full mr-3 ${type === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                {type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            </div>
            <p className="text-sm font-medium">{message}</p>
            <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

const ActionMenu = ({ onEdit, onDelete, onStatusChange, onAddCredits }: any) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return (
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setOpen(!open)} 
                className={`p-1.5 rounded-lg transition-colors ${open ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
                <MoreVertical className="w-4 h-4" />
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-1.5 text-left animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    {onEdit && (
                        <button onClick={() => { onEdit(); setOpen(false); }} className="w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left flex items-center transition-colors">
                            <Edit2 className="w-3.5 h-3.5 mr-2.5 text-gray-400" /> Edit Details
                        </button>
                    )}
                     {onStatusChange && (
                        <button onClick={() => { onStatusChange(); setOpen(false); }} className="w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left flex items-center transition-colors">
                            <Ban className="w-3.5 h-3.5 mr-2.5 text-gray-400" /> Change Status
                        </button>
                    )}
                    {onAddCredits && (
                        <button onClick={() => { onAddCredits(); setOpen(false); }} className="w-full px-4 py-2.5 text-sm text-indigo-600 hover:bg-indigo-50 text-left flex items-center transition-colors font-medium">
                            <Zap className="w-3.5 h-3.5 mr-2.5" /> Add Credits
                        </button>
                    )}
                    {onDelete && (
                        <>
                            <div className="h-px bg-gray-100 my-1"></div>
                            <button onClick={() => { onDelete(); setOpen(false); }} className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left flex items-center transition-colors">
                                <Trash2 className="w-3.5 h-3.5 mr-2.5" /> Delete User
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

const CreditModal = ({ isOpen, onClose, customer, onSave }: any) => {
    const [amount, setAmount] = useState<number | string>('');

    if (!isOpen || !customer) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 transform transition-all scale-100">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg mr-2">
                            <Zap className="w-4 h-4" />
                        </div>
                        Add Credits
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="mb-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Adding to account:</p>
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-900">{customer.name}</p>
                        <span className="text-xs font-mono bg-white border border-gray-200 px-2 py-1 rounded text-gray-600">
                            Bal: {customer.credits || 0}
                        </span>
                    </div>
                </div>
                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Credit Amount</label>
                         <div className="relative">
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-4 pr-12 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white text-gray-900" 
                                placeholder="0"
                                autoFocus
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs font-bold">PTS</span>
                         </div>
                    </div>
                    <div className="flex justify-end gap-3">
                         <button 
                            onClick={onClose}
                            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => { onSave(customer.id, Number(amount)); onClose(); setAmount(''); }}
                            disabled={!amount}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Confirm Addition
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CustomerModal = ({ isOpen, onClose, customer, onSave }: any) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subscription: 'Trial',
        joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    useEffect(() => {
        if (customer) {
            setFormData(customer);
        } else {
            setFormData({
                name: '',
                email: '',
                subscription: 'Trial',
                joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            });
        }
    }, [customer, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">{customer ? 'Edit Customer' : 'Add New Customer'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Full Name</label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white text-gray-900" 
                            placeholder="e.g. Acme Corp"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Email</label>
                        <input 
                            type="email" 
                            value={formData.email || 'user@example.com'} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white text-gray-900" 
                            placeholder="e.g. admin@acme.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Status</label>
                        <select 
                            value={formData.subscription}
                            onChange={(e) => setFormData({...formData, subscription: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 transition-all"
                        >
                            <option value="Active" className="text-gray-900">Active</option>
                            <option value="Trial" className="text-gray-900">Trial</option>
                            <option value="Inactive" className="text-gray-900">Inactive</option>
                        </select>
                    </div>
                    <button 
                        onClick={() => { onSave(formData); onClose(); }}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors mt-2 shadow-lg shadow-indigo-200"
                    >
                        {customer ? 'Save Changes' : 'Create Customer'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const SubscriptionModal = ({ isOpen, onClose, subscription, onSave }: any) => {
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (subscription) setFormData(subscription);
    }, [subscription, isOpen]);

    if (!isOpen || !subscription) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Manage Subscription</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-sm font-bold text-gray-900">{formData.customerName}</p>
                        <p className="text-xs text-gray-500">{formData.email}</p>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Plan</label>
                        <select 
                            value={formData.plan}
                            onChange={(e) => setFormData({...formData, plan: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 transition-all"
                        >
                            <option value="Basic" className="text-gray-900">Basic (₹19/mo)</option>
                            <option value="Pro" className="text-gray-900">Pro (₹49/mo)</option>
                            <option value="Enterprise" className="text-gray-900">Enterprise (₹99/mo)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Status</label>
                        <select 
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 transition-all"
                        >
                            <option value="Active" className="text-gray-900">Active</option>
                            <option value="Pending" className="text-gray-900">Pending</option>
                            <option value="Suspended" className="text-gray-900">Suspended</option>
                            <option value="Cancelled" className="text-gray-900">Cancelled</option>
                        </select>
                    </div>
                    <button 
                        onClick={() => { onSave(formData); onClose(); }}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors mt-2 shadow-lg shadow-indigo-200"
                    >
                        Update Subscription
                    </button>
                </div>
            </div>
        </div>
    );
};

const LogDetailModal = ({ isOpen, onClose, log }: any) => {
    if (!isOpen || !log) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl p-0 overflow-hidden m-4">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Log Details</h3>
                            <p className="text-xs text-gray-500 font-mono">{log.time}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6 text-sm">
                        <div className="space-y-1">
                            <span className="block text-gray-500 text-xs font-bold uppercase tracking-wide">Module</span>
                            <span className="font-medium text-gray-900 px-2 py-1 bg-gray-100 rounded inline-block">{log.module}</span>
                        </div>
                         <div className="space-y-1">
                            <span className="block text-gray-500 text-xs font-bold uppercase tracking-wide">Status</span>
                            <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${
                                log.status === 'Success' ? 'bg-emerald-100 text-emerald-700' :
                                log.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                            }`}>{log.status}</span>
                        </div>
                        <div className="space-y-1 col-span-2">
                            <span className="block text-gray-500 text-xs font-bold uppercase tracking-wide">Action & User</span>
                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                                <span className="font-medium text-gray-900">{log.action}</span>
                                <span className="text-xs text-gray-500">{log.user}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Raw Event Payload</p>
                            <button className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center">
                                <Copy className="w-3 h-3 mr-1" /> Copy JSON
                            </button>
                        </div>
                        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto shadow-inner border border-slate-800">
                            <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
{JSON.stringify({
    event_id: `evt_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(log.time).toISOString(),
    action: log.action,
    actor: {
        id: "usr_12345",
        ip: "192.168.1.105",
        agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)..."
    },
    meta: {
        latency: "45ms",
        status_code: log.status === 'Success' ? 200 : 400,
        region: "ap-south-1"
    }
}, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
                 <div className="px-6 py-4 bg-gray-50 text-right border-t border-gray-100">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-100 transition-colors shadow-sm">Close</button>
                </div>
            </div>
        </div>
    );
};

// --- Main Components ---

export const AdminOverview = () => {
    // Stats simulated interactivity
    const [timeRange, setTimeRange] = useState('Today');
    const [revenue, setRevenue] = useState('₹ 4,25,000');
    
    // Simulate updating stats based on filter
    useEffect(() => {
        if(timeRange === 'Today') setRevenue('₹ 15,200');
        if(timeRange === 'This Week') setRevenue('₹ 1,05,000');
        if(timeRange === 'This Month') setRevenue('₹ 4,25,000');
    }, [timeRange]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">System-wide overview and health status.</p>
            </div>
            <div className="flex gap-3">
                <select 
                    value={timeRange} 
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 outline-none shadow-sm cursor-pointer hover:border-gray-300 transition-colors"
                >
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                </select>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center">
                    <Download className="w-4 h-4 mr-2" /> Report
                </button>
            </div>
       </div>

       {/* Quick Actions */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
               { label: 'Add User', icon: Plus, color: 'text-indigo-600', bg: 'bg-indigo-50' },
               { label: 'System Logs', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
               { label: 'Pending Approvals', icon: CheckCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
               { label: 'Server Status', icon: Server, color: 'text-blue-600', bg: 'bg-blue-50' },
           ].map((action, i) => (
               <button key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center space-x-3 group">
                   <div className={`p-2 rounded-lg ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                       <action.icon className="w-5 h-5" />
                   </div>
                   <span className="font-semibold text-gray-700 text-sm">{action.label}</span>
               </button>
           ))}
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{revenue}</h3>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+85</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Active Users</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">1,248</h3>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-full">30d</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">System Uptime</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">99.99%</h3>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Action</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Pending Issues</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
                    </div>
                </div>
            </div>
       </div>

       {/* Charts Row */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Revenue Growth</h3>
                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                </div>
                <FinancialChart data={CHART_DATA_OVERVIEW} type="area" />
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">User Activity</h3>
                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                </div>
                <LiabilityChart data={CHART_DATA_LINE} type="bar" />
            </div>
       </div>

       {/* Recent Activity */}
       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Recent System Activity</h3>
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800 hover:underline flex items-center">
                    View All Logs <ArrowUpRight className="w-3 h-3 ml-1" />
                </button>
            </div>
            <div className="divide-y divide-gray-100">
                {[
                    { action: 'New Subscription', user: 'Acme Corp', time: '2 mins ago', icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
                    { action: 'Failed Login Attempt', user: 'IP: 192.168.1.1', time: '15 mins ago', icon: Shield, color: 'bg-red-100 text-red-600' },
                    { action: 'Bulk Data Export', user: 'Admin User', time: '1 hour ago', icon: Download, color: 'bg-blue-100 text-blue-600' },
                    { action: 'System Backup', user: 'Automated', time: '3 hours ago', icon: Server, color: 'bg-gray-100 text-gray-600' },
                ].map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl ${item.color}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                                <p className="text-xs text-gray-500">{item.user}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-medium text-gray-900 mb-1">Today</span>
                            <span className="text-xs text-gray-400">{item.time}</span>
                        </div>
                    </div>
                ))}
            </div>
       </div>
    </div>
  );
};

export const Customers = () => {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS.map(c => ({...c, credits: Math.floor(Math.random() * 50) + 5})));
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  // Credit Modal State
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [selectedCustomerForCredits, setSelectedCustomerForCredits] = useState<any>(null);

  const filteredCustomers = customers.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || c.subscription === statusFilter;
      return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
      if(window.confirm('Are you sure you want to delete this customer?')) {
          setCustomers(customers.filter(c => c.id !== id));
          setToast({ message: 'Customer deleted successfully', type: 'success' });
      }
  };

  const handleSave = (customerData: any) => {
      if (editingCustomer) {
          setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...customerData } : c));
          setToast({ message: 'Customer updated successfully', type: 'success' });
      } else {
          setCustomers([...customers, { ...customerData, id: Date.now().toString(), totalSpend: '₹0.00', lastActive: 'Just now', avatar: `https://ui-avatars.com/api/?name=${customerData.name}&background=random`, credits: 10 }]);
          setToast({ message: 'New customer added successfully', type: 'success' });
      }
      setEditingCustomer(null);
  };
  
  const handleAddCredits = (customerId: string, amount: number) => {
      setCustomers(customers.map(c => c.id === customerId ? { ...c, credits: (c.credits || 0) + amount } : c));
      setToast({ message: `Successfully added ${amount} credits`, type: 'success' });
  };

  const openEdit = (customer: any) => {
      setEditingCustomer(customer);
      setIsModalOpen(true);
  };

  const openAdd = () => {
      setEditingCustomer(null);
      setIsModalOpen(true);
  };
  
  const openCreditModal = (customer: any) => {
      setSelectedCustomerForCredits(customer);
      setCreditModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        customer={editingCustomer} 
        onSave={handleSave} 
      />
      
      <CreditModal 
        isOpen={creditModalOpen}
        onClose={() => setCreditModalOpen(false)}
        customer={selectedCustomerForCredits}
        onSave={handleAddCredits}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage users, view details, and assign credits.</p>
        </div>
        <button onClick={openAdd} className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98]">
            <Plus className="w-4 h-4 mr-2" /> Add Customer
        </button>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search customers by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white text-gray-900"
            />
         </div>
         <div className="flex space-x-3">
             <div className="flex items-center space-x-2">
                 <span className="text-sm text-gray-600 font-medium hidden sm:inline">Status:</span>
                 <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-200 rounded-lg text-sm p-2 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer"
                 >
                     <option value="All">All</option>
                     <option value="Active">Active</option>
                     <option value="Trial">Trial</option>
                     <option value="Inactive">Inactive</option>
                 </select>
             </div>
             <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                 <Download className="w-4 h-4 mr-2" /> Export
             </button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                <tr>
                    <th className="px-6 py-4 font-bold tracking-wider">Customer</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Credits</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Total Spend</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Last Active</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Joined</th>
                    <th className="px-6 py-4 font-bold tracking-wider text-center">Contact</th>
                    <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-1">
                    {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <img src={customer.avatar} alt="" className="w-9 h-9 rounded-full bg-gray-200 border border-gray-100" />
                                        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${customer.subscription === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                                    </div>
                                    <span className="font-semibold text-gray-900">{customer.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                    customer.subscription === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                                    customer.subscription === 'Trial' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {customer.subscription}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg w-fit">
                                    <Zap className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                                    {customer.credits}
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-600">{customer.totalSpend}</td>
                            <td className="px-6 py-4 text-gray-500">{customer.lastActive}</td>
                            <td className="px-6 py-4 text-gray-500">{customer.joined}</td>
                            <td className="px-6 py-4 text-center">
                                <button className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition-colors">
                                    <Mail className="w-4 h-4" />
                                </button>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <ActionMenu 
                                    onEdit={() => openEdit(customer)}
                                    onDelete={() => handleDelete(customer.id)}
                                    onAddCredits={() => openCreditModal(customer)}
                                />
                            </td>
                        </tr>
                    ))}
                    {filteredCustomers.length === 0 && (
                        <tr>
                            <td colSpan={8} className="text-center py-12 text-gray-500 bg-gray-50/30">
                                <div className="flex flex-col items-center justify-center">
                                    <Users className="w-12 h-12 text-gray-300 mb-3" />
                                    <p className="font-medium">No customers found.</p>
                                    <p className="text-xs mt-1">Try adjusting your filters.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
            <span className="text-sm text-gray-500">Showing {filteredCustomers.length} results</span>
            <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50">Previous</button>
                <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white text-gray-600 hover:bg-gray-50">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export const AdminSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState(MOCK_SUBSCRIPTIONS);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [editingSub, setEditingSub] = useState<any>(null);
    const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

    const filteredSubs = subscriptions.filter(s => {
         const matchesSearch = s.customerName.toLowerCase().includes(searchTerm.toLowerCase());
         const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
         return matchesSearch && matchesStatus;
    });

    const handleSave = (updatedSub: any) => {
        setSubscriptions(subscriptions.map(s => s.id === updatedSub.id ? updatedSub : s));
        setEditingSub(null);
        setToast({ message: 'Subscription updated successfully', type: 'success' });
    };

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <SubscriptionModal 
            isOpen={!!editingSub} 
            onClose={() => setEditingSub(null)} 
            subscription={editingSub}
            onSave={handleSave}
        />

        <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all customer subscriptions, plans, and their states.</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
                { label: 'Total Active', value: subscriptions.filter(s => s.status === 'Active').length, trend: '↗', trendColor: 'text-gray-400' },
                { label: 'Total Revenue', value: `₹${subscriptions.reduce((acc, curr) => acc + parseFloat(curr.monthlyPrice.replace(/[^\d.]/g, '')), 0).toFixed(2)}`, trend: '↗', trendColor: 'text-emerald-500' },
                { label: 'Churn Rate', value: '1.2%', trend: '↘', trendColor: 'text-emerald-500' },
                { label: 'New This Month', value: '12', trend: '↗', trendColor: 'text-emerald-500' },
            ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                        <span className={stat.trendColor}>{stat.trend}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</div>
                </div>
            ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search subscriptions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
            />
         </div>
         <div className="flex space-x-3">
             <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg text-sm p-2 w-32 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
             >
                 <option value="All">All Statuses</option>
                 <option value="Active">Active</option>
                 <option value="Pending">Pending</option>
                 <option value="Suspended">Suspended</option>
             </select>
             <button 
                onClick={() => setToast({ message: 'Export started...', type: 'success' })}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50"
            >
                 <Download className="w-4 h-4 mr-2" /> Export Data
             </button>
         </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 font-bold tracking-wider">Customer</th>
                            <th className="px-6 py-4 font-bold tracking-wider">Plan</th>
                            <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                            <th className="px-6 py-4 font-bold tracking-wider">Start Date</th>
                            <th className="px-6 py-4 font-bold tracking-wider">End Date</th>
                            <th className="px-6 py-4 font-bold tracking-wider text-right">Price</th>
                            <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredSubs.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="font-semibold text-gray-900">{sub.customerName}</p>
                                    <p className="text-xs text-gray-500">{sub.email}</p>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-700">{sub.plan}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                        sub.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                        sub.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                        sub.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                    }`}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{sub.startDate}</td>
                                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{sub.endDate}</td>
                                <td className="px-6 py-4 text-right font-bold text-gray-900">{sub.monthlyPrice}</td>
                                <td className="px-6 py-4 text-right">
                                    <ActionMenu onEdit={() => setEditingSub(sub)} />
                                </td>
                            </tr>
                        ))}
                        {filteredSubs.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-gray-500">No subscriptions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    );
};

export const SystemLogs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterModule, setFilterModule] = useState('All Events');
    const [selectedLog, setSelectedLog] = useState<any>(null);

    const logs = [
        { time: '2024-01-20 14:30:22', user: 'admin@pinnacle.com', action: 'Update Subscription', module: 'Billing', status: 'Success' },
        { time: '2024-01-20 14:15:10', user: 'User 1234', action: 'GSTR-3B Filing', module: 'Compliance', status: 'Failed' },
        { time: '2024-01-20 13:45:00', user: '192.168.1.105', action: 'Login Attempt', module: 'Auth', status: 'Success' },
        { time: '2024-01-20 12:20:15', user: 'System', action: 'Daily Backup', module: 'Core', status: 'Success' },
        { time: '2024-01-20 11:10:45', user: 'User 5678', action: 'Export Report', module: 'Analytics', status: 'Success' },
        { time: '2024-01-20 10:05:30', user: 'User 9999', action: 'API Connection', module: 'GSTN', status: 'Warning' },
    ];

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesModule = filterModule === 'All Events' || log.module === filterModule;
        return matchesSearch && matchesModule;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <LogDetailModal isOpen={!!selectedLog} onClose={() => setSelectedLog(null)} log={selectedLog} />

            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">System Audit Logs</h1>
                <p className="text-gray-500 text-sm mt-1">Track all user activities, errors, and system events.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search logs..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-900" 
                    />
                </div>
                <div className="flex gap-3">
                    <select 
                        value={filterModule}
                        onChange={(e) => setFilterModule(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500/20"
                    >
                        <option value="All Events">All Events</option>
                        <option value="Billing">Billing</option>
                        <option value="Compliance">Compliance</option>
                        <option value="Auth">Auth</option>
                        <option value="Core">Core</option>
                        <option value="Analytics">Analytics</option>
                        <option value="GSTN">GSTN</option>
                    </select>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-50 flex items-center">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </button>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 font-bold tracking-wider">Timestamp</th>
                                <th className="px-6 py-4 font-bold tracking-wider">User / IP</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Action</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Module</th>
                                <th className="px-6 py-4 font-bold tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 font-bold tracking-wider text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredLogs.map((log, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => setSelectedLog(log)}>
                                    <td className="px-6 py-4 font-mono text-gray-500 text-xs">{log.time}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{log.user}</td>
                                    <td className="px-6 py-4 text-gray-700">{log.action}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">{log.module}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                            log.status === 'Success' ? 'bg-emerald-100 text-emerald-700' :
                                            log.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 group-hover:text-indigo-600 font-medium transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="flex items-center justify-end p-4 gap-4 border-t border-gray-200 bg-gray-50/50">
                    <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-white disabled:opacity-50">Previous</button>
                    <span className="text-sm text-gray-600">Page 1 of 50</span>
                    <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-white">Next</button>
                </div>
            </div>
        </div>
    );
};