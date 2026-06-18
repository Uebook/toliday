import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, MapPin, Calendar, Clock, Star, Users, ChevronRight, Fuel, ShieldCheck, Map, ArrowRight, Gauge, ChevronLeft, ArrowRightLeft } from 'lucide-react';

interface CabBookingProps {
  onProceedToCheckout: (cab: any) => void;
}

const CABS = [
  {
    id: 'C1',
    name: 'Maruti Suzuki Dzire',
    category: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1621359982464-3253e200384c?auto=format&fit=crop&q=80&w=600'
    ],
    capacity: '4+1',
    fuel: 'CNG / Petrol',
    pricePerKm: 12,
    rating: 4.5,
    features: ['Air Conditioned', 'Clean Seats', 'Professional Driver']
  },
  {
    id: 'C2',
    name: 'Toyota Innova Crysta',
    category: 'SUV',
    images: [
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1631032338531-bc6619213123?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1594976612316-aa06f2334f66?auto=format&fit=crop&q=80&w=600'
    ],
    capacity: '6+1',
    fuel: 'Diesel',
    pricePerKm: 18,
    rating: 4.9,
    features: ['Spacious', 'Music System', 'Bottle Holders', 'Carrier']
  }
];

const ImageSlider = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full h-full group/slider">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt="Listing"
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${current === i ? 'bg-white w-4' : 'bg-white/40'}`} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/slider:opacity-100 transition-opacity">
        <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1)); }} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 border border-white/20 z-10">
          <ChevronLeft className="w-4 h-4 text-indigo-100" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1)); }} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 border border-white/20 z-10">
          <ChevronRight className="w-4 h-4 text-indigo-100" />
        </button>
      </div>
    </div>
  );
};

const formatDateDisplay = (dateStr: string) => {
  if (!dateStr) return 'Select Date';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[date.getDay()];
    return `${day} ${month}'${year}, ${weekday}`;
  } catch (e) {
    return dateStr;
  }
};

