import { Smartphone, QrCode, Apple, Play } from 'lucide-react';
import { motion } from 'motion/react';
import mobileScreenshot from './mobile-screenshot.png';

export default function AppDownload() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-50 rounded-[3.5rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 border border-zinc-100">
          
          {/* Phone Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[320px] shrink-0"
          >
            <div className="relative z-10 border-[8px] border-zinc-900 rounded-xl overflow-hidden shadow-md aspect-[9/19.5] bg-white">
              <img 
                src={mobileScreenshot} 
                alt="TolidayTrip App Screenshot" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-40 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-40 -z-10" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 space-y-8">
            <div>
              <span className="text-blue-600 font-bold text-sm uppercase tracking-widest block mb-4">Try on Mobile</span>
              <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight">
                Download our app for <br className="hidden lg:block" /> 
                <span className="text-blue-600">unbeatable perks!</span>
              </h2>
            </div>
            
            <p className="text-zinc-500 text-lg max-w-xl">
              Get exclusive mobile-only deals, real-time trip updates, and 24/7 priority support. Scan the code to start your journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-10 pt-4">
              {/* QR Code Placeholder */}
              <div className="p-4 bg-white rounded-xl shadow-md border border-zinc-100">
                <div className="w-32 h-32 bg-zinc-900 rounded-xl flex items-center justify-center text-white p-2">
                   <QrCode className="w-full h-full" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] text-center font-bold text-zinc-400 mt-3 uppercase tracking-tighter">Scan to download</p>
              </div>

              <div className="flex flex-col gap-4 w-full sm:w-auto">
                {/* Store Buttons */}
                <a 
                  href="https://apps.apple.com/in/app/toliday-trip/id1598496330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-zinc-900 text-white px-6 py-4 rounded-2xl hover:bg-zinc-800 transition-all w-full sm:w-64 group shadow-md cursor-pointer"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                    <Apple className="w-6 h-6 fill-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-zinc-400 uppercase font-bold leading-none mb-1">Download on the</p>
                    <p className="text-xl font-bold leading-none">App Store</p>
                  </div>
                </a>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.tolidaytrip&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-zinc-900 text-white px-6 py-4 rounded-2xl hover:bg-zinc-800 transition-all w-full sm:w-64 group shadow-md cursor-pointer"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-zinc-400 uppercase font-bold leading-none mb-1">Get it on</p>
                    <p className="text-xl font-bold leading-none">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
