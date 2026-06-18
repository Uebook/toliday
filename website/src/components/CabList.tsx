import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, MapPin, Star, Users, ChevronRight, Fuel, ShieldCheck, Map, 
  ArrowRight, Gauge, ChevronLeft, SlidersHorizontal, X, Info, Clock,
  CarFront, Activity
} from 'lucide-react';

interface CabListProps {
  onBack: () => void;
  onSelectCab: (cab: any) => void;
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
    rating: 4.8,
    reviews: 348,
    features: ['Air Conditioned', 'Clean Cab', 'Professional Driver', 'Baggage Space']
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
    reviews: 512,
    features: ['Extra Legroom', 'USB Charging', 'Carrier', '6 Seater Lux']
  },
  {
    id: 'C3',
    name: 'Hyundai Xcent',
    category: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600'
    ],
    capacity: '4+1',
    fuel: 'Petrol',
    pricePerKm: 13,
    rating: 4.6,
    reviews: 210,
    features: ['Music System', 'GPS Tracking', 'AC']
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
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, i) => (
          <div key={i} className={`w-1 h-1 rounded-full transition-all ${current === i ? 'bg-white w-4' : 'bg-white/40'}`} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/slider:opacity-100 transition-opacity">
        <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1)); }} className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 border border-white/20 z-10">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1)); }} className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 border border-white/20 z-10">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default function CabList({ onBack, onSelectCab }: CabListProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(40);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
           <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors mb-4 group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to search</span>
           </button>
           <h1 className="text-4xl font-display font-bold text-zinc-900">Intercity Cabs</h1>
           <p className="text-zinc-500 mt-2 font-medium">Mumbai → Pune • May 20, 2026 • One Way Trip</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 sticky top-28">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-zinc-900">Filter Cabs</h3>
                  <button onClick={() => setActiveFilters([])} className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Reset</button>
                </div>

                {/* Cab Category */}
                <div className="mb-10">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 block">Vehicle Class</label>
                  <div className="space-y-2">
                    {['Sedan', 'SUV', 'MUV', 'Premium'].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => toggleFilter(cat)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${activeFilters.includes(cat) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-zinc-50 border-zinc-100 text-zinc-600 hover:border-indigo-200'}`}
                      >
                         <span className="text-sm font-bold">{cat}</span>
                         {activeFilters.includes(cat) ? <X className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 opacity-30" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fuel Type */}
                <div className="mb-10">
                   <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 block">Fuel Selection</label>
                   <div className="flex flex-wrap gap-2">
                      {['CNG', 'Petrol', 'Diesel', 'Electric'].map(fuel => (
                        <button 
                          key={fuel}
                          onClick={() => toggleFilter(fuel)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeFilters.includes(fuel) ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
                        >
                           {fuel}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Price / KM */}
                <div className="mb-10">
                   <div className="flex justify-between items-center mb-4">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Rate (Max)</label>
                      <span className="text-sm font-bold text-indigo-600">₹{priceRange}/km</span>
                   </div>
                   <input 
                     type="range" min="10" max="100" step="1" 
                     value={priceRange} 
                     onChange={(e) => setPriceRange(parseInt(e.target.value))}
                     className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                   />
                </div>

                {/* Amenities */}
                <div>
                   <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 block">Top Features</label>
                   <div className="space-y-3">
                      {['Carrier', 'Extra Luggage', 'Top Rated', 'New Vehicle'].map(feat => (
                        <label key={feat} className="flex items-center gap-3 cursor-pointer group">
                           <div onClick={() => toggleFilter(feat)} className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${activeFilters.includes(feat) ? 'bg-indigo-600 border-indigo-600' : 'border-zinc-200 group-hover:border-indigo-400'}`}>
                              {activeFilters.includes(feat) && <X className="w-3 h-3 text-white" />}
                           </div>
                           <span className="text-sm font-medium text-zinc-600">{feat}</span>
                        </label>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Listing Area */}
          <div className="lg:col-span-9 space-y-6">
             {CABS.map((cab, idx) => (
                <motion.div 
                  key={cab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[3rem] p-6 shadow-sm border border-zinc-100 group hover:border-indigo-100 transition-all flex flex-col md:flex-row gap-8"
                >
                  <div className="w-full md:w-80 h-56 rounded-[2rem] overflow-hidden bg-zinc-50 shrink-0 relative">
                     <ImageSlider images={cab.images} />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-zinc-900 border border-white/20 z-10">
                        {cab.category}
                     </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-display font-bold text-zinc-900">{cab.name}</h3>
                          <div className="flex items-center gap-6 mt-3">
                             <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-bold uppercase tracking-tight">
                                <Users className="w-4 h-4 text-zinc-300" />
                                {cab.capacity}
                             </div>
                             <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-bold uppercase tracking-tight">
                                <Fuel className="w-4 h-4 text-zinc-300" />
                                {cab.fuel}
                             </div>
                             <div className="flex items-center gap-1.5 text-xs text-zinc-900 font-bold">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                {cab.rating} <span className="text-zinc-400 font-medium">({cab.reviews})</span>
                             </div>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="text-xs font-bold text-zinc-400 line-through mb-1">₹{cab.pricePerKm + 4}/km</p>
                           <p className="text-4xl font-display font-bold text-indigo-600 tracking-tight">₹{cab.pricePerKm}<span className="text-sm font-medium text-zinc-400 ml-1">/km</span></p>
                           <div className="flex items-center justify-end gap-1.5 mt-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Free cancellation
                           </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-6">
                        {cab.features.map(f => (
                          <span key={f} className="text-[10px] font-bold text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-100 flex items-center gap-1.5 hover:bg-white transition-all">
                             <CheckCircle className="w-3 h-3 text-emerald-500" />
                             {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                       <div className="flex-1 bg-zinc-50/50 p-4 rounded-2xl border border-dashed border-zinc-100">
                          <div className="flex items-center gap-2 mb-2">
                             <Activity className="w-3.5 h-3.5 text-zinc-400" />
                             <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Trip Highlights</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 leading-relaxed">Book now and get a premium driver. Sanitized cab before arrival assured.</p>
                       </div>
                       <div className="flex items-end">
                          <button 
                            onClick={() => onSelectCab(cab)}
                            className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-zinc-100 flex items-center justify-center gap-3 group active:scale-95 translate-y-0 hover:-translate-y-1"
                          >
                             Book Ride
                             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                       </div>
                    </div>
                  </div>
                </motion.div>
             ))}

             {/* Booking Banner Info */}
             <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-100">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="max-w-md">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6" />
                         </div>
                         <h4 className="text-xl font-display font-bold">TolidayTrip Safety Shield</h4>
                      </div>
                      <p className="text-indigo-100 text-sm leading-relaxed">Our Safety Shield program ensures every cab is professionally sanitized, and drivers follow strict safety protocols. Safe rides, every time.</p>
                   </div>
                   <button className="bg-white text-zinc-900 px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-all w-full md:w-auto shadow-xl">
                      Learn More
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
