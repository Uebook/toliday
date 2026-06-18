import { Star, MapPin, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const destinations = [
  { id: 1, name: 'Santorini', country: 'Greece', rating: 4.9, price: 299, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Kyoto', country: 'Japan', rating: 4.8, price: 180, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Tulum', country: 'Mexico', rating: 4.7, price: 150, image: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'Swiss Alps', country: 'Switzerland', rating: 5.0, price: 450, image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=600' },
];

export default function Destinations() {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest mb-3">
              <TrendingUp className="w-4 h-4" />
              <span>Explore More</span>
            </div>
            <h2 className="text-4xl font-display font-bold text-zinc-900">Popular Destinations</h2>
          </div>
          <div className="flex gap-4">
               <button className="px-6 py-2 rounded-full border border-zinc-200 bg-white text-sm font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all">Trending</button>
               <button className="px-6 py-2 rounded-full border border-zinc-200 bg-white text-sm font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all">Beach</button>
               <button className="px-6 py-2 rounded-full border border-zinc-200 bg-white text-sm font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all">Adventure</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-4 shadow-sm border border-zinc-100 group"
            >
              <div className="relative h-64 overflow-hidden rounded-[1.5rem] mb-4">
                <img 
                    src={dest.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-zinc-900">{dest.rating}</span>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-1 text-zinc-400 text-xs font-medium mb-1">
                  <MapPin className="w-3 h-3" />
                  {dest.country}
                </div>
                <h3 className="text-xl font-bold font-display text-zinc-900 mb-4">{dest.name}</h3>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                  <div>
                    <span className="text-zinc-400 text-xs block">Starts from</span>
                    <span className="text-lg font-bold text-indigo-600">${dest.price}</span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                    <TrendingUp className="w-5 h-5" />
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
