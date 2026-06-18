import { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface Story {
  id: number;
  title: string;
  image: string;
  link: string;
}

const STORIES_DATA: Story[] = [
  {
    id: 1,
    title: 'Skip Airport Queues Like a Pro With This Little-Known Hack',
    image: 'https://images.unsplash.com/photo-1530521951415-340479d0263f?auto=format&fit=crop&q=80&w=600',
    link: '#'
  },
  {
    id: 2,
    title: 'Top 15 Places to Visit in May in India',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600',
    link: '#'
  },
  {
    id: 3,
    title: '10 Best Places to Visit in February in India',
    image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&q=80&w=600',
    link: '#'
  },
  {
    id: 4,
    title: "Green Getaways: How Odisha's Eco Retreats Redefine Responsible Travel",
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=600',
    link: '#'
  },
  {
    id: 5,
    title: '11 Perfect Places to Bring in the New Year in India',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600',
    link: '#'
  }
];

interface TravelStoriesProps {
  service?: string;
  onSelectStory: (story: Story) => void;
}

export default function TravelStories({ onSelectStory, service = 'home' }: TravelStoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  let activeData = STORIES_DATA;
  let sectionTitle = "{sectionTitle}";
  let sectionSubtitle = "{sectionSubtitle}";
  
  if (service === 'flights') {
    sectionTitle = "Flight & Airport Hacks";
    sectionSubtitle = "Tips for smooth flying and airport experiences";
    activeData = [
      { id: 1, title: 'Skip Airport Queues Like a Pro With This Hack', image: 'https://images.unsplash.com/photo-1530521951415-340479d0263f?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 2, title: 'How to Pack Carry-On Only for a 2-Week Trip', image: 'https://images.unsplash.com/photo-1551525211-1c0903330669?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 3, title: 'The Best Airport Lounges in India', image: 'https://images.unsplash.com/photo-1513681469550-9f5b61517cb8?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 4, title: 'What to Do If Your Flight is Delayed or Canceled', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 5, title: 'Tips for Sleeping Comfortably on Long Flights', image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&q=80&w=600', link: '#' }
    ];
  } else if (service === 'bus') {
    sectionTitle = "Road Travel Stories";
    sectionSubtitle = "Incredible journeys experienced on the road";
    activeData = [
      { id: 1, title: 'My Journey Through the Western Ghats by Bus', image: 'https://images.unsplash.com/photo-1477587458883-471a5ed94245?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 2, title: 'Why AC Sleeper Buses are the Best Way to Travel', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 3, title: 'Top 10 Scenic Bus Routes in South India', image: 'https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 4, title: 'A Guide to Night Travel in Volvo Buses', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 5, title: 'Exploring Rajasthan on a Budget via Buses', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=600', link: '#' }
    ];
  } else if (service === 'cab') {
    sectionTitle = "Road Trips & Cab Rides";
    sectionSubtitle = "Weekend getaways and memorable cab experiences";
    activeData = [
      { id: 1, title: 'The Ultimate Mumbai to Pune Weekend Road Trip', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 2, title: 'How to Book Safe Airport Drops at Odd Hours', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 3, title: 'Exploring the Hills: Delhi to Shimla by Cab', image: 'https://images.unsplash.com/photo-1521330784804-5f69f8a17b1d?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 4, title: 'Benefits of Hiring Outstation Cabs Over Driving', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 5, title: 'Best Stopovers on the Bangalore-Mysore Highway', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600', link: '#' }
    ];
  } else if (service === 'holidays') {
    sectionTitle = "Inspiring Holiday Packages";
    sectionSubtitle = "Curated itineraries to inspire your next vacation";
    activeData = [
      { id: 1, title: 'A 5-Day Itinerary for the Perfect Bali Honeymoon', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 2, title: 'Why Kerala is the Ultimate Family Holiday Destination', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 3, title: 'Top 10 International Destinations for Indian Travelers', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 4, title: 'Exploring the Pristine Beaches of Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 5, title: 'Winter in Kashmir: What to Pack and Expect', image: 'https://images.unsplash.com/photo-1566837497312-7c701bcbf71b?auto=format&fit=crop&q=80&w=600', link: '#' }
    ];
  }

  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Explore More</span>
            </div>
            <h2 className="text-4xl font-display font-bold text-zinc-900">News And Travel Stories</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm bg-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm bg-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stories Slider container */}
        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {activeData.map((story) => (
              <motion.div
                key={story.id}
                onClick={() => onSelectStory(story)}
                whileHover={{ y: -6 }}
                className="relative block w-[280px] sm:w-[320px] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all shrink-0 group/card cursor-pointer"
              >
                {/* Background Image */}
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-white font-semibold text-base leading-snug group-hover/card:text-indigo-200 transition-colors">
                    {story.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scrolling Chevron Overlay Button (right) */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-zinc-800 shadow-lg border border-zinc-100 hover:bg-white hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Custom Progress Bar Indicator */}
        <div className="mt-6 flex justify-center">
          <div className="w-24 h-1 bg-zinc-100 rounded-full overflow-hidden relative">
            <div 
              className="absolute left-0 top-0 h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
