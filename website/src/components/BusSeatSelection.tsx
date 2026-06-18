import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bus, MapPin, Star, Users, ChevronRight, Wifi, Battery, Coffee, 
  ChevronLeft, ArrowRight, CheckCircle2, Info, Clock, Check
} from 'lucide-react';
import { getBusSeatMatrix, lockBusSeats } from '../lib/api';

interface BusSeatSelectionProps {
  bus: any; // this is the schedule object now
  onBack: () => void;
  onProceed: (seats: string[], boardingPoint: string, droppingPoint: string, bookingId: string) => void;
}

const PICKUP_POINTS = [
  { name: 'Borivali West - Near IC Colony', time: '21:30' },
  { name: 'Andheri East - Bisleri Factory', time: '22:15' },
  { name: 'Sion - Circle Office', time: '22:45' },
  { name: 'Vashi - Old Toll Plaza', time: '23:30' }
];

const DROP_POINTS = [
  { name: 'Panjim - Near Bus Stand', time: '05:45' },
  { name: 'Mapusa - Circle', time: '06:30' },
  { name: 'Candolim - Beach Road', time: '07:15' }
];

const Seat = ({ id, status, isSelected, onClick, type = 'seater' }: any) => {
  const getStatusColor = () => {
    if (status === 'booked') return 'bg-zinc-100 text-zinc-300 border-zinc-50 cursor-not-allowed';
    if (isSelected) return 'bg-indigo-600 text-white border-indigo-700 shadow-lg shadow-indigo-100 scale-105 z-10';
    return 'bg-white text-zinc-400 border-zinc-200 hover:border-indigo-400 hover:text-indigo-600';
  };

  return (
    <div 
      onClick={() => status !== 'booked' && onClick(id)}
      className={`
        relative border-2 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer font-bold text-[10px]
        ${type === 'sleeper' ? 'h-24 w-12' : 'h-10 w-10'}
        ${getStatusColor()}
      `}
    >
      {id}
      {status === 'booked' && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] rounded-lg" />
      )}
      {isSelected && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm"
        >
          <Check className="w-2 h-2 text-indigo-600 stroke-[4px]" />
        </motion.div>
      )}
    </div>
  );
};

