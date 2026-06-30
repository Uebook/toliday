import { useState, useEffect } from 'react';
import { Star, MapPin, Wifi, Coffee, Utensils, Heart, Filter, ChevronDown, IndianRupee, ChevronLeft, ChevronRight, Map as MapIcon, Search, X, Check, Calendar, Users as UsersIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MapOverlay from './MapOverlay';

import { fetchHotels } from '../lib/api';



interface HotelListProps {
  onBack: () => void;
  onSelectHotel: (hotel: any) => void;
  searchParams?: any;
}

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
      
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full transition-all ${current === i ? 'bg-white w-4' : 'bg-white/40'}`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/slider:opacity-100 transition-opacity">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
          }}
          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all border border-white/20 z-10"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
          }}
          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all border border-white/20 z-10"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function HotelList({ onBack, onSelectHotel, searchParams }: HotelListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [hotelsData, setHotelsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('toliday_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleWishlist = (hotelId: string) => {
    let updated: string[];
    if (wishlist.includes(hotelId)) {
      updated = wishlist.filter(id => id !== hotelId);
    } else {
      updated = [...wishlist, hotelId];
    }
    setWishlist(updated);
    localStorage.setItem('toliday_wishlist', JSON.stringify(updated));
  };

  // Sorting state
  const [sortBy, setSortBy] = useState('Recommended');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Rating: High to Low'];

  // Filter state
  const [searchLocality, setSearchLocality] = useState('');
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [breakfastIncluded, setBreakfastIncluded] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    searchLocality: '',
    selectedStars: [] as number[],
    selectedPriceRanges: [] as string[],
    minBudget: '',
    maxBudget: '',
    selectedRatings: [] as number[],
    selectedTypes: [] as string[],
    breakfastIncluded: false
  });

  const priceRanges: Record<string, [number, number]> = {
    '₹ 0 - ₹ 3500': [0, 3500],
    '₹ 3500 - ₹ 7500': [3500, 7500],
    '₹ 7500 - ₹ 11500': [7500, 11500],
    '₹ 15000 - ₹ 30000': [15000, 30000],
  };

  const clearFilters = () => {
    setSearchLocality('');
    setSelectedStars([]);
    setSelectedPriceRanges([]);
    setMinBudget('');
    setMaxBudget('');
    setSelectedRatings([]);
    setSelectedTypes([]);
    setBreakfastIncluded(false);
    setAppliedFilters({
      searchLocality: '',
      selectedStars: [],
      selectedPriceRanges: [],
      minBudget: '',
      maxBudget: '',
      selectedRatings: [],
      selectedTypes: [],
      breakfastIncluded: false
    });
    setCurrentPage(1);
  };

  const applyFilters = () => {
    setAppliedFilters({
      searchLocality,
      selectedStars,
      selectedPriceRanges,
      minBudget,
      maxBudget,
      selectedRatings,
      selectedTypes,
      breakfastIncluded
    });
    setCurrentPage(1);
  };

  const toggleStar = (star: number) => {
    setSelectedStars(prev => prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]);
  };

  const togglePriceRange = (label: string) => {
    setSelectedPriceRanges(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
  };

  const toggleRating = (minRating: number) => {
    setSelectedRatings(prev => prev.includes(minRating) ? prev.filter(r => r !== minRating) : [...prev, minRating]);
  };

  // Derived filtered list
  const filteredHotels = hotelsData.filter(hotel => {
    // Locality search
    if (appliedFilters.searchLocality) {
      const loc = (hotel.location || '').toLowerCase();
      const name = (hotel.name || '').toLowerCase();
      if (!loc.includes(appliedFilters.searchLocality.toLowerCase()) && !name.includes(appliedFilters.searchLocality.toLowerCase())) return false;
    }
    // Star filter
    if (appliedFilters.selectedStars.length > 0) {
      if (!appliedFilters.selectedStars.includes(Math.floor(hotel.rating))) return false;
    }
    // Price range filter
    if (appliedFilters.selectedPriceRanges.length > 0) {
      const inAny = appliedFilters.selectedPriceRanges.some(label => {
        const [lo, hi] = priceRanges[label] || [0, Infinity];
        return hotel.discountPrice >= lo && hotel.discountPrice <= hi;
      });
      if (!inAny) return false;
    }
    // Custom budget filter
    if (appliedFilters.minBudget && hotel.discountPrice < parseFloat(appliedFilters.minBudget)) return false;
    if (appliedFilters.maxBudget && hotel.discountPrice > parseFloat(appliedFilters.maxBudget)) return false;
    // User rating filter
    if (appliedFilters.selectedRatings.length > 0) {
      if (!appliedFilters.selectedRatings.some(minR => hotel.rating >= minR)) return false;
    }
    // Breakfast filter
    if (appliedFilters.breakfastIncluded) {
      const amen = (hotel.amenities || []).join(' ').toLowerCase();
      if (!amen.includes('breakfast')) return false;
    }
    return true;
  });

  // Apply sorting
  if (sortBy === 'Price: Low to High') {
    filteredHotels.sort((a, b) => a.discountPrice - b.discountPrice);
  } else if (sortBy === 'Price: High to Low') {
    filteredHotels.sort((a, b) => b.discountPrice - a.discountPrice);
  } else if (sortBy === 'Rating: High to Low') {
    filteredHotels.sort((a, b) => b.rating - a.rating);
  }

  const totalPages = Math.ceil(filteredHotels.length / 4) || 1;

  const activeFilterCount = selectedStars.length + selectedPriceRanges.length + selectedRatings.length + (breakfastIncluded ? 1 : 0) + (searchLocality ? 1 : 0);

  const getCount = (predicate: (hotel: any) => boolean) => hotelsData.filter(predicate).length;

  const count5Star = getCount(h => Math.floor(h.rating) === 5);
  const count4Star = getCount(h => Math.floor(h.rating) === 4);
  const count3Star = getCount(h => Math.floor(h.rating) === 3);
  const countBreakfast = getCount(h => (h.amenities || []).join(' ').toLowerCase().includes('breakfast'));

  const countPrice1 = getCount(h => h.discountPrice >= 0 && h.discountPrice <= 3500);
  const countPrice2 = getCount(h => h.discountPrice > 3500 && h.discountPrice <= 7500);
  const countPrice3 = getCount(h => h.discountPrice > 7500 && h.discountPrice <= 11500);
  const countPrice4 = getCount(h => h.discountPrice > 15000 && h.discountPrice <= 30000);

  const countRatingEx = getCount(h => h.rating >= 4.5);
  const countRatingVG = getCount(h => h.rating >= 4.0);
  const countRatingG = getCount(h => h.rating >= 3.5);

  const destinationText = searchParams?.destination || (filteredHotels.length > 0 ? filteredHotels[0]?.location?.split(',')[0] : 'Noida');
  const roomsText = searchParams?.rooms || 1;
  const guestsText = searchParams?.guests || 2;
  
  let nightsText = '';
  if (searchParams?.arrival && searchParams?.departure) {
    const d1 = new Date(searchParams.arrival);
    const d2 = new Date(searchParams.departure);
    const diff = d2.getTime() - d1.getTime();
    const nights = Math.max(1, Math.round(diff / (1000 * 3600 * 24)));
    nightsText = `${nights} ${nights === 1 ? 'Night' : 'Nights'} • `;
  }

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await fetchHotels();
        // Map backend data to UI format
        let formatted = data.map((h: any) => ({
          ...h,
          location: h.city || h.address || 'Unknown Location',
          lat: h.latitude || 0,
          lng: h.longitude || 0,
          rating: h.stars || h.rating || 0,
          reviews: h.reviews?.length || 0,
          price: h.price || 5000, // Fallback base price if none provided
          discountPrice: h.discountPrice || h.price || 4000,
          images: h.images?.length > 0 ? h.images : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'],
          amenities: h.amenities?.length > 0 ? h.amenities : [],
          tag: h.status === 'APPROVED' ? 'Verified' : 'New'
        }));

        if (searchParams?.destination) {
          const dest = searchParams.destination.toLowerCase();
          const searchTerms = dest.split(/[\s,()]+/).filter(Boolean);
          
          formatted = formatted.filter((h: any) => {
            const cleanLoc = (h.location || '').toLowerCase();
            const cleanCity = (h.city || '').toLowerCase();
            const cleanName = (h.name || '').toLowerCase();
            
            return searchTerms.some(term => 
              cleanLoc.includes(term) || 
              cleanCity.includes(term) || 
              cleanName.includes(term)
            );
          });
        }

        setHotelsData(formatted);
      } catch (err) {
        console.error('Failed to load hotels:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadHotels();
  }, []);

  return (
    <div className="bg-zinc-50 min-h-screen pt-28 pb-20">
      <AnimatePresence>
        {showMap && (
          <MapOverlay 
            hotels={hotelsData} 
            onClose={() => setShowMap(false)} 
            onSelectHotel={(hotel) => {
              setShowMap(false);
              onSelectHotel(hotel);
            }}
          />
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs & Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button 
              onClick={onBack}
              className="text-zinc-500 text-sm font-medium hover:text-indigo-600 mb-2 flex items-center gap-1 transition-colors"
            >
              ← Back to Home
            </button>
            <h1 className="text-3xl font-display font-bold text-zinc-900">Recommended Stays</h1>
            <p className="text-zinc-500 text-sm font-medium">Showing {filteredHotels.length} properties in {destinationText} • {nightsText}{roomsText} {roomsText === 1 ? 'Room' : 'Rooms'}, {guestsText} {guestsText === 1 ? 'Guest' : 'Guests'}</p>
          </div>
          <div className="flex gap-4 relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:border-indigo-600 transition-colors"
            >
              Sort: {sortBy}
              <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden z-30"
                >
                  {sortOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-bold hover:bg-zinc-50 transition-colors ${sortBy === option ? 'text-indigo-600 bg-indigo-50/50' : 'text-zinc-700'}`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-6">
            {/* Apply Filters Button */}
            <div className="sticky top-28 z-20 mb-6 bg-zinc-50 py-1">
              <button 
                onClick={applyFilters}
                className="w-full bg-brand-orange text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-600 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
              >
                Apply Filters
              </button>
            </div>

            {/* Map Preview */}
            <div 
              onClick={() => setShowMap(true)}
              className="relative rounded-3xl overflow-hidden h-32 group cursor-pointer mb-6"
            >
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                alt="Map preview"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2">
                  <MapIcon className="w-3.5 h-3.5" />
                  EXPLORE ON MAP
                </button>
              </div>
            </div>

            {/* Search Locality */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search for locality / hotel" 
                  value={searchLocality}
                  onChange={(e) => { setSearchLocality(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Active Filters {activeFilterCount > 0 && <span className="ml-1 bg-brand-orange text-white text-[9px] px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>}</h4>
                  {activeFilterCount > 0 && <button onClick={clearFilters} className="text-[10px] font-bold text-brand-orange uppercase tracking-tighter hover:underline">Clear All</button>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchLocality && <span className="flex items-center gap-1.5 bg-orange-50 text-brand-orange px-3 py-1.5 rounded-lg text-xs font-medium border border-orange-100">{searchLocality}<button onClick={() => setSearchLocality('')}><X className="w-3 h-3" /></button></span>}
                  {selectedStars.map(s => <span key={s} className="flex items-center gap-1.5 bg-orange-50 text-brand-orange px-3 py-1.5 rounded-lg text-xs font-medium border border-orange-100">{s} Star<button onClick={() => toggleStar(s)}><X className="w-3 h-3" /></button></span>)}
                  {selectedPriceRanges.map(r => <span key={r} className="flex items-center gap-1.5 bg-orange-50 text-brand-orange px-3 py-1.5 rounded-lg text-xs font-medium border border-orange-100">{r}<button onClick={() => togglePriceRange(r)}><X className="w-3 h-3" /></button></span>)}
                  {breakfastIncluded && <span className="flex items-center gap-1.5 bg-orange-50 text-brand-orange px-3 py-1.5 rounded-lg text-xs font-medium border border-orange-100">Breakfast<button onClick={() => setBreakfastIncluded(false)}><X className="w-3 h-3" /></button></span>}
                </div>
              </div>
            </div>

            {/* Suggested For You */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
              <h3 className="font-bold text-zinc-900 mb-5 text-sm uppercase tracking-wider">Suggested For You</h3>
              <div className="space-y-3">
                {[
                  { label: 'Rush Deal', count: Math.floor(hotelsData.length * 0.2) },
                  { label: 'Last Minute Deals' },
                  { label: '5 Star', count: count5Star, star: 5 },
                  { label: '4 Star', count: count4Star, star: 4 },
                  { label: '3 Star', count: count3Star, star: 3 },
                  { label: 'Breakfast Included', count: countBreakfast }
                ].map((item) => (
                   <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={item.star ? selectedStars.includes(item.star) : item.label === 'Breakfast Included' ? breakfastIncluded : false}
                          onChange={() => {
                            if (item.star) toggleStar(item.star);
                            else if (item.label === 'Breakfast Included') setBreakfastIncluded(prev => !prev);
                          }}
                          className="peer appearance-none w-5 h-5 rounded-lg border-2 border-zinc-200 checked:bg-brand-orange checked:border-brand-orange transition-all cursor-pointer"
                        />
                        <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 flex-1">{item.label}</span>
                      {item.count && <span className="text-[10px] text-zinc-400 font-bold bg-zinc-50 px-2 py-0.5 rounded-full">{item.count}</span>}
                   </label>
                ))}
              </div>
            </div>

            {/* Preference Toggle */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
              <h3 className="font-bold text-zinc-900 mb-5 text-sm uppercase tracking-wider">Preference</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="radio" name="price-pref" defaultChecked className="peer appearance-none w-5 h-5 rounded-full border-2 border-zinc-100 checked:border-indigo-600 transition-all cursor-pointer" />
                    <div className="absolute w-2 h-2 rounded-full bg-indigo-600 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900">Price per Night</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="radio" name="price-pref" className="peer appearance-none w-5 h-5 rounded-full border-2 border-zinc-100 checked:border-indigo-600 transition-all cursor-pointer" />
                    <div className="absolute w-2 h-2 rounded-full bg-indigo-600 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 flex items-center gap-2">
                      Total Price
                      <span className="bg-indigo-600 text-[8px] text-white px-1.5 py-0.5 rounded-full font-bold">NEW</span>
                    </span>
                    <span className="text-[10px] text-zinc-400">All nights & rooms excluding taxes</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
              <h3 className="font-bold text-zinc-900 mb-5 text-sm uppercase tracking-wider">Price Per Night</h3>
              <div className="space-y-3 mb-6">
                {[
                  { label: '₹ 0 - ₹ 3500', count: countPrice1 },
                  { label: '₹ 3500 - ₹ 7500', count: countPrice2 },
                  { label: '₹ 7500 - ₹ 11500', count: countPrice3 },
                  { label: '₹ 15000 - ₹ 30000', count: countPrice4 }
                ].map((range) => (
                  <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(range.label)}
                        onChange={() => togglePriceRange(range.label)}
                        className="peer appearance-none w-5 h-5 rounded-lg border-2 border-zinc-200 checked:bg-brand-orange checked:border-brand-orange transition-all cursor-pointer"
                      />
                      <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 flex-1">{range.label}</span>
                    <span className="text-[10px] text-zinc-400 font-bold bg-zinc-50 px-2 py-0.5 rounded-full">{range.count}</span>
                  </label>
                ))}
              </div>
              <div className="pt-6 border-t border-zinc-50">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Your Budget</p>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300 text-xs">₹</span>
                    <input type="text" placeholder="Min" value={minBudget} onChange={e => { setMinBudget(e.target.value); setCurrentPage(1); }} className="w-full pl-6 pr-3 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-orange/20" />
                  </div>
                  <span className="text-zinc-400 text-xs font-bold whitespace-nowrap">to</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300 text-xs">₹</span>
                    <input type="text" placeholder="Max" value={maxBudget} onChange={e => { setMaxBudget(e.target.value); setCurrentPage(1); }} className="w-full pl-6 pr-3 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-orange/20" />
                  </div>
                  <button className="bg-brand-orange text-white p-2.5 rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all hover:scale-105 active:scale-95">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* User Rating */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
              <h3 className="font-bold text-zinc-900 mb-5 text-sm uppercase tracking-wider">User Rating</h3>
              <div className="space-y-4">
                {[
                  { label: 'Exceptional: 4.5+', minR: 4.5, count: countRatingEx, color: 'text-emerald-600' },
                  { label: 'Very Good: 4.0+', minR: 4.0, count: countRatingVG, color: 'text-emerald-500' },
                  { label: 'Good: 3.5+', minR: 3.5, count: countRatingG, color: 'text-indigo-500' }
                ].map((rating) => (
                  <label key={rating.label} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating.minR)}
                        onChange={() => toggleRating(rating.minR)}
                        className="peer appearance-none w-5 h-5 rounded-lg border-2 border-zinc-200 checked:bg-brand-orange checked:border-brand-orange transition-all cursor-pointer"
                      />
                      <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${rating.color}`}>{rating.label.split(':')[0]}</p>
                      <p className="text-[10px] text-zinc-400 font-medium">{rating.label.split(':')[1]}</p>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-bold bg-zinc-50 px-2 py-0.5 rounded-full">{rating.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
              <h3 className="font-bold text-zinc-900 mb-5 text-sm">Property Type</h3>
              <div className="space-y-3">
                {[
                  { label: 'Hotel', count: 800 },
                  { label: 'Apartment', count: 257 },
                  { label: 'Homestay', count: 126 },
                  { label: 'Hostel', count: 15 },
                  { label: 'Resort', count: 12 }
                ].map(type => (
                   <label key={type.label} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-zinc-200 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 flex-1">{type.label}</span>
                      <span className="text-[10px] text-zinc-400 font-medium">({type.count})</span>
                   </label>
                ))}
              </div>
              <button className="mt-4 text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline">Show 3 more</button>
            </div>

            {/* Locality Dropdown */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
              <h3 className="font-bold text-zinc-900 mb-5 text-sm">Locality</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Popular in NCR</p>
              <div className="relative mb-6">
                <select className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-2.5 text-sm outline-none appearance-none font-medium">
                  <option>Select City</option>
                  <option>New Delhi</option>
                  <option>Gurgaon</option>
                  <option>Noida</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
              <div className="space-y-3">
                {['Aerocity, Delhi', 'T3 - Delhi Airport', 'Sector 29, Gurgaon', 'Karol Bagh, Delhi', 'Connaught Place'].map(loc => (
                  <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-zinc-200 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900">{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Room Views */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
              <h3 className="font-bold text-zinc-900 mb-5 text-sm">Room Views</h3>
              <div className="space-y-3">
                {[
                  { label: 'Garden View', count: 41 },
                  { label: 'City View', count: 331 }
                ].map(view => (
                   <label key={view.label} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-zinc-200 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 flex-1">{view.label}</span>
                      <span className="text-[10px] text-zinc-400 font-medium">({view.count})</span>
                   </label>
                ))}
              </div>
            </div>


          </aside>

          {/* Main List */}
          <div className="lg:col-span-3">
            <div className="space-y-6 mb-12">
              {isLoading && (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-[2.5rem] p-4 flex flex-col md:flex-row gap-6 shadow-sm border border-zinc-100 animate-pulse">
                      <div className="w-full md:w-80 h-64 shrink-0 rounded-[2rem] bg-zinc-100/80"></div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="w-2/3">
                              <div className="h-8 bg-zinc-100/80 rounded-xl w-3/4 mb-3"></div>
                              <div className="h-4 bg-zinc-100/80 rounded-lg w-1/2"></div>
                            </div>
                            <div className="w-16 h-8 bg-zinc-100/80 rounded-full"></div>
                          </div>
                          <div className="flex gap-4 mt-8">
                            <div className="h-4 bg-zinc-100/80 rounded-lg w-24"></div>
                            <div className="h-4 bg-zinc-100/80 rounded-lg w-28"></div>
                            <div className="h-4 bg-zinc-100/80 rounded-lg w-20"></div>
                          </div>
                        </div>
                        <div className="flex items-end justify-between mt-8 md:mt-0">
                          <div>
                            <div className="h-3 bg-zinc-100/80 rounded mb-2 w-24"></div>
                            <div className="h-8 bg-zinc-100/80 rounded-xl w-32"></div>
                          </div>
                          <div className="w-32 h-14 bg-zinc-100/80 rounded-2xl"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!isLoading && filteredHotels.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-zinc-500 text-lg font-medium">No hotels match your filters.</p>
                  <button onClick={clearFilters} className="mt-4 text-brand-orange font-bold hover:underline">Clear all filters</button>
                </div>
              )}
              {filteredHotels.slice((currentPage - 1) * 4, currentPage * 4).map((hotel, index) => {
                return (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onSelectHotel(hotel)}
                    className="bg-white rounded-[2.5rem] p-4 flex flex-col md:flex-row gap-6 shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-pointer"
                  >
                    {/* Hotel Image Slider */}
                    <div className="relative w-full md:w-80 h-64 md:h-auto shrink-0 rounded-[2rem] overflow-hidden">
                      <ImageSlider images={hotel.images} />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(hotel.id);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-900 hover:text-rose-500 transition-colors z-10"
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(hotel.id) ? 'fill-rose-500 text-rose-500' : 'text-zinc-900'}`} />
                      </button>
                      {hotel.tag && (
                        <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-10">
                          {hotel.tag}
                        </div>
                      )}
                    </div>

                    {/* Hotel Info */}
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h2 className="text-2xl font-display font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{hotel.name}</h2>
                            <div className="flex items-center gap-1 text-zinc-400 text-sm mt-1">
                              <MapPin className="w-4 h-4" />
                              {hotel.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                              {hotel.rating} <Star className="w-3.5 h-3.5 fill-emerald-700" />
                            </div>
                            <p className="text-[10px] text-zinc-400 mt-1 uppercase font-bold tracking-tight">{hotel.reviews} reviews</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-6">
                          <div className="flex items-center gap-2 text-zinc-500 text-sm">
                            <Wifi className="w-4 h-4 text-indigo-500" />
                            Free WiFi
                          </div>
                          <div className="flex items-center gap-2 text-zinc-500 text-sm">
                            <Coffee className="w-4 h-4 text-orange-500" />
                            Breakfast
                          </div>
                          <div className="flex items-center gap-2 text-zinc-500 text-sm">
                            <Utensils className="w-4 h-4 text-emerald-500" />
                            Fine Dining
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-8 md:mt-0">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-zinc-400 text-xs line-through">₹{hotel.price.toLocaleString('en-IN')}</span>
                            <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-sans">Save ₹{(hotel.price - hotel.discountPrice).toLocaleString('en-IN')}</span>
                          </div>
                          <p className="text-3xl font-display font-bold text-indigo-600">
                            ₹{hotel.discountPrice.toLocaleString('en-IN')}
                            <span className="text-zinc-400 text-sm font-medium ml-1">/ night</span>
                          </p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">
                              Booked <span className="text-emerald-600">12 times</span> in last 24h
                            </p>
                          </div>
                        </div>
                        <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-indigo-100/50 flex flex-col items-center">
                          View Deal
                          <span className="text-[9px] opacity-70 font-normal uppercase tracking-widest mt-0.5">Best Price Guaranteed</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination UI */}
            <div className="flex items-center justify-center gap-2">
              <button 
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-12 h-12 rounded-2xl font-bold transition-all shadow-sm ${
                    currentPage === i + 1 
                      ? 'bg-indigo-600 text-white shadow-indigo-100' 
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:border-indigo-600 hover:text-indigo-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
