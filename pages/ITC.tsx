import React, { useState } from 'react';
import { Download, FileText, IndianRupee, CheckCircle, AlertTriangle, XCircle, Clock, Filter, ArrowUpDown, ChevronDown, Eye, Upload, X, Search, Phone, Mail, MapPin, PieChart, Circle, BarChart3 } from 'lucide-react';
import { VENDOR_ITC_DATA, MISSING_INVOICES } from '../constants';
import { ITCAnalysisChart } from '../components/Charts';

const ITCCard = ({ label, value, subtext, icon: Icon, color }: any) => {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    pink: 'bg-pink-50 text-pink-600',
    gray: 'bg-gray-100 text-gray-600',
    red: 'bg-red-50 text-red-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  }[color as string] || 'bg-gray-50 text-gray-600';

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full group">
      <div className="flex justify-between items-start mb-4">
         <span className="text-sm font-semibold text-gray-500 group-hover:text-indigo-600 transition-colors">{label}</span>
         <div className={`p-2 rounded-lg ${colorClasses}`}>
            <Icon className="w-5 h-5" />
         </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-xs font-medium text-gray-400">{subtext}</div>
      </div>
    </div>
  );
};

const VendorListModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">All Vendor Ledgers</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-4 border-b border-gray-100 bg-white">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search vendors by name or GSTIN..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-gray-900" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Vendor Name</th>
                            <th className="px-6 py-3 font-semibold text-right">Total ITC</th>
                            <th className="px-6 py-3 font-semibold text-right">Eligible</th>
                            <th className="px-6 py-3 font-semibold text-right">Ineligible</th>
                            <th className="px-6 py-3 font-semibold text-center">Status</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {[...VENDOR_ITC_DATA, ...VENDOR_ITC_DATA, ...VENDOR_ITC_DATA].map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <p className="font-medium text-gray-900 min-w-[150px]">{item.name}</p>
                                <p className="text-xs text-gray-400 font-mono">{item.gstin}</p>
                            </td>
                            <td className="px-6 py-4 text-right font-medium text-gray-600">{item.total}</td>
                            <td className="px-6 py-4 text-right font-medium text-emerald-600">{item.eligible}</td>
                            <td className="px-6 py-4 text-right font-medium text-red-500">{item.ineligible}</td>
                            <td className="px-6 py-4 text-center">
                                <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">Active</span>
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

const VendorDetailModal = ({ vendor, isOpen, onClose }: { vendor: any; isOpen: boolean; onClose: () => void }) => {
    if (!isOpen || !vendor) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden m-4">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Vendor Details</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl flex-shrink-0">
                            {vendor.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">{vendor.name}</h4>
                            <p className="text-sm text-gray-500 font-mono">{vendor.gstin}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-xs text-gray-500 block">Total ITC</span>
                            <span className="text-sm font-bold text-gray-900">{vendor.total}</span>
                        </div>
                         <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                            <span className="text-xs text-emerald-700 block">Eligible</span>
                            <span className="text-sm font-bold text-emerald-900">{vendor.eligible}</span>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                            <span className="text-xs text-red-700 block">Ineligible</span>
                            <span className="text-sm font-bold text-red-900">{vendor.ineligible}</span>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                            <span className="text-xs text-amber-700 block">Pending</span>
                            <span className="text-sm font-bold text-amber-900">₹ 0</span>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                            <span>123, Business Park, Mumbai, MH - 400001</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-3 text-gray-400" />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-3 text-gray-400" />
                            <span>accounts@{vendor.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                        </div>
                    </div>
                </div>
                 <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">Close</button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm">View Invoices</button>
                </div>
            </div>
        </div>
    );
};

const ITCChartToggle = ({ type, onChange }: { type: string, onChange: (t: any) => void }) => (
    <div className="flex bg-gray-100 p-1 rounded-lg">
        <button 
            onClick={() => onChange('pie')}
            className={`p-1.5 rounded-md transition-all ${type === 'pie' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            title="Pie Chart"
        >
            <PieChart className="w-4 h-4" />
        </button>
        <button 
            onClick={() => onChange('donut')}
            className={`p-1.5 rounded-md transition-all ${type === 'donut' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
             title="Donut Chart"
        >
            <Circle className="w-4 h-4" />
        </button>
        <button 
            onClick={() => onChange('bar')}
            className={`p-1.5 rounded-md transition-all ${type === 'bar' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
             title="Bar Chart"
        >
            <BarChart3 className="w-4 h-4" />
        </button>
    </div>
);

const ITC = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview | reconciliation | gstr2b
  const [filterActive, setFilterActive] = useState(false);
  const [chartType, setChartType] = useState<'pie' | 'donut' | 'bar'>('pie');
  
  // Modal States
  const [showVendorList, setShowVendorList] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  const handleAction = (action: string) => {
    alert(`${action} functionality would open here.`);
  };

  return (
    <div className="space-y-6">
      <VendorListModal isOpen={showVendorList} onClose={() => setShowVendorList(false)} />
      <VendorDetailModal vendor={selectedVendor} isOpen={!!selectedVendor} onClose={() => setSelectedVendor(null)} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Input Tax Credit Analytics</h1>
           <p className="text-gray-500 text-sm mt-1">Real-time reconciliation and status of your Input Tax Credit.</p>
        </div>
        <div className="flex space-x-3">
             <button 
                onClick={() => setFilterActive(!filterActive)}
                className={`flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors shadow-sm ${filterActive ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
             >
                <Filter className="w-4 h-4 mr-2" /> Filter
             </button>
             <button 
                onClick={() => handleAction('Report Generation')}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
             >
                <Download className="w-4 h-4 mr-2" /> Report
             </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto no-scrollbar">
          <nav className="-mb-px flex space-x-8 min-w-max px-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('reconciliation')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'reconciliation'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reconciliation Tool (2A vs 2B)
            </button>
            <button
              onClick={() => setActiveTab('gstr2b')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'gstr2b'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              GSTR-2B View
            </button>
          </nav>
      </div>

      {filterActive && (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-shrink-0 bg-white text-gray-700">
                    <option>All Vendors</option>
                    <option>Top 10 by Value</option>
                    <option>With Mismatches</option>
                </select>
                <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-shrink-0 bg-white text-gray-700">
                    <option>Current Financial Year</option>
                    <option>Last Quarter</option>
                    <option>Last Month</option>
                </select>
                <button className="text-sm text-indigo-600 hover:underline px-2 flex-shrink-0">Clear Filters</button>
            </div>
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                <ITCCard label="ITC Available" value="₹ 2,345,678" subtext="Total eligible ITC" icon={IndianRupee} color="indigo" />
                <ITCCard label="ITC Claimed" value="₹ 2,100,500" subtext="Successfully claimed" icon={CheckCircle} color="emerald" />
                <ITCCard label="ITC Mismatch" value="₹ 245,178" subtext="GSTR-2A vs 3B Gap" icon={AlertTriangle} color="amber" />
                <ITCCard label="Ineligible ITC" value="₹ 50,000" subtext="Blocked under 17(5)" icon={XCircle} color="red" />
                <ITCCard label="Missing Invoices" value="23" subtext="Not in GSTR-2A" icon={Clock} color="gray" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Vendor Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Vendor-wise ITC Ledger</h2>
                        <button 
                            onClick={() => setShowVendorList(true)}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Vendor Name</th>
                            <th className="px-6 py-3 font-semibold text-right">Eligible</th>
                            <th className="px-6 py-3 font-semibold text-right">Ineligible</th>
                            <th className="px-6 py-3 font-semibold text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {VENDOR_ITC_DATA.slice(0, 5).map((item, idx) => (
                            <tr key={idx} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <p className="font-medium text-gray-900 min-w-[150px]">{item.name}</p>
                                <p className="text-xs text-gray-400 font-mono">{item.gstin}</p>
                            </td>
                            <td className="px-6 py-4 text-right font-medium text-emerald-600">{item.eligible}</td>
                            <td className="px-6 py-4 text-right font-medium text-red-500">{item.ineligible}</td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={() => setSelectedVendor(item)}
                                    className="text-gray-400 hover:text-indigo-600 p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                    <Eye className="w-4 h-4"/>
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                        <h2 className="text-lg font-bold text-gray-900">ITC Utilization</h2>
                        <ITCChartToggle type={chartType} onChange={setChartType} />
                    </div>
                    <ITCAnalysisChart type={chartType} />
                    <div className="mt-4 space-y-3">
                        <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                            <span className="flex items-center text-gray-600"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>Eligible</span>
                            <span className="font-semibold">75%</span>
                        </div>
                         <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                            <span className="flex items-center text-gray-600"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>Pending</span>
                            <span className="font-semibold">15%</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span className="flex items-center text-gray-600"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>Ineligible</span>
                            <span className="font-semibold">10%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* ... rest of the file ... */}
      {activeTab === 'reconciliation' && (
          <div className="space-y-6 animate-in fade-in duration-300">
               <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                   <div>
                       <h3 className="font-bold text-indigo-900">Reconciliation Action Center</h3>
                       <p className="text-sm text-indigo-700">You have 5 invoices missing in GSTR-2B compared to your Purchase Register.</p>
                   </div>
                   <div className="flex space-x-2">
                       <button className="px-4 py-2 bg-white text-indigo-700 font-medium rounded-lg text-sm border border-indigo-200 hover:bg-indigo-100 transition-colors">
                           Upload Purchase Register
                       </button>
                       <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                           Auto-Reconcile
                       </button>
                   </div>
               </div>

               {/* Missing Invoices Table */}
               <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Mismatch Report</h2>
                    </div>
                    <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 font-semibold min-w-[140px]">Invoice Details</th>
                            <th className="px-6 py-4 font-semibold min-w-[120px]">Vendor</th>
                            <th className="px-6 py-4 font-semibold text-right">Amount</th>
                            <th className="px-6 py-4 font-semibold text-center">Source</th>
                            <th className="px-6 py-4 font-semibold text-center">Status</th>
                            <th className="px-6 py-4 font-semibold text-right min-w-[140px]">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {MISSING_INVOICES.map((item, idx) => (
                            <tr key={idx} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <p className="font-bold text-gray-900">{item.number}</p>
                                <p className="text-xs text-gray-500">{item.date}</p>
                            </td>
                            <td className="px-6 py-4 text-gray-500 font-mono text-xs">{item.vendor}</td>
                            <td className="px-6 py-4 text-gray-900 font-bold text-right">{item.amount}</td>
                            <td className="px-6 py-4 text-center">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Purchase Reg</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                                    ${item.status === 'Missing' ? 'bg-red-50 text-red-700 border-red-100' : 
                                    item.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                <button className="text-emerald-600 hover:text-emerald-800 text-xs font-bold bg-emerald-50 px-2 py-1 rounded">Accept</button>
                                <button className="text-red-600 hover:text-red-800 text-xs font-bold bg-red-50 px-2 py-1 rounded">Reject</button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
          </div>
      )}

      {activeTab === 'gstr2b' && (
          <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-gray-200 border-dashed animate-in fade-in zoom-in-95">
              <div className="text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">GSTR-2B Data View</h3>
                  <p className="text-gray-500 text-sm mb-4">Connect GSTIN to fetch real-time GSTR-2B data.</p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Connect Portal</button>
              </div>
          </div>
      )}
    </div>
  );
};

export default ITC;