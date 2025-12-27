import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Shield, Scale, Lock, FileText, Hexagon } from 'lucide-react';

const Legal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  useEffect(() => {
    if (location.hash === '#privacy') {
      setActiveTab('privacy');
    } else {
      setActiveTab('terms');
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/login')}>
            <Hexagon className="w-8 h-8 text-indigo-600 group-hover:rotate-12 transition-transform duration-300 ease-in-out" strokeWidth={2.5} />
            <div>
              <span className="block font-bold text-gray-900 text-lg leading-none">Pinnacle</span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">Legal Center</span>
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Intro */}
        <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Legal & Compliance</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Transparency is key to our relationship. Below you will find our comprehensive Terms of Service and Privacy Policy outlining how we operate and protect your financial data.
            </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
            <div className="bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row w-full sm:w-auto">
                <button
                    onClick={() => setActiveTab('terms')}
                    className={`flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-bold transition-all mb-1 sm:mb-0 ${
                        activeTab === 'terms' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                    <Scale className="w-4 h-4 mr-2" />
                    Terms of Service
                </button>
                <button
                    onClick={() => setActiveTab('privacy')}
                    className={`flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        activeTab === 'privacy' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy Policy
                </button>
            </div>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {activeTab === 'terms' && (
                <div className="p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
                            <p className="text-sm text-gray-500">Last Updated: January 1, 2025</p>
                        </div>
                    </div>

                    <div className="prose prose-indigo max-w-none text-gray-600 space-y-8">
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h3>
                            <p className="mb-4 text-justify">
                                By accessing or using the Pinnacle GST Analytics platform ("Service", "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service. These Terms constitute a legally binding agreement between you ("User", "Client") and Pinnacle Analytics Pvt Ltd ("Company", "we", "us").
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">2. Description of Service</h3>
                            <p className="mb-4 text-justify">
                                Pinnacle provides a cloud-based SaaS platform for Goods and Services Tax (GST) analytics, reconciliation, and compliance monitoring. The Service allows users to upload financial data, connect with GSTN APIs, visualize tax liabilities, and generate reports. 
                            </p>
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">
                                <p className="text-sm text-amber-800 font-medium">
                                    <strong>Disclaimer:</strong> Pinnacle is an analytics tool and not a substitute for professional tax advice. While we strive for accuracy, the Company is not liable for penalties, interest, or errors resulting from the use of our generated reports for official filings.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">3. User Accounts & Security</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Registration:</strong> You must provide accurate, current, and complete information during the registration process.</li>
                                <li><strong>Credentials:</strong> You are responsible for safeguarding the password and OTPs used to access the Service. You agree not to disclose your password to any third party.</li>
                                <li><strong>GSTIN Authorization:</strong> By connecting a GSTIN, you represent that you are the authorized signatory or have explicit permission from the authorized signatory to access the tax data for that entity.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">4. Subscription & Payments</h3>
                            <p className="mb-4 text-justify">
                                The Service is billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis (such as monthly or annually).
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Auto-Renewal:</strong> Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.</li>
                                <li><strong>Refunds:</strong> All fees are non-refundable except as required by law or explicitly stated in our Refund Policy.</li>
                                <li><strong>Fee Changes:</strong> We reserve the right to modify subscription fees with 30 days' notice.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">5. Intellectual Property</h3>
                            <p className="mb-4 text-justify">
                                The Service and its original content (excluding User Data), features, and functionality are and will remain the exclusive property of Pinnacle Analytics Pvt Ltd. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">6. Limitation of Liability</h3>
                            <p className="mb-4 text-justify uppercase text-sm font-semibold tracking-wide">
                                In no event shall Pinnacle Analytics Pvt Ltd, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">7. Termination</h3>
                            <p className="mb-4 text-justify">
                                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">8. Governing Law</h3>
                            <p className="mb-4 text-justify">
                                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.
                            </p>
                        </section>
                    </div>
                </div>
            )}

            {activeTab === 'privacy' && (
                <div className="p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
                            <p className="text-sm text-gray-500">Last Updated: January 1, 2025</p>
                        </div>
                    </div>

                    <div className="prose prose-indigo max-w-none text-gray-600 space-y-8">
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">1. Introduction</h3>
                            <p className="mb-4 text-justify">
                                Pinnacle Analytics Pvt Ltd ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information and financial data is collected, used, and disclosed by Pinnacle. This Privacy Policy applies to our website, and its associated subdomains (collectively, our "Service").
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">2. Information We Collect</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-gray-800">2.1 Personal Data</h4>
                                    <p className="text-sm">When you register, we collect personally identifiable information such as:</p>
                                    <ul className="list-disc pl-5 text-sm mt-2">
                                        <li>Full Name</li>
                                        <li>Email Address</li>
                                        <li>Phone Number</li>
                                        <li>Business Name & Address</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">2.2 Financial & Tax Data</h4>
                                    <p className="text-sm">To provide our analytics services, we collect:</p>
                                    <ul className="list-disc pl-5 text-sm mt-2">
                                        <li>GSTIN (Goods and Services Tax Identification Number)</li>
                                        <li>Purchase and Sales Registers (GSTR-1, GSTR-3B data)</li>
                                        <li>Authentication Tokens (API sessions with GSTN)</li>
                                        <li>Invoice level details uploaded by you</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">3. How We Use Your Information</h3>
                            <p className="mb-4 text-justify">
                                We utilize the collected data for the following purposes:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Service Provision:</strong> To reconcile your invoices, calculate tax liabilities, and generate analytics dashboards.</li>
                                <li><strong>Communication:</strong> To send critical compliance alerts (e.g., filing deadlines) and administrative information.</li>
                                <li><strong>Improvement:</strong> To analyze usage trends and improve the algorithm for matching invoices (Machine Learning models are trained on anonymized, aggregated data only).</li>
                                <li><strong>Security:</strong> To detect, prevent, and address technical issues and fraudulent activities.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">4. Data Security & Encryption</h3>
                            <p className="mb-4 text-justify">
                                We implement industry-standard security measures to protect your data:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Encryption at Rest:</strong> All sensitive financial data is encrypted using AES-256 standards in our databases.</li>
                                <li><strong>Encryption in Transit:</strong> All data transmission occurs over secure SSL/TLS channels.</li>
                                <li><strong>Access Control:</strong> Strict role-based access control (RBAC) ensures only authorized personnel have access to system architecture, not user data.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">5. Sharing of Information</h3>
                            <p className="mb-4 text-justify">
                                We do not sell your personal data. We may share information with:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Service Providers:</strong> Third-party companies (e.g., Cloud Hosting, Payment Processors) who perform services on our behalf under strict confidentiality agreements.</li>
                                <li><strong>Legal Requirements:</strong> If required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">6. Data Retention</h3>
                            <p className="mb-4 text-justify">
                                We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. Financial transaction data is retained for a period of 8 years as per the requirement of Indian Income Tax & GST laws, unless you request deletion of your account, in which case data is archived or deleted subject to legal mandates.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">7. Your Data Rights</h3>
                            <p className="mb-4 text-justify">
                                Depending on your location, you may have rights under data protection laws, including:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>The right to access, update or delete the information we have on you.</li>
                                <li>The right of rectification.</li>
                                <li>The right to object.</li>
                                <li>The right of restriction.</li>
                                <li>The right to data portability.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">8. Contact Us</h3>
                            <p className="mb-4 text-justify">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium">By email: <span className="text-indigo-600">compliance@pinnaclegst.com</span></p>
                                <p className="text-sm font-medium">By mail: Pinnacle Analytics Pvt Ltd, 123 Tech Park, Andheri East, Mumbai, 400093, India</p>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>
        
        {/* Footer disclaimer */}
        <div className="mt-12 text-center text-xs text-gray-400">
            © 2025 Pinnacle GST Analytics. All rights reserved.
        </div>
      </main>
    </div>
  );
};

export default Legal;