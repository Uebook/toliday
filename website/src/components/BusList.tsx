import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bus, MapPin, Star, Users, ChevronRight, Wifi, Battery, Coffee, 
  ChevronLeft, Search, Filter, SlidersHorizontal, ArrowRight, X, Clock,
  Wind, ShieldCheck
} from 'lucide-react';
import { searchBuses } from '../lib/api';

interface BusListProps {
  searchParams: { origin: string; destination: string; date: string } | null;
  onBack: () => void;
  onSelectBus: (bus: any) => void;
}

export default function BusList({ searchParams, onBack, onSelectBus }: BusListProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(3000);
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchParams) {
      setLoading(true);
      searchBuses(searchParams)
        .then(data => {
          setBuses(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to search buses', err);
          setLoading(false);
        });
    }
  }, [searchParams]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors mb-4 group">
                 <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                 <span className="text-xs font-bold uppercase tracking-widest">Back to search</span>
              </button>
              <h1 className="text-4xl font-display font-bold text-zinc-900">{searchParams?.origin || 'Origin'} to {searchParams?.destination || 'Destination'}</h1>
              <p className="text-zinc-500 mt-2 font-medium">{searchParams?.date || 'Today'} • Found {buses.length} Options</p>
           </div>
           <div className="flex gap-4">
              <div className="bg-white px-6 py-3 rounded-2xl border border-zinc-100 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Live Availability</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                  Filters
                </h3>
                <button 
                  onClick={() => setActiveFilters([])}
                  className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Bus Type */}
              <div className="mb-10">
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4 block">Bus Type</label>
                <div className="space-y-3">
                  {[
                    { label: 'AC', icon: <Wind className="w-3.5 h-3.5" /> },
                    { label: 'Non AC', icon: <Wind className="w-3.5 h-3.5 opacity-30" /> },
                    { label: 'Sleeper', icon: <Clock className="w-3.5 h-3.5" /> },
                    { label: 'Seater', icon: <Users className="w-3.5 h-3.5" /> }
                  ].map(type => (
                    <label key={type.label} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        onClick={() => toggleFilter(type.label)}
                        className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${activeFilters.includes(type.label) ? 'bg-indigo-600 border-indigo-600' : 'border-zinc-200 group-hover:border-indigo-400'}`}
                      >
                         {activeFilters.includes(type.label) && <X className="w-3 h-3 text-white" />}
                      </div>
                      <span className="flex items-center gap-2 text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">
                        {type.icon}
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Max Fare</label>
                  <span className="text-xs font-bold text-indigo-600">₹{priceRange}</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                />
              </div>

              {/* Departure Time */}
              <div className="mb-10">
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4 block">Departure Time</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Morning', 'Afternoon', 'Evening', 'Night'].map(time => (
                    <button 
                      key={time}
                      onClick={() => toggleFilter(time)}
                      className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-tight border transition-all ${activeFilters.includes(time) ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' : 'bg-white border-zinc-100 text-zinc-500 hover:border-zinc-300'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4 block">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {['WiFi', 'Charging', 'Water', 'Blanket'].map(amn => (
                    <button 
                      key={amn}
                      onClick={() => toggleFilter(amn)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border transition-all ${activeFilters.includes(amn) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-zinc-100 text-zinc-400 hover:border-zinc-300'}`}
                    >
                      {amn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Listing Results */}
          <div className="lg:col-span-9 space-y-4">
            {loading ? (
               <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm">
                 <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6" />
                 <p className="text-zinc-500 font-bold animate-pulse font-display">Searching available fleets...</p>
               </div>
            ) : buses.length === 0 ? (
               <div className="py-24 bg-white rounded-[3rem] border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center px-10 shadow-sm">
                 <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6 border border-indigo-100">
                    <Bus className="w-10 h-10 text-indigo-400" />
                 </div>
                 <h3 className="text-2xl font-display font-bold text-zinc-900 mb-2">No Buses Found</h3>
                 <p className="text-zinc-500 max-w-sm font-medium">We couldn't find any active schedules for this route on the selected date.</p>
               </div>
            ) : (
              buses.filter(b => b.baseFare <= priceRange).map((schedule, idx) => (
                <motion.div 
                  key={schedule.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 hover:border-indigo-200 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 bg-indigo-50/50 rounded-bl-3xl">
                     <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-zinc-900">4.5</span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">(800+)</span>
                     </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 transition-colors">
                           <Bus className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-display font-bold text-zinc-900">{schedule.bus?.type?.replace(/_/g, ' ') || 'Luxury Bus'}</h3>
                          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">{schedule.bus?.registrationNumber || 'Unknown Fleet'}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-8 max-w-lg">
                        <div className="text-left">
                          <p className="text-2xl font-display font-bold text-zinc-900">{schedule.departureTime.substring(0, 5)}</p>
                          <p className="text-xs text-zinc-400 font-bold uppercase mt-1">{schedule.route?.originCity}</p>
                          <p className="text-[10px] text-zinc-300 mt-1">{schedule.departureDate}</p>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center px-6">
                          <div className="flex items-center gap-2 mb-2">
                             <Clock className="w-3 h-3 text-zinc-300" />
                             <span className="text-[10px] text-zinc-400 font-bold">{schedule.route?.estimatedDuration || '4h 0m'}</span>
                          </div>
                          <div className="w-full h-px border-t-2 border-dashed border-zinc-100 relative">
                             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-100" />
                             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-200" />
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <ArrowRight className="w-3 h-3 text-zinc-300" />
                             </div>
                          </div>
                          <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest mt-2">
                            {schedule.bus?.totalSeats - (schedule.seatsBooked || 0)} Seats Left
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-display font-bold text-zinc-900">{schedule.arrivalTime.substring(0, 5)}</p>
                          <p className="text-xs text-zinc-400 font-bold uppercase mt-1">{schedule.route?.destinationCity}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-px bg-zinc-50 my-2" />

                    <div className="flex items-center md:items-end justify-between md:flex-col md:min-w-[200px]">
                      <div className="text-left md:text-right">
                         <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Starting From</p>
                         <p className="text-4xl font-display font-bold text-indigo-600">₹{parseFloat(schedule.baseFare || '0').toLocaleString('en-IN')}</p>
                         <p className="text-[10px] text-emerald-600 font-bold uppercase mt-2 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            <Wind className="w-3 h-3" />
                            {schedule.lastMinuteDiscount > 0 ? `${schedule.lastMinuteDiscount}% Discount!` : 'Standard Fare'}
                         </p>
                      </div>
                      <button 
                        onClick={() => onSelectBus(schedule)}
                        className="bg-zinc-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-zinc-100 flex items-center justify-center gap-3 group/btn"
                      >
                         Select Seats
                         <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
                     <div className="flex gap-6">
                        {schedule.bus?.amenities?.map((amn: string) => (
                           <div key={amn} className="flex items-center gap-2 group/amn cursor-pointer">
                              <div className="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover/amn:bg-indigo-50 group-hover/amn:text-indigo-600 transition-all">
                                 {amn.toLowerCase().includes('wifi') ? <Wifi className="w-4 h-4" /> : 
                                  amn.toLowerCase().includes('charg') ? <Battery className="w-4 h-4" /> : 
                                  <Coffee className="w-4 h-4" />}
                              </div>
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover/amn:text-indigo-600 transition-colors">{amn}</span>
                           </div>
                        ))}
                     </div>
                     <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Vaccinated Staff & Clean Bus</span>
                     </div>
                  </div>
                </motion.div>
              ))
            )}

            {/* Pagination / Load More */}
            <div className="pt-8 flex justify-center">
               <button className="bg-white border border-zinc-100 px-8 py-4 rounded-[2rem] text-xs font-bold text-zinc-500 uppercase tracking-widest hover:bg-zinc-50 transition-all shadow-sm">
                  Load More Options
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
