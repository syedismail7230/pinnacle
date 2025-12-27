import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Phone, Hexagon, ArrowRight, Gift, User, Building2, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  // Login State
  const [phoneNumber, setPhoneNumber] = useState('9999999999');
  
  // Registration State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    userType: 'Individual',
    referralCode: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/otp', { 
        state: { 
            phoneNumber, 
            referralCode: formData.referralCode,
            // Pass registration data if in Sign Up mode
            registrationData: !isLogin ? formData : null
        } 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-6 font-sans">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 pb-0 flex flex-col items-center">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 transform -rotate-6 mb-4">
                    <Hexagon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Pinnacle Analytics</h1>
                <p className="text-gray-500 text-sm">GST Compliance & Analytics Platform</p>
            </div>
            
            <div className="p-8">
                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button 
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${!isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Create Account
                    </button>
                </div>

                {!isLogin && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 mb-6 flex items-center justify-center text-emerald-700 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                        <Gift className="w-4 h-4 mr-2" />
                        Get 5 Free Credits on Sign Up!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 ml-1">Phone Number</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                            type="text"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="block w-full pl-11 pr-3 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white text-gray-900 font-medium placeholder-gray-400"
                            placeholder="Enter 10 digit number"
                            />
                        </div>
                    </div>

                    {!isLogin && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white text-gray-900 font-medium text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Email</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white text-gray-900 font-medium text-sm"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                             </div>

                             <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">Company Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Building2 className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                        className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white text-gray-900 font-medium text-sm"
                                        placeholder="Business Name Pvt Ltd"
                                    />
                                </div>
                             </div>

                             <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">I am a...</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Individual', 'Business', 'CA'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setFormData({...formData, userType: type})}
                                            className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                                                formData.userType === type 
                                                ? 'bg-indigo-50 border-indigo-600 text-indigo-700' 
                                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                             </div>

                             <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">Referral Code <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <input
                                    type="text"
                                    value={formData.referralCode}
                                    onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
                                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white text-gray-900 font-medium placeholder-gray-400 uppercase tracking-widest text-sm"
                                    placeholder="PIN-XXXXX"
                                />
                            </div>
                        </div>
                    )}

                    {isLogin && (
                        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl text-xs text-blue-700 space-y-1">
                            <p className="font-bold flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Demo Credentials:</p>
                            <div className="pl-3.5 space-y-1 opacity-80">
                                <p>Admin: <span className="font-mono bg-blue-100 px-1 rounded">9999999999</span></p>
                                <p>User: Any other number</p>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-200 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isLogin ? 'Send Verification Code' : 'Verify & Create Account'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </form>
            </div>
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500">By continuing, you agree to our <Link to="/legal" className="text-indigo-600 hover:underline font-medium">Terms</Link> and <Link to="/legal#privacy" className="text-indigo-600 hover:underline font-medium">Privacy Policy</Link>.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const phoneNumber = location.state?.phoneNumber || '9999999999';
  const referralCode = location.state?.referralCode || '';
  const registrationData = location.state?.registrationData;

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleVerify = () => {
    // If it's a new registration, use provided user type, otherwise default logic for demo
    const role = phoneNumber === '9999999999' ? 'admin' : 'user';
    
    // Call login with registration data if available
    login(phoneNumber, role, referralCode, registrationData);
    
    if (role === 'admin') {
        navigate('/admin/customers');
    } else {
        navigate('/dashboard/overview');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-6 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
                <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-indigo-600" />
                    </div>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Verification</h1>
                <p className="text-gray-500 text-center mb-8 text-sm">Enter the 6-digit code sent to <span className="font-semibold text-gray-900">{phoneNumber}</span></p>

                <div className="flex justify-between gap-2 mb-8">
                {otp.map((data, index) => (
                    <input
                    className="w-full h-12 border border-gray-200 rounded-lg text-center text-xl font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    type="text"
                    name="otp"
                    maxLength={1}
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    />
                ))}
                </div>

                <button
                    onClick={handleVerify}
                    className="w-full py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-200 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98] mb-4"
                >
                    Verify & Proceed
                </button>

                <button className="w-full py-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    Resend Code in 30s
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};