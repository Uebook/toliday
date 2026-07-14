import { useState, useRef, useEffect } from 'react';
import { Hotel, MapPin, Car, Bus, Search, Calendar, Users, Plane, CreditCard, ArrowRightLeft, Shield, Tag, Award, Check, X, FileText, Landmark, Clock, Sparkles, ChevronLeft, ChevronRight, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchHotels, AIRPORTS, fetchCmsHero } from '../lib/api';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

type ServiceType = 'hotels' | 'flights' | 'holidays' | 'bus' | 'cabs' | 'activities';

const services = [
  { id: 'hotels', name: 'Hotels', icon: Hotel },
  // { id: 'flights', name: 'Flights', icon: Plane }, // Hidden for now
  { id: 'holidays', name: 'Holidays', icon: Landmark, comingSoon: true },
  { id: 'bus', name: 'Bus', icon: Bus, comingSoon: true },
  { id: 'cabs', name: 'Cabs', icon: Car, comingSoon: true },
  { id: 'activities', name: 'Activities', icon: Ticket, comingSoon: true },
];

const formatDateDisplay = (dateStr: string) => {
  if (!dateStr) return 'Select Date';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  } catch (e) {
    return dateStr;
  }
};

const formatTimeDisplay = (timeStr: string) => {
  if (!timeStr) return 'Select Time';
  return timeStr;
};

interface HeroProps {
  defaultService?: ServiceType;
  isDedicated?: boolean;
  onSearch: (type: 'hotels' | 'flights' | 'holidays' | 'cabs' | 'bus' | 'activities', params?: any) => void;
}

