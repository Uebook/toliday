import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palmtree, MapPin, Calendar, Star, Users, ChevronRight, Plane, Building2, Ticket, ShieldCheck, Heart, Camera, Soup, ChevronLeft } from 'lucide-react';

interface HolidayBookingProps {
  onProceedToCheckout: (pkg: any) => void;
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
    inclusions: ['Flight', 'Hotel', 'Meals', 'Sightseeing', 'Transfer']
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
    inclusions: ['Hotel', 'Meals', 'Sightseeing', 'Transfer']
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
    inclusions: ['Flight', 'Hotel', 'Meals', 'Visa Assistance', 'Sightseeing']
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

const SUMMER_ESCAPES = [
  { name: 'Kashmir', image: 'https://images.unsplash.com/photo-1566833925222-79193661214a?auto=format&fit=crop&q=80&w=400' },
  { name: 'Himachal', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=400' },
  { name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=400' },
  { name: 'Coorg & Ooty', image: 'https://images.unsplash.com/photo-1590496794008-383c8070bb25?auto=format&fit=crop&q=80&w=400' },
  { name: 'North East', image: 'https://images.unsplash.com/photo-1582239331490-671e3f8981e8?auto=format&fit=crop&q=80&w=400' },
  { name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=400' },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=400' },
  { name: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=400' }
];

const LAST_MINUTE_DEALS = [
  { name: 'Kerala', image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=400' },
  { name: 'South India', image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=400' },
  { name: 'Shimla & Manali', image: 'https://images.unsplash.com/photo-1597033501099-27038ba07746?auto=format&fit=crop&q=80&w=400' },
  { name: 'Kashmir', image: 'https://images.unsplash.com/photo-1566833925222-79193661214a?auto=format&fit=crop&q=80&w=400' },
  { name: 'Sikkim & Darjeeling', image: 'https://images.unsplash.com/photo-1588661642878-874b94689626?auto=format&fit=crop&q=80&w=400' },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=400' },
  { name: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=400' },
  { name: 'Andaman', image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&q=80&w=400' }
];

const DealSection = ({ title, subtitle, deals }: { title: string, subtitle: string, deals: any[] }) => {
  return (
    <div className="mb-16 bg-white p-8 rounded-[3rem] shadow-sm border border-zinc-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-zinc-900">{title}</h2>
          <p className="text-zinc-500 font-medium">{subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {deals.map((deal, i) => (
          <div key={i} className="relative w-40 h-56 shrink-0 rounded-2xl overflow-hidden group cursor-pointer shadow-lg shadow-zinc-100">
            <img src={deal.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={deal.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <p className="absolute bottom-4 left-4 text-white font-bold text-xs">{deal.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HolidayBooking({ onProceedToCheckout }: HolidayBookingProps) {
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayStr = getTodayDateString();

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return 'Add date';
    const date = new Date(dateStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const yearShort = String(date.getFullYear()).slice(-2);
    
    return `${day} ${month}'${yearShort}, ${dayName}`;
  };

  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [depDate, setDepDate] = useState(todayStr);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onProceedToCheckout({}); // Transition to list
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Header Section */}
          <div className="flex-1">
            <h1 className="text-4xl font-display font-bold text-zinc-900 mb-4">Unforgettable Holiday Packages</h1>
            <p className="text-zinc-500 max-w-2xl leading-relaxed">Curated luxury experiences, seamless transfers, and expert guidance for your next dream vacation.</p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
             <div className="text-center bg-white p-4 rounded-3xl border border-zinc-100 shadow-sm min-w-[120px]">
                <p className="text-2xl font-display font-bold text-brand-orange">500+</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Destinations</p>
             </div>
             <div className="text-center bg-white p-4 rounded-3xl border border-zinc-100 shadow-sm min-w-[120px]">
                <p className="text-2xl font-display font-bold text-brand-orange">24/7</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Trip Support</p>
             </div>
          </div>
        </div>

        {/* Holiday Search Panel */}
        <div className="bg-white rounded-[3rem] p-8 shadow-xl shadow-zinc-200/50 border border-zinc-100 mb-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-bl-full -z-0" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1 text-center md:text-left">Destination</label>
                 <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                    <input defaultValue="Bali, Indonesia" className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-medium text-zinc-900" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1 text-center md:text-left">Date of Travel</label>
                 <div 
                   className="relative bg-zinc-50 border border-zinc-100 rounded-2xl p-4 hover:border-brand-orange/30 transition-colors flex items-center gap-3 cursor-pointer group"
                   onClick={(e) => {
                     try { (e.currentTarget.querySelector('input') as any)?.showPicker(); } catch (err) {}
                   }}
                 >
                    <input 
                      type="date" 
                      value={depDate} 
                      min={todayStr}
                      onChange={(e) => setDepDate(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                    />
                    <Calendar className="w-4 h-4 text-brand-orange shrink-0 pointer-events-none" />
                    <div className="flex-1 text-left min-w-0 pointer-events-none">
                      <span className="text-sm font-bold text-zinc-900 block truncate">{formatDateDisplay(depDate)}</span>
                    </div>
                 </div>
              </div>
              <div className="flex items-end">
                 <button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/30 flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
                 >
                    {isSearching ? 'Searching...' : 'Find My Package'}
                    {!isSearching && <Plane className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />}
                 </button>
              </div>
           </div>
        </div>

        {/* Categories / Collections */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
           <div className="flex gap-4 min-w-max">
              {[
                { label: 'Beach Getaway', icon: <Palmtree className="w-4 h-4" /> },
                { label: 'Honeymoon Special', icon: <Heart className="w-4 h-4" /> },
                { label: 'Adventure Gear', icon: <Camera className="w-4 h-4" /> },
                { label: 'Family Fun', icon: <Users className="w-4 h-4" /> },
                { label: 'Mountain Retreat', icon: <Building2 className="w-4 h-4" /> }
              ].map((cat, i) => (
                <button key={i} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-zinc-100 text-sm font-bold text-zinc-600 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                   {cat.icon}
                   {cat.label}
                </button>
              ))}
           </div>
        </div>

        {/* Holiday Deals Sections */}
        {!hasSearched && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DealSection 
              title="Summer Escapes at Lowest prices!" 
              subtitle="Explore Unmissable Offers. Use Code: MMTV_VACATION" 
              deals={SUMMER_ESCAPES}
            />
            <DealSection 
              title="Last-minute Deals" 
              subtitle="Top trending Last minute getaways!" 
              deals={LAST_MINUTE_DEALS}
            />
          </motion.div>
        )}

        {/* Results Area */}
        <div className="min-h-[400px]">
          {isSearching ? (
            <div className="py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-zinc-100 shadow-sm">
               <div className="w-20 h-20 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-8" />
               <h3 className="text-2xl font-display font-bold text-zinc-900 mb-2">Curating Your Dream Escape</h3>
               <p className="text-zinc-500 font-medium animate-pulse">Matching your preferences with 500+ premium packages...</p>
            </div>
          ) : (
            <div className="py-32 bg-white rounded-[3rem] border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center px-10 shadow-sm">
               <div className="w-20 h-20 rounded-full bg-brand-orange/10 flex items-center justify-center mb-8 border border-brand-orange/20">
                 <Palmtree className="w-10 h-10 text-brand-orange" />
               </div>
               <h3 className="text-3xl font-display font-bold text-zinc-900 mb-4">Your Next Adventure Awaits</h3>
               <p className="text-zinc-500 max-w-md mx-auto text-lg">Use the search panel above to explore our handpicked collections of bucket-list destinations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
