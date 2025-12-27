import React, { useState } from 'react';
import { FileText, FileSpreadsheet, Download, Check, Copy, Share2, Zap, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UpgradeModal from '../components/UpgradeModal';

const Settings = () => {
  const { user } = useAuth();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState('');

  const isIndividual = user?.userType === 'Individual';

  const handleExport = (type: string) => {
    // Restrict CSV and Excel for Individual plan
    if (isIndividual && (type === 'Excel' || type === 'CSV' || type === 'Custom')) {
        setUpgradeFeature('Unlimited Data Export');
        setShowUpgrade(true);
        return;
    }

    setExporting(type);
    setTimeout(() => {
        setExporting(null);
        alert(`${type} export completed successfully! Check your downloads.`);
    }, 1500);
  };

  const copyReferralCode = () => {
    if (user?.referralCode) {
        navigator.clipboard.writeText(user.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
       <UpgradeModal 
          isOpen={showUpgrade} 
          onClose={() => setShowUpgrade(false)} 
          featureName={upgradeFeature} 
       />

       <div className="flex flex-col">
         <h1 className="text-2xl font-bold text-gray-900">Export & Settings</h1>
         <p className="text-gray-500 text-sm mt-1">Manage your data exports and personalize your application settings.</p>
       </div>

       {/* Referral Program */}
       <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl shadow-lg text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 text-indigo-200 text-sm font-semibold uppercase tracking-wider">
                            <Zap className="w-4 h-4" /> Referral Program
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Refer Friends & Earn Credits</h2>
                        <p className="text-indigo-100 max-w-lg mb-6">
                            Share your unique referral code with friends. They get <span className="font-bold text-white">5 free credits</span> on signup, and you earn <span className="font-bold text-white">10 credits</span> for every successful referral!
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 font-mono text-lg font-bold tracking-widest">
                                {user?.referralCode || 'LOADING'}
                            </div>
                            <button 
                                onClick={copyReferralCode}
                                className="bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                {copied ? 'Copied' : 'Copy Code'}
                            </button>
                        </div>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10 min-w-[200px] text-center">
                        <div className="text-sm text-indigo-200 mb-1">Your Balance</div>
                        <div className="text-4xl font-bold mb-1">{user?.credits || 0}</div>
                        <div className="text-xs text-indigo-300">Credits Available</div>
                    </div>
                </div>
            </div>
       </div>

       {/* Export Section */}
       <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Export Data</h2>
          <p className="text-sm text-gray-500 mb-6">Download your GST data in various formats.</p>

          <div className="flex flex-col md:flex-row gap-8">
             <div className="flex-1 space-y-3">
                 <button 
                    onClick={() => handleExport('Excel')}
                    disabled={!!exporting}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-70 group"
                 >
                     <div className="flex items-center">
                        <FileSpreadsheet className={`w-4 h-4 mr-3 ${isIndividual ? 'text-gray-400' : 'text-emerald-600'}`} /> 
                        <span className={isIndividual ? 'text-gray-400' : ''}>Export to Excel</span>
                     </div>
                     {isIndividual ? <Lock className="w-3.5 h-3.5 text-gray-400" /> : exporting === 'Excel' && <span className="text-xs text-indigo-600 animate-pulse">Processing...</span>}
                 </button>
                 <button 
                    onClick={() => handleExport('PDF')}
                    disabled={!!exporting}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-70"
                 >
                     <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-3 text-red-600" /> 
                        Export to PDF
                     </div>
                     {exporting === 'PDF' && <span className="text-xs text-indigo-600 animate-pulse">Processing...</span>}
                 </button>
                 <button 
                    onClick={() => handleExport('CSV')}
                    disabled={!!exporting}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-70 group"
                 >
                     <div className="flex items-center">
                        <Download className={`w-4 h-4 mr-3 ${isIndividual ? 'text-gray-400' : 'text-blue-600'}`} /> 
                         <span className={isIndividual ? 'text-gray-400' : ''}>Export Transactions (CSV)</span>
                     </div>
                     {isIndividual ? <Lock className="w-3.5 h-3.5 text-gray-400" /> : exporting === 'CSV' && <span className="text-xs text-indigo-600 animate-pulse">Processing...</span>}
                 </button>
             </div>
             
             <div className="flex-1 space-y-4 relative">
                 {isIndividual && (
                     <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px] rounded-lg border border-gray-100 border-dashed">
                         <div className="text-center">
                             <Lock className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                             <span className="text-xs font-semibold text-gray-500">Upgrade for Custom Exports</span>
                         </div>
                     </div>
                 )}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range (optional)</label>
                    <input type="text" value="Last 30 days" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 bg-gray-50" readOnly />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">File Format</label>
                    <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        <option>Excel</option>
                        <option>PDF</option>
                        <option>CSV</option>
                    </select>
                 </div>
                 <button 
                    onClick={() => handleExport('Custom')}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center justify-center mt-4 transition-transform active:scale-95 shadow-sm"
                 >
                    <Download className="w-4 h-4 mr-2" /> Initiate Custom Export
                 </button>
             </div>
          </div>
       </div>

       {/* User Settings */}
       <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">User Settings</h2>
          <p className="text-sm text-gray-500 mb-8">Update your profile, notification preferences, and GSTIN status.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile */}
              <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Profile Information</h3>
                  <div>
                      <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                      <div className="flex items-center px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                          <span className="text-sm text-gray-900">{user?.name}</span>
                      </div>
                  </div>
                  <div>
                      <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                      <div className="flex items-center px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                          <span className="text-sm text-gray-900">{user?.phoneNumber}</span>
                      </div>
                  </div>
              </div>

              {/* Notifications */}
              <div className="space-y-6">
                  <h3 className="text-sm font-medium text-gray-900">Notification Preferences</h3>
                  <div className="flex items-center justify-between">
                      <div>
                          <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                          <p className="text-xs text-gray-500">Receive updates and alerts via email.</p>
                      </div>
                      <button 
                        onClick={() => setEmailNotifs(!emailNotifs)}
                        className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${emailNotifs ? 'bg-indigo-600' : 'bg-gray-200'}`}
                      >
                          <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${emailNotifs ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                  </div>
                  <div className="flex items-center justify-between">
                      <div>
                          <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                          <p className="text-xs text-gray-500">Get critical alerts directly to your phone.</p>
                      </div>
                      <button 
                        onClick={() => setSmsNotifs(!smsNotifs)}
                        className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${smsNotifs ? 'bg-indigo-600' : 'bg-gray-200'}`}
                      >
                          <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${smsNotifs ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                  </div>
              </div>

              {/* GSTIN Status */}
              <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">GSTIN Connection Status</h3>
                  <div className="flex justify-between items-center bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                     <div>
                        <p className="text-sm font-semibold text-emerald-900">Connected</p>
                        <p className="text-xs text-emerald-600">Sync is active.</p>
                     </div>
                     <Check className="w-5 h-5 text-emerald-600" />
                  </div>
                  <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors">
                     ⟳ Re-verify GSTIN
                  </button>
              </div>
          </div>
       </div>
    </div>
  );
};

export default Settings;