const formatTimeDisplay = (timeStr: string) => {
  if (!timeStr) return 'Select Time';
  try {
    const [hourStr, minStr] = timeStr.split(':');
    const hour = parseInt(hourStr);
    const min = minStr || '00';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${min} ${ampm}`;
  } catch (e) {
    return timeStr;
  }
};

export default function CabBooking({ onProceedToCheckout }: CabBookingProps) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [cabOption, setCabOption] = useState<'one-way' | 'round-trip' | 'airport' | 'hourly'>('one-way');
  const [cabFrom, setCabFrom] = useState('Mumbai');
  const [cabTo, setCabTo] = useState('Pune');
  const [cabDeparture, setCabDeparture] = useState(todayStr);
  const [cabReturn, setCabReturn] = useState('');
  const [cabTime, setCabTime] = useState('10:00');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onProceedToCheckout({}); // Transition to cab-list
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
           <h1 className="text-4xl font-display font-bold text-zinc-900 mb-4">Intercity Cabs at Best Rates</h1>
           <p className="text-zinc-500 max-w-2xl">One-way or round trip, get verified drivers and reliable cabs for your journey. No hidden charges, only transparent pricing.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Cab Header / Filter Tabs */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-zinc-200/50 border border-zinc-100 mb-8 space-y-6">
              {/* Cab Options Radios */}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pb-4 border-b border-zinc-100">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {[
                    { id: 'one-way', label: 'Outstation One-Way' },
                    { id: 'round-trip', label: 'Outstation Round-Trip' },
                    { id: 'airport', label: 'Airport Transfers' }
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-xs select-none transition-colors group">
                      <input 
                        type="radio" 
                        name="cabOption" 
                        checked={cabOption === opt.id}
                        onChange={() => setCabOption(opt.id as any)}
                        className="sr-only"
                      />
                      {/* Custom Radio Circle */}
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        cabOption === opt.id 
                          ? 'border-brand-orange bg-orange-50' 
                          : 'border-zinc-300 bg-white group-hover:border-zinc-400'
                      }`}>
                        {cabOption === opt.id && (
                          <div className="w-2 h-2 rounded-full bg-brand-orange" />
                        )}
                      </div>
                      <span className={cabOption === opt.id ? 'text-brand-orange font-extrabold' : 'text-zinc-500 font-bold hover:text-zinc-800'}>{opt.label}</span>
                    </label>
                  ))}
                </div>
                <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider hidden lg:inline">Online Cab Booking</span>
              </div>

              {/* From/To Input Section */}
              <div className="relative flex flex-col md:flex-row items-stretch bg-zinc-50 border border-zinc-100 rounded-2xl">
                <div className="flex-1 p-5 hover:bg-zinc-100/50 transition-colors rounded-t-2xl md:rounded-l-2xl md:rounded-r-none border-b md:border-b-0 md:border-r border-zinc-200">
                  <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest block mb-1">From</span>
                  <input 
                    type="text" 
                    value={cabFrom}
                    onChange={(e) => setCabFrom(e.target.value)}
                    className="bg-transparent border-none outline-none text-lg font-bold text-zinc-900 w-full p-0 focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-zinc-300"
                    placeholder="Departure City"
                  />
                </div>

                {/* Swap Button */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                  <button 
                    type="button"
                    onClick={() => {
                      const temp = cabFrom;
                      setCabFrom(cabTo);
                      setCabTo(temp);
                    }}
                    className="bg-white border border-zinc-100 p-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 text-indigo-600 flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 p-5 hover:bg-zinc-100/50 transition-colors rounded-b-2xl md:rounded-r-2xl md:rounded-l-none pl-5 md:pl-10">
                  <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest block mb-1">To</span>
                  <input 
                    type="text" 
                    value={cabTo}
                    onChange={(e) => setCabTo(e.target.value)}
                    className="bg-transparent border-none outline-none text-lg font-bold text-zinc-900 w-full p-0 focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-zinc-300"
                    placeholder="Destination City"
                  />
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Departure Date */}
                 <div 
                   className="relative bg-zinc-50 border border-zinc-100 rounded-2xl p-5 hover:bg-zinc-100/50 transition-colors flex items-center gap-3 cursor-pointer"
                   onClick={(e) => {
                     try { e.currentTarget.querySelector('input')?.showPicker(); } catch (err) {}
                   }}
                 >
                  <input 
                    type="date" 
                    value={cabDeparture} 
                    min={todayStr}
                    onChange={(e) => {
                      setCabDeparture(e.target.value);
                      if (cabReturn && e.target.value > cabReturn) {
                        setCabReturn(e.target.value);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <Calendar className="w-5 h-5 text-brand-orange shrink-0 pointer-events-none" />
                  <div className="flex-1 text-left pointer-events-none">
                    <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest block mb-0.5">Departure</span>
                    <span className="text-sm font-bold text-zinc-900">{formatDateDisplay(cabDeparture)}</span>
                  </div>
                </div>

                {/* Return Date */}
                <div 
                  onClick={(e) => {
                    setCabOption('round-trip');
                    try { e.currentTarget.querySelector('input')?.showPicker(); } catch (err) {}
                  }}
                  className={`relative border rounded-2xl p-5 transition-all flex items-center gap-3 cursor-pointer ${
                    cabOption === 'round-trip' 
                      ? 'bg-zinc-50 border-zinc-100 hover:bg-zinc-100/50' 
                      : 'bg-white border-dashed border-zinc-200 hover:border-indigo-300'
                  }`}
                >
                  <input 
                    type="date" 
                    value={cabReturn} 
                    min={cabDeparture || todayStr}
                    onChange={(e) => {
                      setCabReturn(e.target.value);
                      setCabOption('round-trip');
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <Calendar className={`w-5 h-5 shrink-0 pointer-events-none ${cabOption === 'round-trip' ? 'text-brand-orange' : 'text-zinc-300'}`} />
                  <div className="flex-1 text-left pointer-events-none">
                    <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest block mb-0.5">Return</span>
                    {cabOption === 'round-trip' && cabReturn ? (
                      <span className="text-sm font-bold text-zinc-900">{formatDateDisplay(cabReturn)}</span>
                    ) : (
                      <span className="text-xs font-semibold text-zinc-400 leading-tight block">
                        Tap to add a return date for bigger discounts
                      </span>
                    )}
                  </div>
                </div>

                {/* Pickup Time */}
                <div 
                  className="relative bg-zinc-50 border border-zinc-100 rounded-2xl p-5 hover:bg-zinc-100/50 transition-colors flex items-center gap-3 cursor-pointer"
                  onClick={(e) => {
                    try { e.currentTarget.querySelector('input')?.showPicker(); } catch (err) {}
                  }}
                >
                  <input 
                    type="time" 
                    value={cabTime} 
                    onChange={(e) => setCabTime(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <Clock className="w-5 h-5 text-brand-orange shrink-0 pointer-events-none" />
                  <div className="flex-1 text-left pointer-events-none">
                    <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest block mb-0.5">Pickup Time</span>
                    <span className="text-sm font-bold text-zinc-900">{formatTimeDisplay(cabTime)}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-center">
                 <button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-brand-orange text-white px-16 py-4 rounded-2xl font-bold hover:bg-orange-600 shadow-xl shadow-brand-orange/30 transition-all flex items-center gap-3 active:scale-95 group disabled:opacity-50 text-base"
                 >
                    {isSearching ? 'Searching...' : 'Explore Available Cabs'}
                    {!isSearching && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                 </button>
              </div>
            </div>

            {/* Popular Routes Section (Unique for Cabs) */}
            <div className="mb-8 overflow-hidden">
               <h2 className="text-xl font-display font-bold text-zinc-900 mb-6">Popular Intercity Routes</h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { from: 'Mumbai', to: 'Pune', price: '2,500' },
                    { from: 'Delhi', to: 'Jaipur', price: '3,200' },
                    { from: 'Bangalore', to: 'Mysore', price: '2,800' },
                    { from: 'Chennai', to: 'Pondicherry', price: '2,900' }
                  ].map((route, i) => (
                    <div className="bg-white p-5 rounded-3xl border border-zinc-100 hover:border-brand-orange/30 transition-all cursor-pointer group shadow-sm">
                       <p className="text-[10px] font-bold text-zinc-400 uppercase mb-2">Starts from ₹{route.price}</p>
                       <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-zinc-900">{route.from}</span>
                          <ArrowRight className="w-3 h-3 text-brand-orange group-hover:translate-x-1 transition-transform" />
                          <span className="text-sm font-bold text-zinc-900">{route.to}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Cab List Area Placeholder */}
            <div className="grid grid-cols-1 gap-6">
              {isSearching ? (
                <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-zinc-100 shadow-sm">
                  <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-6" />
                  <p className="text-zinc-500 font-bold animate-pulse font-display">Scanning the roads for best cabs...</p>
                </div>
              ) : (
                <div className="py-24 bg-white rounded-[3rem] border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center px-10 shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-brand-orange/10 flex items-center justify-center mb-6 border border-brand-orange/20">
                     <Car className="w-10 h-10 text-brand-orange" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-zinc-900 mb-2">Find Your Perfect Ride</h3>
                  <p className="text-zinc-500 max-w-sm font-medium">Enter your trip details above and compare from our fleet of verified intercity cabs.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-80 space-y-6">
             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 h-fit overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-bl-[5rem] -z-0" />
                <h3 className="text-xl font-display font-bold text-zinc-900 mb-6 relative z-10">Why Book With Us?</h3>
                <div className="space-y-6 relative z-10">
                   {[
                     { icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, title: 'Verified Drivers', desc: 'Background checked & highly rated professional drivers.' },
                     { icon: <Gauge className="w-5 h-5 text-indigo-500" />, title: 'On-time Pickup', desc: 'Punctuality is our priority or get 10% cash back.' },
                     { icon: <Map className="w-5 h-5 text-amber-500" />, title: 'Transparent Pricing', desc: 'No hidden taxes or extra kilometer charges.' }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="shrink-0">{item.icon}</div>
                        <div>
                           <p className="text-xs font-bold text-zinc-900 mb-1">{item.title}</p>
                           <p className="text-[10px] text-zinc-500 leading-relaxed font-bold uppercase tracking-tight">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
