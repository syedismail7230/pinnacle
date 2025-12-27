import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, ChevronDown, ChevronUp, Send, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UpgradeModal from '../components/UpgradeModal';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-medium text-gray-900 text-sm">{question}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
            </button>
            {isOpen && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {answer}
                </div>
            )}
        </div>
    );
};

const Support = () => {
    const { user } = useAuth();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    const [showUpgrade, setShowUpgrade] = useState(false);
    const isIndividual = user?.userType === 'Individual';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate API call
        setTimeout(() => {
            setSubject('');
            setMessage('');
            setSubmitted(false);
            alert('Ticket created successfully! We will contact you shortly.');
        }, 1500);
    };

    return (
        <div className="space-y-8">
            <UpgradeModal 
                isOpen={showUpgrade} 
                onClose={() => setShowUpgrade(false)} 
                featureName="Priority Phone Support" 
            />

            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
                <p className="text-gray-500 text-sm mt-1">Need help? We are here for you. Browse FAQs or contact our support team.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
                                Create a Support Ticket
                            </h2>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                                        <input type="text" value={user?.name} disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                                        <input type="text" value={user?.email} disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                                    <select 
                                        value={subject} 
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                        required
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="Billing">Billing & Subscription</option>
                                        <option value="Technical">Technical Issue</option>
                                        <option value="Feature">Feature Request</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
                                    <textarea 
                                        rows={5}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                                        placeholder="Describe your issue in detail..."
                                        required
                                    ></textarea>
                                </div>
                                <div className="pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={submitted}
                                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center shadow-lg shadow-indigo-200 disabled:opacity-70"
                                    >
                                        {submitted ? 'Sending...' : (
                                            <>
                                                Send Message <Send className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Contact Info & FAQs */}
                <div className="space-y-6">
                    <div className="bg-indigo-600 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="text-lg font-bold mb-4">Contact Us Directly</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-indigo-200">Email Support</p>
                                    <p className="font-semibold text-sm">support@pinnaclegst.com</p>
                                </div>
                            </div>
                            
                            {/* Phone Support (Locked for Individuals) */}
                            <div 
                                className={`flex items-center rounded-xl p-2 -ml-2 transition-all ${isIndividual ? 'cursor-pointer hover:bg-white/10' : ''}`}
                                onClick={() => isIndividual && setShowUpgrade(true)}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm ${isIndividual ? 'bg-gray-400/30' : 'bg-white/20'}`}>
                                    {isIndividual ? <Lock className="w-5 h-5 text-gray-300" /> : <Phone className="w-5 h-5 text-white" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className={`text-xs ${isIndividual ? 'text-gray-300' : 'text-indigo-200'}`}>Phone Support</p>
                                        {isIndividual && <span className="text-[10px] bg-white/20 px-1.5 rounded text-white font-bold">PRO</span>}
                                    </div>
                                    <p className={`font-semibold text-sm ${isIndividual ? 'text-gray-300 blur-[2px]' : ''}`}>+91 1800-123-4567</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-3">
                            <FAQItem 
                                question="How do I connect my GST Portal?" 
                                answer="Go to Settings > GST Connection. Enter your GST username and verify via OTP sent to your registered mobile number." 
                            />
                            <FAQItem 
                                question="Is my financial data secure?" 
                                answer="Yes, we use AES-256 encryption for all data at rest and SSL/TLS for data in transit. We do not share your data with third parties." 
                            />
                            <FAQItem 
                                question="How can I upgrade my plan?" 
                                answer="Navigate to the Subscription page from the user menu to view and select upgrade options." 
                            />
                             <FAQItem 
                                question="What happens if I exceed my GSTIN limit?" 
                                answer="You will be prompted to upgrade to a Business or CA plan to add more GSTINs." 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;