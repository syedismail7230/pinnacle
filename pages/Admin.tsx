import React from 'react';
import { MOCK_CUSTOMERS, MOCK_SUBSCRIPTIONS } from '../constants';
import { Search, Download, Settings, ChevronLeft, ChevronRight, Mail } from 'lucide-react';

export const Customers = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
            />
         </div>
         <div className="flex space-x-3">
             <div className="flex items-center space-x-2">
                 <span className="text-sm text-gray-600">Status:</span>
                 <select className="border border-gray-300 rounded-lg text-sm p-2 bg-white text-gray-700">
                     <option>All</option>
                 </select>
             </div>
             <div className="flex items-center space-x-2">
                 <span className="text-sm text-gray-600">Joined:</span>
                 <select className="border border-gray-300 rounded-lg text-sm p-2 bg-white text-gray-700">
                     <option>All</option>
                 </select>
             </div>
             <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50">
                 <Download className="w-4 h-4 mr-2" /> Export
             </button>
             <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50">
                 <Settings className="w-4 h-4 mr-2" /> Edit Columns
             </button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
             <thead className="text-xs text-gray-500 uppercase bg-transparent">
               <tr>
                 <th className="px-6 py-4 font-medium">Customer ↑↓</th>
                 <th className="px-6 py-4 font-medium">Subscription ↑↓</th>
                 <th className="px-6 py-4 font-medium">Total Spend ↑↓</th>
                 <th className="px-6 py-4 font-medium">Last Active</th>
                 <th className="px-6 py-4 font-medium">Joined ↑↓</th>
                 <th className="px-6 py-4 font-medium text-center">Contact</th>
                 <th className="px-6 py-4 font-medium text-right">Actions</th>
               </tr>
             </thead>
             <tbody>
                {MOCK_CUSTOMERS.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 flex items-center space-x-3">
                            <img src={customer.avatar} alt="" className="w-8 h-8 rounded-full bg-gray-200" />
                            <span className="font-medium text-gray-900">{customer.name}</span>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                customer.subscription === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                                customer.subscription === 'Trial' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                                {customer.subscription}
                            </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">{customer.totalSpend}</td>
                        <td className="px-6 py-4 text-gray-500">{customer.lastActive}</td>
                        <td className="px-6 py-4 text-gray-500">{customer.joined}</td>
                        <td className="px-6 py-4 text-center text-gray-400 hover:text-gray-600 cursor-pointer">
                            <Mail className="w-4 h-4 mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-right text-gray-400 hover:text-gray-600 cursor-pointer">•••</td>
                    </tr>
                ))}
             </tbody>
        </table>
        <div className="flex items-center justify-end p-4 gap-4 border-t border-gray-200">
             <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Previous</button>
             <span className="text-sm text-gray-600">Page 1 of 2</span>
             <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export const AdminSubscriptions = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all customer subscriptions, plans, and their states.</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-500 font-medium">Total Active Subscriptions</span>
                    <span className="text-gray-400">↗</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">6</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">+5% last month</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-500 font-medium">Monthly Recurring Revenue</span>
                    <span className="text-gray-400">↗</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">$369.94</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">+2.3% last month</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-500 font-medium">Cancelled Subscriptions</span>
                    <span className="text-gray-400">↘</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">1</div>
                <div className="text-xs text-red-500 font-medium mt-1">0.8% decrease</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-500 font-medium">New Subscriptions</span>
                    <span className="text-gray-400">↗</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">3</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">+3 last month</div>
            </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search subscriptions..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
            />
         </div>
         <div className="flex space-x-3">
             <select className="border border-gray-300 rounded-lg text-sm p-2 w-32 bg-white text-gray-700">
                 <option>All Statuses</option>
             </select>
             <select className="border border-gray-300 rounded-lg text-sm p-2 w-32 bg-white text-gray-700">
                 <option>All Plans</option>
             </select>
             <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50">
                 <Download className="w-4 h-4 mr-2" /> Export Data
             </button>
         </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-transparent border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium">Customer Name</th>
                        <th className="px-6 py-4 font-medium">Email</th>
                        <th className="px-6 py-4 font-medium">Plan</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Start Date</th>
                        <th className="px-6 py-4 font-medium">End Date</th>
                        <th className="px-6 py-4 font-medium text-right">Monthly Price</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_SUBSCRIPTIONS.map((sub) => (
                        <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{sub.customerName}</td>
                            <td className="px-6 py-4 text-gray-500">{sub.email}</td>
                            <td className="px-6 py-4 text-gray-900">{sub.plan}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    sub.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                                    sub.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                                    sub.status === 'Cancelled' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'
                                }`}>
                                    {sub.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{sub.startDate}</td>
                            <td className="px-6 py-4 text-gray-500">{sub.endDate}</td>
                            <td className="px-6 py-4 text-right font-medium text-gray-900">{sub.monthlyPrice}</td>
                            <td className="px-6 py-4 text-right text-gray-400 hover:text-gray-600 cursor-pointer">•••</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    );
};