export default function Hero({ onSearch, defaultService, isDedicated }: HeroProps) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;


  const [activeService, setActiveService] = useState<ServiceType>(defaultService || 'hotels');
  const [heroes, setHeroes] = useState<any[]>([]);

  useEffect(() => {
    fetchCmsHero()
      .then(data => {
        if (Array.isArray(data)) {
          setHeroes(data);
        } else if (data) {
          setHeroes([data]);
        }
      })
      .catch(err => console.error('Failed to fetch CMS hero:', err));
  }, []);
  
  useEffect(() => {
    if (defaultService) {
      setActiveService(defaultService);
    }
  }, [defaultService]);

  
  // --- Hotel States ---
  const [hotelDestination, setHotelDestination] = useState('');
  const [hotelArrival, setHotelArrival] = useState(todayStr);
  const [hotelDeparture, setHotelDeparture] = useState(tomorrowStr);
  const [showHotelSuggest, setShowHotelSuggest] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // --- Holiday States ---
  const [holidayDestination, setHolidayDestination] = useState('');
  const [holidayDeparture, setHolidayDeparture] = useState(todayStr);
  const [showHolidaySuggest, setShowHolidaySuggest] = useState(false);

  // --- Bus States ---
  const [busFrom, setBusFrom] = useState('');
  const [busTo, setBusTo] = useState('');
  const [busDate, setBusDate] = useState(todayStr);
  const [showBusFromSuggest, setShowBusFromSuggest] = useState(false);
  const [showBusToSuggest, setShowBusToSuggest] = useState(false);

  // --- Activities States ---
  const [activityDestination, setActivityDestination] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [showActivitySuggest, setShowActivitySuggest] = useState(false);

  // --- Cab States ---
  const [cabOption, setCabOption] = useState<'one-way' | 'round-trip'>('one-way');
  const [cabFrom, setCabFrom] = useState('');
  const [cabTo, setCabTo] = useState('');
  const [cabDeparture, setCabDeparture] = useState(todayStr);
  const [cabReturn, setCabReturn] = useState('');
  const [cabTime, setCabTime] = useState('10:00');
  const [showCabFromSuggest, setShowCabFromSuggest] = useState(false);
  const [showCabToSuggest, setShowCabToSuggest] = useState(false);

  // --- Flight States ---
  const [flightOption, setFlightOption] = useState<'one-way' | 'round-trip'>('one-way');
  const [flightFareType, setFlightFareType] = useState<'regular' | 'student' | 'senior' | 'armed'>('regular');
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');
  const [flightFromSearch, setFlightFromSearch] = useState('');
  const [flightToSearch, setFlightToSearch] = useState('');
  const [flightDeparture, setFlightDeparture] = useState(todayStr);
  const [flightReturn, setFlightReturn] = useState('');
  const [showFlightFromSuggest, setShowFlightFromSuggest] = useState(false);
  const [showFlightToSuggest, setShowFlightToSuggest] = useState(false);
  const [isFlightPaxOpen, setIsFlightPaxOpen] = useState(false);
  const [showFlightDatePicker, setShowFlightDatePicker] = useState(false);
  const flightDatePickerRef = useRef<HTMLDivElement>(null);
  const [flightPaxConfig, setFlightPaxConfig] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: 'economy' as 'economy' | 'premium' | 'business' | 'premium_business' | 'first'
  });

  // Modals for super-app simulations
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [showLoungeModal, setShowLoungeModal] = useState(false);
  const [showConciergeModal, setShowConciergeModal] = useState(false);
  const [showDutyFreeModal, setShowDutyFreeModal] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);

  // --- Offer Carousel ---
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDir, setCarouselDir] = useState(1); // 1 = forward, -1 = backward

  const carouselNext = () => {
    setCarouselDir(1);
    setCarouselIndex(prev => {
      const total = heroes.length || 1;
      return (prev + 1) % total;
    });
  };

  useEffect(() => {
    if (heroes.length > 1) {
      const t = setInterval(carouselNext, 5000);
      return () => clearInterval(t);
    }
  }, [heroes.length]);

  // --- Occupancy / Guest Config ---
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [guestConfig, setGuestConfig] = useState({
    rooms: 1,
    adults: 2,
    children: 0
  });

  // Refs for closing suggests
  const guestPickerRef = useRef<HTMLDivElement>(null);
  const hotelSuggestRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const holidaySuggestRef = useRef<HTMLDivElement>(null);
  const busFromSuggestRef = useRef<HTMLDivElement>(null);
  const busToSuggestRef = useRef<HTMLDivElement>(null);
  const cabFromSuggestRef = useRef<HTMLDivElement>(null);
  const cabToSuggestRef = useRef<HTMLDivElement>(null);
  const flightFromSuggestRef = useRef<HTMLDivElement>(null);
  const flightToSuggestRef = useRef<HTMLDivElement>(null);
  const flightPaxRef = useRef<HTMLDivElement>(null);
  const activitySuggestRef = useRef<HTMLDivElement>(null);

  const [availableCities, setAvailableCities] = useState<string[]>([]);

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

  const popularCities = availableCities.length > 0 ? availableCities : [
    'New Delhi',
    'Noida (NCR)',
    'Mumbai',
    'Bengaluru',
    'Goa',
    'Chennai',
    'Manali',
    'Jaipur',
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (guestPickerRef.current && !guestPickerRef.current.contains(target)) setIsGuestPickerOpen(false);
      if (hotelSuggestRef.current && !hotelSuggestRef.current.contains(target)) setShowHotelSuggest(false);
      if (datePickerRef.current && !datePickerRef.current.contains(target)) setShowDatePicker(false);
      if (holidaySuggestRef.current && !holidaySuggestRef.current.contains(target)) setShowHolidaySuggest(false);
      if (busFromSuggestRef.current && !busFromSuggestRef.current.contains(target)) setShowBusFromSuggest(false);
      if (busToSuggestRef.current && !busToSuggestRef.current.contains(target)) setShowBusToSuggest(false);
      if (cabFromSuggestRef.current && !cabFromSuggestRef.current.contains(target)) setShowCabFromSuggest(false);
      if (cabToSuggestRef.current && !cabToSuggestRef.current.contains(target)) setShowCabToSuggest(false);
      if (flightFromSuggestRef.current && !flightFromSuggestRef.current.contains(target)) setShowFlightFromSuggest(false);
      if (flightToSuggestRef.current && !flightToSuggestRef.current.contains(target)) setShowFlightToSuggest(false);
      if (flightPaxRef.current && !flightPaxRef.current.contains(target)) setIsFlightPaxOpen(false);
      if (flightDatePickerRef.current && !flightDatePickerRef.current.contains(target)) setShowFlightDatePicker(false);
      if (activitySuggestRef.current && !activitySuggestRef.current.contains(target)) setShowActivitySuggest(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBusSwap = () => {
    const temp = busFrom;
    setBusFrom(busTo);
    setBusTo(temp);
  };

  const handleCabSwap = () => {
    const temp = cabFrom;
    setCabFrom(cabTo);
    setCabTo(temp);
  };

  const handleFlightSwap = () => {
    const temp = flightFrom;
    setFlightFrom(flightTo);
    setFlightTo(temp);
  };

  const handleSearchClick = () => {
    let params: any = {};
    if (activeService === 'hotels') {
      params = {
        destination: hotelDestination,
        arrival: hotelArrival,
        departure: hotelDeparture,
        rooms: guestConfig.rooms,
        guests: guestConfig.adults + guestConfig.children
      };
    } else if (activeService === 'flights') {
      params = {
        fromCode: flightFrom,
        toCode: flightTo,
        departure: flightDeparture,
        return: flightReturn,
        fareType: flightFareType,
        tripOption: flightOption,
        passengers: flightPaxConfig.adults + flightPaxConfig.children + flightPaxConfig.infants,
        paxConfig: flightPaxConfig
      };
    } else if (activeService === 'activities') {
      params = {
        destination: activityDestination,
        date: activityDate
      };
    } else if (activeService === 'bus') {
      params = {
        origin: busFrom,
        destination: busTo,
        date: busDate
      };
    }
    onSearch(activeService, params);
  };

  return (
    <div className="relative min-h-screen pt-[94px] pb-10 flex flex-col items-center justify-center overflow-hidden">
      {/* Full-hero animated background - changes with carousel slide */}
      <AnimatePresence mode="sync">
        {heroes.length > 0 && heroes[carouselIndex] && (
          <motion.div
            key={`bg-${heroes[carouselIndex].id || carouselIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0 z-0 bg-zinc-900"
          >
            <div className="absolute inset-0 overflow-hidden">
              {heroes[carouselIndex].mediaUrl?.endsWith('.mp4') || heroes[carouselIndex].mediaUrl?.includes('video') ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-40"
                >
                  <source src={heroes[carouselIndex].mediaUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={heroes[carouselIndex].mediaUrl}
                  alt=""
                  className="w-full h-full object-cover opacity-40"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Subtle vignette at bottom to blend into white search panel */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.18) 100%)' }} />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* ===== FULL-WIDTH CAROUSEL ===== */}
        <div className="w-full relative" style={{ minHeight: 240 }}>
          <AnimatePresence mode="wait" custom={carouselDir}>
            {heroes.length > 0 && heroes[carouselIndex] && (
              <motion.div
                key={`slide-${heroes[carouselIndex].id || carouselIndex}`}
                custom={carouselDir}
                variants={{
                  enter: (d: number) => ({ x: d * 120, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: -d * 120, opacity: 0 })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full flex items-center justify-between max-w-7xl mx-auto px-8 md:px-16 py-8">
                  {/* Left Text */}
                  <div className="flex flex-col gap-2 z-10 max-w-[60%]">
                    <h2 
                      className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-md" 
                      style={{ color: heroes[carouselIndex].textColor || '#ffffff' }}
                    >
                      {heroes[carouselIndex].title}
                    </h2>
                    <p 
                      className="text-sm font-semibold mt-2 drop-shadow"
                      style={{ color: heroes[carouselIndex].textColor ? `${heroes[carouselIndex].textColor}E6` : 'rgba(255,255,255,0.8)' }}
                    >
                      {heroes[carouselIndex].subtitle}
                    </p>
                    {heroes[carouselIndex].ctaText && (
                      <div className="mt-4">
                        <a href={`/${heroes[carouselIndex].ctaLink}`} className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all cursor-pointer">
                          {heroes[carouselIndex].ctaText}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Carousel Controls */}
          <button
            onClick={carouselPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white backdrop-blur-sm border border-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={carouselNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white backdrop-blur-sm border border-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {[0,1,2].map(i => (
              <button
                key={i}
                onClick={() => carouselGoTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  carouselIndex === i
                    ? 'w-6 h-2.5 bg-white'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tabbed Search Panel */}
        <div className="w-full max-w-6xl relative z-30 px-4 md:px-0">
          {/* Main White Search Card */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-[0_8px_40px_0_rgba(0,0,0,0.22)] p-6 md:p-7 text-left"
          >
            {/* Tab Bar inside white card */}
            {!isDedicated && (
              <div className="flex gap-1 mb-5 bg-zinc-100 rounded-full p-1 w-fit">
                {services.map((service) => {
                  const Icon = service.icon;
                  const isActive = activeService === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => {
                        if (service.comingSoon) {
                          setComingSoonFeature(service.name);
                          return;
                        }
                        setActiveService(service.id as ServiceType);
                        setIsGuestPickerOpen(false);
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                        isActive 
                          ? 'text-white bg-brand-orange shadow-md' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-white'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                      <span>{service.name}</span>
                      {service.comingSoon && (
                        <span className="text-[7px] opacity-60 font-medium px-1 bg-zinc-200 text-zinc-600 rounded">Soon</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
            
            <AnimatePresence mode="wait">
              {/* ==================== HOTELS SERVICE ==================== */}
              {activeService === 'hotels' && (
                <motion.div
                  key="hotels-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch"
                >
                  {/* Destination */}
                  <div className="lg:col-span-4 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm" ref={hotelSuggestRef}>
                    <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">DESTINATION / PROPERTY</span>
                    <input 
                      type="text" 
                      value={hotelDestination}
                      onFocus={() => setShowHotelSuggest(true)}
                      onChange={(e) => setHotelDestination(e.target.value)}
                      className="w-full text-base font-extrabold text-zinc-800 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-zinc-300"
                      placeholder="Enter City or Area"
                    />
                    <span className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">Where are you planning to stay?</span>

                    <AnimatePresence>
                      {showHotelSuggest && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-md z-50 overflow-hidden max-h-60 overflow-y-auto">
                          <div className="p-3 text-[10px] font-bold text-zinc-400 border-b border-zinc-100 uppercase tracking-wider bg-zinc-50">Popular Destinations</div>
                          {popularCities.map((city) => (
                            <button key={city} onClick={() => { setHotelDestination(city); setShowHotelSuggest(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors border-b border-zinc-50 last:border-0">{city}</button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* DATES */}
                  <div className="lg:col-span-6 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm cursor-pointer" ref={datePickerRef} onClick={() => setShowDatePicker(!showDatePicker)}>
                    <div className="flex items-center justify-between px-2">
                      <div>
                        <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5 block">CHECK-IN</span>
                        <span className="text-base font-extrabold text-zinc-800">{formatDateDisplay(hotelArrival)}</span>
                      </div>
                      <div className="w-px h-8 bg-zinc-200"></div>
                      <div className="text-right">
                        <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5 block">CHECK-OUT</span>
                        <span className="text-base font-extrabold text-zinc-800">{formatDateDisplay(hotelDeparture)}</span>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {showDatePicker && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: 10 }} 
                          onClick={(e) => e.stopPropagation()}
                          className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 top-full mt-2 bg-white rounded-2xl shadow-md border border-zinc-100 z-[9999] overflow-hidden scale-[0.85] origin-top"
                        >
                          <DateRange
                            showDateDisplay={false}
                            ranges={[{
                              startDate: new Date(hotelArrival),
                              endDate: new Date(hotelDeparture),
                              key: 'selection'
                            }]}
                            onChange={(item: any) => {
                              const s = item.selection.startDate;
                              const e = item.selection.endDate;
                              setHotelArrival(`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,'0')}-${String(s.getDate()).padStart(2,'0')}`);
                              setHotelDeparture(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,'0')}-${String(e.getDate()).padStart(2,'0')}`);
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

                  {/* ROOMS & GUESTS */}
                  <div className="lg:col-span-2 relative" ref={guestPickerRef}>
                    <div onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)} className="border border-zinc-200 hover:border-zinc-400 rounded-2xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm cursor-pointer h-full">
                      <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">ROOMS & GUESTS</span>
                      <span className="text-base font-extrabold text-zinc-800 truncate">{guestConfig.rooms} Room, {guestConfig.adults + guestConfig.children} Guest</span>
                      <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Edit Configuration</span>
                    </div>

                    <GuestConfigPopover isOpen={isGuestPickerOpen} config={guestConfig} setConfig={setGuestConfig} onClose={() => setIsGuestPickerOpen(false)} />
                  </div>
                </motion.div>
              )}

              {/* ==================== FLIGHTS SERVICE ==================== */}
              {activeService === 'flights' && (
                <motion.div
                  key="flights-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4"
                >
                  {/* Top Fare Type Row */}
                  <div className="flex flex-wrap gap-2">
                    {(['regular', 'student', 'senior', 'armed'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFlightFareType(type)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                          flightFareType === type
                            ? 'bg-brand-orange text-white shadow-md'
                            : 'bg-zinc-100 text-zinc-600 hover:text-zinc-800 hover:bg-zinc-200 border border-zinc-200'
                        }`}
                      >
                        {type === 'regular'
                          ? 'Regular Fares'
                          : type === 'student'
                          ? 'Student Fares'
                          : type === 'senior'
                          ? 'Senior Citizen'
                          : 'Armed Forces'}
                      </button>
                    ))}
                  </div>

                  {/* Second Trip Type Row */}
                  <div className="flex gap-6 mb-2">
                    {(['one-way', 'round-trip'] as const).map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-700 select-none">
                        <input
                          type="radio"
                          name="flightTrip"
                          checked={flightOption === opt}
                          onChange={() => {
                            setFlightOption(opt);
                            if (opt === 'one-way') setFlightReturn('');
                          }}
                          className="w-4 h-4 text-brand-orange focus:ring-brand-orange border-zinc-300 accent-brand-orange"
                        />
                        <span>{opt === 'one-way' ? 'One-Way' : 'Round-Trip'}</span>
                      </label>
                    ))}
                  </div>

                  {/* Main Grid Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-stretch">
                    {/* FROM */}
                    <div className="lg:col-span-3 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm" ref={flightFromSuggestRef}>
                      <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">FROM</span>
                      <input
                        type="text"
                        value={flightFromSearch}
                        onFocus={() => setShowFlightFromSuggest(true)}
                        onChange={(e) => {
                          setFlightFromSearch(e.target.value);
                          setFlightFrom('');
                        }}
                        className="w-full text-base font-extrabold text-zinc-800 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-zinc-300"
                        placeholder="Enter City or Airport"
                      />
                      <span className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">
                        {flightFrom ? `IATA Code: ${flightFrom}` : 'Select departure'}
                      </span>

                      {/* Desktop Swap Button Absolute Overlay */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 hidden lg:flex items-center justify-center">
                        <button type="button" onClick={handleFlightSwap} className="bg-white/90 backdrop-blur-sm border border-white/30 p-2.5 rounded-full shadow-md hover:shadow-lg hover:rotate-180 hover:text-brand-orange transition-all duration-500 text-zinc-500 flex items-center justify-center cursor-pointer">
                          <ArrowRightLeft className="w-4 h-4" />
                        </button>
                      </div>

                      <AnimatePresence>
                        {showFlightFromSuggest && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-md z-50 overflow-hidden max-h-60 overflow-y-auto">
                            {AIRPORTS.filter(a => 
                              a.code.toLowerCase().includes(flightFromSearch.toLowerCase()) ||
                              a.city.toLowerCase().includes(flightFromSearch.toLowerCase()) ||
                              a.name.toLowerCase().includes(flightFromSearch.toLowerCase())
                            ).map((a) => (
                              <button
                                key={a.code}
                                type="button"
                                onClick={() => {
                                  setFlightFrom(a.code);
                                  setFlightFromSearch(`${a.city} (${a.code})`);
                                  setShowFlightFromSuggest(false);
                                }}
                                className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors border-b border-zinc-50 last:border-0"
                              >
                                <span className="font-extrabold">{a.code}</span> - {a.city}, {a.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Swap (Mobile only) */}
                    <div className="flex items-center justify-center py-2 lg:py-0 lg:hidden relative z-20">
                      <button type="button" onClick={handleFlightSwap} className="bg-white/90 backdrop-blur-sm border border-white/30 p-2.5 rounded-full shadow-md hover:shadow-lg hover:rotate-180 hover:text-brand-orange transition-all duration-500 text-zinc-500 flex items-center justify-center cursor-pointer">
                        <ArrowRightLeft className="w-4 h-4" />
                      </button>
                    </div>

                    {/* TO */}
                    <div className="lg:col-span-3 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm" ref={flightToSuggestRef}>
                      <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">TO</span>
                      <input
                        type="text"
                        value={flightToSearch}
                        onFocus={() => setShowFlightToSuggest(true)}
                        onChange={(e) => {
                          setFlightToSearch(e.target.value);
                          setFlightTo('');
                        }}
                        className="w-full text-base font-extrabold text-zinc-800 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-zinc-300"
                        placeholder="Enter City or Airport"
                      />
                      <span className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">
                        {flightTo ? `IATA Code: ${flightTo}` : 'Select destination'}
                      </span>

                      <AnimatePresence>
                        {showFlightToSuggest && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-md z-50 overflow-hidden max-h-60 overflow-y-auto">
                            {AIRPORTS.filter(a => 
                              a.code.toLowerCase().includes(flightToSearch.toLowerCase()) ||
                              a.city.toLowerCase().includes(flightToSearch.toLowerCase()) ||
                              a.name.toLowerCase().includes(flightToSearch.toLowerCase())
                            ).map((a) => (
                              <button
                                key={a.code}
                                type="button"
                                onClick={() => {
                                  setFlightTo(a.code);
                                  setFlightToSearch(`${a.city} (${a.code})`);
                                  setShowFlightToSuggest(false);
                                }}
                                className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors border-b border-zinc-50 last:border-0"
                              >
                                <span className="font-extrabold">{a.code}</span> - {a.city}, {a.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* DATES */}
                    <div className="lg:col-span-4 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm cursor-pointer" ref={flightDatePickerRef} onClick={() => setShowFlightDatePicker(!showFlightDatePicker)}>
                      <div className="flex items-center justify-between px-2">
                        <div className="text-left">
                          <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5 block">DEPART DATE</span>
                          <span className="text-base font-extrabold text-zinc-800">{formatDateDisplay(flightDeparture)}</span>
                          <span className="text-[9px] text-zinc-400 font-medium block mt-0.5">Select Date</span>
                        </div>
                        <div className="w-px h-8 bg-zinc-200"></div>
                        <div className="text-right">
                          <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5 block">RETURN DATE</span>
                          {flightOption === 'round-trip' && flightReturn ? (
                            <span className="text-base font-extrabold text-zinc-800">{formatDateDisplay(flightReturn)}</span>
                          ) : (
                            <span className="text-xs font-semibold text-zinc-400">Tap to add return</span>
                          )}
                          <span className="text-[9px] text-zinc-400 font-medium block mt-0.5">{flightOption === 'round-trip' && flightReturn ? 'Optional' : 'One-Way'}</span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {showFlightDatePicker && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: 10 }} 
                            onClick={(e) => e.stopPropagation()}
                            className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 top-full mt-2 bg-white rounded-2xl shadow-md border border-zinc-100 z-[9999] overflow-hidden scale-[0.85] origin-top"
                          >
                            <DateRange
                              showDateDisplay={false}
                              ranges={[{
                                startDate: new Date(flightDeparture),
                                endDate: new Date(flightReturn || flightDeparture),
                                key: 'selection'
                              }]}
                              onChange={(item: any) => {
                                const s = item.selection.startDate;
                                const e = item.selection.endDate;
                                const sStr = `${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,'0')}-${String(s.getDate()).padStart(2,'0')}`;
                                const eStr = `${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,'0')}-${String(e.getDate()).padStart(2,'0')}`;
                                
                                setFlightDeparture(sStr);
                                
                                if (sStr !== eStr) {
                                  setFlightReturn(eStr);
                                  setFlightOption('round-trip');
                                  setShowFlightDatePicker(false);
                                } else {
                                  if (flightOption === 'round-trip') {
                                    setFlightReturn(eStr);
                                  } else {
                                    setFlightReturn('');
                                    setShowFlightDatePicker(false);
                                  }
                                }
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

                    {/* TRAVELLERS */}
                    <div className="lg:col-span-2 relative" ref={flightPaxRef}>
                      <div onClick={() => setIsFlightPaxOpen(!isFlightPaxOpen)} className="border border-zinc-200 hover:border-zinc-400 rounded-2xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm cursor-pointer h-full">
                        <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">TRAVELLERS & CLASS</span>
                        <span className="text-zinc-800 font-black text-sm mt-0.5 whitespace-nowrap block">
                          {flightPaxConfig.adults + flightPaxConfig.children + flightPaxConfig.infants}{' '}
                          {flightPaxConfig.adults + flightPaxConfig.children + flightPaxConfig.infants > 1 ? 'Travellers' : 'Traveller'}
                        </span>
                        <div className="mt-1 flex">
                          <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wide">
                            {flightPaxConfig.cabinClass === 'premium_business'
                              ? 'Prem Bus'
                              : flightPaxConfig.cabinClass === 'premium'
                              ? 'Prem Econ'
                              : flightPaxConfig.cabinClass === 'economy'
                              ? 'Economy'
                              : flightPaxConfig.cabinClass === 'business'
                              ? 'Business'
                              : 'First'}
                          </span>
                        </div>
                      </div>
                      <FlightPaxPopover isOpen={isFlightPaxOpen} config={flightPaxConfig} setConfig={setFlightPaxConfig} onClose={() => setIsFlightPaxOpen(false)} />
                    </div>
                  </div>

                  {/* Special Fare Alert Badge */}
                  {flightFareType !== 'regular' && (
                    <div className="mt-2 inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-800 text-xs font-extrabold px-4 py-2.5 rounded-xl self-start">
                      <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
                      <span>
                        {flightFareType === 'student'
                          ? 'Student Fare Applied: 10% discount and extra 10kg checked baggage included. Valid student ID required during review!'
                          : flightFareType === 'senior'
                          ? 'Senior Citizen Fare Applied: 8% discount. Must be aged 60 or above at flight date.'
                          : 'Armed Forces Fare Applied: 12% discount. Defense personnel/dependents ID check required.'}
                      </span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ==================== HOLIDAYS SERVICE ==================== */}
              {activeService === 'holidays' && (
                <motion.div
                  key="holidays-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch"
                >
                  {/* Destination */}
                  <div className="lg:col-span-6 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm" ref={holidaySuggestRef}>
                    <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">WHERE TO GO</span>
                    <input 
                      type="text" 
                      value={holidayDestination}
                      onFocus={() => setShowHolidaySuggest(true)}
                      onChange={(e) => setHolidayDestination(e.target.value)}
                      className="w-full text-base font-extrabold text-zinc-800 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-zinc-300"
                      placeholder="Search destinations (e.g. Manali, Goa)"
                    />
                    <span className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">Find holiday packages</span>

                    <AnimatePresence>
                      {showHolidaySuggest && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-md z-50 overflow-hidden max-h-60 overflow-y-auto">
                          <div className="p-3 text-[10px] font-bold text-zinc-400 border-b border-zinc-100 uppercase tracking-wider bg-zinc-50">Popular Destinations</div>
                          {popularCities.map((city) => (
                            <button key={city} onClick={() => { setHolidayDestination(city); setShowHolidaySuggest(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors border-b border-zinc-50 last:border-0">{city}</button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Travel Date */}
                  <div className="lg:col-span-3 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm cursor-pointer" onClick={(e) => e.currentTarget.querySelector('input')?.showPicker()}>
                    <input type="date" value={holidayDeparture} min={todayStr} onChange={(e) => setHolidayDeparture(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
                    <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">DATE OF TRAVEL</span>
                    <span className="text-base font-extrabold text-zinc-800">{formatDateDisplay(holidayDeparture)}</span>
                    <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Select Date</span>
                  </div>

                  {/* Occupancy / Guests */}
                  <div className="lg:col-span-3 relative" ref={guestPickerRef}>
                    <div onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)} className="border border-zinc-200 hover:border-zinc-300 rounded-2xl p-3 flex flex-col justify-center bg-white transition-colors cursor-pointer h-full">
                      <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">TRAVELLERS</span>
                      <span className="text-base font-extrabold text-zinc-800 truncate">{guestConfig.adults + guestConfig.children} Guests</span>
                      <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Room & occupancy</span>
                    </div>

                    <GuestConfigPopover isOpen={isGuestPickerOpen} config={guestConfig} setConfig={setGuestConfig} onClose={() => setIsGuestPickerOpen(false)} />
                  </div>
                </motion.div>
              )}

              {/* ==================== BUS SERVICE ==================== */}
              {activeService === 'bus' && (
                <motion.div
                  key="bus-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch"
                >
                  {/* FROM */}
                  <div className="lg:col-span-4 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm" ref={busFromSuggestRef}>
                    <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">FROM</span>
                    <input 
                      type="text" 
                      value={busFrom}
                      onFocus={() => setShowBusFromSuggest(true)}
                      onChange={(e) => setBusFrom(e.target.value)}
                      className="w-full text-base font-extrabold text-zinc-800 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-zinc-300"
                      placeholder="Departure City"
                    />
                    <span className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">Departure Station</span>

                    <AnimatePresence>
                      {showBusFromSuggest && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-md z-50 overflow-hidden max-h-60 overflow-y-auto">
                          {popularCities.map((city) => (
                            <button key={city} onClick={() => { setBusFrom(city); setShowBusFromSuggest(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors border-b border-zinc-50 last:border-0">{city}</button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Swap */}
                  <div className="flex items-center justify-center py-2 lg:py-0 lg:col-span-0.5 relative z-20">
                    <button type="button" onClick={handleBusSwap} className="bg-white/90 backdrop-blur-sm border border-white/30 p-2.5 rounded-full shadow-md hover:shadow-lg hover:rotate-180 hover:text-brand-orange transition-all duration-500 text-zinc-500 flex items-center justify-center cursor-pointer">
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                  </div>

                  {/* TO */}
                  <div className="lg:col-span-4 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm" ref={busToSuggestRef}>
                    <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">TO</span>
                    <input 
                      type="text" 
                      value={busTo}
                      onFocus={() => setShowBusToSuggest(true)}
                      onChange={(e) => setBusTo(e.target.value)}
                      className="w-full text-base font-extrabold text-zinc-800 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-zinc-300"
                      placeholder="Destination City"
                    />
                    <span className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">Arrival Station</span>

                    <AnimatePresence>
                      {showBusToSuggest && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-md z-50 overflow-hidden max-h-60 overflow-y-auto">
                          {popularCities.map((city) => (
                            <button key={city} onClick={() => { setBusTo(city); setShowBusToSuggest(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors border-b border-zinc-50 last:border-0">{city}</button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* DATE */}
                  <div className="lg:col-span-3 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm cursor-pointer" onClick={(e) => e.currentTarget.querySelector('input')?.showPicker()}>
                    <input type="date" value={busDate} min={todayStr} onChange={(e) => setBusDate(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
                    <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">DATE OF JOURNEY</span>
                    <span className="text-base font-extrabold text-zinc-800">{formatDateDisplay(busDate)}</span>
                    <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Select Departure Date</span>
                  </div>
                </motion.div>
              )}

              {/* ==================== CABS SERVICE ==================== */}
              {activeService === 'cabs' && (
                <motion.div
                  key="cabs-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Cab Type Options */}
                  <div className="flex gap-6 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-700 select-none">
                      <input 
                        type="radio" 
                        name="cabTrip" 
                        checked={cabOption === 'one-way'}
                        onChange={() => setCabOption('one-way')}
                        className="w-4 h-4 text-brand-orange focus:ring-brand-orange border-zinc-300 accent-brand-orange"
                      />
                      <span>Outstation One-Way</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-700 select-none">
                      <input 
                        type="radio" 
                        name="cabTrip" 
                        checked={cabOption === 'round-trip'}
                        onChange={() => setCabOption('round-trip')}
                        className="w-4 h-4 text-brand-orange focus:ring-brand-orange border-zinc-300 accent-brand-orange"
                      />
                      <span>Outstation Round-Trip</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                    {/* FROM */}
                    <div className="lg:col-span-3 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm" ref={cabFromSuggestRef}>
                      <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">FROM</span>
                      <input 
                        type="text" 
                        value={cabFrom}
                        onFocus={() => setShowCabFromSuggest(true)}
                        onChange={(e) => setCabFrom(e.target.value)}
                        className="w-full text-base font-extrabold text-zinc-800 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-zinc-300"
                        placeholder="Pickup City"
                      />
                      <span className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">Pickup Location</span>

                      <AnimatePresence>
                        {showCabFromSuggest && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-md z-50 overflow-hidden max-h-60 overflow-y-auto">
                            {popularCities.map((city) => (
                              <button key={city} onClick={() => { setCabFrom(city); setShowCabFromSuggest(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors border-b border-zinc-50 last:border-0">{city}</button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Swap */}
                    <div className="flex items-center justify-center py-2 lg:py-0 lg:col-span-0.5 relative z-20">
                      <button type="button" onClick={handleCabSwap} className="bg-white/90 backdrop-blur-sm border border-white/30 p-2.5 rounded-full shadow-md hover:shadow-lg hover:rotate-180 hover:text-brand-orange transition-all duration-500 text-zinc-500 flex items-center justify-center cursor-pointer">
                        <ArrowRightLeft className="w-4 h-4" />
                      </button>
                    </div>

                    {/* TO */}
                    <div className="lg:col-span-3 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm" ref={cabToSuggestRef}>
                      <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">TO</span>
                      <input 
                        type="text" 
                        value={cabTo}
                        onFocus={() => setShowCabToSuggest(true)}
                        onChange={(e) => setCabTo(e.target.value)}
                        className="w-full text-base font-extrabold text-zinc-800 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-zinc-300"
                        placeholder="Drop City"
                      />
                      <span className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">Destination Drop Location</span>

                      <AnimatePresence>
                        {showCabToSuggest && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-md z-50 overflow-hidden max-h-60 overflow-y-auto">
                            {popularCities.map((city) => (
                              <button key={city} onClick={() => { setCabTo(city); setShowCabToSuggest(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors border-b border-zinc-50 last:border-0">{city}</button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* DEPART */}
                    <div className="lg:col-span-2 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm cursor-pointer" onClick={(e) => e.currentTarget.querySelector('input')?.showPicker()}>
                      <input type="date" value={cabDeparture} min={todayStr} onChange={(e) => setCabDeparture(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
                      <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">DEPART DATE</span>
                      <span className="text-base font-extrabold text-zinc-800">{formatDateDisplay(cabDeparture)}</span>
                      <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Select Date</span>
                    </div>

                    {/* PICKUP TIME */}
                    <div className="lg:col-span-1.5 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm cursor-pointer" onClick={(e) => e.currentTarget.querySelector('input')?.showPicker()}>
                      <input type="time" value={cabTime} onChange={(e) => setCabTime(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
                      <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">PICKUP TIME</span>
                      <span className="text-base font-extrabold text-zinc-800">{formatTimeDisplay(cabTime)}</span>
                      <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Time of Day</span>
                    </div>

                    {/* RETURN DATE (Optional) */}
                    <div onClick={(e) => { setCabOption('round-trip'); e.currentTarget.querySelector('input')?.showPicker(); }} className={`lg:col-span-2 relative rounded-2xl p-3 flex flex-col justify-center transition-all cursor-pointer ${cabOption === 'round-trip' && cabReturn ? 'bg-white/90 backdrop-blur-sm border border-white/30 hover:border-white/60 shadow-sm' : 'bg-white/40 backdrop-blur-sm border border-dashed border-white/30 hover:border-white/60'}`}>
                      <input type="date" value={cabReturn} min={cabDeparture || todayStr} onChange={(e) => { setCabReturn(e.target.value); setCabOption('round-trip'); }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
                      <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">RETURN DATE</span>
                      {cabOption === 'round-trip' && cabReturn ? (
                        <span className="text-base font-extrabold text-zinc-800">{formatDateDisplay(cabReturn)}</span>
                      ) : (
                        <span className="text-xs font-semibold text-zinc-400">Tap to add return</span>
                      )}
                      <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Optional</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================== ACTIVITIES SERVICE ==================== */}
              {activeService === 'activities' && (
                <motion.div
                  key="activities-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch"
                >
                  {/* DESTINATION OR ACTIVITY */}
                  <div className="lg:col-span-8 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm" ref={activitySuggestRef}>
                    <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">DESTINATION OR ACTIVITY</span>
                    <input 
                      type="text" 
                      value={activityDestination}
                      onFocus={() => setShowActivitySuggest(true)}
                      onChange={(e) => setActivityDestination(e.target.value)}
                      className="w-full text-base font-extrabold text-zinc-800 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-zinc-300"
                      placeholder="e.g. Bangkok or Safari World"
                    />
                    <span className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">Find tours, attractions, and more</span>

                    <AnimatePresence>
                      {showActivitySuggest && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-md z-50 overflow-hidden max-h-60 overflow-y-auto">
                          <div className="p-3 text-[10px] font-bold text-zinc-400 border-b border-zinc-100 uppercase tracking-wider bg-zinc-50">Popular Destinations</div>
                          {popularCities.map((city) => (
                            <button key={city} onClick={() => { setActivityDestination(city); setShowActivitySuggest(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors border-b border-zinc-50 last:border-0">{city}</button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* DATE OF ACTIVITY */}
                  <div className="lg:col-span-4 relative border border-zinc-200 hover:border-zinc-400 rounded-xl p-3 flex flex-col justify-center bg-zinc-50 transition-all shadow-sm cursor-pointer" onClick={(e) => e.currentTarget.querySelector('input')?.showPicker()}>
                    <input type="date" value={activityDate} min={todayStr} onChange={(e) => setActivityDate(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
                    <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">DATE OF ACTIVITY (OPTIONAL)</span>
                    <span className="text-base font-extrabold text-zinc-800">{activityDate ? formatDateDisplay(activityDate) : 'Add a Date'}</span>
                    <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Optional</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions Row */}
            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleSearchClick}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-base font-extrabold px-10 py-3.5 rounded-xl shadow-lg transition-all transform active:scale-95 duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>Search</span>
              </button>
            </div>

          </motion.div>
        </div>

        {/* Adani One Utility Row */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-bold text-white z-20">
          <button disabled className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-full opacity-50 cursor-not-allowed shadow-md backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-brand-orange" />
            <span>Check Flight Status</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[8px] font-black bg-white/10 text-white/60 rounded uppercase tracking-wider whitespace-nowrap">Coming Soon</span>
          </button>
          <button disabled className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-full opacity-50 cursor-not-allowed shadow-md backdrop-blur-md">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Web Check-in</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[8px] font-black bg-white/10 text-white/60 rounded uppercase tracking-wider whitespace-nowrap">Coming Soon</span>
          </button>
          <button disabled className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-full opacity-50 cursor-not-allowed shadow-md backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Lounge Booking</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[8px] font-black bg-white/10 text-white/60 rounded uppercase tracking-wider whitespace-nowrap">Coming Soon</span>
          </button>
          <button disabled className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-full opacity-50 cursor-not-allowed shadow-md backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span>Pranaam Concierge</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[8px] font-black bg-white/10 text-white/60 rounded uppercase tracking-wider whitespace-nowrap">Coming Soon</span>
          </button>
          <button disabled className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-full opacity-50 cursor-not-allowed shadow-md backdrop-blur-md">
            <Tag className="w-3.5 h-3.5 text-rose-400" />
            <span>Shop Duty Free</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[8px] font-black bg-white/10 text-white/60 rounded uppercase tracking-wider whitespace-nowrap">Coming Soon</span>
          </button>
        </div>

        {/* Modals Implementation */}
        <AnimatePresence>
          {showStatusModal && (
            <MockUtilityModal title="Flight Status Tracker" onClose={() => setShowStatusModal(false)}>
              <FlightStatusContent />
            </MockUtilityModal>
          )}
          {showCheckinModal && (
            <MockUtilityModal title="Web Check-in Portal" onClose={() => setShowCheckinModal(false)}>
              <WebCheckinContent />
            </MockUtilityModal>
          )}
          {showLoungeModal && (
            <MockUtilityModal title="Book Airport Lounge" onClose={() => setShowLoungeModal(false)}>
              <LoungeBookingContent />
            </MockUtilityModal>
          )}
          {showConciergeModal && (
            <MockUtilityModal title="Pranaam Concierge Service" onClose={() => setShowConciergeModal(false)}>
              <PranaamContent />
            </MockUtilityModal>
          )}
          {showDutyFreeModal && (
            <MockUtilityModal title="Pre-Order Duty Free" onClose={() => setShowDutyFreeModal(false)}>
              <DutyFreeContent />
            </MockUtilityModal>
          )}
        </AnimatePresence>

        {/* Feature Trust Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-lg py-5 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-white/20 relative z-10"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
              <Award className="w-5 h-5 drop-shadow-md" />
            </div>
            <div>
              <p className="text-xs font-black text-white tracking-wide uppercase drop-shadow-md">Best Price Guarantee</p>
              <p className="text-[10px] text-white/80 font-bold leading-tight">The cheapest hotel and travel offers</p>
            </div>
          </div>
          <div className="h-6 w-px bg-white/20 hidden md:block" />
          
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
              <Tag className="w-5 h-5 drop-shadow-md" />
            </div>
            <div>
              <p className="text-xs font-black text-white tracking-wide uppercase drop-shadow-md">Travel up to 30% cheaper!</p>
              <p className="text-[10px] text-white/80 font-bold leading-tight">Book travel + hotel with toliday</p>
            </div>
          </div>
          <div className="h-6 w-px bg-white/20 hidden md:block" />

          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
              <Shield className="w-5 h-5 drop-shadow-md" />
            </div>
            <div>
              <p className="text-xs font-black text-white tracking-wide uppercase drop-shadow-md">Safe booking</p>
              <p className="text-[10px] text-white/80 font-bold leading-tight">We protect your personal data</p>
            </div>
          </div>
        </motion.div>

      </div>

      <AnimatePresence>
        {comingSoonFeature && (
          <ComingSoonModal
            feature={comingSoonFeature}
            onClose={() => setComingSoonFeature(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable Guest Configuration Dropdown Panel
function GuestConfigPopover({ 
  isOpen, 
  config, 
  setConfig, 
  onClose 
}: { 
  isOpen: boolean, 
  config: any, 
  setConfig: React.Dispatch<React.SetStateAction<any>>, 
  onClose: () => void 
}) {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-md border border-zinc-100 p-6 z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-zinc-900 text-xs tracking-wider uppercase">Travellers Configuration</h4>
        <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600"><X className="w-4 h-4" /></button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl">
          <div>
            <p className="text-xs font-bold text-zinc-800">Rooms</p>
            <p className="text-[10px] text-zinc-400">Total rooms needed</p>
          </div>
          <select 
            value={config.rooms}
            onChange={(e) => setConfig((prev: any) => ({ ...prev, rooms: parseInt(e.target.value) }))}
            className="bg-white border border-zinc-200 rounded-lg p-1.5 text-xs font-bold text-zinc-700 outline-none"
          >
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl">
          <div>
            <p className="text-xs font-bold text-zinc-800">Adults</p>
            <p className="text-[10px] text-zinc-400 font-medium">Above 12 years</p>
          </div>
          <select 
            value={config.adults}
            onChange={(e) => setConfig((prev: any) => ({ ...prev, adults: parseInt(e.target.value) }))}
            className="bg-white border border-zinc-200 rounded-lg p-1.5 text-xs font-bold text-zinc-700 outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl">
          <div>
            <p className="text-xs font-bold text-zinc-800">Children</p>
            <p className="text-[10px] text-zinc-400">Below 12 years</p>
          </div>
          <select 
            value={config.children}
            onChange={(e) => setConfig((prev: any) => ({ ...prev, children: parseInt(e.target.value) }))}
            className="bg-white border border-zinc-200 rounded-lg p-1.5 text-xs font-bold text-zinc-700 outline-none"
          >
            {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-brand-orange-hover transition-colors text-xs"
        >
          Apply Selection
        </button>
      </div>
    </motion.div>
  );
}

function FlightPaxPopover({
  isOpen,
  config,
  setConfig,
  onClose
}: {
  isOpen: boolean;
  config: any;
  setConfig: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-md border border-zinc-150 p-5 z-50 text-zinc-800"
    >
      <div className="space-y-1">
        {/* Adults Row */}
        <div className="flex items-center justify-between py-3.5 border-b border-zinc-200/80 border-dashed">
          <div className="w-1/3">
            <span className="text-sm font-bold text-zinc-800">Adults</span>
          </div>
          <div className="w-1/3 text-center">
            <span className="text-base font-black text-zinc-950">{config.adults}</span>
          </div>
          <div className="w-1/3 flex justify-end">
            <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden bg-white h-8">
              <button
                type="button"
                disabled={config.adults <= 1}
                onClick={() => setConfig((prev: any) => ({ ...prev, adults: prev.adults - 1 }))}
                className="w-8 h-full flex items-center justify-center font-bold text-base text-zinc-650 hover:bg-zinc-50 disabled:opacity-30 border-r border-zinc-350 cursor-pointer select-none"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setConfig((prev: any) => ({ ...prev, adults: prev.adults + 1 }))}
                className="w-8 h-full flex items-center justify-center font-bold text-base text-zinc-650 hover:bg-zinc-50 cursor-pointer select-none"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Children Row */}
        <div className="flex items-center justify-between py-3.5 border-b border-zinc-200/80 border-dashed">
          <div className="w-1/3 flex flex-col items-start leading-tight">
            <span className="text-sm font-bold text-zinc-800">Children</span>
            <span className="text-[10px] text-zinc-400 font-medium whitespace-nowrap">2- 12 years</span>
          </div>
          <div className="w-1/3 text-center">
            <span className="text-base font-black text-zinc-950">{config.children}</span>
          </div>
          <div className="w-1/3 flex justify-end">
            <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden bg-white h-8">
              <button
                type="button"
                disabled={config.children <= 0}
                onClick={() => setConfig((prev: any) => ({ ...prev, children: prev.children - 1 }))}
                className="w-8 h-full flex items-center justify-center font-bold text-base text-zinc-650 hover:bg-zinc-50 disabled:opacity-30 border-r border-zinc-355 cursor-pointer select-none"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setConfig((prev: any) => ({ ...prev, children: prev.children + 1 }))}
                className="w-8 h-full flex items-center justify-center font-bold text-base text-zinc-650 hover:bg-zinc-50 cursor-pointer select-none"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Infants Row */}
        <div className="flex items-center justify-between py-3.5 border-b border-zinc-200/80 border-dashed">
          <div className="w-1/3 flex flex-col items-start leading-tight">
            <span className="text-sm font-bold text-zinc-800">Infants</span>
            <span className="text-[10px] text-zinc-400 font-medium whitespace-nowrap">0- 23 months</span>
          </div>
          <div className="w-1/3 text-center">
            <span className="text-base font-black text-zinc-950">{config.infants}</span>
          </div>
          <div className="w-1/3 flex justify-end">
            <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden bg-white h-8">
              <button
                type="button"
                disabled={config.infants <= 0}
                onClick={() => setConfig((prev: any) => ({ ...prev, infants: prev.infants - 1 }))}
                className="w-8 h-full flex items-center justify-center font-bold text-base text-zinc-650 hover:bg-zinc-50 disabled:opacity-30 border-r border-zinc-355 cursor-pointer select-none"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setConfig((prev: any) => ({ ...prev, infants: prev.infants + 1 }))}
                className="w-8 h-full flex items-center justify-center font-bold text-base text-zinc-650 hover:bg-zinc-50 cursor-pointer select-none"
              >
                +
              </button>
            </div>
          </div>
        </div>



        
        {/* Apply Button */}
        <div className="pt-2">
          <button 
            type="button"
            onClick={onClose}
            className="bg-brand-orange text-white px-8 py-2 rounded-lg font-bold hover:bg-brand-orange-hover transition-colors text-sm shadow-md cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MockUtilityModal({
  title,
  onClose,
  children
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-xl p-6 md:p-8 max-w-md w-full shadow-md border border-zinc-100 text-zinc-950"
      >
        <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-3">
          <h3 className="font-bold text-lg text-zinc-900">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function FlightStatusContent() {
  const [flightNo, setFlightNo] = useState('6E-204');
  const [result, setResult] = useState<string | null>(null);

  const handleTrack = () => {
    setResult(`Flight ${flightNo.toUpperCase()}: ON TIME\nRoute: BOM Terminal 2 → DEL Terminal 3\nDeparture: 18:50 (Scheduled)\nGate: 28B`);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Flight Number</label>
        <input 
          type="text" 
          value={flightNo} 
          onChange={(e) => setFlightNo(e.target.value)} 
          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-150 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange/20 text-sm font-bold text-zinc-800" 
          placeholder="e.g. AI-101"
        />
      </div>
      <button onClick={handleTrack} className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-brand-orange-hover text-xs shadow-md cursor-pointer">
        Track Status
      </button>
      {result && (
        <pre className="p-4 bg-zinc-900 text-emerald-400 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
          {result}
        </pre>
      )}
    </div>
  );
}

function WebCheckinContent() {
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckin = () => {
    if (!pnr || !lastName) return;
    setCheckedIn(true);
  };

  return (
    <div className="space-y-4">
      {!checkedIn ? (
        <>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-sans">PNR / Booking Reference</label>
            <input 
              type="text" 
              value={pnr} 
              onChange={(e) => setPnr(e.target.value)} 
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-150 rounded-xl outline-none text-sm font-bold uppercase text-zinc-800" 
              placeholder="e.g. TN2831"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Last Name</label>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-150 rounded-xl outline-none text-sm font-bold text-zinc-800" 
              placeholder="e.g. Smith"
            />
          </div>
          <button onClick={handleCheckin} className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-brand-orange-hover text-xs shadow-md cursor-pointer">
            Begin Check-in
          </button>
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 text-sm">Check-in Complete!</h4>
            <p className="text-xs text-zinc-500 mt-1">Boarding pass reference: #{pnr.toUpperCase()}</p>
          </div>
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 text-left space-y-2 text-xs">
            <p className="font-bold text-zinc-700">Passenger: <span className="text-zinc-900">{lastName.toUpperCase()}</span></p>
            <p className="font-bold text-zinc-700">Seat: <span className="text-zinc-900">14C (Auto-assigned)</span></p>
            <p className="font-bold text-zinc-700">Gate: <span className="text-zinc-900">BOM Terminal 2 - Gate 12</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

function LoungeBookingContent() {
  const [airport, setAirport] = useState('BOM T2');
  const [guests, setGuests] = useState(1);
  const [booked, setBooked] = useState(false);

  return (
    <div className="space-y-4">
      {!booked ? (
        <>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-sans">Airport / Terminal</label>
            <select 
              value={airport} 
              onChange={(e) => setAirport(e.target.value)} 
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-150 rounded-xl outline-none text-sm font-bold text-zinc-800 cursor-pointer"
            >
              <option value="BOM T2">Mumbai (BOM) Terminal 2</option>
              <option value="DEL T3">New Delhi (DEL) Terminal 3</option>
              <option value="BLR T1">Bengaluru (BLR) Terminal 1</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Number of Guests</label>
            <div className="flex items-center gap-3">
              <button type="button" disabled={guests <= 1} onClick={() => setGuests(guests-1)} className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-800 cursor-pointer">-</button>
              <span className="text-sm font-bold text-zinc-800 w-4 text-center">{guests}</span>
              <button type="button" onClick={() => setGuests(guests+1)} className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-800 cursor-pointer">+</button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-zinc-50 p-4 rounded-xl border border-zinc-100">
            <span className="text-xs font-bold text-zinc-500">Rate per guest:</span>
            <span className="text-sm font-extrabold text-brand-orange">₹1,500</span>
          </div>
          <button onClick={() => setBooked(true)} className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-brand-orange-hover text-xs shadow-md cursor-pointer">
            Pay ₹{(guests * 1500).toLocaleString('en-IN')}
          </button>
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 text-sm">Lounge Voucher Confirmed!</h4>
            <p className="text-xs text-zinc-500 mt-1">Lounge: Adani Premium Lounge ({airport})</p>
            <p className="text-xs font-bold text-zinc-700 mt-2">Voucher Code: L-BOM-92048</p>
          </div>
        </div>
      )}
    </div>
  );
}

function PranaamContent() {
  const [tier, setTier] = useState<'platinum' | 'gold'>('gold');
  const [passengers, setPassengers] = useState(1);
  const [booked, setBooked] = useState(false);

  return (
    <div className="space-y-4">
      {!booked ? (
        <>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-sans">Service Package</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                onClick={() => setTier('gold')} 
                className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${tier === 'gold' ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-zinc-200 text-zinc-500 bg-white'}`}
              >
                Gold Assistance
                <span className="block text-[9px] text-zinc-400 font-medium mt-1">₹2,500 / Pax</span>
              </button>
              <button 
                type="button" 
                onClick={() => setTier('platinum')} 
                className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${tier === 'platinum' ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-zinc-200 text-zinc-500 bg-white'}`}
              >
                Platinum Assistance
                <span className="block text-[9px] text-zinc-400 font-medium mt-1">₹4,000 / Pax</span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-sans">Passengers</label>
            <div className="flex items-center gap-3">
              <button type="button" disabled={passengers <= 1} onClick={() => setPassengers(passengers-1)} className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-800 cursor-pointer">-</button>
              <span className="text-sm font-bold text-zinc-800 w-4 text-center">{passengers}</span>
              <button type="button" onClick={() => setPassengers(passengers+1)} className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-800 cursor-pointer">+</button>
            </div>
          </div>
          <button onClick={() => setBooked(true)} className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-brand-orange-hover text-xs shadow-md cursor-pointer">
            Pay ₹{(passengers * (tier === 'gold' ? 2500 : 4000)).toLocaleString('en-IN')}
          </button>
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 text-sm">Pranaam Service Booked!</h4>
            <p className="text-xs text-zinc-500 mt-1">Our agent will coordinate near Airport Gate 1 with a welcome placard.</p>
            <p className="text-xs font-bold text-zinc-700 mt-2">Booking ID: PR-28941</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DutyFreeContent() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [ordered, setOrdered] = useState(false);

  const items = [
    { id: '1', name: 'Chanel Bleu De Chanel Perfume', price: 8200 },
    { id: '2', name: 'Toblerone Chocolate Pack', price: 1200 },
    { id: '3', name: 'Bose QuietComfort Headphones', price: 29900 },
  ];

  const toggleItem = (name: string) => {
    if (selectedItems.includes(name)) {
      setSelectedItems(selectedItems.filter(i => i !== name));
    } else {
      setSelectedItems([...selectedItems, name]);
    }
  };

  const total = items.filter(i => selectedItems.includes(i.name)).reduce((s, i) => s + i.price, 0);

  return (
    <div className="space-y-4">
      {!ordered ? (
        <>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-sans">Available Products</label>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {items.map(item => {
                const isSelected = selectedItems.includes(item.name);
                return (
                  <div 
                    key={item.id} 
                    onClick={() => toggleItem(item.name)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex justify-between items-center ${isSelected ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-zinc-150 bg-white text-zinc-700'}`}
                  >
                    <span>{item.name}</span>
                    <span>₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {selectedItems.length > 0 && (
            <div className="flex justify-between items-center bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <span className="text-xs font-bold text-zinc-500">Order Total:</span>
              <span className="text-sm font-extrabold text-brand-orange">₹{total.toLocaleString('en-IN')}</span>
            </div>
          )}
          <button 
            disabled={selectedItems.length === 0} 
            onClick={() => setOrdered(true)} 
            className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-brand-orange-hover text-xs shadow-md disabled:opacity-50 cursor-pointer"
          >
            Pre-Order Items
          </button>
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 text-sm">Duty Free Pre-Ordered!</h4>
            <p className="text-xs text-zinc-500 mt-1">Please collect your items at the gate store counter before boarding.</p>
            <p className="text-xs font-bold text-zinc-700 mt-2">Order Reference: DF-90248</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ComingSoonModal({ feature, onClose }: { feature: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-lg p-10 shadow-md border border-zinc-100 max-w-sm w-full text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />

        {/* Icon */}
        <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-orange/20 to-orange-100 flex items-center justify-center border border-brand-orange/20 shadow-lg shadow-brand-orange/10">
          <Sparkles className="w-9 h-9 text-brand-orange" />
        </div>

        {/* Badge */}
        <div className="relative z-10 inline-flex items-center gap-1.5 bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-brand-orange/20">
          <Clock className="w-3 h-3" />
          Coming Soon
        </div>

        <h2 className="relative z-10 text-2xl font-extrabold text-zinc-900 mb-3">{feature}</h2>
        <p className="relative z-10 text-zinc-500 text-sm leading-relaxed mb-8">
          We're working hard to bring you <span className="font-bold text-zinc-700">{feature}</span>. This feature will be available soon. Stay tuned!
        </p>

        {/* Actions */}
        <div className="relative z-10 flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full bg-brand-orange text-white py-3.5 rounded-lg font-bold hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-brand-orange/30"
          >
            Got it!
          </button>
          <button
            onClick={onClose}
            className="w-full text-zinc-400 text-xs font-bold hover:text-zinc-600 transition-colors py-1"
          >
            Dismiss
          </button>
        </div>
      </motion.div>
    </div>
  );
}

