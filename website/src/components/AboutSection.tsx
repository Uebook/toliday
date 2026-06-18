import { motion } from 'motion/react';

// App Home Screen Component
function AppHomeScreen() {
  return (
    <div className="w-full h-full bg-[#f8fafc] text-zinc-800 flex flex-col font-sans select-none text-[11px] overflow-hidden relative">
      {/* Top Status Bar */}
      <div className="bg-[#2d4272] text-white/80 px-4 pt-4 pb-1 flex justify-between items-center text-[9px] font-bold">
        <span>12:50</span>
        <div className="flex items-center gap-1.5">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* App Header */}
      <div className="bg-[#2d4272] text-white px-3.5 py-3 flex justify-between items-center shadow-md">
        <div className="flex flex-col text-left">
          <span className="font-black tracking-wider text-xs leading-none">TOLIDAYTRIP</span>
          <span className="text-[6px] text-indigo-200 font-bold mt-0.5">Your World Travel Partner</span>
        </div>
        <div className="flex flex-col gap-1 justify-center items-end w-4 h-3 cursor-pointer">
          <span className="w-3.5 h-0.5 bg-white rounded-full"></span>
          <span className="w-3.5 h-0.5 bg-white rounded-full"></span>
          <span className="w-3.5 h-0.5 bg-white rounded-full"></span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3.5 py-4 space-y-4 pb-14 text-left">
        <h4 className="font-extrabold text-[11px] text-zinc-900 leading-tight">Explore the beautiful world!</h4>

        {/* Categories Grid */}
        <div className="grid grid-cols-5 gap-1.5">
          {[
            { label: 'FLIGHTS', bg: 'bg-blue-50 text-blue-600', icon: '✈️' },
            { label: 'HOTELS', bg: 'bg-emerald-50 text-emerald-600', icon: '🏢' },
            { label: 'BUS', bg: 'bg-amber-50 text-amber-600', icon: '🚌' },
            { label: 'Visa', bg: 'bg-indigo-50 text-indigo-600', icon: '💳' },
            { label: 'More', bg: 'bg-zinc-150 text-zinc-700', icon: '➕' },
          ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition-transform">
              <div className={`w-8 h-8 rounded-xl ${cat.bg} flex items-center justify-center text-sm shadow-xs font-bold`}>
                {cat.icon}
              </div>
              <span className="text-[7.5px] font-extrabold text-zinc-600 tracking-tight">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Kashmir Banner */}
        <div className="relative h-20 rounded-2xl overflow-hidden bg-zinc-800 text-white shadow-sm flex items-center p-3">
          <img 
            src="https://images.unsplash.com/photo-1596895567226-622e29b40080?auto=format&fit=crop&q=80&w=300"
            alt="Kashmir"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10 space-y-0.5">
            <span className="text-[7px] font-black uppercase bg-orange-600 px-2 py-0.5 rounded text-white tracking-widest">KASHMIR</span>
            <p className="text-[10px] font-black">4 Nights / 5 Days</p>
            <p className="text-[6.5px] text-zinc-200 font-medium">Package Start from Rs 11,499</p>
            <button className="bg-amber-400 text-zinc-950 font-black text-[7px] px-2.5 py-1 rounded-lg shadow-xs mt-1.5">BOOK NOW</button>
          </div>
        </div>

        {/* Special Offers Section */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 font-extrabold text-zinc-900 text-[10px]">
            <span>🏷️</span>
            <span>Special offers</span>
          </div>

          {/* Offer Tabs */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {['Top Offers', 'Flight', 'Hotel', 'Bus'].map((tab, i) => (
              <span key={i} className={`px-3 py-1 rounded-full border text-[8px] font-black whitespace-nowrap ${i === 0 ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs' : 'border-zinc-200 text-zinc-500 bg-white hover:bg-zinc-50'}`}>
                {tab}
              </span>
            ))}
          </div>

          {/* Offer Card */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-3 shadow-xs space-y-2 relative overflow-hidden">
            <div className="text-center space-y-0.5">
              <p className="text-[8px] font-bold text-zinc-400">Coupon Code</p>
              <p className="text-xs font-black text-indigo-650 tracking-wider">TTFDOM</p>
            </div>
            
            {/* Plane Graphic */}
            <div className="h-6 flex items-center justify-center text-xl text-indigo-500 opacity-80">
              ✈️
            </div>

            <div className="flex justify-between items-center pt-1.5 border-t border-zinc-50">
              <span className="bg-blue-50 text-blue-600 font-bold text-[7.5px] px-2 py-0.5 rounded-md">Flight Offer</span>
              <span className="text-[8px] font-bold text-zinc-400">Get 10% off</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action */}
      <div className="absolute right-3.5 bottom-16 w-8 h-8 rounded-full bg-emerald-500 shadow-lg flex items-center justify-center text-white text-base cursor-pointer hover:scale-105 active:scale-95 transition-transform z-35 font-bold">
        💬
      </div>

      {/* Footer Navigation Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-zinc-100 py-1.5 flex justify-around items-center z-30 text-[8px] font-black text-zinc-400">
        <div className="flex flex-col items-center text-indigo-600 gap-0.5">
          <span className="text-xs leading-none">🏠</span>
          <span>Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs leading-none">📅</span>
          <span>My Booking</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs leading-none">👤</span>
          <span>My Account</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs leading-none">👛</span>
          <span>Wallet</span>
        </div>
      </div>
    </div>
  );
}

// App Packages Screen Component
function AppPackagesScreen() {
  return (
    <div className="w-full h-full bg-[#f8fafc] text-zinc-800 flex flex-col font-sans select-none text-[11px] overflow-hidden relative">
      {/* Top Status Bar */}
      <div className="bg-[#2d4272] text-white/80 px-4 pt-4 pb-1 flex justify-between items-center text-[9px] font-bold">
        <span>12:54</span>
        <div className="flex items-center gap-1.5">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* App Header */}
      <div className="bg-[#2d4272] text-white px-3.5 py-3 flex justify-between items-center shadow-md">
        <div className="flex flex-col text-left">
          <span className="font-black tracking-wider text-xs leading-none">TOLIDAYTRIP</span>
          <span className="text-[6px] text-indigo-200 font-bold mt-0.5">Your World Travel Partner</span>
        </div>
        <div className="flex flex-col gap-1 justify-center items-end w-4 h-3 cursor-pointer">
          <span className="w-3.5 h-0.5 bg-white rounded-full"></span>
          <span className="w-3.5 h-0.5 bg-white rounded-full"></span>
          <span className="w-3.5 h-0.5 bg-white rounded-full"></span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3.5 py-4 space-y-4 pb-14 text-left">
        {/* Corporate Travel Banner */}
        <div className="bg-gradient-to-r from-sky-700 to-indigo-900 rounded-2xl p-3 text-white shadow-sm flex justify-between items-center">
          <div className="space-y-0.5">
            <h5 className="font-extrabold text-[9.5px]">Corporate Travel</h5>
            <p className="text-[7px] text-sky-200 font-medium">Streamline Business Travel</p>
          </div>
          <span className="text-xl">✈️</span>
        </div>

        {/* ICICI Bank Offer Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-rose-600 rounded-2xl p-3 text-white shadow-sm space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-black text-[9px] tracking-wide">ICICI Bank Offers</span>
            <span className="text-[6px] uppercase font-black bg-white/20 px-1.5 py-0.5 rounded">Tag</span>
          </div>
          <p className="font-extrabold text-[10px] leading-tight">UP TO 20% OFF on Tour Package</p>
        </div>

        {/* Best Holidays Packages Section */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 font-extrabold text-zinc-900 text-[10px]">
            <span>🏖️</span>
            <span>Best Holidays Packages</span>
          </div>

          {/* Package Card */}
          <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-xs flex flex-col">
            <div className="relative h-24">
              <img 
                src="https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&q=80&w=300" 
                alt="Ladakh" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2.5 left-2.5 bg-indigo-650 text-white font-extrabold text-[7.5px] px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                Ladakh
              </span>
            </div>
            <div className="p-3 text-left space-y-1.5">
              <h5 className="font-extrabold text-zinc-950 text-[10px] leading-tight">Scenic Ladakh Tour Package</h5>
              <div className="flex justify-between items-center text-[8px] font-bold pt-0.5">
                <span className="text-zinc-500 font-medium">4 Days 3 Nights</span>
                <span className="text-orange-600 font-extrabold">₹ 23,999 <span className="text-zinc-400 font-medium text-[6px]">per person</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action */}
      <div className="absolute right-3.5 bottom-16 w-8 h-8 rounded-full bg-emerald-500 shadow-lg flex items-center justify-center text-white text-base cursor-pointer hover:scale-105 active:scale-95 transition-transform z-35 font-bold">
        💬
      </div>

      {/* Footer Navigation Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-zinc-100 py-1.5 flex justify-around items-center z-30 text-[8px] font-black text-zinc-400">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs leading-none">🏠</span>
          <span>Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs leading-none">📅</span>
          <span>My Booking</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs leading-none">👤</span>
          <span>My Account</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs leading-none">👛</span>
          <span>Wallet</span>
        </div>
      </div>
    </div>
  );
}

// App Wallet Screen Component
function AppWalletScreen() {
  return (
    <div className="w-full h-full bg-[#f8fafc] text-zinc-800 flex flex-col font-sans select-none text-[10px] overflow-hidden relative">
      {/* Top Status Bar */}
      <div className="bg-[#2d4272] text-white/80 px-4 pt-4 pb-1 flex justify-between items-center text-[9px] font-bold">
        <span>12:54</span>
        <div className="flex items-center gap-1.5">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* App Header with Back Button */}
      <div className="bg-[#2d4272] text-white px-3.5 py-3 flex items-center gap-2 shadow-md">
        <span className="text-xs cursor-pointer leading-none">⬅️</span>
        <span className="font-extrabold text-xs">Wallet</span>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3.5 py-4 space-y-4 pb-14 text-left">
        {/* Wallet Balance Card */}
        <div className="bg-white border border-zinc-100 rounded-2xl p-3 shadow-xs flex justify-between items-center text-left">
          <div className="space-y-0.5">
            <p className="text-[7px] text-zinc-400 font-bold uppercase tracking-wider">Add money to</p>
            <h5 className="font-extrabold text-zinc-900 text-[10.5px]">TolidayTrip Wallet</h5>
            <p className="text-[8.5px] font-extrabold text-indigo-600 mt-1">Available Balance: Rs 0</p>
          </div>
          <span className="text-xl">👛</span>
        </div>

        {/* Add Money Section */}
        <div className="space-y-3 text-left">
          <h5 className="font-black text-zinc-900 text-[8px] tracking-widest uppercase">ADD MONEY TO YOUR WALLET</h5>
          
          <input 
            type="text" 
            placeholder="ENTER AMOUNT" 
            className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-[9px] outline-none font-bold"
            disabled
          />

          {/* Quick Amount Pills */}
          <div className="grid grid-cols-3 gap-2">
            {['Rs 100', 'Rs 500', 'Rs 1000'].map((amt, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-lg py-1.5 text-center font-black text-zinc-600 text-[8.5px] cursor-pointer hover:bg-zinc-50 shadow-2xs transition-colors">
                {amt}
              </div>
            ))}
          </div>

          <input 
            type="text" 
            placeholder="Remarks" 
            className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-[9px] outline-none font-bold"
            disabled
          />

          {/* Gateways */}
          <div className="flex gap-4 pt-1 text-[8.5px] font-bold text-zinc-700">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" checked readOnly className="accent-indigo-650" />
              <span>CCAvenue</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer opacity-70">
              <input type="radio" disabled className="accent-indigo-650" />
              <span>HDFC</span>
            </label>
          </div>

          {/* Payment Options Grid */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[
              { label: 'Credit', active: false },
              { label: 'Debit', active: false },
              { label: 'Net Banking', active: true },
              { label: 'UPI', active: false },
              { label: 'Rupay', active: false },
              { label: 'Paytm', active: false }
            ].map((opt, i) => (
              <div key={i} className={`rounded-xl py-2 text-center font-extrabold text-[8.5px] border ${opt.active ? 'bg-amber-50 border-amber-300 text-amber-900 font-black shadow-2xs' : 'bg-white border-zinc-200 text-zinc-500'}`}>
                {opt.label}
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button className="w-full bg-[#2d4272] text-white py-2.5 rounded-xl text-[9px] font-black uppercase shadow-md mt-2 hover:bg-[#223359] transition-colors">
            Proceed to add money
          </button>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-zinc-100 py-1.5 flex justify-around items-center z-30 text-[8px] font-black text-zinc-400">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs leading-none">🏠</span>
          <span>Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs leading-none">📅</span>
          <span>My Booking</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs leading-none">👤</span>
          <span>My Account</span>
        </div>
        <div className="flex flex-col items-center text-indigo-600 gap-0.5">
          <span className="text-xs leading-none">👛</span>
          <span>Wallet</span>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Premium Overlapping Vector Screens */}
          <div className="lg:col-span-6 relative flex justify-center items-center min-h-[500px]">
            {/* Background Glows */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-60" />
            
            {/* Phone Mockup (Center Main - Home Screen) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-[260px] h-[530px] rounded-[3rem] border-[8px] border-zinc-900 bg-zinc-900 shadow-2xl z-25 overflow-hidden group hover:scale-[1.02] transition-transform duration-500 flex flex-col"
            >
              {/* Speaker & Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-40 flex items-center justify-center">
                <div className="w-12 h-1 bg-zinc-800 rounded-full mb-1" />
              </div>

              {/* Glossy glare overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-35" />
              <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-white/10 to-transparent -skew-y-12 origin-top-left pointer-events-none z-35" />
              
              {/* Vector Rendered Screen */}
              <AppHomeScreen />
            </motion.div>

            {/* Left Overlapping Floating Screen (Packages Screen) */}
            <motion.div 
              initial={{ opacity: 0, x: -30, rotate: -6 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative absolute left-4 sm:left-12 md:left-16 lg:left-4 w-[160px] sm:w-[180px] aspect-[9/19.5] rounded-[2rem] border-[4px] border-zinc-900/90 bg-zinc-900 shadow-2xl z-10 overflow-hidden hidden sm:block hover:rotate-0 transition-transform duration-500 cursor-pointer flex flex-col"
            >
              {/* Glossy glare overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-35" />
              <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-white/10 to-transparent -skew-y-12 origin-top-left pointer-events-none z-35" />

              {/* Vector Rendered Screen */}
              <AppPackagesScreen />
            </motion.div>

            {/* Right Overlapping Floating Screen (Wallet Screen) */}
            <motion.div 
              initial={{ opacity: 0, x: 30, rotate: 6 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative absolute right-4 sm:right-12 md:right-16 lg:right-4 w-[160px] sm:w-[180px] aspect-[9/19.5] rounded-[2rem] border-[4px] border-zinc-900/90 bg-zinc-900 shadow-2xl z-20 overflow-hidden hidden sm:block hover:rotate-0 transition-transform duration-500 cursor-pointer flex flex-col"
            >
              {/* Glossy glare overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-35" />
              <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-white/10 to-transparent -skew-y-12 origin-top-left pointer-events-none z-35" />

              {/* Vector Rendered Screen */}
              <AppWalletScreen />
            </motion.div>
          </div>

          {/* Right Side: About Information */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="text-indigo-600 font-bold text-xs tracking-[0.2em] uppercase">About TolidayTrip</div>
            
            <h2 className="text-4xl md:text-5xl font-display font-medium text-zinc-900 leading-[1.1] tracking-tight">
              Your World. <br /> <span className="text-indigo-600 italic font-bold">Travel Solutions.</span>
            </h2>
            
            <p className="text-zinc-600 leading-relaxed text-lg">
              Incorporated in 2020, TolidayTrip is one of India's fastest-growing online travel portals. We've redesigned travel planning to bring flights, over 800,000 global hotels, inter-city cabs, bus bookings, and visa services directly into a single, beautifully simple application.
            </p>
            
            <ul className="space-y-4 pt-4">
              {[
                { title: 'Global Network', desc: 'Book from 800,000+ luxury hotels and verified stays worldwide' },
                { title: 'Holiday Packages', desc: 'Curated domestic and international tour plans for every budget' },
                { title: 'Ancillary Services', desc: 'Seamless integration of visa assistance, insurance, and rentals' },
                { title: '24/7 Dedicated Care', desc: 'Round-the-clock support desk (care@toliday.in) for worry-free bookings' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start group">
                  <div className="mt-1 w-2.5 h-2.5 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform shrink-0" />
                  <div>
                    <span className="text-zinc-900 font-bold text-base block leading-snug">{item.title}</span>
                    <span className="text-zinc-600 text-sm">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
