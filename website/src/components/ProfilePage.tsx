import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, Bell, Shield, Heart, ShoppingBag, LogOut, ChevronRight, MapPin, Calendar, Star, ExternalLink, CreditCard, Clock, Loader2 } from 'lucide-react';
import { fetchBookingsByEmail } from '../lib/api';

interface ProfilePageProps {
  user: any;
  onLogout: () => void;
  onBack: () => void;
}

const mockBookings = [
  {
    id: 'BK-92837401',
    hotel: 'The Grand Heritage Resort',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400',
    location: 'Colaba, Mumbai',
    checkIn: 'May 24, 2026',
    checkOut: 'May 26, 2026',
    status: 'Upcoming',
    price: 28600,
    type: 'Classic King Room'
  },
  {
    id: 'BK-88271042',
    hotel: 'Seaside Pavilion & Spa',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400',
    location: 'Baga, Goa',
    checkIn: 'Jan 12, 2024',
    checkOut: 'Jan 15, 2024',
    status: 'Completed',
    price: 24500,
    type: 'Ocean View Suite'
  }
];

export default function ProfilePage({ user, onLogout, onBack }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'settings'>('profile');
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  useEffect(() => {
    if (activeTab === 'history' && user?.email) {
      setIsLoadingBookings(true);
      fetchBookingsByEmail(user.email)
        .then(data => setBookings(data))
        .catch(console.error)
        .finally(() => setIsLoadingBookings(false));
    }
  }, [activeTab, user?.email]);

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'history', label: 'Booking History', icon: ShoppingBag },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              {/* User Card */}
              <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-zinc-100 text-center overflow-hidden relative">
                <div className="absolute top-0 inset-x-0 h-24 bg-indigo-600/5 -z-0" />
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-[2rem] overflow-hidden mx-auto mb-6 shadow-xl ring-4 ring-white border border-zinc-100">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-zinc-900 mb-1">{user.name}</h2>
                  <p className="text-zinc-500 text-sm mb-6">{user.email}</p>
                  <div className="flex justify-center gap-3">
                    <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest">Verified Traveler</div>
                    <div className="bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest">Pro Member</div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-white rounded-[3rem] p-6 shadow-sm border border-zinc-100">
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                        activeTab === tab.id 
                          ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-100 scale-[1.02]' 
                          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <tab.icon className="w-5 h-5" />
                        <span className="font-bold text-sm">{tab.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === tab.id ? 'translate-x-1' : 'opacity-0'}`} />
                    </button>
                  ))}
                  <div className="pt-4 mt-4 border-t border-zinc-50">
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl text-rose-600 hover:bg-rose-50 transition-all font-bold text-sm"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-zinc-100">
                    <h3 className="text-2xl font-display font-bold text-zinc-900 mb-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      Profile Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2 group">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1 group-focus-within:text-indigo-600 transition-colors">First Name</label>
                        <input type="text" defaultValue={user.name.split(' ')[0]} className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all" />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1 group-focus-within:text-indigo-600 transition-colors">Last Name</label>
                        <input type="text" defaultValue={user.name.split(' ')[1] || ''} className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all" />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1 group-focus-within:text-indigo-600 transition-colors">Email Address</label>
                        <input type="email" defaultValue={user.email} className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all" />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1 group-focus-within:text-indigo-600 transition-colors">Phone Number</label>
                        <input type="tel" defaultValue="+91 98765 43210" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all" />
                      </div>
                    </div>
                    <div className="mt-10 flex justify-end">
                      <button className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-zinc-100">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-zinc-100">
                      <h4 className="font-bold text-zinc-900 mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        Account Security
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl">
                          <div>
                            <p className="text-sm font-bold text-zinc-900">2FA Security</p>
                            <p className="text-xs text-zinc-500">Currently disabled</p>
                          </div>
                          <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Enable</button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl">
                          <div>
                            <p className="text-sm font-bold text-zinc-900">Password</p>
                            <p className="text-xs text-zinc-500">Last changed 3mo ago</p>
                          </div>
                          <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Change</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-zinc-100">
                      <h4 className="font-bold text-zinc-900 mb-6 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-amber-500" />
                        Email Notifications
                      </h4>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl cursor-pointer">
                          <span className="text-sm font-bold text-zinc-900">Booking Updates</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded-lg border-zinc-200 text-indigo-600 focus:ring-indigo-500" />
                        </label>
                        <label className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl cursor-pointer">
                          <span className="text-sm font-bold text-zinc-900">New Deals</span>
                          <input type="checkbox" className="w-5 h-5 rounded-lg border-zinc-200 text-indigo-600 focus:ring-indigo-500" />
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-display font-bold text-zinc-900">Booking History</h3>
                    <div className="flex gap-2">
                      <button className="px-5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold">All</button>
                      <button className="px-5 py-2 bg-white border border-zinc-100 text-zinc-500 rounded-xl text-xs font-bold hover:bg-zinc-50">Upcoming</button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {isLoadingBookings ? (
                      <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-600" />
                        <p>Loading your bookings...</p>
                      </div>
                    ) : bookings.length === 0 ? (
                      <div className="text-center py-20 text-zinc-500 bg-white rounded-[2.5rem] border border-zinc-100">
                        <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
                        <p className="font-bold text-lg mb-2">No bookings yet</p>
                        <p className="text-sm">You haven't made any bookings yet.</p>
                      </div>
                    ) : bookings.map((booking) => {
                      const isUpcoming = new Date(booking.startDate) > new Date();
                      return (
                      <div key={booking.id} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-zinc-100 group hover:border-indigo-100 transition-all">
                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="w-full md:w-48 h-48 rounded-[2rem] overflow-hidden bg-zinc-100 shrink-0">
                            <img src={booking.hotel?.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400'} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={booking.hotel?.name || 'Hotel'} />
                          </div>
                          
                          <div className="flex-1 flex flex-col justify-between py-2">
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-xl font-display font-bold text-zinc-900">{booking.hotel?.name || 'Hotel'}</h4>
                                    <ExternalLink className="w-4 h-4 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                  <p className="text-zinc-500 text-sm flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {booking.hotel?.city || 'Location'}
                                  </p>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                  isUpcoming ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                  {booking.status}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                                <div>
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" />
                                    Duration
                                  </p>
                                  <p className="text-xs font-bold text-zinc-900 line-clamp-1">{booking.startDate} — {booking.endDate}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" />
                                    Type
                                  </p>
                                  <p className="text-xs font-bold text-zinc-900 line-clamp-1">{booking.roomType?.name || 'Room'}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                    <CreditCard className="w-3 h-3" />
                                    Booking ID
                                  </p>
                                  <p className="text-xs font-bold text-zinc-900">{booking.bookingReference}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total Paid</p>
                                  <p className="text-sm font-display font-bold text-indigo-600">₹{parseFloat(booking.totalAmount).toLocaleString('en-IN')}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                              <button className="flex-1 bg-zinc-900 text-white py-3.5 rounded-2xl text-xs font-bold hover:bg-black transition-all">
                                {isUpcoming ? 'Modify Booking' : 'Book Again'}
                              </button>
                              <button className="flex-1 bg-white border border-zinc-100 text-zinc-900 py-3.5 rounded-2xl text-xs font-bold hover:bg-zinc-50 transition-all">
                                View Invoice
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>

                  <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[3rem] p-10 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
                    <div className="relative z-10">
                      <h4 className="text-2xl font-display font-bold mb-4">Planning your next trip?</h4>
                      <p className="text-white/70 text-sm max-w-sm mb-8 leading-relaxed">
                        As a Pro Member, you save an average of 15% on every booking and get free breakfast at top-rated hotels.
                      </p>
                      <button 
                        onClick={onBack}
                        className="bg-white text-indigo-600 px-8 py-3.5 rounded-2xl font-bold text-sm hover:scale-105 transition-all"
                      >
                        Explore New Hotels
                      </button>
                    </div>
                    <div className="absolute -bottom-8 right-12 w-40 h-40 bg-zinc-900/20 backdrop-blur-3xl rounded-full border border-white/10 flex items-center justify-center p-6 text-center">
                      <div className="space-y-1">
                        <p className="text-3xl font-display font-bold">15%</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">OFF Next Stay</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-zinc-100">
                    <h3 className="text-2xl font-display font-bold text-zinc-900 mb-8">Account Settings</h3>
                    <div className="space-y-6">
                      <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-zinc-900">Delete Account</p>
                          <p className="text-xs text-zinc-500">Permanently remove all your data and history.</p>
                        </div>
                        <button className="bg-rose-50 text-rose-600 px-6 py-2 rounded-xl text-xs font-bold border border-rose-100 hover:bg-rose-100 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
