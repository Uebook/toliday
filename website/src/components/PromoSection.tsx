import { Sparkles, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'motion/react';

const offers = [
  {
    id: 1,
    title: 'Flash Sale: 40% Off!',
    description: 'Book your summer getaway now and save big on luxury resorts.',
    code: 'SUMMER40',
    bg: 'bg-indigo-600',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    title: 'Weekend in Bali',
    description: 'All-inclusive packages starting from $499 per person.',
    code: 'BALI2026',
    bg: 'bg-emerald-600',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    title: 'Free Cab Upgrade',
    description: 'Get a premium sedan for the price of an economy car.',
    code: 'LUXDRIVE',
    bg: 'bg-amber-600',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600'
  }
];

export default function PromoSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Special Offers</span>
            </div>
            <h2 className="text-4xl font-display font-bold text-zinc-900">Unbeatable Deals</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            View All Offers <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 h-96 shadow-2xl"
            >
              <img 
                src={offer.image} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                alt={offer.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold mb-4 w-fit">
                  <Tag className="w-3 h-3" />
                  Code: {offer.code}
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-3">{offer.title}</h3>
                <p className="text-zinc-300 text-sm mb-6 max-w-xs">{offer.description}</p>
                <button className="w-fit bg-white text-zinc-900 px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 hover:text-white transition-all transform active:scale-95 text-sm">
                  Claim Deal
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
