import { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchCmsDestinations } from '../lib/api';

const INDIA_DATA = [
  {
    id: 1,
    name: 'Bangalore',
    accommodations: '5,372 accommodations',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'Mumbai',
    accommodations: '4,177 accommodations',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    name: 'Hyderabad',
    accommodations: '2,735 accommodations',
    image: 'https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    name: 'New Delhi',
    accommodations: '12,786 accommodations',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 5,
    name: 'Goa',
    accommodations: '9,254 accommodations',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 6,
    name: 'Jaipur',
    accommodations: '1,843 accommodations',
    image: 'https://images.unsplash.com/photo-1477587458883-471a5ed94245?auto=format&fit=crop&q=80&w=400'
  }
];

interface IndiaDestinationsProps {
  service?: string;
  onSelectDestination: (name: string) => void;
}

export default function IndiaDestinations({ onSelectDestination, service = 'home' }: IndiaDestinationsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dbDestinations, setDbDestinations] = useState<any[]>([]);

  useEffect(() => {
    if (service === 'home' || service === 'hotels') {
      fetchCmsDestinations(false)
        .then(data => {
          if (data && data.length > 0) {
            setDbDestinations(data.map((d: any) => ({
              id: d.id,
              name: d.name,
              accommodations: d.description || 'Recommended Stay',
              image: d.imageUrl
            })));
          }
        })
        .catch(err => console.error('Failed to fetch CMS destinations:', err));
    }
  }, [service]);

  let activeData = (service === 'home' || service === 'hotels') && dbDestinations.length > 0
    ? dbDestinations 
    : INDIA_DATA;
  let sectionTitle = "{sectionTitle}";
  let sectionSubtitle = "{sectionSubtitle}";
  
  if (service === 'flights') {
    sectionTitle = "Popular Flight Routes";
    sectionSubtitle = "Most booked domestic and international flights";
    activeData = [
      { id: 1, name: 'Delhi to Mumbai', accommodations: '50+ flights daily', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=400' },
      { id: 2, name: 'Bangalore to Delhi', accommodations: '45+ flights daily', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=400' },
      { id: 3, name: 'Mumbai to Goa', accommodations: '30+ flights daily', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=400' },
      { id: 4, name: 'Delhi to Dubai', accommodations: '20+ flights daily', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400' },
      { id: 5, name: 'Hyderabad to Chennai', accommodations: '25+ flights daily', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&q=80&w=400' },
      { id: 6, name: 'Kolkata to Bangalore', accommodations: '15+ flights daily', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&q=80&w=400' },
    ];
  } else if (service === 'bus') {
    sectionTitle = "Trending Bus Routes";
    sectionSubtitle = "Comfortable AC sleeper buses for your journey";
    activeData = [
      { id: 1, name: 'Delhi to Jaipur', accommodations: '40+ buses daily', image: 'https://images.unsplash.com/photo-1477587458883-471a5ed94245?auto=format&fit=crop&q=80&w=400' },
      { id: 2, name: 'Bangalore to Hyderabad', accommodations: '35+ buses daily', image: 'https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&q=80&w=400' },
      { id: 3, name: 'Mumbai to Pune', accommodations: '100+ buses daily', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=400' },
      { id: 4, name: 'Chennai to Coimbatore', accommodations: '25+ buses daily', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&q=80&w=400' },
      { id: 5, name: 'Delhi to Manali', accommodations: '15+ buses daily', image: 'https://images.unsplash.com/photo-1605649487212-4dcb18000c8c?auto=format&fit=crop&q=80&w=400' },
      { id: 6, name: 'Pune to Goa', accommodations: '20+ buses daily', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=400' },
    ];
  } else if (service === 'cab') {
    sectionTitle = "Popular Cab Routes";
    sectionSubtitle = "Reliable outstation rides and airport drops";
    activeData = [
      { id: 1, name: 'Mumbai Airport', accommodations: 'Available 24/7', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=400' },
      { id: 2, name: 'Delhi to Agra', accommodations: 'Round trip offers', image: 'https://images.unsplash.com/photo-1564507592224-2fc3317c7689?auto=format&fit=crop&q=80&w=400' },
      { id: 3, name: 'Bangalore Airport', accommodations: 'Available 24/7', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=400' },
      { id: 4, name: 'Pune to Mahabaleshwar', accommodations: 'Round trip offers', image: 'https://images.unsplash.com/photo-1623131754021-3fc5f09cbba0?auto=format&fit=crop&q=80&w=400' },
      { id: 5, name: 'Chandigarh to Shimla', accommodations: 'Round trip offers', image: 'https://images.unsplash.com/photo-1521330784804-5f69f8a17b1d?auto=format&fit=crop&q=80&w=400' },
      { id: 6, name: 'Chennai to Pondicherry', accommodations: 'Round trip offers', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&q=80&w=400' },
    ];
  } else if (service === 'holidays') {
    sectionTitle = "Top Holiday Packages";
    sectionSubtitle = "Curated experiences for your perfect getaway";
    activeData = [
      { id: 1, name: 'Kashmir', accommodations: '5 Nights / 6 Days', image: 'https://images.unsplash.com/photo-1566837497312-7c701bcbf71b?auto=format&fit=crop&q=80&w=400' },
      { id: 2, name: 'Kerala', accommodations: '4 Nights / 5 Days', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=400' },
      { id: 3, name: 'Goa', accommodations: '3 Nights / 4 Days', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=400' },
      { id: 4, name: 'Maldives', accommodations: '4 Nights / 5 Days', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=400' },
      { id: 5, name: 'Dubai', accommodations: '5 Nights / 6 Days', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400' },
      { id: 6, name: 'Bali', accommodations: '6 Nights / 7 Days', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400' },
    ];
  }


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
          <h2 className="text-3xl font-bold text-zinc-950 text-left">
            Top destinations in India
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
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 shadow-sm group-hover/card:shadow-lg transition-all duration-300">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-300" />
                </div>

                {/* Info Text */}
                <div className="text-center">
                  <h3 className="font-extrabold text-zinc-900 group-hover/card:text-blue-600 transition-colors text-sm mb-0.5">
                    {dest.name}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-bold">
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
