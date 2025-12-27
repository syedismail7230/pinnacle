import React, { useState } from 'react';
import { Download, ChevronLeft, ChevronRight, Calendar, Filter, Plus, X, MapPin, Search, BarChart3, LineChart, Activity } from 'lucide-react';
import { SalesAnalysisChart } from '../components/Charts';
import { CHART_DATA_SALES_TREND, MOCK_SALES_TRANSACTIONS } from '../constants';

const SalesCard = ({ title, value, change, icon, iconBg }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <div className="text-sm font-semibold text-gray-500 mb-2">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      <div className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        {change}
      </div>
    </div>
    <div className={`p-3 rounded-xl ${iconBg}`}>
      {icon}
    </div>
  </div>
);

const ChartToggle = ({ type, onChange }: { type: string, onChange: (t: any) => void }) => (
    <div className="flex bg-gray-100 p-1 rounded-lg">
        <button 
            onClick={() => onChange('bar')}
            className={`p-1.5 rounded-md transition-all ${type === 'bar' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            title="Bar Chart"
        >
            <BarChart3 className="w-4 h-4" />
        </button>
        <button 
            onClick={() => onChange('line')}
            className={`p-1.5 rounded-md transition-all ${type === 'line' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
             title="Line Chart"
        >
            <LineChart className="w-4 h-4" />
        </button>
        <button 
            onClick={() => onChange('area')}
            className={`p-1.5 rounded-md transition-all ${type === 'area' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
             title="Area Chart"
        >
            <Activity className="w-4 h-4" />
        </button>
    </div>
);

const InvoiceModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col m-4">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Create New Invoice</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Customer Name</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder-gray-400 font-medium text-gray-900" 
                                    placeholder="Search or select customer..." 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Invoice Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="date" 
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium text-gray-900" 
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100">
                             <h4 className="text-sm font-bold text-gray-900">Items & Services</h4>
                             <span className="text-xs text-gray-400">Add products to invoice</span>
                        </div>
                        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-200 overflow-x-auto">
                             <div className="grid grid-cols-12 gap-3 mb-2 text-xs font-bold text-gray-500 min-w-[500px] uppercase tracking-wider">
                                 <div className="col-span-5 pl-1">Item Description</div>
                                 <div className="col-span-2">Qty</div>
                                 <div className="col-span-2">Rate</div>
                                 <div className="col-span-3 text-right pr-1">Total</div>
                             </div>
                             <div className="grid grid-cols-12 gap-3 mb-3 min-w-[500px] items-center group">
                                 <div className="col-span-5">
                                     <input 
                                        type="text" 
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder-gray-400 text-gray-900" 
                                        placeholder="e.g. Web Design Services" 
                                     />
                                 </div>
                                 <div className="col-span-2">
                                     <input 
                                        type="number" 
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder-gray-400 text-gray-900" 
                                        placeholder="1" 
                                     />
                                 </div>
                                 <div className="col-span-2">
                                     <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">₹</span>
                                        <input 
                                            type="number" 
                                            className="w-full pl-6 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder-gray-400 text-gray-900" 
                                            placeholder="0.00" 
                                        />
                                     </div>
                                 </div>
                                 <div className="col-span-3 text-right flex items-center justify-end font-mono text-sm font-bold text-gray-900 pr-1">
                                     ₹ 0.00
                                 </div>
                             </div>
                             <button className="text-sm text-indigo-600 font-bold hover:text-indigo-700 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors flex items-center mt-2 -ml-2">
                                 <Plus className="w-4 h-4 mr-1.5" /> Add Line Item
                             </button>
                        </div>
                    </div>
                    
                    {/* Summary Section */}
                    <div className="flex justify-end pt-2">
                        <div className="w-full max-w-xs space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>₹ 0.00</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>GST (18%)</span>
                                <span>₹ 0.00</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-bold text-gray-900">
                                <span>Total Amount</span>
                                <span>₹ 0.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-xl transition-colors">Cancel</button>
                    <button onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]">Generate Invoice</button>
                </div>
            </div>
        </div>
    );
};

const FullReportModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col m-4">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Full Sales Register Report</h3>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hidden sm:flex">
                            <Download className="w-4 h-4 mr-2" /> Export PDF
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>
                <div className="p-4 border-b border-gray-100 bg-white flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                     <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search invoices..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-gray-900" />
                    </div>
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700">
                        <option>All Types</option>
                        <option>B2B</option>
                        <option>B2C</option>
                    </select>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Invoice No.</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Date</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Customer</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Type</th>
                            <th className="px-6 py-3 font-semibold text-right whitespace-nowrap">Taxable</th>
                            <th className="px-6 py-3 font-semibold text-right whitespace-nowrap">GST</th>
                            <th className="px-6 py-3 font-semibold text-right whitespace-nowrap">Total</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {[...MOCK_SALES_TRANSACTIONS, ...MOCK_SALES_TRANSACTIONS, ...MOCK_SALES_TRANSACTIONS].map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-mono text-gray-900 whitespace-nowrap">{item.invoiceNo}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.date}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.customer}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.type === 'B2B' ? 'bg-indigo-50 text-indigo-700' : 'bg-blue-50 text-blue-700'}`}>{item.type}</span>
                            </td>
                            <td className="px-6 py-4 text-right text-gray-600 whitespace-nowrap">{item.taxableValue}</td>
                            <td className="px-6 py-4 text-right text-gray-600 whitespace-nowrap">{item.gstAmount}</td>
                            <td className="px-6 py-4 text-right font-bold text-gray-900 whitespace-nowrap">{item.totalValue}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <span className="text-sm text-gray-500">1-15 of 45</span>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50">Prev</button>
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Sales = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [chartType, setChartType] = useState<'area' | 'bar' | 'line'>('area');

  const handleExport = () => {
    alert("Downloading Sales Register...");
  };

  return (
    <div className="space-y-6">
      <InvoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <FullReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
           <h1 className="text-2xl font-bold text-gray-900">Sales Overview</h1>
           <p className="text-gray-500 text-sm mt-1">Breakdown of B2B, B2C, and export sales performance.</p>
        </div>
        <div className="flex space-x-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="relative hidden md:block">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block pl-10 pr-8 py-2.5 shadow-sm outline-none cursor-pointer hover:border-indigo-300 transition-colors">
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
          </div>
          <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SalesCard 
          title="B2B Sales" 
          value="₹2,35,450" 
          change="+12.5% vs. last month" 
          icon={<div className="text-indigo-600 font-bold text-lg">🏢</div>} 
          iconBg="bg-indigo-50" 
        />
        <SalesCard 
          title="B2C Sales" 
          value="₹82,120" 
          change="-3.2% vs. last month" 
          icon={<div className="text-blue-600 font-bold text-lg">👤</div>} 
          iconBg="bg-blue-50" 
        />
        <SalesCard 
          title="Export Sales" 
          value="₹1,55,000" 
          change="+25% vs. last month" 
          icon={<div className="text-amber-600 font-bold text-lg">🌐</div>} 
          iconBg="bg-amber-50" 
        />
        <SalesCard 
          title="Total Tax Liability" 
          value="₹75,890" 
          change="+8.1% vs. last month" 
          icon={<div className="text-red-600 font-bold text-lg">🏛️</div>} 
          iconBg="bg-red-50" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Monthly Sales Trend</h2>
                    <div className="text-3xl font-bold text-gray-900 mt-2">₹ 3,10,000</div>
                </div>
                <div className="flex items-center gap-3">
                   <ChartToggle type={chartType} onChange={setChartType} />
                   <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-lg">+12.5% vs last year</span>
                </div>
            </div>
            <SalesAnalysisChart data={CHART_DATA_SALES_TREND} type={chartType} />
          </div>

          {/* Top Customers & Geo */}
          <div className="space-y-6">
               <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                   <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Top Customers</h2>
                   <div className="space-y-4">
                       {[
                           { name: 'Global Solutions', amt: '₹ 1.2L', trend: 'up' },
                           { name: 'Tech Inno Pvt', amt: '₹ 85K', trend: 'up' },
                           { name: 'Export Traders', amt: '₹ 75K', trend: 'down' },
                       ].map((cust, i) => (
                           <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                               <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">{cust.name.charAt(0)}</div>
                                   <span className="text-sm font-medium text-gray-700">{cust.name}</span>
                               </div>
                               <span className="text-sm font-bold text-gray-900">{cust.amt}</span>
                           </div>
                       ))}
                   </div>
               </div>
               
               <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                   <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Geographic Reach</h2>
                   <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center text-gray-600"><MapPin className="w-3 h-3 mr-2" /> Maharashtra</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[60%]"></div>
                                </div>
                                <span className="text-xs font-mono">60%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center text-gray-600"><MapPin className="w-3 h-3 mr-2" /> Karnataka</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[25%]"></div>
                                </div>
                                <span className="text-xs font-mono">25%</span>
                            </div>
                        </div>
                   </div>
               </div>
          </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Detailed Sales Transactions</h2>
            <button 
                onClick={() => setIsReportModalOpen(true)}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline hidden sm:block"
            >
                Full Report
            </button>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
             <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
               <tr>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Invoice No.</th>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Date</th>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Customer</th>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Type</th>
                 <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">Taxable Value</th>
                 <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">GST Amount</th>
                 <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">Total Value</th>
               </tr>
             </thead>
             <tbody>
               {MOCK_SALES_TRANSACTIONS.map((item, idx) => (
                 <tr key={idx} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                   <td className="px-6 py-4 font-medium text-gray-900 font-mono text-xs whitespace-nowrap">
                     {item.invoiceNo}
                   </td>
                   <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.date}</td>
                   <td className="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">{item.customer}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                       item.type === 'B2B' ? 'bg-indigo-100 text-indigo-700' :
                       item.type === 'B2C' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                     }`}>
                       {item.type}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right text-gray-600 whitespace-nowrap">{item.taxableValue}</td>
                   <td className="px-6 py-4 text-right text-gray-600 whitespace-nowrap">{item.gstAmount}</td>
                   <td className="px-6 py-4 text-right font-bold text-gray-900 whitespace-nowrap">{item.totalValue}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
           <span className="text-sm text-gray-500">Showing 1 - 5 of 15 records</span>
           <div className="flex space-x-2">
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-white bg-white shadow-sm disabled:opacity-50 transition-colors hover:text-indigo-600">
                 <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-white bg-white shadow-sm transition-colors hover:text-indigo-600">
                 <ChevronRight className="w-4 h-4" />
              </button>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Sales;