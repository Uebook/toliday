/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IndiaDestinations from './components/IndiaDestinations';
import PromoBanners from './components/PromoBanners';
import AppDownload from './components/AppDownload';
import TravelStories from './components/TravelStories';
import AboutSection from './components/AboutSection';
import TrustSection from './components/TrustSection';
import FeaturedHomes from './components/FeaturedHomes';
import OutsideDestinations from './components/OutsideDestinations';
import Footer from './components/Footer';
import HotelList from './components/HotelList';
import HotelDetails from './components/HotelDetails';
import HotelBooking from './components/HotelBooking';
import HolidayList from './components/HolidayList';
import HolidayDetails from './components/HolidayDetails';
import BusList from './components/BusList';
import BusSeatSelection from './components/BusSeatSelection';
import CabList from './components/CabList';
import BusBooking from './components/BusBooking';
import CabBooking from './components/CabBooking';
import HolidayBooking from './components/HolidayBooking';
import CheckoutFlow from './components/CheckoutFlow';
import CabReview from './components/CabReview';
import AuthPages from './components/AuthPages';
import ProfilePage from './components/ProfilePage';
import StoryDetails from './components/StoryDetails';
import AboutUs from './components/AboutUs';
import RefundPolicy from './components/RefundPolicy';
import Blogs from './components/Blogs';
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactUs from './components/ContactUs';
import FlightList from './components/FlightList';
import FlightAddons from './components/FlightAddons';
import ActivityList from './components/ActivityList';
import ActivityDetails from './components/ActivityDetails';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState<'home' | 'hotels' | 'hotel-list' | 'hotel-details' | 'checkout' | 'auth' | 'profile' | 'bus' | 'bus-list' | 'bus-seat-selection' | 'cab' | 'cab-list' | 'cab-review' | 'holidays' | 'holiday-list' | 'holiday-details' | 'story-details' | 'about-us' | 'refund-policy' | 'blogs' | 'privacy-policy' | 'contact-us' | 'flights' | 'flight-list' | 'flight-addons' | 'activities' | 'activity-list' | 'activity-details'>('home');
  const [searchParams, setSearchParams] = useState<any>({});
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [selectedCab, setSelectedCab] = useState<any>(null);
  const [activitySearchParams, setActivitySearchParams] = useState<any>(null);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [busSearchParams, setBusSearchParams] = useState<{ origin: string; destination: string; date: string } | null>(null);
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<any>(null);
  const [selectedAddons, setSelectedAddons] = useState<any>(null);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [selectedEntity, setSelectedEntity] = useState<any>(null); // For bus/cab/holiday/flight checkout
  const [user, setUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('toliday_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [pendingAction, setPendingAction] = useState<Function | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const bookingId = params.get('bookingId');
    if (status === 'success') {
      alert(`Payment Successful! Booking Confirmed: ${bookingId}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'failed') {
      alert('Payment Failed or Cancelled. Please try again.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar 
        forceSolid={view !== 'home'} 
        user={user} 
        currentView={view}
        onNavigate={(v) => setView(v as any)} 
      />
      
      <main>
        <AnimatePresence mode="wait">
          {['home', 'hotels', 'flights', 'bus', 'cab', 'holidays'].includes(view) ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero 
                isDedicated={view !== 'home'}
                defaultService={['home', 'hotels'].includes(view) ? 'hotels' : view === 'cab' ? 'cabs' : view as any}
                onSearch={(type, params) => {
                  if (params) setSearchParams(params);
                  if (type === 'hotels') setView('hotel-list');
                  if (type === 'flights') setView('flight-list');
                  if (type === 'holidays') setView('holiday-list');
                  if (type === 'cabs') setView('cab-list');
                  if (type === 'bus') {
                    setBusSearchParams(params);
                    setView('bus-list');
                  }
                  if (type === 'activities') {
                    setActivitySearchParams(params);
                    setView('activity-list');
                  }
                }} 
              />
              
              {view === 'home' && <TrustSection />}
              
              <IndiaDestinations service={view} onSelectDestination={() => setView('hotel-list')} />

              <PromoBanners service={view} />

              {view === 'home' && (
              <FeaturedHomes 
                onSelectProperty={(property) => {
                  const action = () => {
                    const cleanedPrice = parseFloat(property.price.replace(/[^0-9.]/g, '')) || 3500;
                    setSelectedHotel({
                      id: parseInt(property.id.replace(/[^0-9]/g, '')) || 99,
                      name: property.name,
                      location: property.location,
                      rating: property.stars,
                      reviews: Math.floor(property.rating * 85),
                      price: Math.round(cleanedPrice * 1.4),
                      discountPrice: Math.round(cleanedPrice),
                      image: property.image,
                      images: [property.image]
                    });
                    setView('hotel-details');
                  };
                  if (!user) {
                    setPendingAction(() => action);
                    setView('auth');
                  } else {
                    action();
                  }
                }}
              />
            )}

              {view === 'home' && <OutsideDestinations onSelectDestination={() => setView('hotel-list')} />}

              {view === 'home' && <AppDownload />}

              <TravelStories service={view}
                onSelectStory={(story) => {
                  setSelectedStory(story);
                  setView('story-details');
                }}
              />

              {view === 'home' && <AboutSection />}
            </motion.div>
          ) : view === 'hotel-list' ? (
            <motion.div
              key="hotel-list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <HotelList 
                searchParams={searchParams}
                onBack={() => setView('hotels')} 
                onSelectHotel={(hotel) => {
                  const action = () => {
                    setSelectedHotel(hotel);
                    setView('hotel-details');
                  };
                  if (!user) {
                    setPendingAction(() => action);
                    setView('auth');
                  } else {
                    action();
                  }
                }}
              />
            </motion.div>
          ) : view === 'hotel-details' ? (
            <motion.div
              key="hotel-details"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <HotelDetails 
                hotel={selectedHotel} 
                searchParams={searchParams}
                onBack={() => setView('hotel-list')} 
                onProceedToCheckout={(room) => {
                  setSelectedRoom(room);
                  setView('checkout');
                }}
              />
            </motion.div>
          ) : view === 'flight-list' ? (
            <motion.div
              key="flight-list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <FlightList 
                searchParams={searchParams}
                onBack={() => setView('flights')}
                onSelectFlight={(outbound, inbound) => {
                  setSelectedFlight(outbound);
                  if (inbound) setSelectedReturnFlight(inbound);
                  setView('flight-addons');
                }}
              />
            </motion.div>
          ) : view === 'flight-addons' ? (
            <motion.div
              key="flight-addons"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <FlightAddons 
                flight={selectedFlight}
                returnFlight={selectedReturnFlight}
                searchParams={searchParams}
                onBack={() => setView('flight-list')}
                onProceed={(addons) => {
                  setSelectedAddons(addons);
                  
                  let addonsCost = 0;
                  const seatPrice = (s: string) => {
                    const row = parseInt(s.slice(0, -1));
                    if (row <= 2 && searchParams?.paxConfig?.cabinClass !== 'first' && searchParams?.paxConfig?.cabinClass !== 'business' && searchParams?.paxConfig?.cabinClass !== 'premium_business') return 799;
                    if (row === 6) return 499;
                    return 0;
                  };
                  addons.seats.outbound.forEach(s => { addonsCost += seatPrice(s); });
                  addons.seats.inbound.forEach(s => { addonsCost += seatPrice(s); });

                  const MEALS = { 'Veg Biryani': 350, 'Chicken Tikka Sandwich': 400, 'Gluten-Free Fruit Platter': 290, 'Vegan Salad Wrap': 320 };
                  addons.meals.outbound.forEach((m: string) => { addonsCost += (MEALS as any)[m] || 0; });
                  addons.meals.inbound.forEach((m: string) => { addonsCost += (MEALS as any)[m] || 0; });

                  const BAGGAGE = { 'Extra 5 kg': 1200, 'Extra 10 kg': 2200, 'Extra 15 kg': 3200 };
                  addons.baggage.outbound.forEach((b: string) => { addonsCost += (BAGGAGE as any)[b] || 0; });
                  addons.baggage.inbound.forEach((b: string) => { addonsCost += (BAGGAGE as any)[b] || 0; });

                  setSelectedEntity({
                    type: 'flight',
                    flight: selectedFlight,
                    returnFlight: selectedReturnFlight,
                    selectedSeats: addons.seats,
                    selectedMeals: addons.meals,
                    selectedBaggage: addons.baggage,
                    addonsCost
                  });
                  
                  const action = () => {
                    setView('checkout');
                  };
                  if (!user) {
                    setPendingAction(() => action);
                    setView('auth');
                  } else {
                    action();
                  }
                }}
              />
            </motion.div>
          ) : view === 'checkout' ? (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <CheckoutFlow 
                hotel={selectedHotel}
                room={selectedRoom}
                searchParams={searchParams}
                entity={selectedEntity}
                onBack={() => {
                  if (selectedEntity?.type === 'flight') {
                    setView('flight-addons');
                  } else {
                    setView(selectedHotel ? 'hotel-details' : 'home');
                  }
                }}
                onComplete={() => {
                  setView('home');
                  setSelectedHotel(null);
                  setSelectedRoom(null);
                  setSelectedEntity(null);
                  setSelectedFlight(null);
                  setSelectedReturnFlight(null);
                  setSelectedAddons(null);
                }}
              />
            </motion.div>
          ) : view === 'auth' ? (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <AuthPages 
                onBack={() => {
                  setPendingAction(null);
                  setView('home');
                }} 
                onLogin={(userData) => {
                  setUser(userData);
                  localStorage.setItem('toliday_user', JSON.stringify(userData));
                  if (pendingAction) {
                    pendingAction();
                    setPendingAction(null);
                  } else {
                    setView('home');
                  }
                }} 
              />
            </motion.div>
          ) : view === 'profile' ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProfilePage 
                user={user}
                onLogout={() => {
                  setUser(null);
                  localStorage.removeItem('toliday_user');
                  setView('home');
                }}
                onBack={() => setView('home')}
              />
            </motion.div>
          ) : view === 'bus-list' ? (
             <motion.div
              key="bus-list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <BusList 
                searchParams={busSearchParams}
                onBack={() => setView('bus')}
                onSelectBus={(bus) => {
                  const action = () => {
                    setSelectedBus(bus);
                    setView('bus-seat-selection');
                  };
                  if (!user) {
                    setPendingAction(() => action);
                    setView('auth');
                  } else {
                    action();
                  }
                }}
              />
            </motion.div>
          ) : view === 'bus-seat-selection' ? (
            <motion.div
              key="bus-seat-selection"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <BusSeatSelection 
                bus={selectedBus}
                onBack={() => setView('bus-list')}
                onProceed={(seats, boarding, dropping, bookingId) => {
                  setSelectedEntity({ type: 'bus', bus: selectedBus, seats, boarding, dropping, bookingId });
                  setView('checkout');
                }}
              />
            </motion.div>
          ) : view === 'cab-list' ? (
            <motion.div
              key="cab-list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <CabList 
                onBack={() => setView('cab')}
                onSelectCab={(cab) => {
                  const action = () => {
                    setSelectedCab(cab);
                    setView('cab-review');
                  };
                  if (!user) {
                    setPendingAction(() => action);
                    setView('auth');
                  } else {
                    action();
                  }
                }}
              />
            </motion.div>
          ) : view === 'cab-review' ? (
            <motion.div
              key="cab-review"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <CabReview 
                cab={selectedCab}
                onBack={() => setView('cab-list')}
                onProceedToCheckout={(cab) => {
                  setSelectedEntity({ type: 'cab', cab });
                  setView('checkout');
                }}
              />
            </motion.div>
          ) : view === 'holiday-list' ? (
            <motion.div
              key="holiday-list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <HolidayList 
                onBack={() => setView('holidays')}
                onSelectPkg={(pkg) => {
                  const action = () => {
                    setSelectedPkg(pkg);
                    setView('holiday-details');
                  };
                  if (!user) {
                    setPendingAction(() => action);
                    setView('auth');
                  } else {
                    action();
                  }
                }}
              />
            </motion.div>
          ) : view === 'holiday-details' ? (
            <motion.div
              key="holiday-details"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <HolidayDetails 
                pkg={selectedPkg}
                onBack={() => setView('holiday-list')}
                onProceedToBooking={(pkg) => {
                  setSelectedEntity({ type: 'holiday', pkg });
                  setView('checkout');
                }}
              />
            </motion.div>
          ) : view === 'story-details' ? ( 
            <motion.div
              key="story-details"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <StoryDetails 
                story={selectedStory} 
                onBack={() => setView('home')} 
                onNavigateToBooking={(tab) => {
                  setView(tab as any);
                }}
              />
            </motion.div>
          ) : view === 'about-us' ? ( 
            <motion.div
              key="about-us"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AboutUs onBack={() => setView('home')} />
            </motion.div>
          ) : view === 'refund-policy' ? ( 
            <motion.div
              key="refund-policy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <RefundPolicy onBack={() => setView('home')} />
            </motion.div>
          ) : view === 'blogs' ? ( 
            <motion.div
              key="blogs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Blogs 
                onBack={() => setView('home')} 
                onSelectStory={(story) => {
                  setSelectedStory(story);
                  setView('story-details');
                }}
              />
            </motion.div>
          ) : view === 'privacy-policy' ? ( 
            <motion.div
              key="privacy-policy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PrivacyPolicy onBack={() => setView('home')} />
            </motion.div>
          ) : view === 'contact-us' ? ( 
            <motion.div
              key="contact-us"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ContactUs onBack={() => setView('home')} />
            </motion.div>
          ) : view === 'activity-list' ? (
            <motion.div
              key="activity-list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <ActivityList 
                searchParams={activitySearchParams}
                onBack={() => setView('home')}
                onSelectActivity={(activity: any) => {
                  const action = () => {
                    setSelectedActivity(activity);
                    setView('activity-details');
                  };
                  if (!user) {
                    setPendingAction(() => action);
                    setView('auth');
                  } else {
                    action();
                  }
                }}
              />
            </motion.div>
          ) : view === 'activity-details' ? (
            <motion.div
              key="activity-details"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <ActivityDetails 
                activity={selectedActivity}
                onBack={() => setView('activity-list')}
                onProceedToBooking={(activityDetails: any, paxDetails: any, timeSlot: any) => {
                  setSelectedEntity({ type: 'activity', activity: selectedActivity, details: activityDetails, pax: paxDetails, timeSlot });
                  setView('checkout');
                }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      <Footer onNavigate={(v) => setView(v as any)} />
    </div>
  );
}

