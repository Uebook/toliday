import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, Calendar, Users, ChevronLeft, ShieldCheck, Check, Clock, Info, Plane, Building2, Soup, Camera, Palmtree, ArrowRight } from 'lucide-react';

interface HolidayDetailsProps {
  pkg: any;
  onBack: () => void;
  onProceedToBooking: (pkg: any) => void;
}

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1544644181-1484b3f4c718?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&q=80&w=800"
];

export default function HolidayDetails({ pkg, onBack, onProceedToBooking }: HolidayDetailsProps) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [depDate, setDepDate] = useState(todayStr);

  const itinerary = [
    { day: 1, title: 'Arrival & Leisure', desc: 'Transfer from airport, check-in to your luxury villa and enjoy a sunset dinner.' },
    { day: 2, title: 'Local Culture Tour', desc: 'Visit ancient temples, local markets and enjoy a traditional dance performance.' },
    { day: 3, title: 'Island Hopping', desc: 'Full day excursion to nearby islands with snorkeling and beach picnic.' },
    { day: 4, title: 'Wellness & Spa', desc: 'Relaxing Balinese massage followed by a yoga session overlooking the rice fields.' },
    { day: 5, title: 'Adventure Day', desc: 'Optional White Water Rafting or Atv ride through the jungle.' },
    { day: 6, title: 'Departure', desc: 'Morning at leisure for last minute shopping before airport transfer.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-32 left-0 right-0 max-w-7xl mx-auto px-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Packages
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex gap-2 mb-4">
                {pkg.tags.map((tag: string) => (
                  <span key={tag} className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{tag}</span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">{pkg.name}</h1>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium">{pkg.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold">{pkg.rating} ({pkg.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium">{pkg.duration}</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[3rem] border border-white/20 text-white min-w-[280px]">
               <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Starting Price</p>
               <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-display font-bold">₹{pkg.price.toLocaleString('en-IN')}</span>
                  <span className="text-sm opacity-60">/ Person</span>
               </div>
               <button 
                onClick={() => onProceedToBooking(pkg)}
                className="w-full bg-white text-zinc-900 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2 group"
               >
                 Confirm Booking
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-display font-bold text-zinc-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
                Detailed Overview
              </h2>
              <p className="text-zinc-500 leading-relaxed text-lg mb-8">
                Experience the magic of {pkg.location} with our carefully curated holiday package. This journey takes you through breathtaking landscapes, vibrant cultural sites, and luxury accommodations. Whether you're seeking adventure or relaxation, this package offers the perfect balance of both.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {GALLERY_IMAGES.map((img, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-lg cursor-pointer"
                  >
                    <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Inclusions */}
            <section>
              <h3 className="text-xl font-display font-bold text-zinc-900 mb-8">What's Included</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: <Plane className="w-6 h-6 text-indigo-500" />, label: 'Flights', desc: 'Included' },
                  { icon: <Building2 className="w-6 h-6 text-emerald-500" />, label: 'Hotels', desc: '4-5 Star' },
                  { icon: <Soup className="w-6 h-6 text-amber-500" />, label: 'Meals', desc: 'All Breakfasts' },
                  { icon: <Camera className="w-6 h-6 text-rose-500" />, label: 'Sightseeing', desc: 'Guided Tours' }
                ].map((item, i) => (
                  <div key={i} className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 flex flex-col items-center text-center">
                    <div className="mb-4">{item.icon}</div>
                    <p className="text-xs font-bold text-zinc-900 mb-1">{item.label}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section>
              <h3 className="text-xl font-display font-bold text-zinc-900 mb-10">Day-wise Itinerary</h3>
              <div className="space-y-0 relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-100" />
                {itinerary.map((day) => (
                  <div key={day.day} className="relative pl-24 pb-12 last:pb-0 group">
                    <div className="absolute left-4 top-0 w-8 h-8 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center z-10 group-hover:bg-indigo-600 transition-colors group-hover:text-white">
                      <span className="text-xs font-bold">{day.day}</span>
                    </div>
                    <h4 className="text-lg font-bold text-zinc-900 mb-2">Day {day.day}: {day.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">{day.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 translate-y-0 lg:-translate-y-40">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-indigo-100/30 border border-zinc-100">
                <h4 className="text-xl font-display font-bold text-zinc-900 mb-8">Trip Planner</h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Departure Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600 pointer-events-none" />
                      <input 
                        type="date" 
                        value={depDate} 
                        min={todayStr}
                        onChange={(e) => setDepDate(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none cursor-pointer" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600" />
                      <select className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none appearance-none font-bold text-sm">
                        <option>2 Adults, 1 Room</option>
                        <option>1 Adult, 1 Room</option>
                        <option>4 Adults, 2 Rooms</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-zinc-50">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-zinc-500 font-medium">Trip Total</span>
                      <span className="text-2xl font-display font-bold text-indigo-600">₹{pkg.price.toLocaleString('en-IN')}</span>
                    </div>
                    <button 
                      onClick={() => onProceedToBooking(pkg)}
                      className="w-full bg-zinc-900 text-white py-5 rounded-3xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-zinc-100"
                    >
                      Book This Holiday
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-[10px] font-bold text-emerald-800 leading-tight uppercase tracking-widest">Safe & Flexible: Free date modification available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
