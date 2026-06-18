import { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users as UsersIcon, Heart, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchHotels } from '../lib/api';
import { DateRange } from 'react-date-range';

interface HotelBookingProps {
  onSearch: (params: any) => void;
}


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

export default function HotelBooking({ onSearch }: HotelBookingProps) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [destination, setDestination] = useState('');
  const [showSuggest, setShowSuggest] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [guestConfig, setGuestConfig] = useState({
    rooms: 1,
    adults: 2,
    children: 0
  });

  const guestPickerRef = useRef<HTMLDivElement>(null);
  const suggestRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHotels().then(data => {
      const rawCities = data.map((h: any) => h.city || (h.location ? h.location.split(',')[0] : null)).filter(Boolean);
      const uniqueCitiesMap = new Map();
      rawCities.forEach((city: string) => {
        const lowerCity = city.toLowerCase().trim();
        if (!uniqueCitiesMap.has(lowerCity)) {
          const formattedCity = city
            .trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          uniqueCitiesMap.set(lowerCity, formattedCity);
        }
      });
      const cities = Array.from(uniqueCitiesMap.values());
      if (cities.length > 0) {
        setAvailableCities(cities as string[]);
      }
    }).catch(err => console.error('Failed to load cities:', err));
  }, []);

  const popularCities = availableCities;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (guestPickerRef.current && !guestPickerRef.current.contains(target)) {
        setIsGuestPickerOpen(false);
      }
      if (suggestRef.current && !suggestRef.current.contains(target)) {
        setShowSuggest(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onSearch({
        destination,
        arrival: checkIn,
        departure: checkOut,
        rooms: guestConfig.rooms,
        guests: guestConfig.adults + guestConfig.children
      });
    }, 1500);
  };

  return (
    <div className="bg-zinc-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Panel */}
        <div className="mb-12 bg-white rounded-[3rem] p-8 shadow-xl shadow-zinc-200/50 border border-zinc-100">
           <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-56 space-y-2 relative" ref={suggestRef}>
                 <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Where are you going?</label>
                 <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                    <input 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      onClick={() => setShowSuggest(true)}
                      placeholder="e.g. Mumbai, Goa"
                      className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-medium text-zinc-900" 
                    />
                 </div>
                 <AnimatePresence>
                   {showSuggest && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full mt-4 left-0 right-0 bg-white rounded-3xl shadow-2xl border border-zinc-100 p-2 z-50 overflow-hidden"
                      >
                        <div className="p-4 bg-zinc-50/50 mb-2">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Popular Destinations</p>
                        </div>
                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                          {popularCities.map((city) => (
                            <div 
                              key={city}
                              onClick={() => {
                                setDestination(city);
                                setShowSuggest(false);
                              }}
                              className="px-4 py-3 hover:bg-zinc-50 cursor-pointer transition-colors border-b border-zinc-50 last:border-0"
                            >
                              <span className="font-bold text-zinc-700">{city}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                   )}
                 </AnimatePresence>
              </div>
              <div className="lg:w-72 relative" ref={datePickerRef} onClick={() => setShowDatePicker(!showDatePicker)}>
                <div className="flex bg-zinc-50 border border-zinc-100 rounded-2xl p-4 hover:border-brand-orange/30 transition-colors cursor-pointer group h-full items-center gap-3">
                  <Calendar className="w-4 h-4 text-brand-orange shrink-0" />
                  <div className="flex flex-col justify-center min-w-0">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Check-in → Check-out</label>
                    <span className="text-sm font-bold text-zinc-900 truncate">
                      {formatDateDisplay(checkIn)} → {formatDateDisplay(checkOut)}
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {showDatePicker && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 10 }} 
                      onClick={(e) => e.stopPropagation()}
                      className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-left-20 top-full mt-4 bg-white rounded-3xl shadow-2xl border border-zinc-100 z-[9999] overflow-hidden scale-[0.85] origin-top"
                    >
                      <DateRange
                        showDateDisplay={false}
                        ranges={[{
                          startDate: new Date(checkIn),
                          endDate: new Date(checkOut),
                          key: 'selection'
                        }]}
                        onChange={(item: any) => {
                          const s = item.selection.startDate;
                          const e = item.selection.endDate;
                          setCheckIn(`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,'0')}-${String(s.getDate()).padStart(2,'0')}`);
                          setCheckOut(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,'0')}-${String(e.getDate()).padStart(2,'0')}`);
                        }}
                        minDate={today}
                        rangeColors={['#f97316']}
                        months={window.innerWidth >= 768 ? 2 : 1}
                        direction="horizontal"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="lg:w-56 space-y-2 relative" ref={guestPickerRef}>
                 <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Guests</label>
                 <div 
                   onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
                   className="relative bg-zinc-50 border border-zinc-100 rounded-2xl p-4 hover:border-brand-orange/30 transition-colors flex items-center gap-3 cursor-pointer group"
                 >
                    <UsersIcon className="w-4 h-4 text-brand-orange shrink-0" />
                    <div className="flex-1 text-left">
                       <span className="text-sm font-bold text-zinc-900">{guestConfig.rooms} Room, {guestConfig.adults + guestConfig.children} Guest</span>
                    </div>
                 </div>
                 
                 <AnimatePresence>
                   {isGuestPickerOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full mt-4 left-0 right-0 lg:-left-24 lg:-right-24 bg-white rounded-3xl shadow-2xl border border-zinc-100 p-6 z-50 overflow-hidden"
                      >
                       <div className="flex justify-between items-center mb-6">
                         <h4 className="font-bold text-zinc-900 text-xs tracking-wider">ROOMS & GUESTS</h4>
                         <button onClick={() => setIsGuestPickerOpen(false)} className="text-zinc-400"><X className="w-5 h-5" /></button>
                       </div>

                       <div className="space-y-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Rooms</label>
                           <select 
                             value={guestConfig.rooms}
                             onChange={(e) => setGuestConfig(prev => ({ ...prev, rooms: parseInt(e.target.value) }))}
                             className="w-full bg-zinc-50 border border-zinc-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500/20"
                           >
                             {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                           </select>
                         </div>

                         <div className="p-4 bg-zinc-50 rounded-2xl space-y-4">
                           <h5 className="font-bold text-sm text-zinc-900 border-b border-zinc-200 pb-2">Room 1</h5>
                           <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block leading-tight">Adult <br/><span className="lowercase font-medium">(Above 12 Yrs)</span></label>
                               <select 
                                 value={guestConfig.adults}
                                 onChange={(e) => setGuestConfig(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
                                 className="w-full bg-white border border-zinc-100 rounded-xl p-3 outline-none"
                               >
                                 {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                               </select>
                             </div>
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block leading-tight">Children <br/><span className="lowercase font-medium">(Below 12 Yrs)</span></label>
                               <select 
                                 value={guestConfig.children}
                                 onChange={(e) => setGuestConfig(prev => ({ ...prev, children: parseInt(e.target.value) }))}
                                 className="w-full bg-white border border-zinc-100 rounded-xl p-3 outline-none"
                               >
                                 {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                               </select>
                             </div>
                           </div>
                         </div>
                         
                         <button 
                           onClick={() => setIsGuestPickerOpen(false)}
                           className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100"
                         >
                           Apply
                         </button>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>
              <div className="flex items-end">
                 <button 
                  onClick={handleSearch}
                  className="w-full lg:w-auto bg-brand-orange text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-orange-hover shadow-lg shadow-brand-orange/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                 >
                    {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Search'}
                 </button>
              </div>
           </div>
        </div>


        {/* Featured Section */}
        <div className="py-24 bg-white rounded-[3rem] border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center px-10 shadow-sm relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-brand-orange/10 flex items-center justify-center mb-6 relative z-10 border border-brand-orange/20">
             <Search className="w-10 h-10 text-brand-orange" />
          </div>
          <h3 className="text-2xl font-display font-bold text-zinc-900 mb-2 relative z-10">Find Your Perfect Stay</h3>
          <p className="text-zinc-500 max-w-sm font-medium relative z-10">Use the search bar above to discover thousands of verified luxury stays tailored to your preferences.</p>
        </div>
      </div>
    </div>
  );
}
