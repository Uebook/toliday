import { Hotel, Plane, Car, Bus, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const serviceBanners = [
  {
    id: 'hotels',
    title: 'Premium Stays',
    desc: 'From boutique to grand luxury',
    icon: Hotel,
    color: 'bg-indigo-600',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'holidays',
    title: 'Curated Trips',
    desc: 'Hand-picked holiday experiences',
    icon: Plane,
    color: 'bg-emerald-600',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cabs',
    title: 'Smart Cabs',
    desc: 'Reliable city & outstation travel',
    icon: Car,
    color: 'bg-amber-600',
    image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bus',
    title: 'Coach Travels',
    desc: 'Comfortable long-distance buses',
    icon: Bus,
    color: 'bg-rose-600',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
  }
];

export default function ServiceShowcase() {
  return (
    <section className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-zinc-900 mb-4">Travel Simplified</h2>
          <p className="text-zinc-500 max-w-xl mx-auto italic">Four services, one standard of excellence. Explore our dedicated booking vertical.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceBanners.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[450px] rounded-[3rem] overflow-hidden bg-zinc-900"
            >
              <img 
                src={service.image} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 gray-scale grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
                alt={service.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center mb-6 text-white transform group-hover:-translate-y-2 transition-transform`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{service.title}</h3>
                <p className="text-zinc-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all">
                  Book Now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
