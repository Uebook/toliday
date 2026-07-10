import { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchCmsDestinations } from '../lib/api';

const OUTSIDE_DATA = [
  {
    id: 1,
    name: 'Dubai',
    accommodations: '19,464 accommodations',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'Abu Dhabi',
    accommodations: '721 accommodations',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    name: 'Bangkok',
    accommodations: '12,048 accommodations',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    name: 'Sharjah',
    accommodations: '323 accommodations',
    image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 5,
    name: 'Pattaya',
    accommodations: '11,909 accommodations',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 6,
    name: 'Singapore',
    accommodations: '6,842 accommodations',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=400'
  }
];

interface OutsideDestinationsProps {
  onSelectDestination: (name: string) => void;
}

export default function OutsideDestinations({ onSelectDestination }: OutsideDestinationsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dbDestinations, setDbDestinations] = useState<any[]>([]);

  useEffect(() => {
    fetchCmsDestinations(true)
      .then(data => {
        if (data && data.length > 0) {
          setDbDestinations(data.map((d: any) => ({
            id: d.id,
            name: d.name,
            accommodations: d.description || 'International Escape',
            image: d.imageUrl
          })));
        }
      })
      .catch(err => console.error('Failed to fetch CMS international destinations:', err));
  }, []);

  const activeData = dbDestinations.length > 0 ? dbDestinations : OUTSIDE_DATA;

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
        {/* Header with Title and Controls */}
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-display font-bold text-zinc-950 text-left">
            Popular destinations outside India
          </h2>
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm bg-white cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm bg-white cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-none snap-x snap-mandatory"
          >
            {activeData.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => onSelectDestination(dest.name)}
                className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[22.5%] snap-start cursor-pointer group/card"
              >
                {/* Rounded wrapper */}
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-4 shadow-sm group-hover/card:shadow-lg transition-all duration-300">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-300" />
                </div>

                {/* Info Text */}
                <div className="text-center">
                  <h3 className="font-bold text-zinc-900 group-hover/card:text-indigo-600 transition-colors text-sm mb-0.5">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium">
                    {dest.accommodations}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
