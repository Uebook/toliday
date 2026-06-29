import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CreditCard, Mail, Phone, User, ShieldCheck, Ticket, CheckCircle2, ChevronLeft, IndianRupee, Info, Gift, Calendar, Users as UsersIcon, MapPin, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { createBooking, initiatePayment } from '../lib/api';

interface CheckoutFlowProps {
  hotel?: any;
  room?: any;
  searchParams?: any;
  entity?: {
    type: 'bus' | 'cab' | 'holiday' | 'flight';
    bus?: any;
    seats?: string[];
    boarding?: string;
    dropping?: string;
    cab?: any;
    pkg?: any;
    
    // Flights specific selections
    flight?: any;
    returnFlight?: any;
    passengerDetails?: any[];
    selectedSeats?: { outbound: string[]; inbound: string[] };
    selectedMeals?: { outbound: string[]; inbound: string[] };
    selectedBaggage?: { outbound: string[]; inbound: string[] };
    addonsCost?: number;
  };
  onBack: () => void;
  onComplete: () => void;
}

type CheckoutStep = 'customer' | 'review' | 'payment' | 'success';

export default function CheckoutFlow({ hotel, room, entity, searchParams, onBack, onComplete }: CheckoutFlowProps) {
  const [step, setStep] = useState<CheckoutStep>('customer');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    requests: ''
  });
  const [gstEnabled, setGstEnabled] = useState(false);
  const [gstCompany, setGstCompany] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  // Flights specific states
  const passengers = searchParams?.passengers || 1;
  const [passengersInfo, setPassengersInfo] = useState<any[]>(() => {
    return Array(passengers).fill(0).map(() => ({
      firstName: '',
      lastName: '',
      age: '',
      gender: 'male'
    }));
  });
  const [studentIdFile, setStudentIdFile] = useState<string | null>(null);
  const [isVerifyingId, setIsVerifyingId] = useState(false);
  const [idVerified, setIdVerified] = useState(false);

  // Compute nights from searchParams dates
  const arrivalStr = searchParams?.arrival || new Date().toISOString().split('T')[0];
  const departureStr = searchParams?.departure || new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const nightsCount = Math.max(1, Math.ceil((new Date(departureStr).getTime() - new Date(arrivalStr).getTime()) / (1000 * 3600 * 24)));
  const roomsCount = searchParams?.rooms || 1;

  // Price calculations based on type
  const getPriceData = () => {
    if (hotel && room) {
      const basePrice = room.price * nightsCount * roomsCount;
      return { base: basePrice, tax: Math.round(basePrice * 0.12), name: hotel.name, details: room.type, img: room.image || hotel.image, type: 'Hotel', pricePerNight: room.price, nights: nightsCount, rooms: roomsCount };
    }
    if (entity?.type === 'bus') {
      const base = entity.bus.price * (entity.seats?.length || 1);
      return { base, tax: Math.round(base * 0.05), name: entity.bus.name, details: `${entity.seats?.join(', ')} Seats`, img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400', type: 'Bus', boarding: entity.boarding, dropping: entity.dropping };
    }
    if (entity?.type === 'cab') {
      const base = entity.cab.pricePerKm * 150;
      return { base, tax: Math.round(base * 0.05), name: entity.cab.name, details: entity.cab.category, img: entity.cab.image, type: 'Cab' };
    }
    if (entity?.type === 'holiday') {
      const base = entity.pkg.price;
      return { base, tax: Math.round(base * 0.05), name: entity.pkg.name, details: entity.pkg.duration, img: entity.pkg.image, type: 'Holiday' };
    }
    if (entity?.type === 'flight') {
      const baseFlight = (entity.flight?.price || 0) + (entity.returnFlight?.price || 0);
      const base = baseFlight * passengers + (entity.addonsCost || 0);
      return { 
        base, 
        tax: Math.round(base * 0.08), 
        name: `${entity.flight?.airline} (${entity.flight?.flightNo})`, 
        details: entity.returnFlight 
          ? `${entity.flight?.fromCode} ⇄ ${entity.flight?.toCode} (Round Trip)` 
          : `${entity.flight?.fromCode} → ${entity.flight?.toCode} (${entity.flight?.class})`, 
        img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400', 
        type: 'Flight' 
      };
    }
    if (entity?.type === 'activity') {
      const base = (entity.details.price * entity.pax.adults) + (Math.round(entity.details.price * 0.7) * entity.pax.children);
      return { base, tax: Math.round(base * 0.05), name: entity.activity.title, details: `${entity.details.title} | ${entity.timeSlot}`, img: entity.activity.image, type: 'Activity' };
    }
    return { base: 0, tax: 0, name: '', details: '', img: '', type: 'Booking' };
  };

  const getAddonDetails = () => {
    if (entity?.type !== 'flight') return null;
    const cabinClass = searchParams?.paxConfig?.cabinClass || 'economy';
    
    const seatPrice = (s: string) => {
      const row = parseInt(s.slice(0, -1));
      if (row <= 2 && cabinClass !== 'first' && cabinClass !== 'business' && cabinClass !== 'premium_business') return 799;
      if (row === 6) return 499;
      return 0;
    };
    
    const MEALS = { 'Veg Biryani': 350, 'Chicken Tikka Sandwich': 400, 'Gluten-Free Fruit Platter': 290, 'Vegan Salad Wrap': 320 };
    const BAGGAGE = { 'Extra 5 kg': 1200, 'Extra 10 kg': 2200, 'Extra 15 kg': 3200 };

    let seatsCost = 0;
    const outboundSeats = entity.selectedSeats?.outbound || [];
    const inboundSeats = entity.selectedSeats?.inbound || [];
    outboundSeats.forEach((s: string) => { seatsCost += seatPrice(s); });
    inboundSeats.forEach((s: string) => { seatsCost += seatPrice(s); });

    let mealsCost = 0;
    const outboundMeals = (entity.selectedMeals?.outbound || []).filter((m: string) => m !== 'None');
    const inboundMeals = (entity.selectedMeals?.inbound || []).filter((m: string) => m !== 'None');
    outboundMeals.forEach((m: string) => { mealsCost += (MEALS as any)[m] || 0; });
    inboundMeals.forEach((m: string) => { mealsCost += (MEALS as any)[m] || 0; });

    let baggageCost = 0;
    const outboundBaggage = (entity.selectedBaggage?.outbound || []).filter((b: string) => b !== 'None');
    const inboundBaggage = (entity.selectedBaggage?.inbound || []).filter((b: string) => b !== 'None');
    outboundBaggage.forEach((b: string) => { baggageCost += (BAGGAGE as any)[b] || 0; });
    inboundBaggage.forEach((b: string) => { baggageCost += (BAGGAGE as any)[b] || 0; });

    return {
      seatsCost,
      outboundSeats,
      inboundSeats,
      mealsCost,
      outboundMeals,
      inboundMeals,
      baggageCost,
      outboundBaggage,
      inboundBaggage
    };
  };

  // Flights Review Details states
  const [insuranceSelected, setInsuranceSelected] = useState(true);
  const [expandedCancellation, setExpandedCancellation] = useState(false);
  const [expandedChange, setExpandedChange] = useState(false);

  const priceData = getPriceData();
  const insuranceCost = (entity?.type === 'flight' && insuranceSelected) ? (149 * passengers) : 0;
  const total = priceData.base + priceData.tax + insuranceCost - discount;

  const applySpecificCoupon = (code: string) => {
    const uppercaseCode = code.toUpperCase();
    setCoupon(uppercaseCode);
    let disc = 0;
    if (uppercaseCode === 'WELCOME10') {
      disc = Math.round(priceData.base * 0.1);
    } else if (uppercaseCode === 'FIRSTSTAY') {
      disc = 500;
    } else if (uppercaseCode === 'FLIGHTNEW500') {
      disc = 500;
    } else if (uppercaseCode === 'DBSDOM12') {
      disc = Math.min(1000, Math.round(priceData.base * 0.12));
    } else if (uppercaseCode === 'DBSDOME12') {
      disc = Math.min(1500, Math.round(priceData.base * 0.12));
    } else if (uppercaseCode === 'FLIGHTDOM') {
      disc = 200;
    } else {
      setDiscount(0);
      setIsCouponApplied(false);
      return;
    }
    setDiscount(disc);
    setIsCouponApplied(true);
  };

  const handleApplyCoupon = () => {
    applySpecificCoupon(coupon);
  };

  const renderStep = () => {
    switch (step) {
      case 'customer':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-zinc-100">
              <h2 className="text-2xl font-display font-bold text-zinc-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-sans italic text-lg">1</div>
                Primary Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm font-semibold" 
                      placeholder="John" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm font-semibold" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm font-semibold" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm font-semibold" 
                      placeholder="+91 98765 43210" 
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Special Requests (Optional)</label>
                  <textarea 
                    value={formData.requests}
                    onChange={(e) => setFormData({...formData, requests: e.target.value})}
                    className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all min-h-[100px] text-sm font-medium" 
                    placeholder="Late arrival, extra pillows, allergic to dust..."
                  />
                </div>
              </div>

              {/* Optional GST Details */}
              {!entity?.type && (
                <div className="space-y-4 mt-6 border-t border-zinc-100 pt-6">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={gstEnabled}
                      onChange={(e) => setGstEnabled(e.target.checked)}
                      className="w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500/20"
                    />
                    <span className="text-sm font-semibold text-zinc-700">Add GST Details (Optional)</span>
                  </label>

                  {gstEnabled && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"
                    >
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Company Name</label>
                        <input 
                          type="text" 
                          value={gstCompany}
                          onChange={(e) => setGstCompany(e.target.value)}
                          className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm font-semibold" 
                          placeholder="e.g. Toliday Pvt Ltd" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">GSTIN Number</label>
                        <input 
                          type="text" 
                          value={gstNumber}
                          onChange={(e) => setGstNumber(e.target.value)}
                          className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm font-semibold" 
                          placeholder="e.g. 07AAAAA1111A1Z1" 
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

              {/* Dynamic Passengers Form fields for Flight bookings */}
              {entity?.type === 'flight' && (
                <div className="space-y-6 mt-8 border-t border-zinc-100 pt-6">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1 text-left">Passenger Details ({passengers} Traveller{passengers > 1 ? 's' : ''})</h3>
                  <div className="space-y-4">
                    {passengersInfo.map((pax, index) => (
                      <div key={index} className="p-5 bg-zinc-50 rounded-2xl border border-zinc-150 space-y-4 text-left">
                        <p className="text-xs font-bold text-zinc-800">Passenger {index + 1}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          <input 
                            type="text"
                            placeholder="First Name"
                            value={pax.firstName}
                            onChange={(e) => {
                              const updated = [...passengersInfo];
                              updated[index].firstName = e.target.value;
                              setPassengersInfo(updated);
                            }}
                            className="px-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none text-xs text-zinc-800 font-bold"
                          />
                          <input 
                            type="text"
                            placeholder="Last Name"
                            value={pax.lastName}
                            onChange={(e) => {
                              const updated = [...passengersInfo];
                              updated[index].lastName = e.target.value;
                              setPassengersInfo(updated);
                            }}
                            className="px-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none text-xs text-zinc-800 font-bold"
                          />
                          <input 
                            type="number"
                            placeholder="Age"
                            value={pax.age}
                            onChange={(e) => {
                              const updated = [...passengersInfo];
                              updated[index].age = e.target.value;
                              setPassengersInfo(updated);
                            }}
                            className="px-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none text-xs text-zinc-800 font-bold"
                          />
                          <select
                            value={pax.gender}
                            onChange={(e) => {
                              const updated = [...passengersInfo];
                              updated[index].gender = e.target.value;
                              setPassengersInfo(updated);
                            }}
                            className="px-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none text-xs text-zinc-700 font-bold cursor-pointer"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </motion.div>
            <button 
              onClick={() => setStep('review')}
              disabled={
                !formData.firstName || !formData.email || !formData.phone || 
                (entity?.type === 'flight' && passengersInfo.some(p => !p.firstName || !p.lastName || !p.age))
              }
              className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Continue to Review
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );
      case 'review':
        if (entity?.type === 'flight') {
          const flight = entity.flight;
          const returnFlight = entity.returnFlight;
          const depDate = new Date(searchParams?.departure || Date.now());
          const depDateStr = depDate.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit' });
          
          const hasStops = flight.stops > 0;
          const stopCity = flight.stopDetails?.split('via ')[1] || 'Jaipur (JAI)';
          const stopCode = stopCity.includes('(') ? stopCity.split('(')[1].replace(')', '') : 'JAI';
          const stopCityName = stopCity.split('(')[0].trim();

          return (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 text-left"
            >
              <div>
                <h2 className="text-2xl font-display font-extrabold text-zinc-950">Review Flight Details</h2>
              </div>

              {/* Segment Timeline block */}
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-zinc-100 space-y-8">
                {/* Outbound Leg Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-zinc-900 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span className="font-extrabold text-zinc-950 text-sm">Departing Flight</span>
                    <span className="text-xs text-zinc-400 font-bold">•</span>
                    <span className="text-xs text-zinc-500 font-bold">{depDateStr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-zinc-950 text-sm">{flight.fromCity} &rarr; {flight.toCity}</span>
                    <span className="text-xs text-zinc-405 font-bold">{flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`} • {flight.duration}</span>
                    <span className="bg-zinc-100 text-zinc-500 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">Partially Refundable</span>
                  </div>
                </div>

                {/* Timeline Render */}
                {!hasStops ? (
                  /* Direct Flight Segment */
                  <div className="space-y-6 relative pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-extrabold text-[10px]">
                        {flight.airlineCode || '6E'}
                      </div>
                      <span className="text-xs font-extrabold text-zinc-800">{flight.airline}</span>
                      <span className="text-[10px] text-zinc-400 font-bold">{flight.flightNo} • {flight.class}</span>
                    </div>

                    <div className="absolute left-3 top-2 bottom-2 w-[1px] bg-zinc-200" />
                    
                    {/* Departure Node */}
                    <div className="relative">
                      <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                      <div className="flex items-start gap-4">
                        <span className="text-sm font-extrabold text-zinc-950 shrink-0 w-12">{flight.departureTime}</span>
                        <div>
                          <p className="text-xs font-extrabold text-zinc-900">{flight.fromCity} Airport</p>
                          <p className="text-[10px] text-zinc-400 font-bold">Indira Gandhi International Airport, Terminal-3</p>
                        </div>
                      </div>
                    </div>

                    {/* Flight Duration */}
                    <div className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5 py-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {flight.duration}
                    </div>

                    {/* Arrival Node */}
                    <div className="relative">
                      <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-300 border-2 border-white ring-2 ring-zinc-100" />
                      <div className="flex items-start gap-4">
                        <span className="text-sm font-extrabold text-zinc-950 shrink-0 w-12">{flight.arrivalTime}</span>
                        <div>
                          <p className="text-xs font-extrabold text-zinc-900">{flight.toCity} Airport</p>
                          <p className="text-[10px] text-zinc-400 font-bold font-semibold">Chhatrapati Shivaji Maharaj Airport, Terminal-2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 1-Stop Flight Segment (DEL -> JAI -> NMI) */
                  <div className="space-y-6">
                    {/* Leg 1 details */}
                    <div className="space-y-4 relative pl-8">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-md bg-blue-900 flex items-center justify-center text-white font-extrabold text-[10px]">
                          {flight.airlineCode || '6E'}
                        </div>
                        <span className="text-xs font-extrabold text-zinc-800">{flight.airline}</span>
                        <span className="text-[10px] text-zinc-400 font-bold">{flight.flightNo} • {flight.class}</span>
                      </div>

                      <div className="absolute left-3 top-2 bottom-2 w-[1px] border-l border-dashed border-zinc-300" />

                      {/* DEL Departure */}
                      <div className="relative">
                        <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                        <div className="flex items-start gap-4">
                          <span className="text-sm font-extrabold text-zinc-900 shrink-0 w-12">{flight.departureTime}</span>
                          <div>
                            <p className="text-xs font-extrabold text-zinc-955">{flight.fromCity} ({flight.fromCode})</p>
                            <p className="text-[10px] text-zinc-400 font-medium">Indira Gandhi International Airport, Terminal-1, New Delhi</p>
                          </div>
                        </div>
                      </div>

                      {/* Leg 1 flight time */}
                      <div className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5 py-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        00h 55m
                      </div>

                      {/* JAI Arrival */}
                      <div className="relative">
                        <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-300 border-2 border-white ring-2 ring-zinc-100" />
                        <div className="flex items-start gap-4">
                          <span className="text-sm font-extrabold text-zinc-900 shrink-0 w-12">06:15</span>
                          <div>
                            <p className="text-xs font-extrabold text-zinc-955">{stopCityName} ({stopCode})</p>
                            <p className="text-[10px] text-zinc-400 font-medium">Jaipur International Airport, Terminal-2, Jaipur</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Layover Banner */}
                    <div className="flex items-center justify-between py-3 px-6 bg-zinc-50 rounded-2xl border border-zinc-100 relative">
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-zinc-200 -z-0" />
                      <div className="w-full flex justify-center z-10">
                        <div className="bg-white border border-zinc-200 rounded-full px-8 py-2 text-center shadow-xs">
                          <p className="text-xs font-extrabold text-zinc-950">Layover at {stopCityName}, 04h 50m</p>
                          <p className="text-[9px] text-zinc-400 font-bold mt-0.5">Plane Change</p>
                        </div>
                      </div>
                    </div>

                    {/* Leg 2 details */}
                    <div className="space-y-4 relative pl-8">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-md bg-blue-900 flex items-center justify-center text-white font-extrabold text-[10px]">
                          {flight.airlineCode || '6E'}
                        </div>
                        <span className="text-xs font-extrabold text-zinc-800">{flight.airline}</span>
                        <span className="text-[10px] text-zinc-400 font-bold">{flight.airlineCode}-2719 • {flight.class}</span>
                      </div>

                      <div className="absolute left-3 top-2 bottom-2 w-[1px] border-l border-dashed border-zinc-300" />

                      {/* JAI Departure */}
                      <div className="relative">
                        <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-300 border-2 border-white ring-2 ring-zinc-100" />
                        <div className="flex items-start gap-4">
                          <span className="text-sm font-extrabold text-zinc-900 shrink-0 w-12">11:05</span>
                          <div>
                            <p className="text-xs font-extrabold text-zinc-955">{stopCityName} ({stopCode})</p>
                            <p className="text-[10px] text-zinc-400 font-medium">Jaipur International Airport, Terminal-2, Jaipur</p>
                          </div>
                        </div>
                      </div>

                      {/* Leg 2 flight time */}
                      <div className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5 py-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        01h 45m
                      </div>

                      {/* BOM Arrival */}
                      <div className="relative">
                        <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                        <div className="flex items-start gap-4">
                          <span className="text-sm font-extrabold text-zinc-900 shrink-0 w-12">{flight.arrivalTime}</span>
                          <div>
                            <p className="text-xs font-extrabold text-zinc-955">{flight.toCity} ({flight.toCode})</p>
                            <p className="text-[10px] text-zinc-400 font-medium">Navi Mumbai International Airport, Navi Mumbai</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Baggage allowance details */}
                <div className="border border-zinc-100 rounded-2xl p-4 bg-zinc-50/50 space-y-3 text-left">
                  {!hasStops ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                      <span className="font-extrabold text-zinc-700 bg-zinc-100 px-3 py-1 rounded-lg">
                        {flight.fromCode} &rarr; {flight.toCode}
                      </span>
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5 text-zinc-600 font-semibold">
                          <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4" />
                          </svg>
                          Check-in Baggage: <strong className="text-zinc-800">15kg/person</strong>
                        </span>
                        <span className="flex items-center gap-1.5 text-zinc-600 font-semibold">
                          <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4" />
                          </svg>
                          Cabin Baggage: <strong className="text-zinc-800">7kg/person</strong>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 pb-2 border-b border-zinc-100/50">
                        <span className="font-extrabold text-zinc-700 bg-zinc-200/50 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide">
                          {flight.fromCode} &rarr; {stopCode}
                        </span>
                        <div className="flex items-center gap-6">
                          <span className="flex items-center gap-1.5 text-zinc-650 font-semibold">
                            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4" />
                            </svg>
                            Check-in Baggage : <strong className="text-zinc-950 ml-1">15kg/person</strong>
                          </span>
                          <span className="flex items-center gap-1.5 text-zinc-650 font-semibold">
                            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4" />
                            </svg>
                            Cabin Baggage : <strong className="text-zinc-950 ml-1">7kg/person</strong>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 pt-1">
                        <span className="font-extrabold text-zinc-700 bg-zinc-200/50 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide">
                          {stopCode} &rarr; {flight.toCode}
                        </span>
                        <div className="flex items-center gap-6">
                          <span className="flex items-center gap-1.5 text-zinc-655 font-semibold">
                            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4" />
                            </svg>
                            Check-in Baggage : <strong className="text-zinc-950 ml-1">15kg/person</strong>
                          </span>
                          <span className="flex items-center gap-1.5 text-zinc-655 font-semibold">
                            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4" />
                            </svg>
                            Cabin Baggage : <strong className="text-zinc-950 ml-1">7kg/person</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Policy Accordions */}
                <div className="space-y-3 pt-4 border-t border-zinc-100">
                  <div className="border border-zinc-100 rounded-2xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setExpandedCancellation(!expandedCancellation)}
                      className="w-full flex items-center justify-between p-4 font-extrabold text-xs text-zinc-850 hover:bg-zinc-50 transition-colors"
                    >
                      <span>Cancellation fee per person</span>
                      <svg className={`w-4 h-4 text-zinc-400 transform transition-transform duration-200 ${expandedCancellation ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedCancellation && (
                      <div className="p-4 border-t border-zinc-50 bg-zinc-50/50 text-[11px] text-zinc-650 space-y-2 text-left">
                        <div className="grid grid-cols-2 gap-4 pb-2 border-b border-zinc-100 font-bold text-zinc-400">
                          <span>Time Window before Departure</span>
                          <span className="text-right">Cancellation Fee per Traveller</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <span>0 hrs to 2 hrs before departure</span>
                          <span className="text-right font-bold text-zinc-950">Non-Refundable</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <span>2 hrs to 24 hrs before departure</span>
                          <span className="text-right font-bold text-zinc-950">₹3,500 + Airline Charges</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <span>More than 24 hrs before departure</span>
                          <span className="text-right font-bold text-zinc-950">₹3,000 Standard Fee</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-zinc-100 rounded-2xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setExpandedChange(!expandedChange)}
                      className="w-full flex items-center justify-between p-4 font-extrabold text-xs text-zinc-850 hover:bg-zinc-50 transition-colors"
                    >
                      <span>Flight change fee per person</span>
                      <svg className={`w-4 h-4 text-zinc-400 transform transition-transform duration-200 ${expandedChange ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedChange && (
                      <div className="p-4 border-t border-zinc-50 bg-zinc-50/50 text-[11px] text-zinc-650 space-y-2 text-left">
                        <div className="grid grid-cols-2 gap-4 pb-2 border-b border-zinc-100 font-bold text-zinc-400">
                          <span>Time Window before Departure</span>
                          <span className="text-right">Reschedule Fee per Traveller</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <span>0 hrs to 4 hrs before departure</span>
                          <span className="text-right font-bold text-zinc-950">Not Allowed</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <span>4 hrs to 24 hrs before departure</span>
                          <span className="text-right font-bold text-zinc-950">₹3,250 + Fare Difference</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <span>More than 24 hrs before departure</span>
                          <span className="text-right font-bold text-zinc-950">₹2,750 + Fare Difference</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Student verification ID (if Student fare) */}
              {searchParams?.fareType === 'student' && (
                <div className="bg-orange-50/50 border border-orange-200 p-6 rounded-[2rem] text-left space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-brand-orange animate-pulse" />
                    <div>
                      <h4 className="font-extrabold text-zinc-950 text-sm">Student ID Verification Required</h4>
                      <p className="text-[10px] text-zinc-500 font-semibold">Upload a valid student photo ID card to complete your discount booking.</p>
                    </div>
                  </div>
                  
                  {!studentIdFile ? (
                    <div className="relative border-2 border-dashed border-zinc-200 bg-white rounded-xl p-6 text-center hover:border-brand-orange transition-colors">
                      <input type="file" onChange={(e: any) => {
                        const file = e.target.files[0];
                        if (file) {
                          setIsVerifyingId(true);
                          setTimeout(() => {
                            setStudentIdFile(file.name);
                            setIsVerifyingId(false);
                            setIdVerified(true);
                          }, 1200);
                        }
                      }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                      <p className="text-xs font-bold text-zinc-500">{isVerifyingId ? 'Verifying Student Credential via OCR...' : 'Click or Drag student ID card image here'}</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl">
                      <span className="text-xs text-emerald-800 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Uploaded: {studentIdFile} (Student ID Verified)
                      </span>
                      <button type="button" onClick={() => { setStudentIdFile(null); setIdVerified(false); }} className="text-xs font-bold text-rose-500 hover:underline">Remove</button>
                    </div>
                  )}
                </div>
              )}

              {/* Travel Insurance Card */}
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-zinc-100 space-y-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-zinc-950 text-sm flex items-center gap-2">
                      Travel Insurance
                      <span className="text-purple-600 font-extrabold ml-1">₹149</span>
                      <span className="text-zinc-400 font-normal text-[10.5px] uppercase tracking-wider">per traveller</span>
                    </h4>
                    <p className="text-[10px] text-zinc-450 font-semibold mt-0.5">Protect your flight journey against delay, cancellation, and baggage issues.</p>
                  </div>
                </div>

                {/* Insurance Radios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <button
                    type="button"
                    onClick={() => setInsuranceSelected(true)}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all relative cursor-pointer ${
                      insuranceSelected
                        ? 'border-blue-600 bg-blue-50/10 ring-1 ring-blue-600'
                        : 'border-zinc-200 bg-white hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${insuranceSelected ? 'border-blue-600 bg-blue-600' : 'border-zinc-300'}`}>
                        {insuranceSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-zinc-950">Yes, Secure my trip</p>
                        <p className="text-[10px] text-zinc-450 font-bold mt-0.5">Trip delay, bag losses and medical costs covered</p>
                      </div>
                    </div>
                    <span className="absolute -top-2.5 right-4 bg-orange-100 text-orange-700 font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      RECOMMENDED
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInsuranceSelected(false)}
                    className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      !insuranceSelected
                        ? 'border-blue-600 bg-blue-50/10 ring-1 ring-blue-600'
                        : 'border-zinc-200 bg-white hover:border-zinc-300'
                    }`}
                  >
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${!insuranceSelected ? 'border-blue-600 bg-blue-600' : 'border-zinc-300'}`}>
                      {!insuranceSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-zinc-950">No, I'm willing to risk it</p>
                      <p className="text-[10px] text-zinc-450 font-bold mt-0.5">I will cover trip delays or luggage loss charges myself</p>
                    </div>
                  </button>
                </div>

                {/* Insurance Benefits Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-4 border-t border-zinc-100">
                  <div className="bg-zinc-50 border border-zinc-100/50 p-2.5 rounded-xl text-center">
                    <p className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-tight">Trip Delay</p>
                    <p className="text-xs font-extrabold text-zinc-950 mt-1">Upto ₹3,000</p>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-100/50 p-2.5 rounded-xl text-center">
                    <p className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-tight">Trip Cancellation</p>
                    <p className="text-xs font-extrabold text-zinc-950 mt-1">Upto ₹5,000</p>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-100/50 p-2.5 rounded-xl text-center">
                    <p className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-tight">Loss of Baggage</p>
                    <p className="text-xs font-extrabold text-zinc-950 mt-1">Upto ₹10,000</p>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-100/50 p-2.5 rounded-xl text-center">
                    <p className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-tight">Delay in Baggage</p>
                    <p className="text-xs font-extrabold text-zinc-950 mt-1">Upto ₹3,200</p>
                  </div>
                  <button type="button" className="border border-dashed border-zinc-350 bg-white hover:bg-zinc-50 hover:border-zinc-450 transition-colors p-2.5 rounded-xl text-center flex flex-col items-center justify-center cursor-pointer">
                    <span className="text-[10px] font-extrabold text-zinc-650 flex items-center gap-1">
                      More Benefits
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>
                </div>

                {/* Footer notes */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-100/50">
                  <p className="text-[9px] text-zinc-400 font-extrabold uppercase tracking-tight text-center sm:text-left leading-relaxed">
                    Insurance is only for Indian residents between the age group of 1-70 years. By adding insurance, you agree to our <span className="text-blue-600 underline cursor-pointer">T&Cs</span>.
                  </p>
                  <div className="flex items-center gap-1.5 select-none">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Powered by</span>
                    <span className="font-serif italic font-black text-zinc-600 text-[11px] tracking-tight bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200/50">Liberty General Insurance</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        } else {
          return (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-zinc-100">
                <h2 className="text-2xl font-display font-bold text-zinc-900 mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-sans italic text-lg">2</div>
                  Coupon & Review
                </h2>
                
                <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 mb-8">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Have a promo code?</h4>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                      <input 
                        type="text" 
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter code (e.g. WELCOME10, FLIGHTNEW500)"
                        className="w-full pl-12 pr-6 py-3.5 bg-white border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-bold text-sm tracking-widest text-zinc-800"
                      />
                    </div>
                    <button 
                      onClick={handleApplyCoupon}
                      className="bg-zinc-900 text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {isCouponApplied && (
                    <p className="text-xs text-emerald-600 font-bold mt-3 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Coupon code applied successfully! You saved ₹{discount}
                    </p>
                  )}
                  {!isCouponApplied && (
                    <div className="mt-4 flex gap-2">
                      <div className="flex-1 p-3 bg-white border border-dashed border-indigo-200 rounded-xl flex items-center gap-3">
                        <Gift className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase">Available Offer</p>
                          <p className="text-xs font-bold text-indigo-600">
                            Apply WELCOME10 for 10% OFF
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
  
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-6 p-6 bg-zinc-50/50 rounded-[2.5rem] border border-zinc-100/50">
                    <div className="w-full md:w-32 h-32 rounded-3xl overflow-hidden bg-zinc-100 shadow-sm shrink-0">
                      <img src={priceData.img} className="w-full h-full object-cover" alt={priceData.name} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="text-xl font-display font-bold text-zinc-900">{priceData.name}</h5>
                          <p className="text-zinc-500 text-sm flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            Confirmed Selection
                          </p>
                        </div>
                        <div className="bg-white px-3 py-1 rounded-full border border-zinc-100 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          {priceData.type}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase leading-none mb-1">Date</p>
                            <p className="text-xs font-bold text-zinc-900">May 24, 2026</p>
                          </div>
                        </div>
  
                        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
                          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-white/70 uppercase leading-none mb-1">Protection</p>
                            <p className="text-xs font-bold text-white">Full Refund Policy</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="bg-indigo-50/30 p-8 rounded-[2.5rem] border border-indigo-100/50">
                    <h4 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4 text-indigo-600" />
                      Booking Details
                    </h4>
                    <div className="space-y-3">
                       <div className="flex items-center justify-between px-6 py-4 bg-white rounded-3xl border border-indigo-100">
                         <div>
                           <p className="text-lg font-display font-bold text-zinc-900">{priceData.details}</p>
                           <p className="text-xs text-zinc-500">Scheduled for priority processing</p>
                         </div>
                         <div className="text-right">
                           <p className="text-xl font-display font-bold text-indigo-600">₹{priceData.base.toLocaleString('en-IN')}</p>
                         </div>
                       </div>
                       
                       {(priceData as any).boarding && (
                         <div className="grid grid-cols-2 gap-3">
                           <div className="px-6 py-4 bg-white/50 rounded-2xl border border-zinc-100">
                             <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Boarding</p>
                             <p className="text-xs font-bold text-zinc-900 line-clamp-1">{(priceData as any).boarding}</p>
                           </div>
                           <div className="px-6 py-4 bg-white/50 rounded-2xl border border-zinc-100">
                             <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Dropping</p>
                             <p className="text-xs font-bold text-zinc-900 line-clamp-1">{(priceData as any).dropping}</p>
                           </div>
                         </div>
                       )}

                       {/* Guest & GST Details Display */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                         <div className="px-6 py-4 bg-white rounded-3xl border border-indigo-100">
                           <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Primary Guest</p>
                           <p className="text-sm font-bold text-zinc-800">{formData.firstName} {formData.lastName}</p>
                           <p className="text-xs text-zinc-500">{formData.email} | {formData.phone}</p>
                         </div>
                         {gstEnabled && (
                           <div className="px-6 py-4 bg-white rounded-3xl border border-indigo-100">
                             <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">GST Details</p>
                             <p className="text-sm font-bold text-zinc-800">{gstCompany}</p>
                             <p className="text-xs text-zinc-500">GSTIN: {gstNumber}</p>
                           </div>
                         )}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setStep('payment')}
                disabled={searchParams?.fareType === 'student' && !idVerified}
                className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                Confirm to Payment
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          );
        }
      case 'payment':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-zinc-100">
              <h2 className="text-2xl font-display font-bold text-zinc-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-sans italic text-lg">3</div>
                Payment Method
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 rounded-3xl border-2 border-indigo-600 bg-indigo-50/30 flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900">Credit / Debit Card</p>
                      <p className="text-xs text-zinc-500">Secure encrypted payment</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-600" />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase pl-1">Card Number</label>
                    <input type="text" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none transition-all placeholder:text-zinc-300" placeholder="•••• •••• •••• ••••" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase pl-1">Expiry Date</label>
                      <input type="text" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase pl-1">CVV</label>
                      <input type="password" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none" placeholder="•••" />
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <p className="text-xs font-medium text-emerald-700">Your payment information is stored securely and never shared.</p>
                </div>
              </div>
            </div>
            <button 
              onClick={async () => {
                setIsSubmitting(true);
                setBookingError('');
                try {
                  if (entity?.type === 'flight') {
                    // Simulate flights checkout booking creation
                    await new Promise((resolve) => setTimeout(resolve, 1400));
                    setBookingRef('FL-' + Math.random().toString(36).substring(2, 8).toUpperCase());
                    setStep('success');
                  } else {
                    let paymentInfo;
                    
                    if (entity?.type === 'bus') {
                      paymentInfo = await initiatePayment({
                        bookingId: entity.bookingId,
                        bookingType: 'BUS'
                      });

                    } else {
                      const result = await createBooking({
                        guestName: `${formData.firstName} ${formData.lastName}`.trim(),
                        guestEmail: formData.email,
                        guestContact: formData.phone,
                        startDate: arrivalStr,
                        endDate: departureStr,
                        numberOfGuests: searchParams?.guests || priceData.rooms || 1,
                        totalAmount: total,
                        roomTypeId: room?.id || hotel?.roomTypeId || '',
                        hotelId: hotel?.id || hotel?.hotelId || '',
                        gstCompany: gstEnabled ? gstCompany : undefined,
                        gstNumber: gstEnabled ? gstNumber : undefined,
                      });
                      
                      if (window.location.hostname === 'localhost') {
                        // Skip CCAvenue payment in local development
                        setBookingRef(result.bookingReference || result.id);
                        setStep('success');
                        return;
                      }
                      
                      paymentInfo = await initiatePayment({
                        bookingId: result.id,
                        hotelId: result.hotelId,
                        bookingType: 'HOTEL'
                      });
                    }
                    
                    // Build and submit form to CCAvenue
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = paymentInfo.url;
                    
                    const encRequestInput = document.createElement('input');
                    encRequestInput.type = 'hidden';
                    encRequestInput.name = 'encRequest';
                    encRequestInput.value = paymentInfo.encRequest;
                    form.appendChild(encRequestInput);

                    const accessCodeInput = document.createElement('input');
                    accessCodeInput.type = 'hidden';
                    accessCodeInput.name = 'access_code';
                    accessCodeInput.value = paymentInfo.access_code;
                    form.appendChild(accessCodeInput);

                    document.body.appendChild(form);
                    form.submit();
                    return; // Stop execution here as the browser will redirect
                  }
                } catch (err: any) {
                  setBookingError(err.message || 'Booking failed. Please try again.');
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting}
              className="w-full bg-zinc-900 text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-black transition-all shadow-xl shadow-zinc-200 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <>Pay ₹{total.toLocaleString('en-IN')}<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
            {bookingError && (
              <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3 text-sm font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {bookingError}
              </div>
            )}
          </motion.div>
        );
      case 'success':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-10"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-50">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-4xl font-display font-bold text-zinc-900 mb-4">Booking Confirmed!</h2>
              <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed">
                Thank you for choosing <span className="font-bold text-zinc-900">{priceData.name}</span>. A confirmation email has been sent to <span className="font-bold text-zinc-900">{formData.email}</span>.
              </p>
            </div>
            
            <div className="bg-white rounded-[3rem] p-8 max-w-md mx-auto shadow-sm border border-zinc-100 text-left space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-50">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Booking ID</span>
                <span className="text-sm font-bold text-zinc-900">#{ bookingRef || 'BK-92837401'}</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">{entity?.type === 'flight' ? 'Departure Date' : entity?.type === 'activity' ? 'Activity Date' : 'Check In'}</p>
                  <p className="text-sm font-bold text-zinc-900">{entity?.type === 'flight' ? searchParams?.departure : entity?.type === 'activity' ? 'May 30, 2026' : 'May 24, 2026'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">{entity?.type === 'flight' ? 'Return Date' : entity?.type === 'activity' ? 'Time Slot' : 'Check Out'}</p>
                  <p className="text-sm font-bold text-zinc-900">{entity?.type === 'flight' ? (searchParams?.return || 'One Way') : entity?.type === 'activity' ? entity.timeSlot : 'May 26, 2026'}</p>
                </div>
              </div>
              
              {/* If flight booking, print seats and passenger names summary */}
              {entity?.type === 'flight' && (
                <div className="border-t border-zinc-50 pt-4 space-y-2">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase">Passengers & Seats Assigned</p>
                  <div className="space-y-1">
                    {passengersInfo.map((p, i) => (
                      <p key={i} className="text-xs font-semibold text-zinc-700">
                        {i + 1}. {p.firstName} {p.lastName} {entity.selectedSeats?.outbound?.[i] ? `(Seat: ${entity.selectedSeats.outbound[i]})` : '(Seat: Auto)'}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-4 border-t border-zinc-50">
                <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-2xl">
                  <span className="text-xs font-bold text-indigo-600 uppercase">Paid Total</span>
                  <span className="text-lg font-display font-bold text-indigo-900">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={onComplete}
              className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 mx-auto"
            >
              Go to My Bookings
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <button 
                  onClick={onBack}
                  className="text-zinc-500 text-sm font-medium hover:text-indigo-600 mb-2 flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to selection
                </button>
                <h1 className="text-3xl font-display font-bold text-zinc-900">Complete Your Booking</h1>
              </div>
              
              {/* Stepper Display */}
              {step !== 'success' && (
                <div className="hidden md:flex items-center gap-4">
                  {(['customer', 'review', 'payment'] as CheckoutStep[]).map((s, i) => (
                    <div key={s} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110' : 
                        (['customer', 'review', 'payment'].indexOf(step) > i ? 'bg-emerald-500 text-white' : 'bg-zinc-200 text-zinc-500')
                      }`}>
                        {['customer', 'review', 'payment'].indexOf(step) > i ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                      </div>
                      {i < 2 && <div className={`w-12 h-0.5 rounded-full ${['customer', 'review', 'payment'].indexOf(step) > i ? 'bg-emerald-500' : 'bg-zinc-200'}`} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {renderStep()}
          </div>

          {/* Pricing Summary Sidebar */}
          {step !== 'success' && (
            <div className="lg:col-span-4 order-1 lg:order-2">
              <div className="sticky top-32 space-y-6">
                {entity?.type === 'flight' ? (
                  <>
                    {/* Fare Summary Card */}
                    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-zinc-100 space-y-6 text-left relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/20 rounded-bl-[5rem] -z-0" />
                      
                      {/* Alert banner */}
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-2 z-10 relative">
                        <div className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 13l-7 7-7-7" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-emerald-850 font-extrabold">The airfare has decreased by ₹201</span>
                      </div>

                      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 z-10 relative">
                        <h3 className="text-base font-extrabold text-zinc-950">Fare Summary</h3>
                        <button type="button" className="text-blue-600 hover:text-blue-700 font-extrabold text-xs cursor-pointer">Details</button>
                      </div>

                      <div className="space-y-3.5 z-10 relative text-xs text-zinc-600">
                        {/* Base Fare */}
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-zinc-500">Base Fare</span>
                          <span className="font-extrabold text-zinc-900">₹{priceData.base.toLocaleString('en-IN')}</span>
                        </div>

                        {/* Taxes & Fees */}
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-zinc-500">Taxes & Fees</span>
                          <span className="font-extrabold text-zinc-900">₹{priceData.tax.toLocaleString('en-IN')}</span>
                        </div>

                        {/* Travel Insurance */}
                        {insuranceSelected && (
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-zinc-500">Travel Insurance</span>
                            <span className="font-extrabold text-zinc-900">₹{(149 * passengers).toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        {/* Coupon Discount */}
                        {isCouponApplied && (
                          <div className="flex justify-between items-center text-emerald-600 font-bold bg-emerald-50 p-2.5 rounded-lg border border-emerald-105">
                            <span className="flex items-center gap-1.5">
                              <Ticket className="w-3.5 h-3.5 text-emerald-600" />
                              Discount Applied ({coupon})
                            </span>
                            <span>- ₹{discount.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </div>

                      {/* Total Payable */}
                      <div className="pt-4 border-t border-zinc-100 z-10 relative">
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="text-zinc-950 font-extrabold text-sm block">Total Amount</span>
                            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5 block">*Convenience fee may apply</span>
                          </div>
                          <span className="text-2xl font-display font-extrabold text-zinc-950">₹{total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Rewards Point Yellow Ribbon */}
                      <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3 flex items-center gap-2 z-10 relative">
                        <div className="w-5 h-5 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-extrabold text-[11px] shrink-0 shadow-xs">
                          R
                        </div>
                        <span className="text-[10px] text-amber-800 font-extrabold">Earn {(entity.flight?.rewardsPoints || 65) * passengers} Reward Points on this transaction</span>
                      </div>

                      {/* Continue CTA */}
                      {step === 'review' && (
                        <button
                          type="button"
                          onClick={() => setStep('payment')}
                          disabled={searchParams?.fareType === 'student' && !idVerified}
                          className="w-full bg-blue-600 hover:bg-blue-750 text-white py-4 rounded-2xl font-extrabold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Continue
                        </button>
                      )}
                    </div>

                    {/* Apply Coupon Code Card */}
                    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-zinc-100 space-y-4 text-left">
                      <div className="flex items-center gap-2 pb-2 border-b border-zinc-50">
                        <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h4 className="font-extrabold text-zinc-950 text-sm">Apply Coupon Code</h4>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter Coupon Code"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          className="flex-1 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-xs font-bold uppercase tracking-wider text-zinc-800 placeholder:normal-case placeholder:font-normal"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="text-blue-600 hover:text-blue-700 font-extrabold text-xs px-3 py-2 cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>

                      {isCouponApplied && (
                        <p className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Coupon Applied! Saved ₹{discount.toLocaleString('en-IN')}
                        </p>
                      )}

                      {/* Coupon Cards List */}
                      <div className="space-y-3 pt-2">
                        {/* Coupon 1: DBSDOM12 */}
                        <div className="border border-dashed border-zinc-200 rounded-xl p-3 bg-zinc-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="border border-zinc-900 border-dashed rounded px-2 py-0.5 text-[10px] font-extrabold uppercase bg-white">
                              DBSDOM12
                            </div>
                            <button
                              type="button"
                              onClick={() => applySpecificCoupon('DBSDOM12')}
                              className="text-blue-600 hover:text-blue-755 font-extrabold text-xs cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>
                          <p className="text-[10px] text-zinc-900 font-bold leading-normal">
                            Get 12% off up to ₹1,000 on payment with DBS Credit Card.
                          </p>
                          <div className="flex items-center justify-between text-[9px] font-bold">
                            <span className="text-zinc-400 underline cursor-pointer">T&Cs</span>
                            <span className="text-emerald-600 font-extrabold">Save ₹{Math.min(1000, Math.round(priceData.base * 0.12)).toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        {/* Coupon 2: DBSDOME12 */}
                        <div className="border border-dashed border-zinc-200 rounded-xl p-3 bg-zinc-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="border border-zinc-900 border-dashed rounded px-2 py-0.5 text-[10px] font-extrabold uppercase bg-white">
                              DBSDOME12
                            </div>
                            <button
                              type="button"
                              onClick={() => applySpecificCoupon('DBSDOME12')}
                              className="text-blue-600 hover:text-blue-755 font-extrabold text-xs cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>
                          <p className="text-[10px] text-zinc-900 font-bold leading-normal">
                            Get 12% off up to ₹1,500 on payment with DBS Credit Card EMI.
                          </p>
                          <div className="flex items-center justify-between text-[9px] font-bold">
                            <span className="text-zinc-400 underline cursor-pointer">T&Cs</span>
                            <span className="text-emerald-600 font-extrabold">Save ₹{Math.min(1500, Math.round(priceData.base * 0.12)).toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        {/* Coupon 3: FLIGHTDOM */}
                        <div className="border border-dashed border-zinc-200 rounded-xl p-3 bg-zinc-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="border border-zinc-900 border-dashed rounded px-2 py-0.5 text-[10px] font-extrabold uppercase bg-white">
                              FLIGHTDOM
                            </div>
                            <button
                              type="button"
                              onClick={() => applySpecificCoupon('FLIGHTDOM')}
                              className="text-blue-600 hover:text-blue-755 font-extrabold text-xs cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>
                          <p className="text-[10px] text-zinc-900 font-bold leading-normal">
                            Enjoy special discounts on your domestic flight booking.
                          </p>
                          <div className="flex items-center justify-between text-[9px] font-bold">
                            <span className="text-zinc-400 underline cursor-pointer">T&Cs</span>
                            <span className="text-emerald-600 font-extrabold">Save ₹200.00</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center pt-2">
                        <button type="button" className="text-xs font-bold text-zinc-700 hover:text-zinc-900 underline cursor-pointer">
                          View all
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-zinc-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[5rem] -z-0" />
                    
                    <h3 className="text-xl font-display font-bold text-zinc-900 mb-6 pb-4 border-b border-zinc-50 relative z-10">Booking Summary</h3>
                    
                    {/* Entity Mini Card */}
                    <div className="flex gap-4 mb-8 relative z-10">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 shadow-sm">
                        <img src={priceData.img} className="w-full h-full object-cover" alt={priceData.name} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900 line-clamp-1">{priceData.name}</h4>
                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-tight">{priceData.type}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-2.5 h-2.5 text-zinc-400" />
                          <span className="text-[10px] text-zinc-400 truncate max-w-[120px]">Confirmed Destination</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 pt-4 border-t border-zinc-50 relative z-10">
                      {/* Per night breakdown — only for hotels */}
                      {hotel && room && (priceData as any).pricePerNight && (
                        <div className="bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3 mb-2">
                          <p className="text-[11px] font-bold text-orange-600 uppercase tracking-widest mb-1">Price Breakdown</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-500">₹{(priceData as any).pricePerNight.toLocaleString('en-IN')} <span className="text-zinc-400">× {(priceData as any).nights} night{(priceData as any).nights > 1 ? 's' : ''}</span></span>
                            <span className="font-bold text-zinc-800">₹{((priceData as any).pricePerNight * (priceData as any).nights).toLocaleString('en-IN')}</span>
                          </div>
                          {(priceData as any).rooms > 1 && (
                            <div className="flex items-center justify-between text-sm mt-1">
                              <span className="text-zinc-500">{(priceData as any).rooms} rooms</span>
                              <span className="font-bold text-zinc-800">× {(priceData as any).rooms}</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex justify-between items-center text-zinc-500 text-sm">
                        <span className="flex flex-col">
                          Base Fare
                          <span className="text-[10px] text-zinc-400 uppercase tracking-tighter">{hotel && room ? `${(priceData as any).nights} Night${(priceData as any).nights > 1 ? 's' : ''} × ${(priceData as any).rooms} Room${(priceData as any).rooms > 1 ? 's' : ''}` : 'Standard Rate'}</span>
                        </span>
                        <span className="font-bold text-zinc-900">₹{priceData.base.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-500 text-sm">
                        <span>Taxes & Fees</span>
                        <span className="font-bold text-zinc-900">₹{priceData.tax.toLocaleString('en-IN')}</span>
                      </div>
                      {isCouponApplied && (
                        <div className="flex justify-between items-center text-emerald-600 text-sm font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                          <span className="flex items-center gap-2">
                            <Ticket className="w-3.5 h-3.5" />
                            Discount Applied
                          </span>
                          <span>- ₹{discount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-zinc-100">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-zinc-900 font-bold">Total Payable</span>
                        <div className="text-right">
                          <p className="text-3xl font-display font-bold text-indigo-600">₹{total.toLocaleString('en-IN')}</p>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Inclusive of all taxes</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-start gap-3">
                      <Info className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                      <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-tight font-bold">
                        By proceeding, you agree to our <span className="text-indigo-600 cursor-pointer">Terms & Conditions</span> and <span className="text-indigo-600 cursor-pointer">Booking Policy</span>.
                      </p>
                    </div>
                  </div>
                )}

                {entity?.type !== 'flight' && (
                  <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-6 text-white shadow-xl shadow-indigo-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold">Book with Confidence</p>
                        <p className="text-xs opacity-80">Secure global payments</p>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed opacity-70">
                      We use 256-bit SSL encryption to protect your data. Your credit card information is never stored on our servers.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
