import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bus, MapPin, Calendar, Clock, Star, Users, ChevronRight, ArrowRight, ShieldCheck, Wifi, Coffee, Battery, Info } from 'lucide-react';

interface BusBookingProps {
  onSearch: (params: { origin: string; destination: string; date: string }) => void;
}

export default function BusBooking({ onSearch }: BusBookingProps) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [origin, setOrigin] = useState('Mumbai');
  const [destination, setDestination] = useState('Goa');
  const [busDate, setBusDate] = useState(todayStr);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onSearch({ origin, destination, date: busDate });
    }, 800);
  };
  const rows = 12;

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold text-zinc-900 mb-4">India's No. 1 Bus Booking Site</h1>
            <p className="text-zinc-500 mb-8 max-w-2xl">Over 2,500+ bus operators and 1 million+ daily commuters trust us for their journeys. Save more with Zingbus exclusives.</p>
            
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-zinc-200/50 border border-zinc-100">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                    <input value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-medium text-zinc-900" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                    <input value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-medium text-zinc-900" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange pointer-events-none" />
                    <input 
                      type="date" 
                      value={busDate} 
                      min={todayStr}
                      onChange={(e) => setBusDate(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-medium cursor-pointer text-zinc-900" 
                    />
                  </div>
                </div>
                <div className="flex items-end">
                   <button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-full md:w-auto bg-brand-orange text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-600 shadow-lg shadow-brand-orange/30 transition-all active:scale-95 disabled:opacity-50"
                   >
                      {isSearching ? 'Searching...' : 'Search Buses'}
                   </button>
                </div>
              </div>
            </div>

            {/* Offers Slider (Static for now) */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { title: 'Save up to ₹250', desc: 'On Mumbai to Goa tickets.', code: 'GOAGET250', color: 'from-blue-600 to-indigo-700' },
                 { title: '15% Off on UPSRTC', desc: 'Valid for all UP state buses.', code: 'UPBUS15', color: 'from-amber-500 to-orange-600' },
                 { title: 'Free Meal Voucher', desc: 'On bookings above ₹2000.', code: 'YUMMYBUS', color: 'from-emerald-500 to-teal-600' }
               ].map((offer, i) => (
                 <div key={i} className={`bg-gradient-to-br ${offer.color} rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all`}>
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Limited Offer</p>
                    <h3 className="text-xl font-display font-bold mb-2">{offer.title}</h3>
                    <p className="text-white/70 text-xs font-medium mb-6">{offer.desc}</p>
                    <div className="flex items-center justify-between">
                       <span className="bg-white/20 px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-widest border border-white/20">{offer.code}</span>
                       <button className="text-[10px] font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">Copy Code</button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main List Area Placeholder */}
        </div>

          {/* Sidebar / Offers */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
               <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <h3 className="text-xl font-display font-bold mb-4 relative z-10">Zingbus First App Offer</h3>
               <p className="text-white/70 text-sm mb-6 relative z-10">Get <span className="text-white font-bold">₹250 OFF</span> on your first bus booking via the app.</p>
               <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70">Use Code</p>
                  <p className="text-xl font-display font-bold tracking-widest mt-1">BUSNEW250</p>
               </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-zinc-100">
               <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <h4 className="font-bold text-zinc-900 text-sm">Safe Trip Guarantee</h4>
               </div>
               <p className="text-xs text-zinc-500 leading-relaxed">Emergency support, travel insurance, and verified operators for a hassle-free journey.</p>
            </div>
          </div>
      </div>
    </div>
  );
}
