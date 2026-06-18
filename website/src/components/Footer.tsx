import { Plane, Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'hotels' | 'holidays' | 'cab' | 'bus' | 'about-us' | 'refund-policy' | 'blogs' | 'privacy-policy') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-zinc-900 text-white py-24 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-8">
              <img 
                src="https://toliday.in/images/logo.png" 
                alt="TolidayTrip" 
                className="h-14 object-contain brightness-0 invert" 
              />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-xs">
              Exceptional travel experiences curated just for you. Book hotels, packages, and more.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
             <h4 className="font-bold mb-8 text-indigo-400 uppercase tracking-widest text-xs">Services</h4>
             <ul className="space-y-4 text-zinc-400 text-sm">
                <li><button onClick={() => onNavigate('hotels')} className="hover:text-white transition-colors flex items-center gap-1 group bg-transparent border-none p-0 cursor-pointer">Hotel Booking <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
                <li><button onClick={() => onNavigate('holidays')} className="hover:text-white transition-colors flex items-center gap-1 group bg-transparent border-none p-0 cursor-pointer">Holiday Packages <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
                <li><button onClick={() => onNavigate('cab')} className="hover:text-white transition-colors flex items-center gap-1 group bg-transparent border-none p-0 cursor-pointer">Cab Services <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
                <li><button onClick={() => onNavigate('bus')} className="hover:text-white transition-colors flex items-center gap-1 group bg-transparent border-none p-0 cursor-pointer">Bus Booking <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold mb-8 text-indigo-400 uppercase tracking-widest text-xs">Company</h4>
             <ul className="space-y-4 text-zinc-400 text-sm text-left">
                <li><button onClick={() => onNavigate('about-us')} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">About Us</button></li>
                <li><button onClick={() => onNavigate('refund-policy')} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">Refund Policy</button></li>
                <li><button onClick={() => onNavigate('blogs')} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">Blogs</button></li>
                <li><button onClick={() => onNavigate('privacy-policy')} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">Privacy Policy</button></li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold mb-8 text-indigo-400 uppercase tracking-widest text-xs">Newsletter</h4>
             <p className="text-zinc-400 text-sm mb-6">Stay updated with our latest deals and travel guides.</p>
             <div className="relative">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-zinc-800 border-none rounded-xl py-4 pl-6 pr-12 text-sm focus:ring-2 focus:ring-indigo-600 outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                </button>
             </div>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 text-xs font-medium">
          <p>© 2026 TolidayTrip Travel Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
