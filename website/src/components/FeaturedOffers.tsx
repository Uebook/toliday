import { ArrowRight, Clock, Star, Gift } from 'lucide-react';
import { motion } from 'motion/react';

const primaryOffers = [
  {
    id: 1,
    category: 'Hotels',
    title: 'Luxury Maldives Escape',
    discount: 'Up to 45% Off',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    className: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 2,
    category: 'Holidays',
    title: 'Swiss Alps Adventure',
    discount: 'Flat $200 Cashback',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 3,
    category: 'Transport',
    title: 'City Cab Rewards',
    discount: 'Buy 5 Get 1 Free',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&q=80&w=600',
    className: 'md:col-span-1 md:row-span-1'
  }
];

export default function FeaturedOffers() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              <Gift className="w-3 h-3" />
              Member Exclusives
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900">Featured Deals</h2>
          </div>
          <p className="text-zinc-500 max-w-sm">Hand-picked premium experiences at prices that will make you smile. Limited time only.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-[700px]">
          {primaryOffers.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-[2.5rem] group ${offer.className}`}
            >
              <img 
                src={offer.image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={offer.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-white/95 backdrop-blur-md text-zinc-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit">
                  {offer.category}
                </span>
                {offer.tag && (
                   <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit">
                     {offer.tag}
                   </span>
                )}
              </div>

              <div className="absolute inset-x-8 bottom-8">
                <h3 className={`font-display font-bold text-white mb-2 ${offer.className.includes('col-span-2') ? 'text-4xl' : 'text-2xl'}`}>
                  {offer.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium">{offer.discount}</span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-zinc-900 transition-all group-hover:rotate-45">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