export default function BusSeatSelection({ bus, onBack, onProceed }: BusSeatSelectionProps) {
  const [activeDeck, setActiveDeck] = useState<'LOWER' | 'UPPER'>('LOWER');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [boardingPoint, setBoardingPoint] = useState(PICKUP_POINTS[0]);
  const [droppingPoint, setDroppingPoint] = useState(DROP_POINTS[0]);
  const [selectionStep, setSelectionStep] = useState<'seats' | 'points'>('seats');
  
  const [matrix, setMatrix] = useState<{ layout: any[]; lockedSeats: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLocking, setIsLocking] = useState(false);

  useEffect(() => {
    getBusSeatMatrix(bus.id).then(data => {
       setMatrix(data);
       setLoading(false);
    }).catch(err => {
       console.error(err);
       setLoading(false);
    });
  }, [bus.id]);

  const toggleSeat = (id: string) => {
    setSelectedSeats(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const isSleeper = bus.bus?.type?.toLowerCase().includes('sleeper');

  const handleProceed = async () => {
    try {
      setIsLocking(true);
      const res = await lockBusSeats({
         scheduleId: bus.id,
         selectedSeats,
         passengerDetails: [], // Can be filled in checkout
         totalFare: selectedSeats.length * parseFloat(bus.baseFare || '0'),
      });
      onProceed(selectedSeats, boardingPoint.name, droppingPoint.name, res.id);
    } catch (e: any) {
      alert(e.message || 'Failed to lock seats');
      setIsLocking(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Summary */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6">
              <button 
                onClick={onBack}
                className="w-12 h-12 rounded-2xl border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-indigo-600 hover:border-indigo-100 transition-all"
              >
                 <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                 <h1 className="text-2xl font-display font-bold text-zinc-900">{bus.name}</h1>
                 <p className="text-zinc-500 text-sm font-medium">{bus.type} • AC • {bus.rating} <Star className="w-3 h-3 inline mb-1 fill-amber-400 text-amber-400" /></p>
              </div>
           </div>
           
           <div className="flex items-center gap-8 bg-zinc-50 px-8 py-4 rounded-[2rem]">
              <div className="text-center">
                 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Departure</p>
                 <p className="text-lg font-bold text-zinc-900">{bus.departure}</p>
                 <p className="text-[9px] text-zinc-400 font-bold">MUMBAI</p>
              </div>
              <div className="px-4">
                 <ArrowRight className="w-4 h-4 text-zinc-300" />
              </div>
              <div className="text-center">
                 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Arrival</p>
                 <p className="text-lg font-bold text-zinc-900">{bus.arrival}</p>
                 <p className="text-[9px] text-zinc-400 font-bold">GOA</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Layout Area */}
          <div className="lg:col-span-8 space-y-6">
             <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-zinc-100">
                {/* Step Tabs */}
                <div className="flex gap-4 mb-10 bg-zinc-50 p-2 rounded-[2rem] w-fit mx-auto lg:mx-0">
                   <button 
                    onClick={() => setSelectionStep('seats')}
                    className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${selectionStep === 'seats' ? 'bg-white text-indigo-600 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                   >
                    Select Seats
                   </button>
                   <button 
                    onClick={() => setSelectionStep('points')}
                    className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${selectionStep === 'points' ? 'bg-white text-indigo-600 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                   >
                    Boarding Point
                   </button>
                </div>

                <AnimatePresence mode="wait">
                  {selectionStep === 'seats' ? (
                    <motion.div 
                      key="seats"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col md:flex-row gap-12"
                    >
                       {/* Bus Body Layout */}
                       <div className="flex-1">
                          <div className="bg-zinc-50 rounded-[3rem] p-8 border border-zinc-100 relative">
                             {/* Steering Wheel Area */}
                             <div className="absolute top-8 right-8 text-zinc-300">
                                <Users className="w-8 h-8 opacity-20" />
                             </div>

                             {/* Deck Selector for Sleepers */}
                             {isSleeper && (
                               <div className="flex gap-4 mb-8">
                                  {['LOWER', 'UPPER'].map(deck => (
                                    <button 
                                      key={deck}
                                      onClick={() => setActiveDeck(deck as any)}
                                      className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${activeDeck === deck ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl' : 'bg-white border-zinc-100 text-zinc-400'}`}
                                    >
                                       {deck} Deck
                                    </button>
                                  ))}
                               </div>
                             )}

                             {/* Seat Grid Dynamic */}
                             <div className="flex flex-col gap-6 relative min-h-[300px]">
                                {loading && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-50/80 z-20">
                                    <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                  </div>
                                )}
                                <div className="grid grid-cols-5 gap-4 relative">
                                   {matrix?.layout?.filter((l: any) => l.deck === activeDeck).map((seat: any) => {
                                      // Positioning logic based on row and col could be absolute or grid based.
                                      // For grid-cols-5, assuming column 3 is aisle.
                                      // If column is 3, 4, 5 we adjust grid column span/start.
                                      // Simplified rendering for demonstration.
                                      const isLocked = matrix.lockedSeats.includes(seat.seatName);
                                      return (
                                        <div 
                                          key={seat.seatName} 
                                          style={{ gridColumn: seat.column > 2 ? seat.column + 1 : seat.column, gridRow: seat.row }}
                                        >
                                          <Seat 
                                            id={seat.seatName} 
                                            status={isLocked ? 'booked' : 'available'} 
                                            isSelected={selectedSeats.includes(seat.seatName)}
                                            onClick={toggleSeat}
                                            type={seat.seatType.toLowerCase()}
                                          />
                                        </div>
                                      );
                                   })}
                                </div>
                             </div>
                          </div>
                          
                          {/* Legend */}
                          <div className="mt-8 flex gap-6 px-4">
                             <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-md border-2 border-zinc-200" />
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Available</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-md border-2 border-indigo-600 bg-indigo-600" />
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Selected</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-md border-2 border-zinc-100 bg-zinc-100" />
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Booked</span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="points"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    >
                       {/* Boarding Points */}
                       <div className="space-y-6">
                          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-6">Choose Boarding</h4>
                          <div className="space-y-3">
                             {PICKUP_POINTS.map((pt, i) => (
                               <label key={i} className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${boardingPoint.name === pt.name ? 'border-indigo-600 bg-indigo-50/50' : 'border-zinc-50 bg-zinc-50/30 hover:border-zinc-100'}`}>
                                  <div className="flex items-center gap-4">
                                     <input 
                                      type="radio" 
                                      name="boarding" 
                                      checked={boardingPoint.name === pt.name}
                                      onChange={() => setBoardingPoint(pt)}
                                      className="sr-only" 
                                     />
                                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${boardingPoint.name === pt.name ? 'border-indigo-600' : 'border-zinc-200'}`}>
                                        {boardingPoint.name === pt.name && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                                     </div>
                                     <div>
                                        <p className="text-sm font-bold text-zinc-900">{pt.name}</p>
                                        <p className="text-[10px] text-zinc-400 font-medium">Reporting time: {pt.time}</p>
                                     </div>
                                  </div>
                                  <span className="text-xs font-bold text-zinc-900">{pt.time}</span>
                               </label>
                             ))}
                          </div>
                       </div>

                       {/* Dropping Points */}
                       <div className="space-y-6">
                          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-6">Choose Dropping</h4>
                          <div className="space-y-3">
                             {DROP_POINTS.map((pt, i) => (
                               <label key={i} className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${droppingPoint.name === pt.name ? 'border-amber-600 bg-amber-50/30' : 'border-zinc-50 bg-zinc-50/30 hover:border-zinc-100'}`}>
                                  <div className="flex items-center gap-4">
                                     <input 
                                      type="radio" 
                                      name="dropping" 
                                      checked={droppingPoint.name === pt.name}
                                      onChange={() => setDroppingPoint(pt)}
                                      className="sr-only" 
                                     />
                                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${droppingPoint.name === pt.name ? 'border-amber-600' : 'border-zinc-200'}`}>
                                        {droppingPoint.name === pt.name && <div className="w-2.5 h-2.5 rounded-full bg-amber-600" />}
                                     </div>
                                     <div>
                                        <p className="text-sm font-bold text-zinc-900">{pt.name}</p>
                                        <p className="text-[10px] text-zinc-400 font-medium">{pt.time}</p>
                                     </div>
                                  </div>
                                  <span className="text-xs font-bold text-zinc-900">{pt.time}</span>
                               </label>
                             ))}
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4">
             <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-zinc-100 sticky top-28">
                <h3 className="text-lg font-bold text-zinc-900 mb-8 pb-4 border-b border-zinc-50">Trip Summary</h3>
                
                <div className="space-y-6 mb-10">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                            <CheckCircle2 className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Seats Selected</p>
                            <p className="text-sm font-bold text-zinc-900">
                               {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                            </p>
                         </div>
                      </div>
                      <span className="text-xs font-bold text-indigo-600 px-3 py-1 bg-indigo-50 rounded-lg">{selectedSeats.length} Seats</span>
                   </div>

                   <div className="bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100 space-y-4">
                      <div className="flex gap-4">
                         <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                         <div>
                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Boarding</p>
                            <p className="text-xs font-bold text-zinc-900">{boardingPoint.name}</p>
                         </div>
                      </div>
                      <div className="ml-2 w-px h-6 bg-zinc-200 border-l border-dashed" />
                      <div className="flex gap-4">
                         <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                         <div>
                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Dropping</p>
                            <p className="text-xs font-bold text-zinc-900">{droppingPoint.name}</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-zinc-50">
                   <div className="flex justify-between items-center mb-6">
                      <p className="text-sm font-bold text-zinc-500">Total Price</p>
                      <p className="text-3xl font-display font-bold text-zinc-900 tracking-tight">
                         ₹{(selectedSeats.length * parseFloat(bus.baseFare || '0')).toLocaleString('en-IN')}
                      </p>
                   </div>

                   {selectionStep === 'seats' ? (
                     <button 
                        disabled={selectedSeats.length === 0}
                        onClick={() => setSelectionStep('points')}
                        className={`w-full py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs ${selectedSeats.length > 0 ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100' : 'bg-zinc-100 text-zinc-300 cursor-not-allowed shadow-none'}`}
                     >
                        Confirm Seats
                        <ChevronRight className="w-5 h-5" />
                     </button>
                   ) : (
                     <button 
                        disabled={isLocking}
                        onClick={handleProceed}
                        className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-zinc-100 flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50"
                     >
                        {isLocking ? 'Locking Seats...' : 'Continue Booking'}
                        <ChevronRight className="w-5 h-5" />
                     </button>
                   )}
                </div>

                <div className="mt-8 flex items-center gap-3 bg-zinc-50 p-4 rounded-2xl">
                   <Info className="w-4 h-4 text-zinc-400 shrink-0" />
                   <p className="text-[10px] text-zinc-500 font-medium leading-relaxed italic">
                      Price exclusive of taxes and convenience fee.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function idxForBooked(id: string) {
   const booked = ['1A', '3B', '5D', '2C'];
   return booked.includes(id);
}
