import { Home, Hotel, Car, Bus, User, Menu, X, Building, ChevronDown, Clock, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  forceSolid?: boolean;
  user: any;
  currentView: string;
  onNavigate: (view: 'home' | 'hotels' | 'auth' | 'profile' | 'bus' | 'cab' | 'holidays' | 'contact-us' | 'flights' | 'flight-list' | 'flight-addons') => void;
}

function ComingSoonModal({ feature, onClose }: { feature: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative bg-white rounded-[2rem] p-10 shadow-2xl border border-zinc-100 max-w-sm w-full text-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />

          {/* Icon */}
          <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-orange/20 to-orange-100 flex items-center justify-center border border-brand-orange/20 shadow-lg shadow-brand-orange/10">
            <Sparkles className="w-9 h-9 text-brand-orange" />
          </div>

          {/* Badge */}
          <div className="relative z-10 inline-flex items-center gap-1.5 bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-brand-orange/20">
            <Clock className="w-3 h-3" />
            Coming Soon
          </div>

          <h2 className="relative z-10 text-2xl font-display font-extrabold text-zinc-900 mb-3">{feature}</h2>
          <p className="relative z-10 text-zinc-500 text-sm leading-relaxed mb-8">
            We're working hard to bring you <span className="font-bold text-zinc-700">{feature}</span>. This feature will be available soon. Stay tuned!
          </p>

          {/* Actions */}
          <div className="relative z-10 flex flex-col gap-3">
            <button
              onClick={onClose}
              className="w-full bg-brand-orange text-white py-3.5 rounded-2xl font-bold hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-brand-orange/30"
            >
              Got it!
            </button>
            <button
              onClick={onClose}
              className="w-full text-zinc-400 text-xs font-bold hover:text-zinc-600 transition-colors py-1"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Navbar({ forceSolid = false, user, onNavigate, currentView }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomeActive = currentView === 'home';
  const isHotelsActive = currentView.startsWith('hotel');
  const isFlightsActive = currentView.startsWith('flight');
  const isHolidaysActive = currentView.startsWith('holiday');
  const isCabsActive = currentView.startsWith('cab');
  const isBusesActive = currentView.startsWith('bus');
  
  const isTransparent = isHomeActive && !isScrolled && !forceSolid;

  const extranetUrl = 'https://extranet-portal.vercel.app/';

  const navLinks = [
    { label: 'Home', action: () => onNavigate('home'), active: isHomeActive },
    { label: 'Hotels', action: () => onNavigate('hotels'), active: isHotelsActive },
    // { label: 'Flights', action: () => onNavigate('flights'), active: isFlightsActive }, // Hidden for now
    { label: 'Bus', action: () => onNavigate('bus'), active: isBusesActive },
    { label: 'Cab', action: () => onNavigate('cab'), active: isCabsActive },
    { label: 'Holiday', action: () => onNavigate('holidays'), active: isHolidaysActive },
    { label: 'Web Check-In', action: () => setComingSoonFeature('Web Check-In'), active: false, comingSoon: true },
    { label: 'Visa', action: () => setComingSoonFeature('Visa Services'), active: false, comingSoon: true },
  ];

  return (
    <>
      {/* Coming Soon Modal */}
      {comingSoonFeature && (
        <ComingSoonModal
          feature={comingSoonFeature}
          onClose={() => setComingSoonFeature(null)}
        />
      )}

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-white border-b border-zinc-100 shadow-sm'}`}>
        {/* Upper sub-bar (Desktop only) */}
        <div className={`hidden md:block py-1.5 px-6 border-b transition-colors ${isTransparent ? 'bg-black/10 border-white/10 text-white/80' : 'bg-zinc-50 border-zinc-200/50 text-zinc-600'}`}>
          <div className="max-w-7xl mx-auto flex justify-end items-center gap-6 text-[11px] font-medium text-inherit">
            <button className={`flex items-center gap-1 transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-brand-orange'}`}>
              Customer Support <ChevronDown className="w-3 h-3" />
            </button>
            <button className={`flex items-center gap-1 transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-brand-orange'}`}>
              Partner <ChevronDown className="w-3 h-3" />
            </button>
            <button className={`flex items-center gap-1 transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-brand-orange'}`}>
              Corporate <ChevronDown className="w-3 h-3" />
            </button>
            <button className={`flex items-center gap-1 transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-brand-orange'}`}>
              Franchise <ChevronDown className="w-3 h-3" />
            </button>
            <button className={`flex items-center gap-1 transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-brand-orange'}`}>
              Customer Account <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Main navigation row */}
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer group"
          >
            <img
              src="https://toliday.in/images/logo.png"
              alt="TolidayTrip"
              className={`h-10 md:h-12 object-contain group-hover:scale-105 transition-transform ${isTransparent ? 'brightness-0 invert' : ''}`}
            />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className={`relative text-sm font-bold transition-colors group ${
                  link.active 
                    ? (isTransparent ? 'text-white' : 'text-brand-orange') 
                    : (isTransparent ? 'text-white/80 hover:text-white' : 'text-zinc-700 hover:text-brand-orange')
                }`}
              >
                {link.label}
                {link.comingSoon && (
                  <span className={`absolute -top-2 -right-5 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full leading-none uppercase tracking-wide opacity-90 shadow-sm ${
                    isTransparent ? 'bg-white text-brand-orange' : 'bg-brand-orange text-white'
                  }`}>
                    New
                  </span>
                )}
                {link.active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                      isTransparent ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-brand-orange'
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={extranetUrl}
              className={`text-xs font-extrabold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 border ${
                isTransparent 
                  ? 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-brand-orange/10 hover:text-brand-orange border-zinc-200'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>List your place</span>
            </a>
            <button
              onClick={() => onNavigate(user ? 'profile' : 'auth')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md ${
                isTransparent 
                  ? 'bg-white text-brand-orange hover:bg-zinc-50 shadow-black/10'
                  : 'bg-brand-orange text-white hover:bg-orange-600 shadow-brand-orange/30'
              }`}
            >
              {user ? (
                <>
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20">
                    <img src={user.avatar} className="w-full h-full object-cover" />
                  </div>
                  <span>Profile</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isTransparent ? 'text-white hover:bg-white/20' : 'text-brand-orange hover:bg-zinc-50'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-t border-zinc-100 shadow-xl p-6 md:hidden flex flex-col gap-3"
            >
              {[
                { label: 'Home', icon: <Home className="w-5 h-5" />, action: () => { onNavigate('home'); setIsMobileMenuOpen(false); }, active: isHomeActive },
                { label: 'Hotels', icon: <Hotel className="w-5 h-5" />, action: () => { onNavigate('hotels'); setIsMobileMenuOpen(false); }, active: isHotelsActive },
                // { label: 'Flights', icon: <span className="text-lg">✈️</span>, action: () => { onNavigate('flights'); setIsMobileMenuOpen(false); }, active: isFlightsActive }, // Hidden for now
                { label: 'Bus', icon: <Bus className="w-5 h-5" />, action: () => { onNavigate('bus'); setIsMobileMenuOpen(false); }, active: isBusesActive },
                { label: 'Cab', icon: <Car className="w-5 h-5" />, action: () => { onNavigate('cab'); setIsMobileMenuOpen(false); }, active: isCabsActive },
                { label: 'Holiday', icon: <span className="text-lg">🌴</span>, action: () => { onNavigate('holidays'); setIsMobileMenuOpen(false); }, active: isHolidaysActive },
                { label: 'Web Check-In', icon: <span className="text-lg">✈️</span>, action: () => { setComingSoonFeature('Web Check-In'); setIsMobileMenuOpen(false); }, active: false },
                { label: 'Visa', icon: <span className="text-lg">🪪</span>, action: () => { setComingSoonFeature('Visa Services'); setIsMobileMenuOpen(false); }, active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${
                    item.active ? 'bg-brand-orange/10 text-brand-orange font-bold' : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <span className={item.active ? 'text-brand-orange' : 'text-zinc-400'}>{item.icon}</span>
                  {item.label}
                </button>
              ))}

              <hr className="border-zinc-100 my-1" />

              <a
                href={extranetUrl}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 text-zinc-700 font-medium"
              >
                <Building className="w-5 h-5 text-zinc-400" />
                List your place
              </a>

              <button
                onClick={() => { onNavigate(user ? 'profile' : 'auth'); setIsMobileMenuOpen(false); }}
                className="w-full bg-brand-orange text-white p-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-md shadow-brand-orange/30"
              >
                {user ? 'My Profile' : 'Sign In'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
