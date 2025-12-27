import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import UpgradeModal from '../components/UpgradeModal';
import { Plus, Trash2, Building2, CheckCircle, Lock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const GSTConnect = () => {
  const { user, connectGSTIN } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState('');

  // Prefill from Overview redirect
  useEffect(() => {
      if (location.state?.prefillGSTIN) {
          setUsername(location.state.prefillGSTIN);
          // Auto scroll to form
          setTimeout(() => {
             document.getElementById('connect-form')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
      }
  }, [location]);

  const connectedGSTINs = user?.connectedGSTINs || [];

  const maxGSTINs = user?.userType === 'Individual' ? 1 : user?.userType === 'Business' ? 5 : 999;
  const isLimitReached = connectedGSTINs.length >= maxGSTINs;

  const handleStartConnect = () => {
      if (isLimitReached) {
          setUpgradeFeature(user?.userType === 'Individual' ? 'Multiple GSTINs' : 'Unlimited GSTINs');
          setShowUpgrade(true);
      } else {
          setStep(1);
          setUsername('');
          setOtp(['','','','','','']);
          document.getElementById('connect-form')?.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const handleSendOTP = () => {
    if (username) setStep(2);
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value !== '') {
        (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleVerify = () => {
     // Save to global context
     const name = username.length === 15 ? 'Primary Business' : username; // Heuristic for name
     connectGSTIN(username, name);
     
     alert('GSTIN Connected Successfully! Redirecting to Dashboard...');
     setTimeout(() => {
         navigate('/dashboard/overview');
     }, 1000);
  };

  return (
    <div className="space-y-8">
       <UpgradeModal 
          isOpen={showUpgrade} 
          onClose={() => setShowUpgrade(false)} 
          featureName={upgradeFeature} 
       />

       <div className="flex flex-col">
         <h1 className="text-2xl font-bold text-gray-900">Connect Your GSTIN</h1>
         <p className="text-gray-500 text-sm mt-1 max-w-2xl">Manage your connected GST Portals. {user?.userType} plan allows up to {maxGSTINs === 999 ? 'Unlimited' : maxGSTINs} GSTINs.</p>
       </div>

       {/* Connected List */}
       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Connected Accounts ({connectedGSTINs.length}/{maxGSTINs === 999 ? '∞' : maxGSTINs})</h3>
               {isLimitReached && (
                   <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg flex items-center">
                       <Lock className="w-3 h-3 mr-1" /> Plan Limit Reached
                   </span>
               )}
           </div>
           <div className="divide-y divide-gray-100">
               {connectedGSTINs.length > 0 ? (
                   connectedGSTINs.map((item) => (
                   <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                       <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                               <Building2 className="w-5 h-5" />
                           </div>
                           <div>
                               <p className="font-bold text-gray-900 text-sm">{item.gstin}</p>
                               <p className="text-xs text-gray-500">{item.name}</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-4">
                           <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                               <CheckCircle className="w-3 h-3 mr-1" /> Synced
                           </span>
                           <button className="text-gray-400 hover:text-red-500 transition-colors">
                               <Trash2 className="w-4 h-4" />
                           </button>
                       </div>
                   </div>
               ))) : (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        No GSTINs connected yet. Connect one below to get started.
                    </div>
               )}
               
               {/* Add New Button */}
               <div className="p-4 bg-gray-50/50">
                   <button 
                       onClick={handleStartConnect}
                       className={`w-full border-2 border-dashed rounded-xl p-4 flex items-center justify-center transition-all group
                           ${isLimitReached 
                               ? 'border-gray-200 text-gray-400 cursor-pointer hover:bg-gray-50' 
                               : 'border-indigo-200 text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50'
                           }`}
                   >
                       {isLimitReached ? (
                           <div className="flex items-center">
                               <Lock className="w-4 h-4 mr-2" />
                               <span className="text-sm font-medium">Upgrade to add more GSTINs</span>
                           </div>
                       ) : (
                           <div className="flex items-center">
                               <Plus className="w-4 h-4 mr-2" />
                               <span className="text-sm font-medium">Connect Another GSTIN</span>
                           </div>
                       )}
                   </button>
               </div>
           </div>
       </div>

       {/* Connection Form */}
       {!isLimitReached && (
           <div id="connect-form" className="flex justify-center mt-8 animate-in fade-in slide-in-from-bottom-4">
              {step === 1 ? (
                 <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 w-full max-w-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">New Connection</h2>
                    <p className="text-sm text-gray-500 mb-6">Enter your GST Portal Username or GSTIN to send an OTP and establish a secure connection.</p>
                    
                    <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">GST Username / GSTIN</label>
                         <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toUpperCase())}
                            placeholder="e.g. 27ABCDE1234F1Z5"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white text-gray-900 uppercase"
                         />
                       </div>
                       <button 
                         onClick={handleSendOTP}
                         disabled={!username}
                         className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors cursor-pointer shadow-lg shadow-indigo-200"
                       >
                         Send OTP
                       </button>
                    </div>
                 </div>
              ) : (
                 <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 w-full max-w-lg text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Verify Connection</h2>
                    <p className="text-sm text-gray-500 mb-8">Enter the 6-digit OTP sent to the registered mobile number linked to <span className="font-bold text-gray-900">{username}</span>.</p>
                    
                    <div className="flex justify-center space-x-3 mb-8">
                      {otp.map((data, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={data}
                          onChange={(e) => handleOtpChange(e.target, index)}
                          className="w-12 h-14 border border-gray-200 rounded-lg text-center text-xl font-bold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50 text-gray-900"
                        />
                      ))}
                    </div>
    
                    <button 
                         onClick={handleVerify}
                         className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors cursor-pointer mb-4 shadow-lg shadow-indigo-200"
                    >
                         Verify & Connect
                    </button>
                    <button 
                        onClick={() => setStep(1)}
                        className="text-gray-500 text-sm hover:text-indigo-600"
                    >
                        Back to Username
                    </button>
                 </div>
              )}
           </div>
       )}
    </div>
  );
};

export default GSTConnect;