import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Clock, Compass } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Safe & Secured Stay',
    description: 'Every booking is protected by the Toliday Safety Shield, ensuring verify-checked properties and 100% refund protection.',
    color: 'from-blue-500 to-indigo-600',
    iconColor: 'text-indigo-600'
  },
  {
    icon: Sparkles,
    title: 'Best Price Promise',
    description: 'Get unmatched rates on premium hotels and curated packages. Find it cheaper? We will match the price and credit the difference.',
    color: 'from-amber-400 to-orange-500',
    iconColor: 'text-orange-500'
  },
  {
    icon: Clock,
    title: '24/7 Expert Help',
    description: 'Real humans, real travel experts. Get instant support for booking changes, emergency cancellations, or local recommendations.',
    color: 'from-emerald-400 to-teal-600',
    iconColor: 'text-emerald-600'
  },
  {
    icon: Compass,
    title: 'Curated Experiences',
    description: 'Handpicked hotels and local guides. We travel-test every itinerary to guarantee premium comfort and authentic adventures.',
    color: 'from-rose-400 to-pink-600',
    iconColor: 'text-rose-600'
  }
];

export default function TrustSection() {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-zinc-50/50 to-white">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-50/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            The Toliday Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-zinc-900 tracking-tight mb-6 leading-tight"
          >
            Redefining the Way You Explore the World
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-500 font-semibold leading-relaxed"
          >
            We combine premium curation, round-the-clock support, and absolute payment safety to bring you seamless journeys from departure to return.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="relative bg-white rounded-[2rem] p-8 border border-zinc-100/80 hover:border-zinc-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col items-start text-left cursor-pointer"
              >
                {/* Icon Container with beautiful gradient background glow on hover */}
                <div className="relative mb-8 w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <Icon className={`w-7 h-7 ${feat.iconColor} transition-transform duration-300 group-hover:rotate-6`} />
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-3 transition-colors group-hover:text-indigo-600">
                  {feat.title}
                </h3>
                <p className="text-zinc-500 font-semibold text-sm leading-relaxed flex-grow">
                  {feat.description}
                </p>

                {/* Bottom line indicator */}
                <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${feat.color} mt-8 transition-all duration-300 group-hover:w-full`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
