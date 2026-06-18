import { useRef } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Building2, Landmark } from 'lucide-react';
import { motion } from 'motion/react';

const PROMO_DATA = [
  {
    id: 1,
    type: 'birthday',
    bgClass: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950',
    titleBadge: '21st',
    subtitleBadge: 'Birthday Sale',
    discount: 'Up to 60% off',
    description: 'Hotels, Flights, Activities.',
    cta: 'Book now until 21 May',
    brandLogo: Sparkles,
  },
  {
    id: 2,
    type: 'partner-radisson',
    bgClass: 'bg-gradient-to-br from-cyan-900 via-sky-850 to-indigo-950',
    bgImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400',
    brandName: 'RADISSON HOTELS',
    title: 'Experience True Hospitality',
    cta: 'Book now until 21 May',
    brandLogo: Building2,
  },
  {
    id: 3,
    type: 'partner-minor',
    bgClass: 'bg-gradient-to-br from-teal-950 via-emerald-900 to-emerald-950',
    bgImage: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400',
    brandName: 'MINOR HOTELS',
    title: 'Exceptional Comfort, Every Stay',
    cta: 'Book now until 21 May',
    brandLogo: Landmark,
  }
];


interface PromoBannersProps {
  service?: string;
}

export default function PromoBanners({ service = 'home' }: PromoBannersProps) {

  const scrollRef = useRef<HTMLDivElement>(null);

  let activeData = PROMO_DATA;
  if (service === 'flights') {
    activeData = [
      { id: 1, type: 'flight-sale', bgClass: 'bg-gradient-to-br from-blue-950 via-sky-900 to-blue-950', titleBadge: 'Mega', subtitleBadge: 'Flight Sale', discount: 'Flat 15% Off', description: 'On Domestic Flights.', cta: 'Book now', brandLogo: Sparkles },
      { id: 2, type: 'flight-baggage', bgClass: 'bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-950', bgImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=400', brandName: 'AIRLINES', title: 'Extra Baggage Allowance', cta: 'Claim Offer', brandLogo: Sparkles }
    ];
  } else if (service === 'bus') {
    activeData = [
      { id: 1, type: 'bus-sale', bgClass: 'bg-gradient-to-br from-green-950 via-emerald-900 to-green-950', titleBadge: 'Summer', subtitleBadge: 'Bus Sale', discount: 'Up to ₹500 off', description: 'On AC Sleeper Buses.', cta: 'Book now', brandLogo: Sparkles },
      { id: 2, type: 'bus-cashback', bgClass: 'bg-gradient-to-br from-teal-900 via-cyan-800 to-teal-950', bgImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400', brandName: 'VOLVO', title: 'Premium Comfort, Less Price', cta: 'View Deals', brandLogo: Sparkles }
    ];
  } else if (service === 'cab') {
    activeData = [
      { id: 1, type: 'cab-sale', bgClass: 'bg-gradient-to-br from-yellow-950 via-amber-900 to-yellow-950', titleBadge: 'City', subtitleBadge: 'Rides', discount: 'Flat ₹150 off', description: 'On Airport Drops.', cta: 'Book now', brandLogo: Sparkles },
      { id: 2, type: 'cab-outstation', bgClass: 'bg-gradient-to-br from-orange-900 via-red-800 to-orange-950', bgImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400', brandName: 'OUTSTATION', title: 'Weekend Getaways Made Easy', cta: 'Explore', brandLogo: Sparkles }
    ];
  } else if (service === 'holidays') {
    activeData = [
      { id: 1, type: 'holiday-sale', bgClass: 'bg-gradient-to-br from-rose-950 via-pink-900 to-rose-950', titleBadge: 'Family', subtitleBadge: 'Packages', discount: 'Get 2 Nights Free', description: 'On 5+ Night Stays.', cta: 'Book now', brandLogo: Sparkles },
      { id: 2, type: 'holiday-honeymoon', bgClass: 'bg-gradient-to-br from-fuchsia-900 via-purple-800 to-fuchsia-950', bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400', brandName: 'HONEYMOON', title: 'Romantic Getaways for Couples', cta: 'View Packages', brandLogo: Sparkles }
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold text-zinc-950">
            Accommodation Promotions
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

        {/* Carousel / Slider Container */}
        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-none snap-x snap-mandatory"
          >
            {activeData.map((promo, idx) => {
              const BrandIcon = promo.brandLogo;
              return (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={`flex-shrink-0 w-[90%] sm:w-[65%] md:w-[48%] lg:w-[32%] h-56 rounded-[2rem] overflow-hidden relative shadow-sm hover:shadow-lg transition-all duration-350 cursor-pointer snap-start ${promo.bgClass}`}
                >
                  {/* Left Side Beach Image if partner promo */}
                  {promo.bgImage && (
                    <div className="absolute inset-y-0 left-0 w-[35%] overflow-hidden">
                      <img 
                        src={promo.bgImage} 
                        alt="Promo hotel" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                    </div>
                  )}

                  {/* Red tag overlay at the top left corner */}
                  <div className="absolute top-4 left-4 z-10 w-6 h-6 rounded-lg bg-rose-500/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Building2 className="w-3.5 h-3.5 text-white" />
                  </div>

                  {/* Birthday Card Layout */}
                  {promo.type === 'birthday' && (
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-left">
                      {/* Top Branding */}
                      <div className="flex items-center gap-2">
                        <div className="text-white">
                          <span className="text-3xl font-black block leading-none">{promo.titleBadge}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 block">{promo.subtitleBadge}</span>
                        </div>
                        <div className="h-8 w-px bg-white/20" />
                        <BrandIcon className="w-6 h-6 text-amber-400 animate-pulse" />
                      </div>

                      {/* Content */}
                      <div className="mt-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">Up to</span>
                          <span className="text-4xl font-extrabold text-white leading-none">60%</span>
                          <span className="text-lg font-bold text-white">off</span>
                        </div>
                        <p className="text-xs font-bold text-indigo-100 mt-1">{promo.description}</p>
                      </div>

                      {/* CTA Button */}
                      <span className="w-fit bg-indigo-600 text-white text-[11px] font-extrabold px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors uppercase tracking-wider">
                        {promo.cta}
                      </span>
                    </div>
                  )}

                  {/* Partner Card Layout */}
                  {promo.type !== 'birthday' && (
                    <div className="absolute inset-y-0 right-0 left-[35%] p-6 flex flex-col justify-between text-left">
                      {/* Top Partner Branding */}
                      <div className="flex items-center gap-2 text-white/95">
                        <BrandIcon className="w-4 h-4 text-indigo-300 shrink-0" />
                        <span className="text-[11px] font-extrabold tracking-wider uppercase truncate">{promo.brandName}</span>
                      </div>

                      {/* Content */}
                      <h3 className="text-base font-extrabold text-white leading-snug mt-2 line-clamp-2">
                        {promo.title}
                      </h3>

                      {/* CTA Button */}
                      <span className="w-fit bg-indigo-600/90 text-white text-[10px] font-extrabold px-3.5 py-2 rounded-xl hover:bg-indigo-700 transition-colors uppercase tracking-wider">
                        {promo.cta}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
