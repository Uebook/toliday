import { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Property {
  id: string;
  name: string;
  rating: number;
  stars: number;
  location: string;
  price: string;
  image: string;
}

const PROPERTY_DATA: Record<string, Property[]> = {
  Bangalore: [
    {
      id: 'BLR1',
      name: 'Bangalore Times by Alaya Stays | Brookfield',
      rating: 8.6,
      stars: 4.5,
      location: 'Whitefield, Bangalore',
      price: 'INR 1,985.12',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'BLR2',
      name: "RD's Nature Retreat",
      rating: 8.4,
      stars: 3,
      location: 'Other, Bangalore',
      price: 'INR 8,392.71',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'BLR3',
      name: 'Sliceinn Sylva, Wilson Garden, Bangalore',
      rating: 8.3,
      stars: 4,
      location: 'Kormangala, Bangalore',
      price: 'INR 1,917.56',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'BLR4',
      name: 'HomeSlice Nazaara, HomeStay in BTM',
      rating: 7.5,
      stars: 3,
      location: 'HSR Layout, Bangalore',
      price: 'INR 901',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400'
    }
  ],
  Mumbai: [
    {
      id: 'BOM1',
      name: 'Alibaug Beach Villa by Alaya Stays',
      rating: 8.8,
      stars: 5,
      location: 'Alibaug, Mumbai',
      price: 'INR 12,499.00',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'BOM2',
      name: 'Bandra Premium Boutique Studio',
      rating: 8.2,
      stars: 4,
      location: 'Bandra West, Mumbai',
      price: 'INR 3,250.00',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'BOM3',
      name: 'Sea Breeze Luxury Apartment Colaba',
      rating: 8.5,
      stars: 4,
      location: 'Colaba, Mumbai',
      price: 'INR 4,800.00',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'BOM4',
      name: 'The Nariman Suites & Spa',
      rating: 8.0,
      stars: 3.5,
      location: 'Nariman Point, Mumbai',
      price: 'INR 5,500.00',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400'
    }
  ],
  Hyderabad: [
    {
      id: 'HYD1',
      name: 'Gachibowli Premium Residency',
      rating: 8.7,
      stars: 4.5,
      location: 'Gachibowli, Hyderabad',
      price: 'INR 2,200.00',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'HYD2',
      name: 'Jubilee Hills Luxury Mansion',
      rating: 8.9,
      stars: 5,
      location: 'Jubilee Hills, Hyderabad',
      price: 'INR 15,000.00',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'HYD3',
      name: 'Banjara Hills Exclusive Guest House',
      rating: 8.1,
      stars: 3.5,
      location: 'Banjara Hills, Hyderabad',
      price: 'INR 3,100.00',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'HYD4',
      name: 'HiTech City Executive Apartment',
      rating: 8.3,
      stars: 4,
      location: 'HiTech City, Hyderabad',
      price: 'INR 2,800.00',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=400'
    }
  ],
  'New Delhi': [
    {
      id: 'DEL1',
      name: 'Connaught Place Heritage Villa Stay',
      rating: 8.9,
      stars: 5,
      location: 'Connaught Place, New Delhi',
      price: 'INR 6,200.00',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'DEL2',
      name: 'South Delhi Penthouse & Terrace Garden',
      rating: 8.4,
      stars: 4,
      location: 'South Ext, New Delhi',
      price: 'INR 3,800.00',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'DEL3',
      name: 'Green View Boutique Apartment Saket',
      rating: 8.2,
      stars: 4,
      location: 'Saket, New Delhi',
      price: 'INR 2,400.00',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'DEL4',
      name: 'Karol Bagh Executive Hotel Suite',
      rating: 7.9,
      stars: 3,
      location: 'Karol Bagh, New Delhi',
      price: 'INR 1,600.00',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=400'
    }
  ],
  Goa: [
    {
      id: 'GOA1',
      name: 'Candolim Sunset Beachside Cottage',
      rating: 9.1,
      stars: 5,
      location: 'Candolim, Goa',
      price: 'INR 18,500.00',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'GOA2',
      name: 'Calangute Premium Lagoon Resort',
      rating: 8.6,
      stars: 4.5,
      location: 'Calangute, Goa',
      price: 'INR 7,800.00',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'GOA3',
      name: 'Baga Coco Palms Traditional Homestay',
      rating: 8.3,
      stars: 4,
      location: 'Baga, Goa',
      price: 'INR 2,100.00',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'GOA4',
      name: 'Heritage Portuguese Mansion Fontainhas',
      rating: 8.5,
      stars: 4,
      location: 'Fontainhas, Goa',
      price: 'INR 3,900.00',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=400'
    }
  ]
};

interface FeaturedHomesProps {
  onSelectProperty: (property: Property) => void;
}

export default function FeaturedHomes({ onSelectProperty }: FeaturedHomesProps) {
  const [activeTab, setActiveTab] = useState('Bangalore');

  const renderStars = (count: number) => {
    const stars = [];
    const fullStars = Math.floor(count);
    const hasHalf = count % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`f-${i}`} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />);
    }
    if (hasHalf) {
      stars.push(<Star key="h" className="w-3.5 h-3.5 text-amber-400 fill-amber-400/50" />);
    }
    return (
      <div className="flex gap-0.5 items-center">
        {stars}
      </div>
    );
  };

  return (
    <section className="py-20 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 text-left">
            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100">
              Handpicked Homes
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-zinc-900 leading-tight">
              Featured Homes recommended <br className="hidden md:block" /> 
              for you
            </h2>
          </div>

          {/* Location Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-zinc-150 md:border-none">
            {Object.keys(PROPERTY_DATA).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 rounded-full text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                  activeTab === tab 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {PROPERTY_DATA[activeTab].map((prop, idx) => (
              <motion.div
                key={prop.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => onSelectProperty(prop)}
                className="group flex flex-col cursor-pointer bg-white rounded-3xl overflow-hidden"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-4 bg-zinc-50 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <img 
                    src={prop.image} 
                    alt={prop.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Blue rating badge */}
                  <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-lg px-2 py-0.5 font-bold text-xs shadow-md">
                    {prop.rating}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-zinc-900 line-clamp-2 min-h-[2.5rem] leading-tight text-sm tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                    {prop.name}
                  </h3>
                  
                  {/* Rating Stars & Location */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                    {renderStars(prop.stars)}
                    <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                    <div className="flex items-center gap-0.5 text-xs font-bold text-indigo-600">
                      <MapPin className="w-3 h-3 text-indigo-600" />
                      <span>{prop.location}</span>
                    </div>
                  </div>

                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Per night before taxes and fees
                  </p>
                  
                  <p className="text-sm font-extrabold text-orange-600">
                    {prop.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
