import React from 'react';
import { X, Crown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    featureName: string;
}

const UpgradeModal = ({ isOpen, onClose, featureName }: UpgradeModalProps) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform scale-100 transition-all">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Crown className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Upgrade to Access</h3>
                    <p className="text-indigo-100 text-sm">
                        The <span className="font-semibold text-white">"{featureName}"</span> feature is available on Business & CA plans.
                    </p>
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>
                
                <div className="p-6">
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3 flex-shrink-0">
                                <Check className="w-3 h-3 text-emerald-600" />
                            </div>
                            <span className="text-sm text-gray-600">Unlock advanced GST analytics</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3 flex-shrink-0">
                                <Check className="w-3 h-3 text-emerald-600" />
                            </div>
                            <span className="text-sm text-gray-600">Unlimited export options</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3 flex-shrink-0">
                                <Check className="w-3 h-3 text-emerald-600" />
                            </div>
                            <span className="text-sm text-gray-600">Priority support access</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/subscription')}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 mb-3"
                    >
                        View Upgrade Plans
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpgradeModal;