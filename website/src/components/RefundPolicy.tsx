import { ArrowLeft, RefreshCw, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

interface RefundPolicyProps {
  onBack: () => void;
}

export default function RefundPolicy({ onBack }: RefundPolicyProps) {
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
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Customer Protection</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-zinc-900 leading-tight">
            Refund & Cancellation Policy
          </h1>
          <p className="text-zinc-400 text-xs font-bold">Last Updated: May 20, 2026</p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Navigation */}
          <div className="md:col-span-4 space-y-3 hidden md:block">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-4">Service Policies</h4>
            {[
              '1. Hotel Bookings',
              '2. Holiday Packages',
              '3. Cabs & Transfers',
              '4. Bus Booking Rules',
              '5. Processing Timelines'
            ].map((section, idx) => (
              <a 
                key={idx} 
                href={`#refund-${idx + 1}`} 
                className="block text-xs font-bold text-zinc-500 hover:text-indigo-650 hover:underline transition-colors"
              >
                {section}
              </a>
            ))}
          </div>

          {/* Right Content */}
          <div className="md:col-span-8 space-y-10 text-zinc-650 leading-relaxed text-sm">
            
            {/* Intro Alert */}
            <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl flex gap-3.5">
              <AlertTriangle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-orange-900 text-xs">COVID-19 & Force Majeure</h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  For bookings impacted by state-enforced travel curbs, local lockdowns, or natural disruptions, standard cancel fees will be waived. Full refunds or flexible date modifications are provided automatically.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <div id="refund-1" className="space-y-4 scroll-mt-28">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">1</span>
                <span>Hotel Bookings</span>
              </h3>
              <p>
                Refund rules depend entirely on the specific room plan chosen during booking:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-500">
                <li><strong className="text-zinc-700">Free Cancellation Plan:</strong> Fully refundable if cancelled at least 24 hours prior to the standard check-in time (typically 12:00 PM).</li>
                <li><strong className="text-zinc-700">Non-Refundable Plan:</strong> Stays booked under promotional pricing are non-refundable under normal booking changes.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div id="refund-2" className="space-y-4 scroll-mt-28">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">2</span>
                <span>Holiday Packages</span>
              </h3>
              <p>
                Because vacation packages involve advance reservation bookings for hotels, local tour guides, and permits, the following slab rates apply for cancellations:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-500">
                <li><strong className="text-zinc-700">30+ days before departure:</strong> 100% refund of the total package amount.</li>
                <li><strong className="text-zinc-700">15 - 29 days before departure:</strong> 50% refund.</li>
                <li><strong className="text-zinc-700">Less than 15 days before departure:</strong> Non-refundable.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="refund-3" className="space-y-4 scroll-mt-28">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">3</span>
                <span>Cabs & Airport Transfers</span>
              </h3>
              <p>
                We offer extreme flexibility for outstation cabs and local car bookings:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-500">
                <li>Cancellations made more than 6 hours prior to pickup time receive a full refund.</li>
                <li>Cancellations within 6 hours of pickup will incur a flat fee of INR 300 or 10% of total ride cost (whichever is higher) to compensate driver mobilization.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div id="refund-4" className="space-y-4 scroll-mt-28">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">4</span>
                <span>Bus Booking Rules</span>
              </h3>
              <p>
                Bus tickets purchased through TolidayTrip are subject to individual bus operator guidelines:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-500">
                <li>Standard rules allow free cancellations up to 12 hours before scheduled departure.</li>
                <li>No refunds will be issued for "no-show" cases or missing the boarding point after the coach departure time.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div id="refund-5" className="space-y-4 scroll-mt-28">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">5</span>
                <span>Processing Timelines</span>
              </h3>
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex gap-3.5">
                <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-indigo-900 text-xs">Refund Crediting Method</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Approved refunds are initiated instantly. Credit will reflect in your source payment method (bank account, card, or UPI wallet) within 5 to 7 working days. Alternatively, you can select refund to your Toliday Wallet for instant credits to use for your next booking.
                  </p>
                </div>
              </div>
            </div>

            {/* Help/Support Section */}
            <div className="pt-6 border-t border-zinc-150 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-zinc-900">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <span className="font-bold text-xs">Need help cancelling a booking?</span>
              </div>
              <p className="text-xs text-zinc-500 font-bold">
                Email support: <span className="text-indigo-600">refunds@toliday.in</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
