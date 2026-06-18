import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, ChevronRight, ChevronLeft, Check, Sparkles, ShoppingBag, Coffee, ArrowRight, Heart, AlertTriangle } from 'lucide-react';
import { Flight } from '../lib/api';

interface FlightAddonsProps {
  flight: Flight;
  returnFlight?: Flight;
  searchParams: any;
  onBack: () => void;
  onProceed: (addons: {
    seats: { outbound: string[]; inbound: string[] };
    meals: { outbound: string[]; inbound: string[] };
    baggage: { outbound: string[]; inbound: string[] };
  }) => void;
}

type TabType = 'seats' | 'meals' | 'baggage';

export default function FlightAddons({ flight, returnFlight, searchParams, onBack, onProceed }: FlightAddonsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('seats');
  const [activeJourney, setActiveJourney] = useState<'outbound' | 'inbound'>('outbound');
  
  const passengersCount = searchParams?.passengers || 1;
  const cabinClass = searchParams?.paxConfig?.cabinClass || 'economy';

  // State arrays per passenger index
  const [outboundSeats, setOutboundSeats] = useState<string[]>([]);
  const [inboundSeats, setInboundSeats] = useState<string[]>([]);
  
  const [outboundMeals, setOutboundMeals] = useState<string[]>(Array(passengersCount).fill('None'));
  const [inboundMeals, setInboundMeals] = useState<string[]>(Array(passengersCount).fill('None'));

  const [outboundBaggage, setOutboundBaggage] = useState<string[]>(Array(passengersCount).fill('None'));
  const [inboundBaggage, setInboundBaggage] = useState<string[]>(Array(passengersCount).fill('None'));

  const [activePaxIndex, setActivePaxIndex] = useState(0);
  const [exitRowWarning, setExitRowWarning] = useState<string | null>(null);

  // Constants for calculations
  const MEAL_OPTIONS = [
    { name: 'None', desc: 'No Meal pre-ordered', price: 0 },
    { name: 'Veg Biryani', desc: 'Aromatic basmati rice with mixed veggies', price: 350 },
    { name: 'Chicken Tikka Sandwich', desc: 'Grilled sandwich with spiced chicken filling', price: 400 },
    { name: 'Gluten-Free Fruit Platter', desc: 'Fresh seasonal fruits with organic honey', price: 290 },
    { name: 'Vegan Salad Wrap', desc: 'Fresh garden greens wrapped in wheat tortilla', price: 320 }
  ];

  const BAGGAGE_OPTIONS = [
    { name: 'None', desc: 'Standard 15kg check-in weight included', price: 0 },
    { name: 'Extra 5 kg', desc: 'Increase check-in weight to 20kg', price: 1200 },
    { name: 'Extra 10 kg', desc: 'Increase check-in weight to 25kg', price: 2200 },
    { name: 'Extra 15 kg', desc: 'Increase check-in weight to 30kg', price: 3200 }
  ];

  // Map seats details
  const seatPriceMap = (seatCode: string) => {
    const row = parseInt(seatCode.slice(0, -1));
    const isExitRow = row === 6;
    const isFrontRow = row <= 2;
    if (isFrontRow && cabinClass !== 'first' && cabinClass !== 'business' && cabinClass !== 'premium_business') return { label: 'Front Row (Premium)', price: 799 };
    if (isExitRow) return { label: 'Exit Row (Legroom)', price: 499 };
    return { label: 'Standard Seat', price: 0 };
  };

  const handleSeatClick = (seatId: string) => {
    const targetSeats = activeJourney === 'outbound' ? outboundSeats : inboundSeats;
    const setSeats = activeJourney === 'outbound' ? setOutboundSeats : setInboundSeats;
    
    // Exit Row Warning
    const row = parseInt(seatId.slice(0, -1));
    if (row === 6 && !targetSeats.includes(seatId)) {
      setExitRowWarning(seatId);
      return;
    }

    toggleSeatSelection(seatId, targetSeats, setSeats);
  };

  const toggleSeatSelection = (seatId: string, current: string[], setFn: Function) => {
    if (current.includes(seatId)) {
      setFn(current.filter(s => s !== seatId));
    } else {
      if (current.length < passengersCount) {
        setFn([...current, seatId]);
      } else {
        // Replace oldest selection or show warning
        setFn([...current.slice(1), seatId]);
      }
    }
  };

  // Add-on Cost Calculations
  const getAddonCosts = () => {
    let seatCost = 0;
    outboundSeats.forEach(s => { seatCost += seatPriceMap(s).price; });
    inboundSeats.forEach(s => { seatCost += seatPriceMap(s).price; });

    let mealCost = 0;
    outboundMeals.forEach(m => { mealCost += MEAL_OPTIONS.find(o => o.name === m)?.price || 0; });
    inboundMeals.forEach(m => { mealCost += MEAL_OPTIONS.find(o => o.name === m)?.price || 0; });

    let baggageCost = 0;
    outboundBaggage.forEach(b => { baggageCost += BAGGAGE_OPTIONS.find(o => o.name === b)?.price || 0; });
    inboundBaggage.forEach(b => { baggageCost += BAGGAGE_OPTIONS.find(o => o.name === b)?.price || 0; });

    return { seats: seatCost, meals: mealCost, baggage: baggageCost, total: seatCost + mealCost + baggageCost };
  };

  const addonCosts = getAddonCosts();

  const handleFinalSubmit = () => {
    onProceed({
      seats: { outbound: outboundSeats, inbound: outboundSeats },
      meals: { outbound: outboundMeals, inbound: inboundMeals },
      baggage: { outbound: outboundBaggage, inbound: inboundBaggage }
    });
  };

  const handleSkipSeats = () => {
    // Automatically fill seats and proceed
    onProceed({
      seats: { outbound: outboundSeats, inbound: inboundSeats },
      meals: { outbound: outboundMeals, inbound: inboundMeals },
      baggage: { outbound: outboundBaggage, inbound: inboundBaggage }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-20 text-zinc-850">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Step Indicator Header */}
        <div className="flex justify-between items-center mb-8 border-b border-zinc-200 pb-5">
          <div className="text-left">
            <button onClick={onBack} className="text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-brand-orange transition-colors mb-1.5 flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5" /> Back to flight listing
            </button>
            <h1 className="text-3xl font-display font-extrabold text-zinc-950">Select Flights Add-ons</h1>
          </div>

          {/* Stepper bar */}
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-zinc-400">
            <span className="text-emerald-500">1. Search</span>
            <span className="text-zinc-300">→</span>
            <span className="text-emerald-500">2. Results</span>
            <span className="text-zinc-300">→</span>
            <span className="text-zinc-950 font-extrabold bg-zinc-200 px-3 py-1 rounded-full">3. Add-ons</span>
            <span className="text-zinc-300">→</span>
            <span>4. Passengers</span>
            <span className="text-zinc-300">→</span>
            <span>5. Payment</span>
          </div>
        </div>

        {/* Multi-journey toggles (for round trip) */}
        {returnFlight && (
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => setActiveJourney('outbound')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeJourney === 'outbound' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white border border-zinc-200 text-zinc-500 hover:bg-zinc-100'}`}
            >
              Outbound ({flight.fromCode} → {flight.toCode})
            </button>
            <button 
              onClick={() => setActiveJourney('inbound')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeJourney === 'inbound' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white border border-zinc-200 text-zinc-500 hover:bg-zinc-100'}`}
            >
              Inbound ({flight.toCode} → {flight.fromCode})
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Add-on options */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Add-on Tabs selection bar */}
            <div className="bg-white p-2 rounded-2xl border border-zinc-100 shadow-sm flex">
              {[
                { id: 'seats', label: 'Seat Selection', icon: Plane },
                { id: 'meals', label: 'Meal Options', icon: Coffee },
                { id: 'baggage', label: 'Extra Baggage', icon: ShoppingBag }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${isActive ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20' : 'text-zinc-500 hover:text-zinc-800'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tabs Content Panels */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm">
              <AnimatePresence mode="wait">
                
                {/* 1. SEATS TAB */}
                {activeTab === 'seats' && (
                  <motion.div
                    key="seats-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-4 border-b border-zinc-100 pb-4">
                      <div>
                        <h3 className="font-display font-extrabold text-lg text-zinc-900">Choose Seats ({activeJourney.toUpperCase()})</h3>
                        <p className="text-xs text-zinc-400 font-medium">Select up to {passengersCount} seats for your travelers.</p>
                      </div>
                      <button 
                        onClick={handleSkipSeats}
                        className="text-xs text-zinc-400 hover:text-zinc-800 font-bold underline cursor-pointer"
                      >
                        Skip seat selection (Free random assignment)
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 justify-center py-6">
                      
                      {/* Aircraft SVG Map wrapper */}
                      <div className="relative bg-zinc-50 p-6 rounded-[3rem] border-4 border-zinc-100 max-w-[260px] mx-auto shadow-inner">
                        {/* Fuselage Nose shape */}
                        <div className="absolute -top-10 left-0 right-0 h-10 bg-zinc-100 rounded-t-[5rem] flex items-center justify-center border-t border-l border-r border-zinc-200">
                          <Plane className="w-4 h-4 text-zinc-350 transform rotate-180" />
                        </div>
                        
                        {/* Lavatory Front icons */}
                        <div className="flex justify-between text-[8px] font-bold text-zinc-400 mb-6 px-4">
                          <span className="bg-zinc-200/60 px-2 py-1 rounded">LAVATORY</span>
                          <span className="bg-zinc-200/60 px-2 py-1 rounded">GALLEY</span>
                        </div>

                        {/* Plane Seats Grid */}
                        <div className="grid grid-cols-7 gap-2">
                          {[...Array(10)].map((_, rowIdx) => {
                            const row = rowIdx + 1;
                            const isBusinessRow = row <= 2;
                            const isExitRow = row === 6;

                            return (
                              <div key={row} className="col-span-7 grid grid-cols-7 gap-2 items-center">
                                {/* Seat Columns */}
                                {['A', 'B', 'C', 'X', 'D', 'E', 'F'].map((col, colIdx) => {
                                  if (col === 'X') {
                                    // Aisle number
                                    return <span key={col} className="text-[10px] font-bold text-zinc-300 text-center">{row}</span>;
                                  }

                                  // Disable B and E columns in Business class for a 2+2 layout
                                  if (isBusinessRow && (col === 'B' || col === 'E')) {
                                    return <div key={col} className="w-7 h-7" />;
                                  }

                                  const seatId = `${row}${col}`;
                                  const targetSeats = activeJourney === 'outbound' ? outboundSeats : inboundSeats;
                                  const isSelected = targetSeats.includes(seatId);
                                  
                                  // Mock Occupied seats
                                  const isOccupied = ['1A', '2F', '4B', '4C', '7A', '7E', '8C', '10F'].includes(seatId);

                                  return (
                                    <button
                                      key={col}
                                      type="button"
                                      disabled={isOccupied}
                                      onClick={() => handleSeatClick(seatId)}
                                      className={`w-7 h-7 rounded-lg border-2 transition-all flex items-center justify-center text-[9px] font-extrabold ${
                                        isOccupied
                                          ? 'bg-zinc-200 border-zinc-250 text-zinc-400 cursor-not-allowed opacity-40'
                                          : isSelected
                                          ? 'bg-brand-orange border-brand-orange text-white shadow-md'
                                          : isExitRow
                                          ? 'bg-amber-50 border-amber-250 text-amber-600 hover:border-amber-400'
                                          : isBusinessRow
                                          ? 'bg-blue-50 border-blue-200 text-blue-600 hover:border-blue-400'
                                          : 'bg-white border-zinc-200 text-zinc-500 hover:border-brand-orange hover:text-brand-orange'
                                      }`}
                                      title={`Seat ${seatId} (${isBusinessRow ? 'Business' : isExitRow ? 'Exit Row' : 'Economy'})`}
                                    >
                                      {col}
                                    </button>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>

                        {/* Lavatory Rear icons */}
                        <div className="flex justify-between text-[8px] font-bold text-zinc-400 mt-6 px-4">
                          <span className="bg-zinc-200/60 px-2 py-1 rounded">LAVATORY</span>
                          <span className="bg-zinc-200/60 px-2 py-1 rounded">LAVATORY</span>
                        </div>
                      </div>

                      {/* Seat Map Legend / Upgrades Info */}
                      <div className="flex-1 space-y-6 text-left">
                        <div>
                          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Seat Map Legend</h4>
                          <div className="grid grid-cols-2 gap-3.5">
                            <div className="flex items-center gap-2 text-xs text-zinc-600">
                              <div className="w-5 h-5 rounded border border-zinc-250 bg-white" />
                              <span>Standard Seat (Free)</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-600">
                              <div className="w-5 h-5 rounded border-2 border-blue-200 bg-blue-50" />
                              <span>Premium Class</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-600">
                              <div className="w-5 h-5 rounded border-2 border-amber-200 bg-amber-50" />
                              <span>Exit Row (Extra space)</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-600">
                              <div className="w-5 h-5 rounded bg-brand-orange" />
                              <span>Selected Seat</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-600">
                              <div className="w-5 h-5 rounded bg-zinc-200 opacity-40" />
                              <span>Occupied Seat</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-150 space-y-3">
                          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                            Exit Row Requirements
                          </h4>
                          <p className="text-[10px] text-zinc-500 leading-relaxed">
                            Passengers in exit rows must be physically able and willing to assist crew members in the unlikely event of an emergency evacuation. Must be 15 years or older.
                          </p>
                        </div>

                        {/* List selected seats details */}
                        <div className="space-y-2.5">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Selected Seats Details</span>
                          <div className="space-y-2">
                            {(activeJourney === 'outbound' ? outboundSeats : inboundSeats).map(s => {
                              const detail = seatPriceMap(s);
                              return (
                                <div key={s} className="flex justify-between items-center px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl">
                                  <span className="font-bold text-xs text-zinc-800">Seat {s} ({detail.label})</span>
                                  <span className="font-bold text-xs text-zinc-700">{detail.price === 0 ? 'Free' : `+₹${detail.price}`}</span>
                                </div>
                              );
                            })}
                            {(activeJourney === 'outbound' ? outboundSeats : inboundSeats).length === 0 && (
                              <p className="text-xs text-zinc-400 italic">No seats selected yet. Click on available seats in the aircraft plan.</p>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* 2. MEALS TAB */}
                {activeTab === 'meals' && (
                  <motion.div
                    key="meals-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="text-left border-b border-zinc-100 pb-4">
                      <h3 className="font-display font-extrabold text-lg text-zinc-900">Pre-Order In-Flight Meals</h3>
                      <p className="text-xs text-zinc-400 font-medium">Add fresh dining options to your journey for each traveller.</p>
                    </div>

                    {/* Passenger indices selectors */}
                    <div className="flex gap-2">
                      {[...Array(passengersCount)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActivePaxIndex(i)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activePaxIndex === i ? 'bg-zinc-850 text-white' : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'}`}
                        >
                          Passenger {i + 1}
                        </button>
                      ))}
                    </div>

                    {/* Meals List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {MEAL_OPTIONS.map(opt => {
                        const currentMeals = activeJourney === 'outbound' ? outboundMeals : inboundMeals;
                        const isSelected = currentMeals[activePaxIndex] === opt.name;
                        
                        return (
                          <div
                            key={opt.name}
                            onClick={() => {
                              const newMeals = [...currentMeals];
                              newMeals[activePaxIndex] = opt.name;
                              if (activeJourney === 'outbound') setOutboundMeals(newMeals);
                              else setInboundMeals(newMeals);
                            }}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer text-left flex justify-between items-start gap-4 ${isSelected ? 'border-brand-orange bg-brand-orange/[0.01]' : 'border-zinc-150 hover:border-zinc-200 bg-white'}`}
                          >
                            <div className="space-y-1">
                              <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                                {opt.name !== 'None' && <Coffee className="w-3.5 h-3.5 text-brand-orange" />}
                                {opt.name}
                              </h4>
                              <p className="text-[10px] text-zinc-400 leading-normal">{opt.desc}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-extrabold text-sm text-zinc-800">{opt.price === 0 ? 'Free' : `₹${opt.price}`}</span>
                              <div className={`w-5 h-5 rounded-full border-2 mt-2 flex items-center justify-center ${isSelected ? 'border-brand-orange bg-brand-orange text-white' : 'border-zinc-300'}`}>
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* 3. BAGGAGE TAB */}
                {activeTab === 'baggage' && (
                  <motion.div
                    key="baggage-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="text-left border-b border-zinc-100 pb-4">
                      <h3 className="font-display font-extrabold text-lg text-zinc-900">Pre-Purchase Checked Baggage</h3>
                      <p className="text-xs text-zinc-400 font-medium">Add extra weight allocations to save up to 40% compared to counter fees.</p>
                    </div>

                    {/* Passenger indices selectors */}
                    <div className="flex gap-2">
                      {[...Array(passengersCount)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActivePaxIndex(i)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activePaxIndex === i ? 'bg-zinc-850 text-white' : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'}`}
                        >
                          Passenger {i + 1}
                        </button>
                      ))}
                    </div>

                    {/* Baggage Weights list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {BAGGAGE_OPTIONS.map(opt => {
                        const currentBaggage = activeJourney === 'outbound' ? outboundBaggage : inboundBaggage;
                        const isSelected = currentBaggage[activePaxIndex] === opt.name;

                        return (
                          <div
                            key={opt.name}
                            onClick={() => {
                              const newBaggage = [...currentBaggage];
                              newBaggage[activePaxIndex] = opt.name;
                              if (activeJourney === 'outbound') setOutboundBaggage(newBaggage);
                              else setInboundBaggage(newBaggage);
                            }}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer text-left flex justify-between items-start gap-4 ${isSelected ? 'border-brand-orange bg-brand-orange/[0.01]' : 'border-zinc-150 hover:border-zinc-200 bg-white'}`}
                          >
                            <div className="space-y-1">
                              <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                                {opt.name !== 'None' && <ShoppingBag className="w-3.5 h-3.5 text-brand-orange" />}
                                {opt.name}
                              </h4>
                              <p className="text-[10px] text-zinc-400 leading-normal">{opt.desc}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-extrabold text-sm text-zinc-800">{opt.price === 0 ? 'Free' : `₹${opt.price}`}</span>
                              <div className={`w-5 h-5 rounded-full border-2 mt-2 flex items-center justify-center ${isSelected ? 'border-brand-orange bg-brand-orange text-white' : 'border-zinc-300'}`}>
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* Right sidebar: Summary Details and Payments */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Consolidated Add-ons Summary card */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-zinc-100 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-[5rem] -z-0" />
              
              <h3 className="text-lg font-display font-extrabold text-zinc-950 mb-6 pb-3 border-b border-zinc-100 relative z-10">Add-ons Summary</h3>
              
              {/* Summary Items breakdowns */}
              <div className="space-y-4 relative z-10">
                {/* Seats summary */}
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <p className="font-bold text-zinc-900">Seat Assignments</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      {outboundSeats.length > 0 ? `Outbound: ${outboundSeats.join(', ')}` : 'Outbound: Auto'}
                      {returnFlight && ` | Inbound: ${inboundSeats.length > 0 ? inboundSeats.join(', ') : 'Auto'}`}
                    </p>
                  </div>
                  <span className="font-bold text-zinc-800">₹{addonCosts.seats.toLocaleString('en-IN')}</span>
                </div>

                {/* Meals summary */}
                <div className="flex justify-between items-start text-xs border-t border-zinc-50 pt-3">
                  <div>
                    <p className="font-bold text-zinc-900">In-Flight Catering</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      Outbound: {outboundMeals.filter(m => m !== 'None').length} meals
                      {returnFlight && ` | Inbound: ${inboundMeals.filter(m => m !== 'None').length} meals`}
                    </p>
                  </div>
                  <span className="font-bold text-zinc-800">₹{addonCosts.meals.toLocaleString('en-IN')}</span>
                </div>

                {/* Baggage summary */}
                <div className="flex justify-between items-start text-xs border-t border-zinc-50 pt-3">
                  <div>
                    <p className="font-bold text-zinc-900">Excess Baggage Allowance</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      Outbound: {outboundBaggage.filter(b => b !== 'None').length} items
                      {returnFlight && ` | Inbound: ${inboundBaggage.filter(b => b !== 'None').length} items`}
                    </p>
                  </div>
                  <span className="font-bold text-zinc-800">₹{addonCosts.baggage.toLocaleString('en-IN')}</span>
                </div>

                {/* Total Summary Row */}
                <div className="border-t border-zinc-150 pt-4 flex justify-between items-end">
                  <span className="font-extrabold text-sm text-zinc-900">Add-ons Subtotal</span>
                  <div className="text-right">
                    <p className="text-2xl font-display font-extrabold text-brand-orange">₹{addonCosts.total.toLocaleString('en-IN')}</p>
                    <p className="text-[9px] text-zinc-400 font-medium mt-0.5">Will be added to fare at checkout</p>
                  </div>
                </div>

                {/* Confirm CTA */}
                <button
                  onClick={handleFinalSubmit}
                  className="w-full bg-zinc-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-xs transition-colors shadow-lg flex items-center justify-center gap-2 group mt-4 cursor-pointer"
                >
                  <span>Proceed to Passenger Info</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Loyalty Strip */}
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-[2rem] text-white text-left shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <h4 className="font-bold text-xs uppercase tracking-wider">Rewards Points</h4>
              </div>
              <p className="text-[10px] text-white/70 leading-normal">
                Pre-purchasing add-ons earns double rewards points! Earn up to <span className="text-brand-orange font-bold">+{Math.round(addonCosts.total * 0.04)} points</span> on this selection.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Exit Row Warning Modal Dialog */}
      <AnimatePresence>
        {exitRowWarning && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full text-center space-y-6 shadow-2xl text-zinc-800"
            >
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-zinc-950">Exit Row Seat Selection</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mt-2">
                  Are you willing and able to execute safety procedures in the event of evacuation? You must be over 15 and physically capable.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setExitRowWarning(null)}
                  className="flex-1 py-3 border border-zinc-200 rounded-xl text-xs font-bold hover:bg-zinc-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const targetSeats = activeJourney === 'outbound' ? outboundSeats : inboundSeats;
                    const setSeats = activeJourney === 'outbound' ? setOutboundSeats : setInboundSeats;
                    toggleSeatSelection(exitRowWarning, targetSeats, setSeats);
                    setExitRowWarning(null);
                  }}
                  className="flex-1 py-3 bg-brand-orange text-white rounded-xl text-xs font-bold hover:bg-orange-600 cursor-pointer"
                >
                  Confirm & Apply
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
