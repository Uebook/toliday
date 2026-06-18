import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, Filter, Star, Clock, MapPin, ChevronDown, Check, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchActivities } from '../lib/api';

const EXPERIENCES = [
  { id: 'attractions', name: 'Attraction Tickets', image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=150&h=150&fit=crop' },
  { id: 'tours', name: 'Tours', image: 'https://images.unsplash.com/photo-1544989164-32a106f3e7ec?w=150&h=150&fit=crop' },
  { id: 'adventure', name: 'Adventure', image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=150&h=150&fit=crop' },
  { id: 'water', name: 'Water Activities', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=150&fit=crop' },
  { id: 'cruises', name: 'Cruises', image: 'https://images.unsplash.com/photo-1559588501-8378e9f50e8a?w=150&h=150&fit=crop' },
  { id: 'nature', name: 'Nature & Wildlife', image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=150&h=150&fit=crop' },
  { id: 'entertainment', name: 'Entertainment & Shows', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=150&h=150&fit=crop' }
];

export default function ActivityList({ searchParams, onBack, onSelectActivity }: any) {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string[]>([]);
  const destination = searchParams?.destination || 'Bangkok';

  useEffect(() => {
    setLoading(true);
    fetchActivities(searchParams).then(data => {
      setActivities(data);
      setLoading(false);
    });
  }, [searchParams]);

  const toggleCategory = (cat: string) => {
    setActiveCategory(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredActivities = activities.filter(a => {
    if (activeCategory.length > 0 && !activeCategory.includes(a.mainCategory)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-[100px] pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 mb-2">
              <button onClick={onBack} className="hover:text-brand-orange transition-colors">Home</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-zinc-800">Activities in {destination}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-800">Showing Activities in {destination}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-zinc-600">Sorted By:</span>
            <button className="bg-white border border-zinc-200 px-4 py-2 rounded-xl text-sm font-extrabold text-zinc-800 flex items-center gap-2 shadow-sm">
              Popularity <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* SIDEBAR FILTERS */}
          <div className="w-full lg:w-[280px] flex-shrink-0 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-[120px]">
            <h3 className="text-lg font-extrabold text-zinc-800 mb-6">Refine Your Search</h3>
            
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search for activities" 
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="text-sm font-extrabold text-zinc-800">Free Cancellation</div>
                <div className="text-xs font-semibold text-zinc-500">Book your activity worry-free!</div>
              </div>
              <div className="w-10 h-6 bg-zinc-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm"></div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-extrabold text-zinc-800 mb-4">Categories</h4>
              <div className="space-y-3">
                {['Attraction Tickets', 'Tours', 'Adventure', 'Water Activities', 'Cruises', 'Nature & Wildlife'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${activeCategory.includes(cat) ? 'bg-brand-blue border-brand-blue text-white' : 'border-zinc-300 bg-white group-hover:border-brand-blue'}`}>
                      {activeCategory.includes(cat) && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-sm font-bold text-zinc-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-extrabold text-zinc-800 mb-4">Duration</h4>
              <div className="space-y-3">
                {['0-3 hours', '3-5 hours', '5-7 hours', 'Full Day (7+ hours)'].map(dur => (
                  <label key={dur} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-zinc-300 bg-white flex items-center justify-center group-hover:border-brand-blue transition-all"></div>
                    <span className="text-sm font-bold text-zinc-700">{dur}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-extrabold text-zinc-800 mb-4">Time</h4>
              <div className="flex flex-col gap-2">
                <button className="text-left px-4 py-3 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-700 hover:border-brand-blue hover:bg-brand-blue/5 transition-all">
                  Morning (6 AM-12 PM)
                </button>
                <button className="text-left px-4 py-3 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-700 hover:border-brand-blue hover:bg-brand-blue/5 transition-all">
                  Afternoon (12 PM-5 PM)
                </button>
                <button className="text-left px-4 py-3 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-700 hover:border-brand-blue hover:bg-brand-blue/5 transition-all">
                  Evening (5 PM-12 AM)
                </button>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1">
            
            {/* Top Experience Carousel */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-extrabold text-zinc-800 flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4 text-brand-orange" /> Select Your Experience
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:text-brand-blue"><ChevronLeftIcon className="w-4 h-4" /></button>
                  <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:text-brand-blue"><ChevronRightIcon className="w-4 h-4" /></button>
                </div>
              </div>
              
              <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                {EXPERIENCES.map((exp, i) => (
                  <button 
                    key={i} 
                    onClick={() => toggleCategory(exp.name)}
                    className="flex flex-col items-center gap-3 min-w-[80px] group flex-shrink-0"
                  >
                    <div className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all p-0.5 ${activeCategory.includes(exp.name) ? 'border-brand-blue' : 'border-transparent group-hover:border-zinc-200'}`}>
                      <img src={exp.image} alt={exp.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <span className={`text-[10px] font-extrabold text-center max-w-[90px] leading-tight ${activeCategory.includes(exp.name) ? 'text-brand-blue' : 'text-zinc-600 group-hover:text-zinc-900'}`}>
                      {exp.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-white rounded-3xl h-[380px] animate-pulse"></div>
                ))}
              </div>
            ) : filteredActivities.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <h3 className="text-xl font-extrabold text-zinc-800">No activities found</h3>
                <p className="text-sm text-zinc-500 mt-2 font-semibold">Try adjusting your filters or destination.</p>
                <button onClick={() => setActiveCategory([])} className="mt-6 text-brand-blue font-bold hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredActivities.map((act: any) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={act.id}
                    onClick={() => onSelectActivity(act)}
                    className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col"
                  >
                    <div className="h-48 relative overflow-hidden group">
                      <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-extrabold text-zinc-700 tracking-wider uppercase">
                        {act.category}
                      </div>
                      {act.savingPercentage > 20 && (
                        <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-md text-[10px] font-black tracking-widest uppercase flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" /> Limited Deal
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-black text-zinc-800 leading-tight mb-4 line-clamp-2">{act.title}</h3>
                      
                      <div className="space-y-2 mb-6 flex-1">
                        {act.highlights.slice(0, 3).map((h: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-zinc-600">
                            <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-zinc-100 flex flex-col items-end">
                        <div className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-widest mb-1">
                          You save {act.savingPercentage}%
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-bold text-zinc-400 line-through">₹{act.originalPrice.toLocaleString()}</span>
                          <span className="text-2xl font-black text-zinc-900">₹{act.price.toLocaleString()}</span>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase">per Adult</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

// Small helper icons
function SparklesIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function ChevronLeftIcon(props: any) {
  return <ChevronRight className="rotate-180" {...props} />;
}
function ChevronRightIcon(props: any) {
  return <ChevronRight {...props} />;
}
