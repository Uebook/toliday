import { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Building2, Ticket, Percent } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchCmsPromos } from '../lib/api';

interface PromoBannersProps {
  service?: string;
}

export default function PromoBanners({ service = 'home' }: PromoBannersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Map the sidebar filter string to public CMS API query parameter
  const apiServiceFilter = service === 'home' 
    ? 'home' 
    : service === 'cabs' 
      ? 'cab' 
      : service;

  useEffect(() => {
    fetchCmsPromos(apiServiceFilter)
      .then(data => {
        setPromos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch CMS promos:', err);
        setLoading(false);
      });
  }, [apiServiceFilter]);


  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-zinc-950">
            Accommodation Promotions
          </h2>
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-indigo-600 hover:text-blue-600 transition-all shadow-sm bg-white cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-indigo-600 hover:text-blue-600 transition-all shadow-sm bg-white cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel / Slider Container */}
        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-none snap-x snap-mandatory"
          >
            {loading ? (
              <div className="flex-1 flex justify-center py-12">
                <div className="w-6 h-6 border-2 border-indigo-650 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : promos.length === 0 ? (
              <div className="flex-1 text-center py-12 text-zinc-400 font-medium">
                No active promotions available at the moment.
              </div>
            ) : (
              promos.map((promo, idx) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="flex-shrink-0 w-[90%] sm:w-[65%] md:w-[48%] lg:w-[32%] h-56 rounded-lg overflow-hidden relative shadow-sm hover:shadow-lg transition-all duration-350 cursor-pointer snap-start bg-zinc-900"
                >
                  {/* Background Image */}
                  {promo.imageUrl && (
                    <div className="absolute inset-0">
                      <img 
                        src={promo.imageUrl} 
                        alt={promo.title} 
                        className="w-full h-full object-cover opacity-60" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>
                  )}

                  {/* Red tag overlay at the top left corner */}
                  <div className="absolute top-4 left-4 z-10 w-7 h-7 rounded-lg bg-rose-500/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Percent className="w-4 h-4 text-white" />
                  </div>

                  {/* Coupon Code badge on top right */}
                  <div className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md text-amber-300 border border-white/10 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    Code: {promo.code}
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-left z-10">
                    <div className="space-y-1 mb-4">
                      {promo.discount && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/10 w-fit block">
                          {promo.discount}
                        </span>
                      )}
                      <h3 className="text-lg font-black text-white leading-snug drop-shadow-sm">
                        {promo.title}
                      </h3>
                      {promo.description && (
                        <p className="text-xs font-semibold text-zinc-200 line-clamp-1 opacity-90">
                          {promo.description}
                        </p>
                      )}
                    </div>

                    {/* Book Button */}
                    <span className="w-fit bg-blue-600/90 text-white text-[10px] font-black px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors uppercase tracking-widest">
                      Book Now
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
