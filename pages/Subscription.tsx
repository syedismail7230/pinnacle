import React, { useState } from 'react';
import { Check, X, Download, Clock } from 'lucide-react';

const PlanCard = ({ title, desc, price, features, isCurrent, isPopular }: any) => (
  <div className={`
    relative p-6 rounded-2xl border flex flex-col h-full bg-white
    ${isCurrent ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-gray-200'}
    ${isPopular ? 'shadow-lg' : 'shadow-sm'}
  `}>
    {isCurrent && (
        <span className="absolute top-0 right-0 -mt-2 -mr-2 px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 hidden">
            CURRENT
        </span>
    )}
    
    <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>

    <div className="mb-6">
        <span className="text-4xl font-bold text-indigo-600">{price}</span>
        <span className="text-gray-500">/month</span>
    </div>

    <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start">
                <Check className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
            </li>
        ))}
    </ul>

    <button className={`
        w-full py-2.5 rounded-lg text-sm font-medium transition-colors
        ${isCurrent 
            ? 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50' 
            : title === 'CA' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}
    `}>
        {isCurrent ? 'Current Plan' : title === 'CA' ? 'Upgrade to Enterprise' : 'Choose Plan'}
    </button>
  </div>
);

const ManageSubscriptionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Manage Subscription</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <div className="flex justify-between items-center mb-2">
                             <span className="text-sm font-semibold text-indigo-900">Current Plan: Pro (Annual)</span>
                             <span className="text-xs font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-indigo-200">Active</span>
                        </div>
                        <p className="text-xs text-indigo-700">Next billing date: January 15, 2025</p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-3">Options</h4>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center group">
                                <div>
                                    <span className="block text-sm font-medium text-gray-900">Change Plan</span>
                                    <span className="block text-xs text-gray-500">Upgrade or downgrade your current subscription</span>
                                </div>
                                <span className="text-gray-400 group-hover:text-gray-600">→</span>
                            </button>
                             <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center group">
                                <div>
                                    <span className="block text-sm font-medium text-gray-900">Update Payment Method</span>
                                    <span className="block text-xs text-gray-500">Change credit card or billing details</span>
                                </div>
                                <span className="text-gray-400 group-hover:text-gray-600">→</span>
                            </button>
                             <button className="w-full text-left px-4 py-3 border border-red-100 rounded-lg hover:bg-red-50 transition-colors flex justify-between items-center group">
                                <div>
                                    <span className="block text-sm font-medium text-red-600">Cancel Subscription</span>
                                    <span className="block text-xs text-red-400">Turn off auto-renewal at end of billing cycle</span>
                                </div>
                                <span className="text-red-300 group-hover:text-red-500">→</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};

const BillingHistoryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Billing History</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-600">Jan 15, 2024</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">$49.00</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium flex items-center w-fit">
                                            <Check className="w-3 h-3 mr-1" /> Paid
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium flex items-center justify-end w-full">
                                            <Download className="w-4 h-4 mr-1" /> PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};

const Subscription = () => {
  const [showManage, setShowManage] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="space-y-8">
      <ManageSubscriptionModal isOpen={showManage} onClose={() => setShowManage(false)} />
      <BillingHistoryModal isOpen={showHistory} onClose={() => setShowHistory(false)} />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your plan, billing details, and explore available upgrades.</p>
      </div>

      {/* Current Subscription Block */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
         <div>
            <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-lg font-bold text-gray-900">Your Current Subscription</h2>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
            </div>
            <p className="text-gray-600 text-sm">Pro Plan - Annual</p>
            <div className="mt-2 text-2xl font-bold text-gray-900">$49<span className="text-base font-normal text-gray-500">/month</span></div>
            <p className="text-xs text-gray-500 mt-1">Renews on January 15, 2025</p>
         </div>
         <button 
            onClick={() => setShowManage(true)}
            className="mt-4 md:mt-0 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
         >
            Manage Subscription
         </button>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-6">Explore Our Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PlanCard 
                title="Individual"
                desc="Perfect for small businesses"
                price="$19"
                features={['Up to 1 GSTIN', 'Monthly Analytics Reports', 'Email Support', 'Limited Data Export']}
            />
            <PlanCard 
                title="Business"
                desc="Perfect for growing teams"
                price="$49"
                isCurrent={true}
                features={['Up to 5 GSTINs', 'Daily Analytics Reports', 'Priority Email & Chat Support', 'Unlimited Data Export', 'Compliance Scoring']}
            />
            <PlanCard 
                title="CA"
                desc="Perfect for large enterprises"
                price="$99"
                features={['Unlimited GSTINs', 'Real-time Analytics Dashboard', '24/7 Dedicated Support', 'Advanced API Access', 'Custom Integrations', 'Dedicated Account Manager']}
            />
        </div>
      </div>

      {/* Billing Info */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Billing Information</h2>
        <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-600">
                <span className="w-5 h-5 mr-3 bg-gray-100 rounded flex items-center justify-center">💳</span>
                Payment Method: Visa ending in 5678
            </div>
            <div className="flex items-center text-sm text-gray-600">
                <span className="w-5 h-5 mr-3 bg-gray-100 rounded flex items-center justify-center">📅</span>
                Next Billing Date: January 15, 2025
            </div>
        </div>
        <div className="flex space-x-4 text-sm">
            <button 
                onClick={() => setShowManage(true)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
                Update Payment Method
            </button>
            <button 
                onClick={() => setShowHistory(true)}
                className="text-indigo-600 hover:underline hover:text-indigo-800 transition-colors"
            >
                View Billing History
            </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;