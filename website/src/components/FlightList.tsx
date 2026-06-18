import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Calendar, ArrowRight, Clock, Sparkles, Filter, ChevronRight, AlertCircle, ArrowRightLeft, ShieldCheck, Heart, X } from 'lucide-react';
import { searchFlights, Flight, AIRPORTS } from '../lib/api';

interface FlightListProps {
  searchParams: any;
  onBack: () => void;
  onSelectFlight: (outbound: Flight, inbound?: Flight) => void;
}

export default function FlightList({ searchParams, onBack, onSelectFlight }: FlightListProps) {
  const [outboundFlights, setOutboundFlights] = useState<Flight[]>([]);
  const [inboundFlights, setInboundFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Selected flights in case of round trip
  const [selectedOutbound, setSelectedOutbound] = useState<Flight | null>(null);
  const [selectedInbound, setSelectedInbound] = useState<Flight | null>(null);

  // Active details modal states
  const [activeDetailsFlight, setActiveDetailsFlight] = useState<Flight | null>(null);
  const [detailsActiveTab, setDetailsActiveTab] = useState<'flight' | 'fare' | 'baggage' | 'change'>('flight');

  // Filter States
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [stopsFilter, setStopsFilter] = useState<number[]>([]); // [] means all, [0] means non-stop, etc.
  const [airlinesFilter, setAirlinesFilter] = useState<string[]>([]);
  const [depTimeFilter, setDepTimeFilter] = useState<string[]>([]); // 'morning', 'afternoon', 'evening'
  
  // Sort State
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure' | 'arrival'>('price');

  const fromCode = searchParams?.fromCode || 'BOM';
  const toCode = searchParams?.toCode || 'DEL';
  const departDate = searchParams?.departure || new Date().toISOString().split('T')[0];
  const returnDate = searchParams?.return || '';
  const isRoundTrip = searchParams?.tripOption === 'round-trip';
  const passengers = searchParams?.passengers || 1;
  const fareType = searchParams?.fareType || 'regular';
  const cabinClass = searchParams?.paxConfig?.cabinClass || 'economy';

  const [activeDepartDate, setActiveDepartDate] = useState(departDate);
  const [activeReturnDate, setActiveReturnDate] = useState(returnDate);
  const [activeDateTab, setActiveDateTab] = useState<'outbound' | 'inbound'>('outbound');

  // Reset selected flights when active dates change
  useEffect(() => {
    setSelectedOutbound(null);
  }, [activeDepartDate]);

  useEffect(() => {
    setSelectedInbound(null);
  }, [activeReturnDate]);

  // Sync active dates if searchParams changes from outside
  useEffect(() => {
    if (searchParams?.departure) {
      setActiveDepartDate(searchParams.departure);
    }
    if (searchParams?.return) {
      setActiveReturnDate(searchParams.return);
    }
  }, [searchParams?.departure, searchParams?.return]);

  const fromCity = AIRPORTS.find(a => a.code === fromCode.toUpperCase())?.city || fromCode;
  const toCity = AIRPORTS.find(a => a.code === toCode.toUpperCase())?.city || toCode;

  // Load Flights
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');
      try {
        const outbound = await searchFlights({
          fromCode,
          toCode,
          date: activeDepartDate,
          fareType,
          cabinClass
        });
        setOutboundFlights(outbound);

        // Fetch max price in data to set range slider
        if (outbound.length > 0) {
          const prices = outbound.map(f => f.price);
          setMaxPrice(Math.max(...prices) + 5000);
        }

        if (isRoundTrip && activeReturnDate) {
          const inbound = await searchFlights({
            fromCode: toCode,
            toCode: fromCode,
            date: activeReturnDate,
            fareType,
            cabinClass
          });
          setInboundFlights(inbound);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to search flights');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [fromCode, toCode, activeDepartDate, activeReturnDate, isRoundTrip, fareType, cabinClass]);

  // Pagination States
  const [outboundPage, setOutboundPage] = useState(1);
  const [inboundPage, setInboundPage] = useState(1);
  const FLIGHTS_PER_PAGE = 5;

  // Reset pages on filter/sort changes
  useEffect(() => {
    setOutboundPage(1);
    setInboundPage(1);
  }, [maxPrice, stopsFilter, airlinesFilter, depTimeFilter, sortBy]);

  // Handle filter matching
  const filterFlight = (flight: Flight) => {
    // Price
    if (flight.price > maxPrice) return false;

    // Stops
    if (stopsFilter.length > 0 && !stopsFilter.includes(flight.stops)) return false;

    // Airlines
    if (airlinesFilter.length > 0 && !airlinesFilter.includes(flight.airline)) return false;

    // Departure Time
    if (depTimeFilter.length > 0) {
      const hour = parseInt(flight.departureTime.split(':')[0]);
      let slot = 'night';
      if (hour >= 5 && hour < 12) slot = 'morning';
      else if (hour >= 12 && hour < 17) slot = 'afternoon';
      else if (hour >= 17 && hour < 22) slot = 'evening';
      
      if (!depTimeFilter.includes(slot)) return false;
    }

    return true;
  };

  // Handle Sort
  const sortFlights = (list: Flight[]) => {
    return [...list].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'duration') {
        const getMins = (dur: string) => {
          const match = dur.match(/(\d+)h\s*(\d+)?m?/);
          if (!match) return 0;
          return parseInt(match[1]) * 60 + (match[2] ? parseInt(match[2]) : 0);
        };
        return getMins(a.duration) - getMins(b.duration);
      }
      if (sortBy === 'departure') {
        return a.departureTime.localeCompare(b.departureTime);
      }
      if (sortBy === 'arrival') {
        return a.arrivalTime.localeCompare(b.arrivalTime);
      }
      return 0;
    });
  };

  const filteredOutbound = sortFlights(outboundFlights.filter(filterFlight));
  const filteredInbound = sortFlights(inboundFlights.filter(filterFlight));

  const totalOutboundPages = Math.max(1, Math.ceil(filteredOutbound.length / FLIGHTS_PER_PAGE));
  const totalInboundPages = Math.max(1, Math.ceil(filteredInbound.length / FLIGHTS_PER_PAGE));

  const paginatedOutbound = filteredOutbound.slice(
    (outboundPage - 1) * FLIGHTS_PER_PAGE,
    outboundPage * FLIGHTS_PER_PAGE
  );

  const paginatedInbound = filteredInbound.slice(
    (inboundPage - 1) * FLIGHTS_PER_PAGE,
    inboundPage * FLIGHTS_PER_PAGE
  );

  const handleProceed = () => {
    if (isRoundTrip) {
      if (selectedOutbound && selectedInbound) {
        onSelectFlight(selectedOutbound, selectedInbound);
      }
    } else {
      if (selectedOutbound) {
        onSelectFlight(selectedOutbound);
      }
    }
  };

  // Toggle airline filter
  const toggleAirline = (airlineName: string) => {
    setAirlinesFilter(prev => 
      prev.includes(airlineName) ? prev.filter(a => a !== airlineName) : [...prev, airlineName]
    );
  };

  // Toggle stop filter
  const toggleStops = (stopCount: number) => {
    setStopsFilter(prev => 
      prev.includes(stopCount) ? prev.filter(s => s !== stopCount) : [...prev, stopCount]
    );
  };

  // Toggle dep time filter
  const toggleDepTime = (slot: string) => {
    setDepTimeFilter(prev => 
      prev.includes(slot) ? prev.filter(t => t !== slot) : [...prev, slot]
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-24 text-zinc-850">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Summary Search Panel */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
              <Plane className="w-6 h-6 rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-zinc-900">{fromCity} ({fromCode})</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
                <span className="font-extrabold text-xl text-zinc-900">{toCity} ({toCode})</span>
              </div>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1 flex items-center gap-2">
                <span>{isRoundTrip ? 'Round-Trip' : 'One-Way'}</span>
                <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                <span>{passengers} Traveler{passengers > 1 ? 's' : ''} ({cabinClass === 'premium_business' ? 'Premium Business' : cabinClass === 'premium' ? 'Premium Economy' : cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1)})</span>
                <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                <span className="text-brand-orange font-extrabold">{fareType.toUpperCase()} FARE</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="px-6 py-3 border border-zinc-200 rounded-xl text-xs font-bold hover:bg-zinc-50 hover:border-zinc-300 transition-colors cursor-pointer"
          >
            Modify Search
          </button>
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-zinc-100 shadow-sm">
            <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-zinc-500 font-bold animate-pulse font-display">Simulating TripAdvisor Location & Flight rates...</p>
          </div>
        ) : error ? (
          <div className="py-24 bg-white rounded-[3rem] border border-rose-100 flex flex-col items-center justify-center text-center px-10 shadow-sm">
            <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Search Failed</h3>
            <p className="text-zinc-500 max-w-sm mb-6">{error}</p>
            <button onClick={onBack} className="bg-brand-orange text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 cursor-pointer">Go Back</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Filters */}
            <div className="lg:col-span-3 bg-white p-6 rounded-[2.5rem] shadow-sm border border-zinc-100 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-50">
                <span className="font-display font-extrabold text-zinc-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-orange" />
                  Filters
                </span>
                <button 
                  onClick={() => {
                    setStopsFilter([]);
                    setAirlinesFilter([]);
                    setDepTimeFilter([]);
                    setMaxPrice(30000);
                  }}
                  className="text-[10px] font-bold text-zinc-400 uppercase hover:text-brand-orange transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Price Filter */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Max Fare: ₹{maxPrice.toLocaleString('en-IN')}</label>
                <input 
                  type="range" 
                  min="3000" 
                  max="40000" 
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-brand-orange cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-bold">
                  <span>₹3,000</span>
                  <span>₹40,050</span>
                </div>
              </div>

              {/* Stops Filter */}
              <div className="space-y-3 pt-4 border-t border-zinc-50">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Stops</label>
                <div className="space-y-2">
                  {[
                    { label: 'Non-stop', value: 0 },
                    { label: '1 Stop', value: 1 },
                    { label: '2+ Stops', value: 2 },
                  ].map(stop => (
                    <label key={stop.value} className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-zinc-700 select-none">
                      <input 
                        type="checkbox"
                        checked={stopsFilter.includes(stop.value)}
                        onChange={() => toggleStops(stop.value)}
                        className="rounded border-zinc-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                      />
                      <span>{stop.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Airline Filter */}
              <div className="space-y-3 pt-4 border-t border-zinc-50">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Preferred Airlines</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {Array.from(new Set([...outboundFlights, ...inboundFlights].map(f => f.airline))).map(airline => (
                    <label key={airline} className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-zinc-700 select-none">
                      <input 
                        type="checkbox"
                        checked={airlinesFilter.includes(airline)}
                        onChange={() => toggleAirline(airline)}
                        className="rounded border-zinc-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                      />
                      <span>{airline}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Departure Time Filter */}
              <div className="space-y-3 pt-4 border-t border-zinc-50">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Departure Time</label>
                <div className="space-y-2">
                  {[
                    { label: 'Morning (05:00 - 12:00)', value: 'morning' },
                    { label: 'Afternoon (12:00 - 17:00)', value: 'afternoon' },
                    { label: 'Evening (17:00 - 22:00)', value: 'evening' },
                    { label: 'Night (22:00 - 05:00)', value: 'night' },
                  ].map(time => (
                    <label key={time.value} className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-zinc-700 select-none">
                      <input 
                        type="checkbox"
                        checked={depTimeFilter.includes(time.value)}
                        onChange={() => toggleDepTime(time.value)}
                        className="rounded border-zinc-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                      />
                      <span>{time.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Results Listing Area */}
            <div className="lg:col-span-9 space-y-6">

              {/* Date Selector Tabs for Round Trip */}
              {isRoundTrip && (
                <div className="flex bg-white p-1 rounded-xl border border-zinc-200 shadow-sm w-fit gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveDateTab('outbound')}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeDateTab === 'outbound'
                        ? 'bg-zinc-900 text-white shadow-sm'
                        : 'text-zinc-500 hover:bg-zinc-50'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5 rotate-45" />
                    <span>Outbound Date ({fromCode} → {toCode})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDateTab('inbound')}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeDateTab === 'inbound'
                        ? 'bg-zinc-900 text-white shadow-sm'
                        : 'text-zinc-500 hover:bg-zinc-50'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5 -rotate-135" />
                    <span>Inbound Date ({toCode} → {fromCode})</span>
                  </button>
                </div>
              )}

              {/* Date Carousel Component */}
              <DateCarousel 
                selectedDate={activeDateTab === 'outbound' ? activeDepartDate : activeReturnDate}
                onChangeDate={(newDate) => {
                  if (activeDateTab === 'outbound') {
                    setActiveDepartDate(newDate);
                  } else {
                    setActiveReturnDate(newDate);
                  }
                }}
                minDate={activeDateTab === 'inbound' ? new Date(activeDepartDate) : undefined}
              />
              
              {/* Sort Header Block */}
              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between flex-wrap gap-4">
                <span className="text-xs font-bold text-zinc-400 uppercase">Sort Flights By</span>
                <div className="flex gap-2">
                  {[
                    { label: 'Cheapest Price', value: 'price' },
                    { label: 'Shortest Duration', value: 'duration' },
                    { label: 'Departure Time', value: 'departure' },
                    { label: 'Arrival Time', value: 'arrival' }
                  ].map(opt => (
                    <button 
                      key={opt.value}
                      onClick={() => setSortBy(opt.value as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${sortBy === opt.value ? 'bg-zinc-900 text-white shadow-md' : 'bg-zinc-50 text-zinc-500 border border-zinc-100 hover:bg-zinc-100'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Round Trip Split Selectors */}
              {isRoundTrip ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Left Column: Outbound */}
                  <div className="space-y-4">
                    <div className="bg-zinc-900 text-white px-5 py-3.5 rounded-2xl font-display font-bold text-sm tracking-wide shadow-md flex justify-between items-center">
                      <span>Outbound Flights ({fromCode} → {toCode})</span>
                      <span className="text-[10px] bg-brand-orange px-2 py-0.5 rounded-full font-bold uppercase">Select One</span>
                    </div>

                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                      {paginatedOutbound.length === 0 ? (
                        <EmptyStateCard date={activeDepartDate} />
                      ) : (
                        paginatedOutbound.map(flight => (
                          <FlightResultCard 
                            key={flight.id} 
                            flight={flight} 
                            getAirlineColor={getAirlineColor}
                            isSelected={selectedOutbound?.id === flight.id}
                            onSelect={() => setSelectedOutbound(flight)}
                            fareType={fareType}
                            onOpenDetails={() => {
                              setActiveDetailsFlight(flight);
                              setDetailsActiveTab('flight');
                            }}
                          />
                        ))
                      )}
                    </div>

                    {/* Outbound Pagination Controls */}
                    {totalOutboundPages > 1 && (
                      <div className="flex items-center justify-center gap-1.5 pt-2">
                        <button
                          type="button"
                          disabled={outboundPage === 1}
                          onClick={() => setOutboundPage(prev => Math.max(1, prev - 1))}
                          className="px-2.5 py-1.5 border border-zinc-200 rounded-xl text-[10px] font-bold bg-white text-zinc-650 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer select-none"
                        >
                          Prev
                        </button>
                        
                        {[...Array(totalOutboundPages)].map((_, i) => {
                          const pageNum = i + 1;
                          const isActive = outboundPage === pageNum;
                          return (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => setOutboundPage(pageNum)}
                              className={`w-6 h-6 rounded-lg text-[10px] font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-brand-orange text-white shadow-md'
                                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          type="button"
                          disabled={outboundPage === totalOutboundPages}
                          onClick={() => setOutboundPage(prev => Math.min(totalOutboundPages, prev + 1))}
                          className="px-2.5 py-1.5 border border-zinc-200 rounded-xl text-[10px] font-bold bg-white text-zinc-650 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer select-none"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Inbound */}
                  <div className="space-y-4">
                    <div className="bg-zinc-900 text-white px-5 py-3.5 rounded-2xl font-display font-bold text-sm tracking-wide shadow-md flex justify-between items-center">
                      <span>Inbound Flights ({toCode} → {fromCode})</span>
                      <span className="text-[10px] bg-brand-orange px-2 py-0.5 rounded-full font-bold uppercase">Select One</span>
                    </div>

                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                      {paginatedInbound.length === 0 ? (
                        <EmptyStateCard date={activeReturnDate} />
                      ) : (
                        paginatedInbound.map(flight => (
                          <FlightResultCard 
                            key={flight.id} 
                            flight={flight} 
                            getAirlineColor={getAirlineColor}
                            isSelected={selectedInbound?.id === flight.id}
                            onSelect={() => setSelectedInbound(flight)}
                            fareType={fareType}
                            onOpenDetails={() => {
                              setActiveDetailsFlight(flight);
                              setDetailsActiveTab('flight');
                            }}
                          />
                        ))
                      )}
                    </div>

                    {/* Inbound Pagination Controls */}
                    {totalInboundPages > 1 && (
                      <div className="flex items-center justify-center gap-1.5 pt-2">
                        <button
                          type="button"
                          disabled={inboundPage === 1}
                          onClick={() => setInboundPage(prev => Math.max(1, prev - 1))}
                          className="px-2.5 py-1.5 border border-zinc-200 rounded-xl text-[10px] font-bold bg-white text-zinc-650 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer select-none"
                        >
                          Prev
                        </button>
                        
                        {[...Array(totalInboundPages)].map((_, i) => {
                          const pageNum = i + 1;
                          const isActive = inboundPage === pageNum;
                          return (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => setInboundPage(pageNum)}
                              className={`w-6 h-6 rounded-lg text-[10px] font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-brand-orange text-white shadow-md'
                                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          type="button"
                          disabled={inboundPage === totalInboundPages}
                          onClick={() => setInboundPage(prev => Math.min(totalInboundPages, prev + 1))}
                          className="px-2.5 py-1.5 border border-zinc-200 rounded-xl text-[10px] font-bold bg-white text-zinc-650 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer select-none"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                /* One Way Single Listing */
                <div className="space-y-4">
                  {paginatedOutbound.length === 0 ? (
                    <EmptyStateCard date={activeDepartDate} />
                  ) : (
                    <>
                      {paginatedOutbound.map(flight => (
                        <FlightResultCard 
                          key={flight.id} 
                          flight={flight} 
                          getAirlineColor={getAirlineColor}
                          isSelected={selectedOutbound?.id === flight.id}
                          onSelect={() => setSelectedOutbound(flight)}
                          fareType={fareType}
                          onOpenDetails={() => {
                            setActiveDetailsFlight(flight);
                            setDetailsActiveTab('flight');
                          }}
                        />
                      ))}
                      
                      {/* One Way Pagination Controls */}
                      {totalOutboundPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-4">
                          <button
                            type="button"
                            disabled={outboundPage === 1}
                            onClick={() => setOutboundPage(prev => Math.max(1, prev - 1))}
                            className="px-4 py-2 border border-zinc-200 rounded-xl text-xs font-bold bg-white text-zinc-650 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer select-none"
                          >
                            Previous
                          </button>
                          
                          {[...Array(totalOutboundPages)].map((_, i) => {
                            const pageNum = i + 1;
                            const isActive = outboundPage === pageNum;
                            return (
                              <button
                                key={pageNum}
                                type="button"
                                onClick={() => setOutboundPage(pageNum)}
                                className={`w-8 h-8 rounded-xl text-xs font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                                  isActive
                                    ? 'bg-brand-orange text-white shadow-md'
                                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}

                          <button
                            type="button"
                            disabled={outboundPage === totalOutboundPages}
                            onClick={() => setOutboundPage(prev => Math.min(totalOutboundPages, prev + 1))}
                            className="px-4 py-2 border border-zinc-200 rounded-xl text-xs font-bold bg-white text-zinc-650 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer select-none"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* Floating Checkout Footer Bar for Round-Trip/Selection summaries */}
      <AnimatePresence>
        {((!isRoundTrip && selectedOutbound) || (isRoundTrip && selectedOutbound && selectedInbound)) && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 bg-zinc-900 text-white shadow-2xl border-t border-zinc-800 py-4 px-6 md:px-12 z-[999] flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-6 text-left flex-wrap">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 block">Selection Summary</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs">{selectedOutbound?.airline} ({selectedOutbound?.flightNo})</span>
                  {isRoundTrip && (
                    <>
                      <ArrowRightLeft className="w-3 h-3 text-brand-orange" />
                      <span className="font-bold text-xs">{selectedInbound?.airline} ({selectedInbound?.flightNo})</span>
                    </>
                  )}
                </div>
              </div>
              <div className="w-px h-8 bg-zinc-850 hidden md:block" />
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Toliday Rewards Earned</p>
                <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  +{((selectedOutbound?.rewardsPoints || 0) + (selectedInbound?.rewardsPoints || 0)) * passengers} Points
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-end">
              <div className="text-right">
                <p className="text-[9px] font-bold text-zinc-450 uppercase mb-0.5">Total Payable ({passengers} Pax)</p>
                <p className="text-2xl font-display font-extrabold text-brand-orange">
                  ₹{(((selectedOutbound?.price || 0) + (selectedInbound?.price || 0)) * passengers).toLocaleString('en-IN')}
                </p>
              </div>
              <button 
                onClick={handleProceed}
                className="bg-brand-orange text-white px-8 py-3.5 rounded-xl font-bold hover:bg-brand-orange-hover transition-colors shadow-lg shadow-brand-orange/20 flex items-center gap-2 group cursor-pointer"
              >
                <span>Select Add-ons</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flight Details Modal Backdrop */}
      <AnimatePresence>
        {activeDetailsFlight && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl border border-zinc-100 w-full max-w-3xl overflow-hidden text-left flex flex-col max-h-[90vh]"
            >
              {/* Modal Header Tab row */}
              <div className="flex items-center border-b border-zinc-150 px-6 py-4 bg-zinc-50/50 relative">
                <button 
                  type="button" 
                  onClick={() => setActiveDetailsFlight(null)}
                  className="text-zinc-500 hover:text-zinc-800 p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer mr-4"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex-1 flex justify-center md:justify-start gap-4 md:gap-8 overflow-x-auto no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {(['flight', 'fare', 'baggage', 'change'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setDetailsActiveTab(tab)}
                      className={`py-2 px-1 text-xs md:text-sm font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                        detailsActiveTab === tab
                          ? 'border-zinc-900 text-zinc-900 font-extrabold'
                          : 'border-transparent text-zinc-400 hover:text-zinc-700'
                      }`}
                    >
                      {tab === 'flight' && 'Flight Details'}
                      {tab === 'fare' && 'Fare Details'}
                      {tab === 'baggage' && 'Baggage Details'}
                      {tab === 'change' && 'Change/Cancellation'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Body Contents */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {detailsActiveTab === 'flight' && (
                  <FlightDetailsTabContent flight={activeDetailsFlight} isStudent={fareType === 'student'} />
                )}
                {detailsActiveTab === 'fare' && (
                  <FareDetailsTabContent flight={activeDetailsFlight} fromCity={fromCity} toCity={toCity} />
                )}
                {detailsActiveTab === 'baggage' && (
                  <BaggageDetailsTabContent flight={activeDetailsFlight} fromCity={fromCity} toCity={toCity} isStudent={fareType === 'student'} />
                )}
                {detailsActiveTab === 'change' && (
                  <ChangeDetailsTabContent flight={activeDetailsFlight} fromCity={fromCity} toCity={toCity} />
                )}
              </div>

              {/* Modal Footer (Price + CTA) */}
              <div className="border-t border-zinc-150 px-8 py-5 bg-zinc-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-0.5">Total Flight Price</span>
                  <span className="text-2xl font-display font-extrabold text-zinc-900">₹{activeDetailsFlight.price.toLocaleString('en-IN')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (isRoundTrip) {
                      if (activeDateTab === 'outbound') {
                        setSelectedOutbound(activeDetailsFlight);
                      } else {
                        setSelectedInbound(activeDetailsFlight);
                      }
                    } else {
                      setSelectedOutbound(activeDetailsFlight);
                    }
                    setActiveDetailsFlight(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg cursor-pointer text-sm"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Single Flight Card Component
function FlightResultCard({ 
  flight, 
  getAirlineColor, 
  isSelected, 
  onSelect,
  fareType,
  onOpenDetails
}: { 
  flight: Flight; 
  getAirlineColor: (code: string) => string; 
  isSelected: boolean; 
  onSelect: () => void;
  fareType: string;
  onOpenDetails: () => void;
}) {
  const [showStops, setShowStops] = useState(false);

  return (
    <div 
      onClick={onSelect}
      className={`bg-white p-6 rounded-[2rem] border transition-all cursor-pointer relative overflow-hidden group hover:shadow-md ${isSelected ? 'border-brand-orange ring-1 ring-brand-orange shadow-md shadow-brand-orange/5 bg-brand-orange/[0.01]' : 'border-zinc-100 hover:border-zinc-200'}`}
    >
      {/* Selection border indicator */}
      {isSelected && (
        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-brand-orange" />
      )}

      {/* Discount/Fare Badge */}
      {fareType !== 'regular' && (
        <div className="absolute top-0 right-0 bg-brand-orange/10 border-l border-b border-brand-orange/20 text-brand-orange text-[9px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {fareType.toUpperCase()} Fare Discount
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Airline Brand logotype */}
          <div className="flex items-center gap-3 text-left">
            <div className={`w-10 h-10 rounded-xl ${getAirlineColor(flight.airlineCode)} text-white font-display font-extrabold flex items-center justify-center text-xs tracking-wider shadow-sm shrink-0`}>
              {flight.airlineCode}
            </div>
            <div>
              <h5 className="font-extrabold text-zinc-900 text-sm">{flight.airline}</h5>
              <p className="text-[10px] text-zinc-400 font-bold uppercase">{flight.flightNo} • {flight.class}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetails();
                }}
                className="text-[10px] font-black text-blue-600 hover:text-blue-800 transition-colors uppercase mt-1 underline cursor-pointer select-none block"
              >
                View Details
              </button>
            </div>
          </div>

          {/* Timelines and Paths */}
          <div className="flex-1 flex items-center justify-between gap-4 max-w-sm">
            <div className="text-left">
              <h4 className="font-extrabold text-base text-zinc-800">{flight.departureTime}</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">{flight.fromCode}</p>
            </div>
            
            <div className="flex-1 flex flex-col items-center relative py-2">
              <span className="text-[8px] text-zinc-400 font-extrabold uppercase tracking-widest">{flight.duration}</span>
              <div className="w-full flex items-center gap-1 my-1.5">
                <div className="w-1.5 h-1.5 rounded-full border border-zinc-300 bg-white" />
                <div className="flex-1 h-px bg-zinc-200 border-dashed border-zinc-200" />
                <Plane className="w-3.5 h-3.5 text-zinc-300 rotate-90" />
                <div className="flex-1 h-px bg-zinc-200 border-dashed border-zinc-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-450" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-400">
                {flight.stops === 0 ? 'Non-stop' : flight.stopDetails || `${flight.stops} Stop`}
              </span>
              {flight.stops > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowStops(!showStops);
                  }}
                  className="text-[9px] font-extrabold text-blue-600 hover:text-blue-800 transition-colors uppercase mt-1.5 underline cursor-pointer select-none"
                >
                  {showStops ? 'Hide details' : 'Show details'}
                </button>
              )}
            </div>

            <div className="text-right">
              <h4 className="font-extrabold text-base text-zinc-800">{flight.arrivalTime}</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">{flight.toCode}</p>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center gap-4 justify-between md:justify-end md:text-right">
            <div>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Price</p>
              <h4 className="text-xl font-display font-extrabold text-zinc-900">₹{flight.price.toLocaleString('en-IN')}</h4>
              <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-0.5 mt-0.5">
                <Sparkles className="w-3 h-3 shrink-0" />
                +{flight.rewardsPoints} Rewards
              </p>
            </div>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer shrink-0 ${isSelected ? 'bg-brand-orange text-white border-brand-orange' : 'bg-zinc-50 border-zinc-200 text-zinc-400 hover:text-brand-orange hover:bg-white hover:border-brand-orange'}`}
            >
              {isSelected ? <CheckCircleIcon /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Layover details */}
        {flight.stops > 0 && showStops && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="pt-4 border-t border-zinc-100 flex items-center gap-3 text-left bg-zinc-50 p-3 rounded-2xl border border-zinc-100"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
            <div className="text-[11px] font-bold text-zinc-700 leading-normal">
              <span className="text-zinc-950 font-black uppercase text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded mr-2 shrink-0">Layover Details</span>
              This flight includes a layover transition: <span className="text-zinc-950">{flight.stopDetails || `${flight.stops} stops`}</span>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

// Alternate date suggestion generator card for empty states
function EmptyStateCard({ date }: { date: string }) {
  const suggestDate1 = new Date(date);
  suggestDate1.setDate(suggestDate1.getDate() + 1);
  const suggestDate1Str = suggestDate1.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });

  const suggestDate2 = new Date(date);
  suggestDate2.setDate(suggestDate2.getDate() + 2);
  const suggestDate2Str = suggestDate2.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });

  return (
    <div className="py-12 bg-white rounded-3xl border border-dashed border-zinc-200 text-center px-6 shadow-sm">
      <AlertCircle className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
      <h4 className="font-bold text-zinc-950 text-xs">No Flights Found on this Date</h4>
      <p className="text-[10px] text-zinc-400 font-medium mt-1">Try filtering by other carriers or search adjacent dates:</p>
      <div className="flex gap-2 justify-center mt-4">
        <button type="button" className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-650 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors">
          {suggestDate1Str} (+₹200)
        </button>
        <button type="button" className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-655 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors">
          {suggestDate2Str} (-₹100)
        </button>
      </div>
    </div>
  );
}

function DateCarousel({
  selectedDate,
  onChangeDate,
  minDate
}: {
  selectedDate: string;
  onChangeDate: (dateStr: string) => void;
  minDate?: Date;
}) {
  const today = minDate || new Date();
  today.setHours(0, 0, 0, 0);

  // Visible window start date state
  const [startDate, setStartDate] = useState<Date>(() => {
    const current = new Date(selectedDate);
    const start = new Date(current);
    start.setDate(start.getDate() - 4); // Shift so current selected is roughly centered
    return start < today ? today : start;
  });

  // Keep carousel starting date in sync with changes to selectedDate
  useEffect(() => {
    const current = new Date(selectedDate);
    const start = new Date(current);
    start.setDate(start.getDate() - 4);
    setStartDate(start < today ? today : start);
  }, [selectedDate, today.getTime()]);

  // We want to show a fixed window of 9 days (Fri, Sat, Sun, Mon, Tue, Wed, Thu, Fri, Sat)
  const visibleDays = 9;
  const dates: Date[] = [];
  for (let i = 0; i < visibleDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    dates.push(d);
  }

  const handlePrev = () => {
    setStartDate(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 1);
      return next < today ? today : next;
    });
  };

  const handleNext = () => {
    setStartDate(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      return next;
    });
  };

  const formatDateLabel = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });
  };

  const formatDateValue = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getPrice = (date: Date) => {
    const dayOfWeek = date.getDay();
    const basePrices = [8968, 7429, 7140, 7562, 6628, 7057, 7601];
    const variation = (date.getDate() % 3) * 150 - 100;
    return basePrices[dayOfWeek] + variation;
  };

  return (
    <div className="bg-white border-t border-b border-zinc-200 py-1.5 flex items-center justify-between select-none relative w-full">
      {/* Left Arrow */}
      <button 
        type="button"
        onClick={handlePrev}
        className="w-10 h-14 flex items-center justify-center text-zinc-850 hover:text-zinc-555 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
        disabled={startDate.getTime() <= today.getTime()}
      >
        <svg className="w-6 h-6 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Date list */}
      <div className="flex-1 flex justify-between items-stretch overflow-x-auto no-scrollbar gap-1 mx-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {dates.map((date, idx) => {
          const dateVal = formatDateValue(date);
          const isSelected = dateVal === selectedDate;
          const price = getPrice(date);
          
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChangeDate(dateVal)}
              className={`flex-1 min-w-[85px] md:min-w-[105px] flex flex-col items-center justify-center py-2 px-1 relative transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? 'text-blue-600 font-bold' 
                  : 'text-zinc-650 hover:text-zinc-900'
              }`}
            >
              <span className={`text-[11px] md:text-xs font-semibold ${isSelected ? 'text-blue-600' : 'text-zinc-500'}`}>
                {formatDateLabel(date)}
              </span>
              <span className={`text-[12px] md:text-sm font-extrabold mt-1 ${isSelected ? 'text-blue-600' : 'text-zinc-755'}`}>
                ₹{price.toLocaleString('en-IN')}
              </span>
              {/* Underline for active state */}
              {isSelected && (
                <div className="absolute bottom-0 left-1 right-1 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button 
        type="button"
        onClick={handleNext}
        className="w-10 h-14 flex items-center justify-center text-zinc-800 hover:text-zinc-555 transition-colors cursor-pointer shrink-0"
      >
        <svg className="w-6 h-6 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

// Airline Logos Stylers
const getAirlineColor = (code: string) => {
  if (code === '6E') return 'bg-blue-600'; // IndiGo
  if (code === 'AI') return 'bg-red-600';  // Air India
  if (code === 'UK') return 'bg-indigo-900'; // Vistara
  if (code === 'SG') return 'bg-amber-500';  // SpiceJet
  if (code === 'QP') return 'bg-orange-500'; // Akasa Air
  if (code === 'EK') return 'bg-red-750'; // Emirates
  return 'bg-zinc-800';
};

interface FlightSegment {
  fromCode: string;
  toCode: string;
  fromName: string;
  toName: string;
  depTime: string;
  arrTime: string;
  duration: string;
  flightNo: string;
}

interface FlightLayover {
  city: string;
  duration: string;
}

const getFlightLegsAndLayovers = (flight: Flight) => {
  const segments: FlightSegment[] = [];
  const layovers: FlightLayover[] = [];

  const fromAirport = AIRPORTS.find(a => a.code.toUpperCase() === flight.fromCode.toUpperCase()) || { city: flight.fromCode, name: 'Departure Airport' };
  const toAirport = AIRPORTS.find(a => a.code.toUpperCase() === flight.toCode.toUpperCase()) || { city: flight.toCode, name: 'Arrival Airport' };

  if (flight.stops === 0) {
    segments.push({
      fromCode: flight.fromCode,
      toCode: flight.toCode,
      fromName: fromAirport.name,
      toName: toAirport.name,
      depTime: flight.departureTime,
      arrTime: flight.arrivalTime,
      duration: flight.duration,
      flightNo: flight.flightNo
    });
  } else {
    // Extract stop airport and duration from stopDetails, e.g. "1 Stop via BLR (1h)"
    let stopCity = 'BLR';
    let layoverDur = '1h 00m';
    if (flight.stopDetails) {
      const match = flight.stopDetails.match(/via\s+([A-Z]{3})\s*\(([^)]+)\)/i);
      if (match) {
        stopCity = match[1].toUpperCase();
        layoverDur = match[2];
      }
    }
    const stopAirport = AIRPORTS.find(a => a.code.toUpperCase() === stopCity.toUpperCase()) || { city: stopCity, name: `${stopCity} Airport` };

    // Compute times
    const dep1 = flight.departureTime;
    
    // Arrival at stop is, say, 2 hours after departure
    const [depHour, depMin] = dep1.split(':').map(Number);
    const arrStopHour = (depHour + 2) % 24;
    const arr1 = `${String(arrStopHour).padStart(2, '0')}:${String(depMin).padStart(2, '0')}`;

    // Leg 2 departure is arrival at stop + layover
    let layoverHours = 1;
    if (layoverDur.includes('h')) {
      const hourPart = layoverDur.split('h')[0].trim();
      layoverHours = parseInt(hourPart) || 1;
    }
    const dep2Hour = (arrStopHour + layoverHours) % 24;
    const dep2 = `${String(dep2Hour).padStart(2, '0')}:${String(depMin).padStart(2, '0')}`;

    const arr2 = flight.arrivalTime;

    segments.push({
      fromCode: flight.fromCode,
      toCode: stopCity,
      fromName: fromAirport.name,
      toName: stopAirport.name,
      depTime: dep1,
      arrTime: arr1,
      duration: '2h 00m',
      flightNo: flight.flightNo
    });

    layovers.push({
      city: stopAirport.city || stopCity,
      duration: layoverDur
    });

    // Leg 2 segment
    // Generate different duration
    segments.push({
      fromCode: stopCity,
      toCode: flight.toCode,
      fromName: stopAirport.name,
      toName: toAirport.name,
      depTime: dep2,
      arrTime: arr2,
      duration: '1h 30m',
      flightNo: flight.flightNo.replace(/\d+$/, (n) => String(parseInt(n) + 1))
    });
  }

  return { segments, layovers };
};

// 1. FLIGHT DETAILS TAB CONTENT
function FlightDetailsTabContent({ flight, isStudent }: { flight: Flight; isStudent: boolean }) {
  const { segments, layovers } = getFlightLegsAndLayovers(flight);
  const fromCity = AIRPORTS.find(a => a.code.toUpperCase() === flight.fromCode.toUpperCase())?.city || flight.fromCode;
  const toCity = AIRPORTS.find(a => a.code.toUpperCase() === flight.toCode.toUpperCase())?.city || flight.toCode;

  return (
    <div className="space-y-6">
      {/* Route Header Banner */}
      <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-sm text-zinc-950">
            <span className="flex items-center gap-1.5"><Plane className="w-4 h-4 rotate-45 text-zinc-500" /> Departing Flight</span>
          </div>
          <p className="text-xs text-zinc-500 font-bold mt-1.5 flex items-center gap-1.5 flex-wrap">
            <span className="font-extrabold text-zinc-800">{fromCity} → {toCity}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <span>{flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <span>{flight.duration}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <span>{flight.class}</span>
          </p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full tracking-wide self-start sm:self-auto border border-emerald-100">
          Partially Refundable
        </span>
      </div>

      {/* Segment Legs */}
      <div className="space-y-4 relative before:absolute before:top-8 before:bottom-8 before:left-7 before:w-px before:bg-zinc-200 before:border-dashed">
        {segments.map((segment, index) => {
          const airlineColor = getAirlineColor(flight.airlineCode);
          return (
            <div key={index} className="space-y-6">
              {/* Segment Segment block */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative z-10 pl-2">
                
                {/* Brand */}
                <div className="md:col-span-3 flex items-center gap-3 bg-white">
                  <div className={`w-10 h-10 rounded-xl ${airlineColor} text-white font-display font-extrabold flex items-center justify-center text-xs tracking-wider shadow-sm shrink-0`}>
                    {flight.airlineCode}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-zinc-950 text-xs">{flight.airline}</h5>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase">{segment.flightNo}</p>
                  </div>
                </div>

                {/* Timeline info */}
                <div className="md:col-span-9 flex items-center justify-between gap-4">
                  
                  {/* Dep Station */}
                  <div className="text-left max-w-[200px]">
                    <h4 className="font-black text-zinc-900 text-sm">{segment.depTime}</h4>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mt-1">Fri, 29 May</p>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-normal font-medium">{segment.fromName}</p>
                  </div>

                  {/* Segment Center */}
                  <div className="flex-1 flex flex-col items-center">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{segment.duration}</span>
                    <div className="w-full flex items-center gap-1 my-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                      <div className="flex-1 h-px bg-zinc-200 border-dashed" />
                      <Clock className="w-3.5 h-3.5 text-zinc-300" />
                      <div className="flex-1 h-px bg-zinc-200 border-dashed" />
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    </div>
                  </div>

                  {/* Arr Station */}
                  <div className="text-right max-w-[200px]">
                    <h4 className="font-black text-zinc-900 text-sm">{segment.arrTime}</h4>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mt-1">Fri, 29 May</p>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-normal font-medium">{segment.toName}</p>
                  </div>

                </div>

              </div>

              {/* Layover block */}
              {index < layovers.length && (
                <div className="flex items-center justify-center my-4 pl-12">
                  <div className="bg-zinc-50 border border-zinc-150 rounded-2xl px-6 py-2 text-center text-[11px] font-bold text-zinc-650 shadow-sm">
                    <span className="text-zinc-950 font-black block">Layover at {layovers[index].city}, {layovers[index].duration}</span>
                    <span className="text-[9px] text-zinc-400 mt-0.5 block font-semibold">Plane Change</span>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}

// 2. FARE DETAILS TAB CONTENT
function FareDetailsTabContent({ flight, fromCity, toCity }: { flight: Flight; fromCity: string; toCity: string }) {
  const baseFare = Math.round(flight.price * 0.72);
  const regionalFund = 100;
  const commonEquipment = 50;
  const fuelSurcharge = Math.round(flight.price * 0.12);
  const sgst = Math.round(flight.price * 0.05);
  const devFee = 150;
  const misc = flight.price - baseFare - regionalFund - commonEquipment - fuelSurcharge - sgst - devFee;

  const fareItems = [
    { label: 'Base Fare', value: baseFare },
    { label: 'Regional Connectivity Fund', value: regionalFund },
    { label: 'Common Use Terminal Equipment', value: commonEquipment },
    { label: 'Fuel Surcharge', value: fuelSurcharge },
    { label: 'SGST', value: sgst },
    { label: 'User Development Fee', value: devFee },
    { label: 'Airline Miscellaneous', value: misc },
  ];

  return (
    <div className="space-y-6">
      {/* Route details banner */}
      <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex justify-between items-center">
        <span className="font-extrabold text-sm text-zinc-950">{fromCity} → {toCity}</span>
        <span className="text-xs font-bold text-zinc-400">1 Adult</span>
      </div>

      {/* Fare table */}
      <div className="border border-zinc-150 rounded-2xl overflow-hidden shadow-sm">
        {fareItems.map((item, idx) => (
          <div key={idx} className={`flex justify-between items-center py-3.5 px-5 text-xs font-bold ${idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'} border-b border-zinc-100 last:border-0`}>
            <span className="text-zinc-500 font-semibold">{item.label}</span>
            <span className="text-zinc-800">₹{item.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. BAGGAGE DETAILS TAB CONTENT
function BaggageDetailsTabContent({ flight, fromCity, toCity, isStudent }: { flight: Flight; fromCity: string; toCity: string; isStudent: boolean }) {
  const { segments } = getFlightLegsAndLayovers(flight);
  const checkinLimit = isStudent ? '25 kg/person' : '15 kg/person';

  return (
    <div className="space-y-6">
      {/* Route details banner */}
      <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex justify-between items-center">
        <span className="font-extrabold text-sm text-zinc-950">{fromCity} → {toCity}</span>
        <span className="text-xs font-bold text-zinc-400">1 Adult</span>
      </div>

      {/* Segment items */}
      <div className="space-y-6">
        {segments.map((segment, index) => (
          <div key={index} className="border border-zinc-150 rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-zinc-50 px-5 py-3 border-b border-zinc-150 text-xs font-black text-zinc-950 tracking-wide">
              {segment.fromCode} - {segment.toCode} ({segment.flightNo})
            </div>
            {/* Grid details */}
            <div className="grid grid-cols-2 divide-x divide-zinc-150 text-xs bg-white">
              <div className="p-5 text-left space-y-1">
                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] block">Check-in Baggage</span>
                <span className="font-black text-zinc-855 text-sm block">{checkinLimit}</span>
              </div>
              <div className="p-5 text-left space-y-1">
                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] block">Cabin Baggage</span>
                <span className="font-black text-zinc-855 text-sm block">7 kg/person</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. CHANGE/CANCELLATION DETAILS TAB CONTENT
function ChangeDetailsTabContent({ flight, fromCity, toCity }: { flight: Flight; fromCity: string; toCity: string }) {
  return (
    <div className="space-y-6">
      {/* Route details banner */}
      <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4">
        <span className="font-extrabold text-sm text-zinc-950 block">{fromCity} → {toCity}</span>
      </div>

      {/* Side by side grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Cancellation Fee block */}
        <div className="border border-zinc-150 rounded-2xl p-5 shadow-sm space-y-4 text-left bg-white">
          <h5 className="font-black text-zinc-900 text-xs tracking-wider uppercase border-b border-zinc-100 pb-2">Cancellation Fee per person</h5>
          <div className="space-y-3 text-xs font-bold">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-semibold">Airline Fee</span>
              <span className="text-zinc-800">₹4,999</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-semibold">3 hours - 3 days</span>
              <span className="text-zinc-800">₹4,999</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-semibold">0 hours - 3 hours</span>
              <span className="text-zinc-800">₹{flight.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center border-t border-zinc-100 pt-2">
              <span className="text-zinc-500 font-semibold">Platform Fee</span>
              <span className="text-zinc-850">₹400</span>
            </div>
          </div>
        </div>

        {/* Date Change Fee block */}
        <div className="border border-zinc-150 rounded-2xl p-5 shadow-sm space-y-4 text-left bg-white">
          <h5 className="font-black text-zinc-900 text-xs tracking-wider uppercase border-b border-zinc-100 pb-2">Flight Change Fee per person</h5>
          <div className="space-y-3 text-xs font-bold">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-semibold">Airline Date Change Charges</span>
              <span className="text-zinc-800">₹2,999</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-semibold">3 hours - 3 days</span>
              <span className="text-zinc-800">₹2,999</span>
            </div>
            <div className="flex justify-between items-center border-t border-zinc-100 pt-2">
              <span className="text-zinc-500 font-semibold">Platform Date Change Charges</span>
              <span className="text-zinc-850">₹400</span>
            </div>
          </div>
        </div>

      </div>

      {/* Fine Print Footer */}
      <p className="text-[10px] text-zinc-400 font-medium leading-relaxed border-t border-zinc-100 pt-4 text-left">
        Cancellation/Flight change charges are indicative. Cleartrip will stop accepting cancellation/change requests 4 - 72 hours before departure of the flight, depending on the airline.
      </p>
    </div>
  );
}

