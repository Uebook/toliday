import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palmtree, MapPin, Star, Users, ChevronRight, Plane, Building2, 
  Heart, Camera, Soup, ChevronLeft, Search, Filter, SlidersHorizontal, 
  ArrowRight, X, Clock, ShieldCheck
} from 'lucide-react';

interface HolidayListProps {
  onBack: () => void;
  onSelectPkg: (pkg: any) => void;
}

const PACKAGES = [
  {
    id: 'H1',
    name: 'Exotic Bali Getaway',
    duration: '5 Nights / 6 Days',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544644181-1484b3f4c718?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&q=80&w=600'
    ],
    location: 'Ubud & Seminyak, Indonesia',
    price: 45000,
    rating: 4.9,
    reviews: 420,
    tags: ['Best Seller', 'Couple Friendly'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Sightseeing', 'Transfer'],
    type: 'International'
  },
  {
    id: 'H2',
    name: 'Majestic Kashmir Valley',
    duration: '4 Nights / 5 Days',
    images: [
      'https://images.unsplash.com/photo-1566833925222-79193661214a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600'
    ],
    location: 'Srinagar & Gulmarg, India',
    price: 28500,
    rating: 4.7,
    reviews: 310,
    tags: ['Luxury', 'Adventure'],
    inclusions: ['Hotel', 'Meals', 'Sightseeing'],
    type: 'Domestic'
  },
  {
    id: 'H3',
    name: 'Magical Switzerland',
    duration: '7 Nights / 8 Days',
    images: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544644181-1484b3f4c718?auto=format&fit=crop&q=80&w=600'
    ],
    location: 'Lucerne & Zurich, Switzerland',
    price: 125000,
    rating: 5.0,
    reviews: 180,
    tags: ['Premium', 'Family'],
    inclusions: ['Flight', 'Hotel', 'Meals'],
    type: 'International'
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
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1)); }} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 border border-white/20 z-10">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function HolidayList({ onBack, onSelectPkg }: HolidayListProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(150000);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs & Title */}
        <div className="mb-8">
           <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors mb-4 group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to search</span>
           </button>
           <h1 className="text-4xl font-display font-bold text-zinc-900">Found {PACKAGES.length} Holiday Packages</h1>
           <p className="text-zinc-500 mt-2">Explore handpicked international and domestic experiences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6">
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

              {/* Price Range */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Price Point</label>
                  <span className="text-xs font-bold text-indigo-600">Up to ₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="300000" 
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                />
                <div className="flex justify-between mt-2 text-[10px] text-zinc-400 font-bold uppercase">
                  <span>₹10k</span>
                  <span>₹3L+</span>
                </div>
              </div>

              {/* Package Type */}
              <div className="mb-10">
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4 block">Destination Type</label>
                <div className="space-y-3">
                  {['Domestic', 'International', 'Short Haul', 'Long Haul'].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        onClick={() => toggleFilter(type)}
                        className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${activeFilters.includes(type) ? 'bg-indigo-600 border-indigo-600' : 'border-zinc-200 group-hover:border-indigo-400'}`}
                      >
                         {activeFilters.includes(type) && <X className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-10">
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4 block">Duration</label>
                <div className="space-y-3">
                  {['1-3 Nights', '4-6 Nights', '7-9 Nights', '10+ Nights'].map(dur => (
                    <label key={dur} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        onClick={() => toggleFilter(dur)}
                        className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${activeFilters.includes(dur) ? 'bg-indigo-600 border-indigo-600' : 'border-zinc-200 group-hover:border-indigo-400'}`}
                      >
                         {activeFilters.includes(dur) && <X className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">{dur}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Themes */}
              <div className="mb-4">
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4 block">Travel Theme</label>
                <div className="flex flex-wrap gap-2">
                  {['Honeymoon', 'Family', 'Adventure', 'Beach', 'Mountain'].map(theme => (
                    <button 
                      key={theme}
                      onClick={() => toggleFilter(theme)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${activeFilters.includes(theme) ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-zinc-100 text-zinc-500 hover:border-zinc-300'}`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Listing Area */}
          <div className="lg:col-span-9 space-y-6">
            {PACKAGES.map((pkg, idx) => (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onSelectPkg(pkg)}
                className="bg-white rounded-[2.5rem] p-4 flex flex-col md:flex-row gap-6 shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative w-full md:w-80 h-64 md:h-auto shrink-0 rounded-[2rem] overflow-hidden">
                  <ImageSlider images={pkg.images} />
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                     {pkg.tags.map(tag => (
                        <span key={tag} className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-zinc-900 border border-white/20">
                           {tag}
                        </span>
                     ))}
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-900 hover:text-rose-500 transition-colors z-10">
                     <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest z-10 flex items-center gap-1.5 shadow-lg">
                     <Clock className="w-3.5 h-3.5" />
                     {pkg.duration}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col py-2 pr-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-zinc-400 mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{pkg.location}</span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">{pkg.name}</h3>
                      <div className="flex items-center gap-2">
                         <div className="flex items-center gap-1">
                           <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                           <span className="text-sm font-bold text-zinc-900">{pkg.rating}</span>
                         </div>
                         <span className="text-xs text-zinc-400 font-medium">({pkg.reviews} reviews)</span>
                         <span className="w-1 h-1 rounded-full bg-zinc-200" />
                         <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{pkg.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Starts At</p>
                       <p className="text-4xl font-display font-bold text-indigo-600 tracking-tight">₹{pkg.price.toLocaleString('en-IN')}</p>
                       <p className="text-[10px] text-zinc-400 font-medium mt-1">Per Person</p>
                    </div>
                  </div>

                  {/* Inclusions / Highlights */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-100">
                         {inc === 'Flight' && <Plane className="w-3.5 h-3.5 text-indigo-500" />}
                         {inc === 'Hotel' && <Building2 className="w-3.5 h-3.5 text-emerald-500" />}
                         {inc === 'Meals' && <Soup className="w-3.5 h-3.5 text-amber-500" />}
                         {inc === 'Sightseeing' && <Camera className="w-3.5 h-3.5 text-rose-500" />}
                         <span className="text-[10px] font-bold text-zinc-500 uppercase">{inc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-zinc-100 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4" />
                        Best Price Guaranteed
                     </div>
                     <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPkg(pkg);
                      }}
                      className="bg-zinc-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-3 group/btn shadow-xl shadow-zinc-100"
                     >
                        View Details
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
