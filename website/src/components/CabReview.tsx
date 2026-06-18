import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Star, Users, ChevronRight, Fuel, ShieldCheck, ArrowRight, Info, CheckCircle2, XCircle, InfoIcon, Shield, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CabReviewProps {
  cab: any;
  onBack: () => void;
  onProceedToCheckout: (cab: any) => void;
}

export default function CabReview({ cab, onBack, onProceedToCheckout }: CabReviewProps) {
  const [paymentOption, setPaymentOption] = useState<'part' | 'full'>('full');

  const inclusions = [
    { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, title: '142 Km included', desc: '₹16.0/km will apply beyond the included kms' },
    { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, title: 'Toll, tax and other charges', desc: 'Toll, State Tax, Parking charges are included' },
    { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, title: 'Driver allowance', desc: 'Driver food and accommodation(stay) charges are included' },
    { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, title: 'Waiting time upto 45 mins for pickup', desc: '₹100/30 mins post 45 mins' },
    { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, title: 'Fuel charges included', desc: 'Fuel cost for your trip is included in the fare' }
  ];

  const baseFare = 2860;
  const taxesAndFees = 771;
  const totalFare = baseFare + taxesAndFees;

  return (
    <div className="min-h-screen bg-[#F2F2F2] pt-24 pb-20">
      {/* Header */}
      <div className="bg-[#041422] py-6 mb-8 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-bold">Review booking</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Trip Info Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <p className="text-xs font-bold text-zinc-500 mb-4">Outstation One Way Trip</p>
                <div className="flex items-center gap-12">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Mumbai</h3>
                    <p className="text-xs text-zinc-500">Mumbai, Maharashtra</p>
                  </div>
                  <div className="flex-1 flex items-center px-4">
                    <div className="w-full h-[2px] border-t border-dashed border-zinc-200 relative">
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full border border-zinc-300 bg-white" />
                      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Pune</h3>
                    <p className="text-xs text-zinc-500">Pune, Maharashtra</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-zinc-900 font-bold text-sm">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  20 May, 10:00 AM
                </div>
              </div>

              <div className="bg-zinc-50 p-6 border-t border-zinc-100 flex items-center justify-between">
                <div className="flex gap-6">
                  <div className="w-24 h-16 rounded-lg overflow-hidden bg-white border border-zinc-200">
                    <img src={cab.images[0]} className="w-full h-full object-cover" alt={cab.name} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-zinc-900">{cab.name}</h4>
                      <span className="bg-[#2181C4] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        {cab.rating}/5 <Star className="w-2.5 h-2.5 fill-white" />
                      </span>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase">{cab.reviews} reviews</span>
                    </div>
                    <p className="text-xs text-zinc-500 uppercase tracking-tight font-bold">
                      {cab.category} • AC • {cab.capacity.split('+')[0]} Seats
                    </p>
                  </div>
                </div>
                <div className="text-center">
                   <div className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-2">
                      {cab.fuel.split('/')[0].trim()}
                   </div>
                </div>
              </div>
              <div className="bg-[#FFF5D9] p-4 flex items-center gap-3">
                 <Clock className="w-4 h-4 text-[#D19D00]" />
                 <p className="text-xs font-bold text-[#8C6B00]">Cab operator will be assigned on booking completion</p>
              </div>
            </div>

            {/* Inclusions Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6 border-b border-zinc-100 pb-2">INCLUSIONS</h3>
              <div className="space-y-6">
                {inclusions.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 pt-1">{item.icon}</div>
                    <div>
                      <p className="text-sm font-bold text-zinc-800">{item.title}</p>
                      <p className="text-xs text-zinc-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <button className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase hover:underline">
                  View Policies <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-bold text-zinc-900 mb-6">Cancellation Policy</h3>
              <div className="pl-4 border-l-2 border-emerald-500 mb-4">
                 <p className="text-xs font-bold text-zinc-900">Free cancellation until <span className="text-emerald-600">9:00 AM, Wed 20 May</span></p>
                 <p className="text-xs text-zinc-500 mt-1">1 hour before pick up time</p>
              </div>
              <button className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase hover:underline">
                  View Cancellation Policy <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-bold text-zinc-900 mb-6">Customer reviews</h3>
              <div className="flex flex-col md:flex-row gap-8 items-center bg-zinc-50 p-6 rounded-xl">
                 <div className="text-center md:border-r border-zinc-200 md:pr-8">
                    <div className="bg-[#2181C4] text-white w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold mx-auto mb-2">4</div>
                    <p className="text-[#2181C4] text-sm font-bold uppercase">Excellent</p>
                 </div>
                 <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center gap-4">
                       <span className="text-xs font-bold text-zinc-500 w-24">Driver Rating</span>
                       <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                          <div className="w-[85%] h-full bg-[#2181C4]" />
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-xs font-bold text-zinc-500 w-24">Cab Rating</span>
                       <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                          <div className="w-[90%] h-full bg-[#2181C4]" />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coupons Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-bold text-zinc-900 mb-6">Coupon & Offers</h3>
              <div className="space-y-4">
                {[
                  { code: 'MMTHDFC', desc: 'Get INR 279 Off with HDFC Credit Card' },
                  { code: 'MMTDEAL', desc: 'Get flat Rs. 55 off on your cab booking!' },
                  { code: 'MEGA-SALE', desc: 'Save Rs. 74 instantly on this Cab booking. Hurry, limited-time offer!' }
                ].map((offer, i) => (
                  <label key={i} className="flex gap-3 cursor-pointer group">
                    <div className="pt-1">
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-200 flex items-center justify-center group-hover:border-sky-500 transition-colors">
                        <input type="radio" name="coupon" className="hidden" />
                      </div>
                    </div>
                    <div>
                      <div className="inline-block border-2 border-dashed border-sky-200 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded mb-1">
                        {offer.code}
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-tight">{offer.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                 <input placeholder="ENTER A COUPON" className="flex-1 bg-zinc-50 border border-zinc-100 rounded-lg px-4 py-2 text-xs font-bold outline-none uppercase" />
                 <button className="text-sky-600 text-xs font-bold uppercase tracking-widest px-2">APPLY</button>
              </div>
            </div>

            {/* Payment Options Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-bold text-zinc-900 mb-6">Payment options</h3>
              <div className="space-y-4">
                <label 
                  onClick={() => setPaymentOption('part')}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentOption === 'part' ? 'border-[#0084FF] bg-sky-50/50' : 'border-zinc-100'}`}
                >
                   <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentOption === 'part' ? 'border-[#0084FF]' : 'border-zinc-300'}`}>
                         {paymentOption === 'part' && <div className="w-2 h-2 rounded-full bg-[#0084FF]" />}
                      </div>
                      <div>
                         <p className="text-xs font-bold text-zinc-900">Part Pay</p>
                         <p className="text-[10px] text-zinc-400">Pay rest to the driver</p>
                      </div>
                   </div>
                   <span className="text-sm font-bold text-zinc-900 tracking-tight">₹ 603</span>
                </label>

                <label 
                  onClick={() => setPaymentOption('full')}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentOption === 'full' ? 'border-[#0084FF] bg-sky-50/50' : 'border-zinc-100'}`}
                >
                   <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentOption === 'full' ? 'border-[#0084FF]' : 'border-zinc-300'}`}>
                         {paymentOption === 'full' && <div className="w-2 h-2 rounded-full bg-[#0084FF]" />}
                      </div>
                      <div>
                         <p className="text-xs font-bold text-zinc-900">Full Pay</p>
                         <p className="text-[10px] text-zinc-400">Full amount</p>
                      </div>
                   </div>
                   <span className="text-sm font-bold text-zinc-900 tracking-tight">₹ {totalFare.toLocaleString('en-IN')}</span>
                </label>
              </div>

              <button 
                onClick={() => onProceedToCheckout(cab)}
                className="w-full bg-[#0084FF] text-white py-4 rounded-xl font-bold text-sm mt-6 shadow-lg shadow-sky-100 hover:bg-sky-600 transition-all uppercase tracking-widest"
              >
                Pay Now
              </button>

              <div className="mt-8 border-t border-zinc-100 pt-6">
                 <button className="flex items-center justify-between w-full text-[#0084FF] text-xs font-bold uppercase">
                    Hide Fare Break up <ChevronDown className="w-4 h-4 rotate-180" />
                 </button>
                 
                 <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-zinc-900">Base Fare</span>
                       <span className="text-xs font-bold text-zinc-900 tracking-tight">₹ {baseFare.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pl-4 space-y-2">
                       <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-tight">
                          <span>Cab charges (Includes fuel, cab)</span>
                          <span className="text-emerald-600">Included</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-tight">
                          <span>State Tax</span>
                          <span className="text-emerald-600">Included</span>
                       </div>
                    </div>

                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-zinc-900">Taxes & Fees</span>
                       <span className="text-xs font-bold text-zinc-900 tracking-tight">₹ {taxesAndFees.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="pt-4 border-t border-zinc-200 flex justify-between items-center">
                       <span className="text-sm font-bold text-zinc-900">Total</span>
                       <span className="text-sm font-bold text-zinc-900 tracking-tight">₹ {totalFare.toLocaleString('en-IN')}</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
