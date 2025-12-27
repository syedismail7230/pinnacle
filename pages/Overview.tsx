import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinancialChart, LiabilityChart } from '../components/Charts';
import { CHART_DATA_OVERVIEW, CHART_DATA_LINE } from '../constants';
import { TrendingUp, TrendingDown, IndianRupee, Wallet, PieChart, AlertCircle, Calendar, Clock, ChevronRight, ChevronDown, BarChart3, LineChart, Activity, Lock, Check, FileText, Building2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UpgradeModal from '../components/UpgradeModal';

const GSTPromptModal = ({ isOpen, onSubmit }: { isOpen: boolean; onSubmit: (gstin: string) => void }) => {
    const [gstin, setGstin] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                
                <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-7 h-7 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Business</h2>
                    <p className="text-gray-500 text-sm">To generate reports and view analytics, please enter your GST Identification Number.</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 ml-1">Enter GST Number</label>
                        <input 
                            type="text" 
                            value={gstin}
                            onChange={(e) => setGstin(e.target.value.toUpperCase())}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg font-mono placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all uppercase"
                            placeholder="27ABCDE1234F1Z5"
                            maxLength={15}
                        />
                    </div>
                    <button 
                        onClick={() => onSubmit(gstin)}
                        disabled={gstin.length < 15}
                        className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Proceed to Connection <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                    <p className="text-xs text-center text-gray-400">Secure connection via GSTN API</p>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, change, isPositive, icon: Icon, color, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group`}
  >
    <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-xl transition-colors ${color === 'indigo' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100' : color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100' : color === 'rose' ? 'bg-rose-50 text-rose-600 group-hover:bg-rose-100' : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100'}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {change}
        </div>
    </div>
    <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-end justify-between">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{value}</div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors mb-1" />
        </div>
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

const Overview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [chartType1, setChartType1] = useState<'bar' | 'line' | 'area'>('bar');
  const [chartType2, setChartType2] = useState<'bar' | 'line' | 'area'>('line');
  
  // Upgrade Modal State
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [lockedFeature, setLockedFeature] = useState('');
  
  // GST Prompt State
  const [showGSTPrompt, setShowGSTPrompt] = useState(false);

  useEffect(() => {
    // Check if user has connected GSTINs
    if (user && user.role === 'user' && (!user.connectedGSTINs || user.connectedGSTINs.length === 0)) {
        setShowGSTPrompt(true);
    } else {
        setShowGSTPrompt(false);
    }
  }, [user]);

  const handleGSTSubmit = (gstin: string) => {
      // Redirect to connection page with state
      navigate('/gst-connection', { state: { prefillGSTIN: gstin } });
  };

  // Lock specific advanced charts for 'Individual' users
  const isIndividual = user?.userType === 'Individual';

  const handleRestrictedAccess = (feature: string) => {
      setLockedFeature(feature);
      setShowUpgrade(true);
  };

  return (
    <div className="space-y-8">
      <UpgradeModal 
        isOpen={showUpgrade} 
        onClose={() => setShowUpgrade(false)} 
        featureName={lockedFeature} 
      />

      <GSTPromptModal 
        isOpen={showGSTPrompt} 
        onSubmit={handleGSTSubmit} 
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-sm text-gray-500">
                {user?.connectedGSTINs && user.connectedGSTINs.length > 0 
                 ? `Showing data for ${user.connectedGSTINs[0].gstin}`
                 : `Welcome back, ${user?.name || 'User'}`
                }
            </p>
          </div>
          
          <div className="relative w-full sm:w-auto group">
             <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
             <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 block pl-10 pr-10 py-2.5 shadow-sm outline-none cursor-pointer hover:border-indigo-300 transition-colors"
             >
                <option>Last 30 Days</option>
                <option>This Quarter</option>
                <option>Last Quarter</option>
                <option>Financial Year to Date</option>
                <option>Last Financial Year</option>
             </select>
             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10 group-hover:text-gray-600" />
          </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="overview-stats-grid">
        <StatCard 
            title="Outward Tax Liability" 
            value="₹ 1,850,200" 
            change="8.2% MoM" 
            isPositive={true} 
            icon={IndianRupee} 
            color="rose" 
            onClick={() => navigate('/dashboard/sales')}
        />
        <StatCard 
            title="ITC Claimed" 
            value="₹ 1,520,150" 
            change="5.1% MoM" 
            isPositive={true} 
            icon={Wallet} 
            color="emerald" 
            onClick={() => navigate('/dashboard/itc')}
        />
        <StatCard 
            title="Net Tax Payable" 
            value="₹ 330,050" 
            change="12.3% MoM" 
            isPositive={false} 
            icon={PieChart} 
            color="indigo" 
            onClick={() => navigate('/dashboard/compliance')}
        />
        <StatCard 
            title="Cash vs Credit Util." 
            value="70% / 30%" 
            change="2.5% MoM" 
            isPositive={true} 
            icon={AlertCircle} 
            color="amber" 
            onClick={() => navigate('/dashboard/compliance')}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="overview-charts-section">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <span className="w-1 h-6 bg-indigo-500 rounded-full mr-3"></span>
                Sales & Purchase Trends
              </h2>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                 <ChartToggle type={chartType1} onChange={setChartType1} />
                 <button onClick={() => navigate('/dashboard/sales')} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View Details</button>
              </div>
          </div>
          <FinancialChart data={CHART_DATA_OVERVIEW} type={chartType1} />
        </div>

        {/* Locked Feature Example: Liability vs ITC Chart for Individuals */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group">
          
          {/* Lock Overlay for Individuals */}
          {isIndividual && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                      <Lock className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Advanced Liability Analytics</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-xs">Upgrade to Business or CA plan to view detailed ITC vs Liability comparisons.</p>
                  <button 
                    onClick={() => handleRestrictedAccess('Advanced Analytics')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                  >
                      Unlock Feature
                  </button>
              </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <span className="w-1 h-6 bg-emerald-500 rounded-full mr-3"></span>
                Liability vs ITC
              </h2>
               <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                 <ChartToggle type={chartType2} onChange={setChartType2} />
                 <button onClick={() => navigate('/dashboard/itc')} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View Details</button>
              </div>
          </div>
          <LiabilityChart data={CHART_DATA_LINE} type={chartType2} />
        </div>
      </div>

      {/* Bottom Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Filing Status */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900">Monthly Filing Status</h2>
                </div>
                <button onClick={() => navigate('/dashboard/compliance')} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                    Full History <ChevronRight className="w-4 h-4 ml-0.5" />
                </button>
            </div>
            
            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                        <tr>
                            <th className="px-4 py-3 font-semibold rounded-l-lg">Period</th>
                            <th className="px-4 py-3 font-semibold">GSTR-1</th>
                            <th className="px-4 py-3 font-semibold rounded-r-lg">GSTR-3B</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {[
                            { month: 'Nov 2024', gstr1: 'Filed', gstr1Date: '11 Dec', gstr3b: 'Pending', gstr3bDate: 'Due 20 Dec' },
                            { month: 'Oct 2024', gstr1: 'Filed', gstr1Date: '11 Nov', gstr3b: 'Filed', gstr3bDate: '20 Nov' },
                            { month: 'Sep 2024', gstr1: 'Filed', gstr1Date: '11 Oct', gstr3b: 'Filed', gstr3bDate: '20 Oct' },
                            { month: 'Aug 2024', gstr1: 'Filed', gstr1Date: '11 Sep', gstr3b: 'Filed', gstr3bDate: '20 Sep' },
                        ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-4 py-4 font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{row.month}</td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center">
                                        <div className={`mr-3 p-1.5 rounded-full flex-shrink-0 ${row.gstr1 === 'Filed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                            {row.gstr1 === 'Filed' ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-xs font-bold ${row.gstr1 === 'Filed' ? 'text-emerald-700' : 'text-amber-700'}`}>{row.gstr1}</span>
                                            <span className="text-xs text-gray-400 font-medium">{row.gstr1Date}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center">
                                        <div className={`mr-3 p-1.5 rounded-full flex-shrink-0 ${row.gstr3b === 'Filed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                            {row.gstr3b === 'Filed' ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-xs font-bold ${row.gstr3b === 'Filed' ? 'text-emerald-700' : 'text-amber-700'}`}>{row.gstr3b}</span>
                                            <span className="text-xs text-gray-400 font-medium">{row.gstr3bDate}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Noticed Issues */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm" id="overview-alerts-card">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-gray-900">Critical Alerts</h2>
             <button onClick={() => navigate('/dashboard/compliance')} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">Resolve</button>
          </div>
          <div className="space-y-2">
             <div className="flex items-start p-4 rounded-xl bg-red-50 border border-red-100 cursor-pointer hover:bg-red-100/50 transition-colors" onClick={() => navigate('/dashboard/itc')}>
                <div className="flex-shrink-0">
                   <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-red-800">ITC Mismatch Detected</p>
                  <p className="text-xs text-red-600 mt-1">Mismatch detected for Vendor Global Solutions Ltd (GSTIN: 27AAB...). Action required before filing.</p>
                  <p className="text-[10px] text-red-400 mt-2 font-medium uppercase">2 hours ago</p>
                </div>
             </div>

             <div className="flex items-start p-4 rounded-xl bg-amber-50 border border-amber-100 cursor-pointer hover:bg-amber-100/50 transition-colors" onClick={() => navigate('/dashboard/compliance')}>
                <div className="flex-shrink-0">
                   <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-amber-800">Filing Deadline Approaching</p>
                  <p className="text-xs text-amber-600 mt-1">Upcoming GSTR-3B filing deadline on Jul 20, 2024. Prepare your data.</p>
                  <p className="text-[10px] text-amber-400 mt-2 font-medium uppercase">1 day ago</p>
                </div>
             </div>
             
             <div className="flex items-start p-4 rounded-xl bg-blue-50 border border-blue-100 cursor-default">
                <div className="flex-shrink-0">
                   <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-blue-800">Compliance Update</p>
                  <p className="text-xs text-blue-600 mt-1">New guidelines available for e-invoicing turnover limits.</p>
                  <p className="text-[10px] text-blue-400 mt-2 font-medium uppercase">3 days ago</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;