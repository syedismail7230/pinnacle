import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, ChevronDown, ChevronUp, Send, Lock, User, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';
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

// Mock Tickets
const MOCK_TICKETS = [
    { id: 'TCK-1023', user: 'Sarah Chen', email: 'sarah@example.com', subject: 'Billing Issue', message: 'I was charged twice for this month subscription.', status: 'Open', date: '2 hours ago', priority: 'High' },
    { id: 'TCK-1022', user: 'Michael Brown', email: 'mike@example.com', subject: 'GSTR-3B Mismatch', message: 'The ITC numbers in the dashboard do not match my 2A.', status: 'Pending', date: '1 day ago', priority: 'Medium' },
    { id: 'TCK-1021', user: 'David Lee', email: 'david@example.com', subject: 'Feature Request', message: 'Can you add CSV export for compliance reports?', status: 'Closed', date: '3 days ago', priority: 'Low' },
    { id: 'TCK-1020', user: 'Fatima Khan', email: 'fatima@example.com', subject: 'Login Trouble', message: 'I cannot reset my password via OTP.', status: 'Closed', date: '5 days ago', priority: 'High' },
];

const TicketResolveModal = ({ isOpen, onClose, ticket, onResolve }: any) => {
    const [reply, setReply] = useState('');
    
    if (!isOpen || !ticket) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-0 overflow-hidden">
                 <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Resolve Ticket: {ticket.id}</h3>
                    <button onClick={onClose}><X className="w-5 h-5 text-gray-500 hover:text-gray-700" /></button>
                </div>
                <div className="p-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">User Inquiry:</p>
                        <p className="text-sm text-gray-800 italic">"{ticket.message}"</p>
                    </div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Response</label>
                    <textarea 
                        className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-4"
                        placeholder="Type your reply to the user..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                    ></textarea>

                    <div className="flex gap-3">
                         <button 
                            onClick={() => { onResolve(ticket.id, 'Pending'); onClose(); }}
                            className="flex-1 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
                        >
                            Mark Pending
                        </button>
                        <button 
                            onClick={() => { onResolve(ticket.id, 'Closed'); onClose(); }}
                            className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center"
                        >
                            Send & Close Ticket <Send className="w-3 h-3 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminTicketView = () => {
    const [tickets, setTickets] = useState(MOCK_TICKETS);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);

    const handleResolve = (id: string, newStatus: string) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
    };

    return (
        <div className="space-y-6">
             <TicketResolveModal 
                isOpen={!!selectedTicket} 
                onClose={() => setSelectedTicket(null)} 
                ticket={selectedTicket}
                onResolve={handleResolve}
            />

             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
                        Support Ticket Queue
                    </h2>
                    <div className="flex space-x-2">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">{tickets.length} Total</span>
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold">{tickets.filter(t => t.status === 'Open').length} Open</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Ticket ID</th>
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Subject</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Priority</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-gray-500 text-xs">{ticket.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{ticket.user}</p>
                                        <p className="text-xs text-gray-500">{ticket.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{ticket.subject}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center w-fit ${
                                            ticket.status === 'Open' ? 'bg-amber-100 text-amber-700' :
                                            ticket.status === 'Pending' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {ticket.status === 'Open' && <AlertCircle className="w-3 h-3 mr-1" />}
                                            {ticket.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                                            {ticket.status === 'Closed' && <CheckCircle className="w-3 h-3 mr-1" />}
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium ${
                                            ticket.priority === 'High' ? 'text-red-600' :
                                            ticket.priority === 'Medium' ? 'text-amber-600' : 'text-green-600'
                                        }`}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">{ticket.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        {ticket.status !== 'Closed' && (
                                            <button 
                                                onClick={() => setSelectedTicket(ticket)}
                                                className="text-indigo-600 hover:text-indigo-800 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                                            >
                                                Resolve
                                            </button>
                                        )}
                                        {ticket.status === 'Closed' && (
                                            <span className="text-xs text-gray-400 font-medium">Archived</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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
    const isAdmin = user?.role === 'admin';

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

    if (isAdmin) {
        return (
            <div className="space-y-8">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Support Control</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage, reply to, and resolve user support tickets.</p>
                </div>
                <AdminTicketView />
            </div>
        );
    }

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