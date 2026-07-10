import { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Lock, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { fetchCmsPolicy } from '../lib/api';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const [policy, setPolicy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCmsPolicy('privacy')
      .then(data => {
        setPolicy(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch privacy policy from CMS:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-zinc-50 min-h-screen pb-24 text-left pt-28">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-800 px-4 py-2.5 rounded-full border border-zinc-200 transition-all font-semibold text-sm cursor-pointer shadow-sm mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Title */}
        <div className="space-y-6 mb-12">
          <span className="bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100 inline-flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Legal Center</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-zinc-900 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-zinc-400 text-xs font-bold">Last Updated: May 20, 2026</p>
        </div>

        {/* Main Content Layout */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-650" />
          </div>
        ) : policy && policy.contentHtml ? (
          <div 
            className="prose prose-indigo max-w-none text-zinc-650 leading-relaxed text-sm bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm"
            dangerouslySetInnerHTML={{ __html: policy.contentHtml }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left Table of Contents */}
            <div className="md:col-span-4 space-y-3 hidden md:block">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-4">Table of Contents</h4>
              {[
                '1. Information We Collect',
                '2. How We Use Information',
                '3. Payment & Transaction Security',
                '4. Data Retention & Deletion',
                '5. Contact and Inquiries'
              ].map((section, idx) => (
                <a 
                  key={idx} 
                  href={`#section-${idx + 1}`} 
                  className="block text-xs font-bold text-zinc-500 hover:text-indigo-650 hover:underline transition-colors"
                >
                  {section}
                </a>
              ))}
            </div>

            {/* Right Content */}
            <div className="md:col-span-8 space-y-10 text-zinc-650 leading-relaxed text-sm">
              
              {/* Section 1 */}
              <div id="section-1" className="space-y-4 scroll-mt-28">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">1</span>
                  <span>Information We Collect</span>
                </h3>
                <p>
                  We gather details required to fulfill your reservation details. This includes names, contact details, email addresses, payment validation tokens, and localized travel preferences.
                </p>
              </div>

              {/* Section 2 */}
              <div id="section-2" className="space-y-4 scroll-mt-28">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">2</span>
                  <span>How We Use Information</span>
                </h3>
                <p>
                  Your information is solely utilized to process hotel, bus, flight, and cab reservations, dispatch invoices/vouchers, update you on delay statuses, and resolve service dispute queries.
                </p>
              </div>

              {/* Section 3 */}
              <div id="section-3" className="space-y-4 scroll-mt-28">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">3</span>
                  <span>Payment & Transaction Security</span>
                </h3>
                <p>
                  All online payments are routed through PCI-DSS compliant payment gateways. TolidayTrip does not store raw credit card numbers or banking passwords on its servers.
                </p>
              </div>

              {/* Section 4 */}
              <div id="section-4" className="space-y-4 scroll-mt-28">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">4</span>
                  <span>Data Retention & Deletion</span>
                </h3>
                <p>
                  We retain your booking history to assist with standard financial accounting. However, you retain the absolute right to request full account closure and the erasure of personal identifiers from our client list. Simply submit a ticket from your dashboard profile.
                </p>
              </div>

              {/* Section 5 */}
              <div id="section-5" className="space-y-4 scroll-mt-28">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">5</span>
                  <span>Contact and Inquiries</span>
                </h3>
                <p>
                  If you have queries regarding this policy document, contact our legal counsel department directly:
                </p>
                <div className="p-4 bg-zinc-900 text-white rounded-2xl text-xs space-y-1.5 font-medium">
                  <p className="font-bold text-sm text-indigo-400">TolidayTrip Legal Desk</p>
                  <p>Email: legal@toliday.in</p>
                  <p>Address: Tech Hub, Outer Ring Road, Bangalore - 560103</p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
