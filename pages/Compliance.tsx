import React, { useState } from 'react';
import { ComplianceScoreChart } from '../components/Charts';
import { COMPLIANCE_ALERTS } from '../constants';
import { Clock, Scale, Percent, ExternalLink, Calculator, CalendarCheck, AlertOctagon, Check, X, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UpgradeModal from '../components/UpgradeModal';

const TaxCalculator = () => {
    const [taxable, setTaxable] = useState('');
    const [rate, setRate] = useState('18');
    
    const gstAmount = taxable ? (parseFloat(taxable) * (parseFloat(rate) / 100)).toFixed(2) : '0.00';
    const total = taxable ? (parseFloat(taxable) + parseFloat(gstAmount)).toFixed(2) : '0.00';

    return (
        <div className="bg-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-800 rounded-full opacity-50 blur-xl"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-5 h-5 text-indigo-300" />
                    <h3 className="font-bold text-lg">Quick Tax Estimator</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-indigo-200 block mb-1">Taxable Value (₹)</label>
                        <input 
                            type="number" 
                            value={taxable}
                            onChange={(e) => setTaxable(e.target.value)}
                            className="w-full bg-indigo-800/50 border border-indigo-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 text-white placeholder-indigo-400/50"
                            placeholder="e.g. 50000"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-indigo-200 block mb-1">GST Rate (%)</label>
                        <div className="flex gap-2">
                             {['5', '12', '18', '28'].map(r => (
                                 <button 
                                    key={r}
                                    onClick={() => setRate(r)}
                                    className={`flex-1 py-1 text-xs rounded border ${rate === r ? 'bg-white text-indigo-900 border-white' : 'bg-transparent border-indigo-700 text-indigo-300 hover:bg-indigo-800'}`}
                                 >
                                    {r}%
                                 </button>
                             ))}
                        </div>
                    </div>
                    <div className="pt-4 border-t border-indigo-800">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm text-indigo-300">GST Amount</span>
                            <span className="text-sm font-bold">₹ {gstAmount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-indigo-300">Total Value</span>
                            <span className="text-lg font-bold text-emerald-400">₹ {total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FilingTimeline = () => {
    const events = [
        { date: '11 Jun', title: 'GSTR-1 Filed', status: 'done', desc: 'Successfully submitted for May 2024' },
        { date: '20 Jun', title: 'GSTR-3B Due', status: 'pending', desc: 'Prepare liability offset' },
        { date: '10 Jul', title: 'GSTR-2A Gen', status: 'upcoming', desc: 'Auto-drafted statement' },
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-full">
            <div className="flex items-center gap-2 mb-6">
                <CalendarCheck className="w-5 h-5 text-gray-500" />
                <h3 className="font-bold text-gray-900">Filing Timeline</h3>
            </div>
            <div className="space-y-6 relative pl-2">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-gray-100"></div>

                {events.map((event, idx) => (
                    <div key={idx} className="relative flex items-start pl-6">
                        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white z-10
                            ${event.status === 'done' ? 'border-emerald-500 text-emerald-500' : 
                              event.status === 'pending' ? 'border-amber-500 text-amber-500' : 'border-gray-300 text-gray-300'}`}>
                            {event.status === 'done' && <Check className="w-3 h-3" />}
                            {event.status === 'pending' && <div className="w-2 h-2 rounded-full bg-amber-500"></div>}
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{event.date}</span>
                            <h4 className="text-sm font-bold text-gray-900">{event.title}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{event.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AlertDetailModal = ({ alert, isOpen, onClose }: { alert: any; isOpen: boolean; onClose: () => void }) => {
    if (!isOpen || !alert) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                 <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Compliance Alert</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-2 rounded-lg ${alert.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                            <AlertOctagon className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{alert.type}</h4>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                alert.severity === 'Critical' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                                {alert.severity} Priority
                            </span>
                        </div>
                    </div>
                    <div className="space-y-3">
                         <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-sm text-gray-700">{alert.description}</p>
                         </div>
                         <div className="flex justify-between text-sm">
                             <span className="text-gray-500">Period:</span>
                             <span className="font-semibold text-gray-900">{alert.period}</span>
                         </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 flex items-center justify-center">
                            Take Action Now <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Compliance = () => {
  const { user } = useAuth();
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const isIndividual = user?.userType === 'Individual';

  return (
    <div className="space-y-6">
      <AlertDetailModal alert={selectedAlert} isOpen={!!selectedAlert} onClose={() => setSelectedAlert(null)} />
      <UpgradeModal 
        isOpen={showUpgrade} 
        onClose={() => setShowUpgrade(false)} 
        featureName="Compliance Scoring" 
      />

      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900">GST Compliance Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Monitor your GST compliance status, track key metrics, and get real-time alerts on potential issues.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Score Area */}
          <div className="lg:col-span-3 bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group">
             
             {/* Feature Lock for Individuals */}
             {isIndividual && (
                 <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="bg-white p-4 rounded-full shadow-lg mb-4 ring-1 ring-gray-100">
                        <Lock className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Compliance Scoring</h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-sm">Get AI-driven compliance scores and actionable insights. Available on Business & CA plans.</p>
                    <button 
                        onClick={() => setShowUpgrade(true)}
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                    >
                        Unlock Feature
                    </button>
                 </div>
             )}

             <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="flex-1 text-center md:text-left">
                     <h2 className="text-lg font-bold text-gray-900 mb-2">Compliance Health</h2>
                     <p className="text-sm text-gray-500 mb-6 max-w-sm">Your compliance score is good, but attend to the pending GSTR-3B filing to reach excellent status.</p>
                     
                     <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-indigo-600">95%</div>
                            <div className="text-xs text-gray-500">On-Time Filing</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-indigo-600">2.5%</div>
                            <div className="text-xs text-gray-500">ITC Mismatch</div>
                        </div>
                         <div className="p-3 bg-gray-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-emerald-500">0</div>
                            <div className="text-xs text-gray-500">Notices</div>
                        </div>
                     </div>
                 </div>
                 <div className="w-48 flex-shrink-0">
                     <ComplianceScoreChart score={82} />
                 </div>
             </div>
          </div>

          {/* Calculator */}
          <div className="lg:col-span-1">
              <TaxCalculator />
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-red-500" />
                    Compliance Alerts
                </h2>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                 <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                   <tr>
                     <th className="px-6 py-3 font-medium">Type</th>
                     <th className="px-6 py-3 font-medium">Description</th>
                     <th className="px-6 py-3 font-medium">Period</th>
                     <th className="px-6 py-3 font-medium">Severity</th>
                     <th className="px-6 py-3 font-medium text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {COMPLIANCE_ALERTS.map((alert, idx) => (
                     <tr key={idx} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                       <td className="px-6 py-4 font-bold text-gray-900">{alert.type}</td>
                       <td className="px-6 py-4 text-gray-500">{alert.description}</td>
                       <td className="px-6 py-4 text-gray-500 font-mono text-xs">{alert.period}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                            alert.severity === 'High' ? 'bg-rose-100 text-rose-700' :
                            alert.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                         }`}>
                           {alert.severity}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setSelectedAlert(alert)}
                            className="text-gray-400 hover:text-indigo-600 p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 ml-auto" />
                          </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
          
          <div className="lg:col-span-1">
              <FilingTimeline />
          </div>
      </div>
    </div>
  );
};

export default Compliance;