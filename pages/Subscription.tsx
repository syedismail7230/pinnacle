import React, { useState } from 'react';
import { Check, X, Download, Clock, Zap, Shield, Database } from 'lucide-react';

const PlanCard = ({ title, desc, price, features, missingFeatures, isCurrent, isPopular }: any) => (
  <div className={`
    relative p-6 rounded-2xl border flex flex-col h-full bg-white transition-all duration-200
    ${isCurrent ? 'border-indigo-600 ring-2 ring-indigo-600/20' : 'border-gray-200 hover:border-indigo-300 hover:shadow-lg'}
    ${isPopular ? 'shadow-lg' : 'shadow-sm'}
  `}>
    {isCurrent && (
        <span className="absolute top-0 right-0 -mt-3 mr-4 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm tracking-wide">
            CURRENT PLAN
        </span>
    )}
    {isPopular && !isCurrent && (
        <span className="absolute top-0 right-0 -mt-3 mr-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-900 shadow-sm tracking-wide">
            MOST POPULAR
        </span>
    )}
    
    <div className="mb-4 mt-2">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>

    <div className="mb-6 pb-6 border-b border-gray-100">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-500 font-medium">/month</span>
    </div>

    <div className="flex-1">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">What's Included</p>
        <ul className="space-y-3 mb-6">
            {features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start">
                    <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 mr-3 flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                </li>
            ))}
        </ul>

        {missingFeatures && missingFeatures.length > 0 && (
            <>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Not Included</p>
                <ul className="space-y-3 mb-8 opacity-60">
                    {missingFeatures.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                            <X className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-500">{feature}</span>
                        </li>
                    ))}
                </ul>
            </>
        )}
    </div>

    <button className={`
        w-full py-3 rounded-xl text-sm font-bold transition-all shadow-sm
        ${isCurrent 
            ? 'bg-gray-100 text-gray-600 cursor-default' 
            : title === 'CA' 
                ? 'bg-gray-900 text-white hover:bg-black' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98]'}
    `}>
        {isCurrent ? 'Currently Active' : 'Upgrade Plan'}
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
                             <span className="text-sm font-semibold text-indigo-900">Current Plan: Business (Monthly)</span>
                             <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-200 shadow-sm">Active</span>
                        </div>
                        <p className="text-xs text-indigo-700">Next billing date: Feb 20, 2025</p>
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
                                    <td className="px-6 py-4 font-medium text-gray-900">₹49.00</td>
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
    <div className="space-y-8 pb-12">
      <ManageSubscriptionModal isOpen={showManage} onClose={() => setShowManage(false)} />
      <BillingHistoryModal isOpen={showHistory} onClose={() => setShowHistory(false)} />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription & Billing</h1>
        <p className="text-gray-500 text-sm mt-1">Upgrade your plan to unlock advanced analytics, more GSTINs, and priority support.</p>
      </div>

      {/* Current Subscription Block */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full opacity-50 blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
         <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-lg font-bold text-gray-900">Current Plan Status</h2>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full">Active</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Business Plan - Monthly Billing</p>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">₹49</span>
                <span className="text-sm text-gray-500">/month</span>
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-center">
                <Clock className="w-3 h-3 mr-1" /> Auto-renews on February 20, 2025
            </p>
         </div>
         <div className="mt-6 md:mt-0 flex gap-3 relative z-10">
             <button 
                onClick={() => setShowHistory(true)}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
                Billing History
            </button>
            <button 
                onClick={() => setShowManage(true)}
                className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
                Manage Subscription
            </button>
         </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <PlanCard 
                title="Individual"
                desc="For freelancers & small shops"
                price="₹19"
                features={[
                    '1 Connected GSTIN',
                    '5 Report Credits / Month',
                    'Basic Dashboard Overview',
                    'PDF Export Only',
                    'Standard Email Support'
                ]}
                missingFeatures={[
                    'Multiple GSTINs',
                    'Advanced Liability Charts',
                    'Excel / CSV Exports',
                    'Compliance Scoring',
                    'Phone Support'
                ]}
            />
            <PlanCard 
                title="Business"
                desc="For growing companies"
                price="₹49"
                isCurrent={true}
                isPopular={true}
                features={[
                    'Up to 5 Connected GSTINs',
                    '50 Report Credits / Month',
                    'Advanced ITC Analytics',
                    'Excel & CSV Data Exports',
                    'Priority Email & Chat Support',
                    'Compliance Scoring',
                    'Daily Auto-Sync'
                ]}
                missingFeatures={[
                    'Unlimited GSTINs',
                    'API Access',
                    'Dedicated Account Manager'
                ]}
            />
            <PlanCard 
                title="CA / Enterprise"
                desc="For CAs & large enterprises"
                price="₹99"
                features={[
                    'Unlimited GSTIN Connections',
                    'Unlimited Report Credits',
                    'Full Admin Dashboard',
                    'White-Label Reports',
                    'API Access & Integrations',
                    'Dedicated Account Manager',
                    '24/7 Priority Phone Support'
                ]}
            />
        </div>
      </div>

      {/* Billing Info */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50">
            <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-900">Visa ending in 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/28</p>
                </div>
            </div>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline">
                Update Card
            </button>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">
            Payments are secured by Stripe. We do not store your credit card details.
        </p>
      </div>
    </div>
  );
};

export default Subscription;