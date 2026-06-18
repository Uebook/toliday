import { useState, useEffect } from 'react';
import { Star, MapPin, Wifi, Coffee, Utensils, Heart, ChevronLeft, ChevronRight, ShieldCheck, Clock, Info, Check, IndianRupee, Users, MessageSquare, ThumbsUp, Activity, Coffee as CoffeeIcon, Briefcase, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { fetchHotelDetails } from '../lib/api';

interface Room {
  id: string | number;
  type: string;
  desc: string;
  price: number;
  image: string;
  amenities: string[];
}

interface HotelDetailsProps {
  hotel: any;
  onBack: () => void;
  onProceedToCheckout: (room: any) => void;
  searchParams?: any;
}

const allAmenities = [
  { category: 'Health & Wellness', icon: <Activity className="w-5 h-5 text-rose-500" />, items: ['Gym', 'Spa & Wellness Center', 'Yoga Room', 'Swimming Pool'] },
  { category: 'Food & Drink', icon: <CoffeeIcon className="w-5 h-5 text-orange-500" />, items: ['Fine Dining Restaurant', 'Coffee Shop', 'Bar/Lounge', 'Room Service'] },
  { category: 'Business', icon: <Briefcase className="w-5 h-5 text-indigo-500" />, items: ['Meeting Rooms', 'High-Speed WiFi', 'Business Center'] },
  { category: 'General', icon: <Car className="w-5 h-5 text-emerald-500" />, items: ['24h Front Desk', 'Concierge', 'Valet Parking', 'Airport Shuttle'] }
];

const fallbackReviews = [
  {
    id: 1,
    user: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    date: 'Oct 2023',
    rating: 5,
    comment: 'Absolutely spectacular stay! The attention to detail is unmatched, and the staff went above and beyond to make our anniversary special.'
  },
  {
    id: 2,
    user: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    date: 'Sep 2023',
    rating: 4,
    comment: 'Great location and beautiful facilities. The breakfast buffet was incredible. Only deducting one star because the pool was slightly crowded.'
  }
];

export default function HotelDetails({ hotel, onBack, onProceedToCheckout, searchParams }: HotelDetailsProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [fullDetails, setFullDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchHotelDetails(hotel.id);
        setFullDetails(data);
      } catch (err) {
        console.error('Failed to fetch full hotel details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (hotel?.id) loadDetails();
  }, [hotel?.id]);

  const PLACEHOLDER = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800';

  // Priority: freshly fetched fullDetails.images > prop hotel.images > prop hotel.image > placeholder
  const dbImages: string[] =
    (fullDetails?.images?.length > 0 ? fullDetails.images : null) ??
    (hotel.images?.length > 0 ? hotel.images : null) ??
    (hotel.image ? [hotel.image] : []);
  const images = dbImages.length > 0 ? dbImages : [PLACEHOLDER];
  const hasRealImages = dbImages.length > 0;

  const roomsText = searchParams?.rooms || 1;
  const guestsText = searchParams?.guests || 2;
  const arrivalDateStr = searchParams?.arrival || new Date().toISOString().split('T')[0];
  const departureDateStr = searchParams?.departure || new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  const arrivalDate = new Date(arrivalDateStr);
  const departureDate = new Date(departureDateStr);
  const timeDiff = departureDate.getTime() - arrivalDate.getTime();
  const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
  const days = nights + 1;

  const displayAmenities = (fullDetails?.amenities || hotel?.amenities || []).length > 0 
    ? (fullDetails?.amenities || hotel?.amenities) 
    : [];

  const displayReviews = (fullDetails?.reviews || []).length > 0
    ? fullDetails.reviews.map((r: any) => ({
        id: r.id,
        user: r.guestName || 'Anonymous Guest',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
        date: new Date(r.createdAt || Date.now()).toLocaleDateString(),
        rating: r.rating || 5,
        comment: r.comment || 'No comment provided.',
      }))
    : fallbackReviews;

  return (
    <div className="bg-zinc-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="text-zinc-500 text-sm font-medium hover:text-indigo-600 mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back to Search Results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Media & Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={images[activeImage]} 
                    className="w-full h-full object-cover" 
                    alt={hotel.name}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Only show dots/nav if multiple images */}
                {images.length > 1 && (
                  <div className="absolute bottom-8 left-8 flex gap-2">
                    {images.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-3 h-3 rounded-full transition-all ${activeImage === i ? 'bg-white w-8' : 'bg-white/40'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Only show thumbnails if multiple images from DB */}
              {hasRealImages && images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-indigo-600 scale-95' : 'border-transparent'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="Gallery" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hotel Description */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-zinc-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-display font-bold text-zinc-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <MapPin className="w-4 h-4" />
                    <span>{hotel.location}{fullDetails?.distanceToCityCenter ? ` • ${fullDetails.distanceToCityCenter} from City Center` : ''}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl font-bold">
                  {hotel.rating} <Star className="w-4 h-4 fill-emerald-700" />
                </div>
              </div>

              <p className="text-zinc-600 leading-relaxed mb-8">
                {fullDetails?.description || `Experience unparalleled luxury at ${hotel.name}. Our resort offers a blend of modern sophistication and timeless elegance. Each room is designed with your comfort in mind, featuring premium bedding, smart technology, and stunning views of the surrounding landscape. Whether you're here for business or leisure, our world-class amenities and dedicated staff ensure a stay that is both productive and relaxing.`}
              </p>

              {/* Gallery grid — only render if DB has images */}
              {hasRealImages && images.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {images.slice(0, 4).map((img, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.05 }}
                      className="aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-indigo-100/20"
                      onClick={() => setActiveImage(i)}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="Gallery" referrerPolicy="no-referrer" />
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-zinc-50">
                <div className="flex items-center gap-3 text-zinc-700 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Wifi className="w-5 h-5" />
                  </div>
                  Free WiFi
                </div>
                <div className="flex items-center gap-3 text-zinc-700 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  24h Room Service
                </div>
                <div className="flex items-center gap-3 text-zinc-700 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Utensils className="w-5 h-5" />
                  </div>
                  Restaurant
                </div>
                <div className="flex items-center gap-3 text-zinc-700 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  Secure Parking
                </div>
              </div>
            </div>

            {/* Room Selection Section */}
            <div id="rooms-section" className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-zinc-900 px-2">Select Your Room</h2>
              {isLoading && <p>Loading rooms...</p>}
              <div className="grid grid-cols-1 gap-6">
                {(fullDetails?.roomTypes || []).length > 0 ? fullDetails.roomTypes.map((roomType: any) => {
                  // Fallback values if API doesn't have them
                  const price = roomType.price || roomType.ratePlans?.[0]?.price || 5000;
                  const mappedRoom: Room = {
                    id: roomType.id,
                    type: roomType.name || 'Standard Room',
                    desc: roomType.description || 'Comfortable room with modern amenities.',
                    price: price,
                    image: roomType.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
                    amenities: roomType.amenities || ['Free WiFi', 'TV']
                  };
                  return (
                  <motion.div 
                    key={mappedRoom.id}
                    whileHover={{ y: -5 }}
                    className={`bg-white rounded-[2.5rem] p-6 flex flex-col md:flex-row gap-8 border-2 transition-all ${
                      selectedRoom === mappedRoom.id ? 'border-indigo-600 shadow-xl shadow-indigo-500/10' : 'border-zinc-100 hover:border-zinc-200'
                    }`}
                  >
                    <div className="w-full md:w-64 h-48 md:h-auto rounded-[2rem] overflow-hidden shrink-0">
                      <img src={mappedRoom.image} className="w-full h-full object-cover" alt={mappedRoom.type} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-bold text-zinc-900">{mappedRoom.type}</h3>
                          <div className="flex items-center gap-1 text-zinc-400 font-medium">
                            <Users className="w-4 h-4" />
                            <span>Max {roomType.maxAdults || 2} Adults</span>
                          </div>
                        </div>
                        <p className="text-zinc-500 text-sm mb-6">{mappedRoom.desc}</p>
                        <div className="flex flex-wrap gap-3">
                          {mappedRoom.amenities.map(a => (
                            <span key={a} className="flex items-center gap-1 text-xs font-bold text-zinc-400 bg-zinc-50 px-3 py-1 rounded-full">
                              <Check className="w-3 h-3 text-emerald-500" />
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-end justify-between mt-8">
                        <div>
                          <p className="text-3xl font-display font-bold text-zinc-900">
                            ₹{mappedRoom.price.toLocaleString('en-IN')}
                            <span className="text-zinc-400 text-sm font-medium ml-1">/ night</span>
                          </p>
                        </div>
                        <button 
                          onClick={() => setSelectedRoom(mappedRoom.id)}
                          className={`px-8 py-3 rounded-2xl font-bold transition-all ${
                            selectedRoom === mappedRoom.id 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'bg-zinc-100 text-zinc-600 hover:bg-indigo-50 hover:text-indigo-600'
                          }`}
                        >
                          {selectedRoom === mappedRoom.id ? 'Selected' : 'Select Room'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}) : !isLoading && <p>No rooms available.</p>}
              </div>
            </div>

            {/* Detailed Amenities */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-zinc-100">
              <h2 className="text-2xl font-display font-bold text-zinc-900 mb-8">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {displayAmenities.length > 0 ? (
                  <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayAmenities.map((item: string) => (
                      <div key={item} className="flex items-center gap-3 text-zinc-700 font-medium bg-zinc-50 p-4 rounded-2xl">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  allAmenities.map((group) => (
                    <div key={group.category}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center">
                          {group.icon}
                        </div>
                        <h3 className="font-bold text-zinc-900">{group.category}</h3>
                      </div>
                      <ul className="space-y-3">
                        {group.items.map(item => (
                          <li key={item} className="text-zinc-500 text-sm flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-zinc-100">
              <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-display font-bold text-zinc-900 mb-6">Guest Experience</h2>
                  
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="bg-zinc-50 p-8 rounded-[2rem] text-center min-w-[160px]">
                      <div className="text-5xl font-display font-bold text-zinc-900 mb-2">{hotel.rating}</div>
                      <div className="flex justify-center gap-0.5 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Out of 5 stars</p>
                    </div>

                    <div className="flex-1 w-full space-y-3 pt-2">
                      {[
                        { label: 'Exceptional', count: 850, percent: 85, color: 'bg-emerald-500' },
                        { label: 'Very Good', count: 240, percent: 12, color: 'bg-indigo-500' },
                        { label: 'Average', count: 120, percent: 2, color: 'bg-amber-500' },
                        { label: 'Poor', count: 30, percent: 1, color: 'bg-rose-500' }
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-4">
                          <span className="text-xs font-bold text-zinc-500 w-20 shrink-0">{item.label}</span>
                          <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percent}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className={`h-full ${item.color}`}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-zinc-400 w-8">{item.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-auto">
                  <button className="w-full md:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    Share Your Review
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {displayReviews.map((review: any, idx: number) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm ring-2 ring-white">
                          <img src={review.avatar} alt={review.user} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900">{review.user}</h4>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">{review.date}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-zinc-600 text-sm leading-relaxed italic relative mb-6">
                        <span className="text-indigo-200 text-3xl absolute -left-4 -top-2 opacity-50 font-serif">"</span>
                        {review.comment}
                        <span className="text-indigo-200 text-3xl absolute -bottom-4 opacity-50 font-serif">"</span>
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-6 mt-auto border-t border-zinc-200/50">
                      <button className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                        <ThumbsUp className="w-3 h-3" />
                        Helpful
                      </button>
                      <button className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                        <MessageSquare className="w-3 h-3" />
                        Reply
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full py-5 bg-white border border-zinc-200 rounded-2xl text-zinc-500 text-sm font-bold hover:bg-zinc-50 transition-all flex items-center justify-center gap-2">
                Explore All {hotel.reviews} Guest Experiences
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-zinc-100">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
                  <span className="font-bold text-zinc-900">Your Summary</span>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Starts from</p>
                    <p className="text-2xl font-display font-bold text-indigo-600">₹{hotel.discountPrice.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="p-4 bg-zinc-50 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Duration</p>
                      <p className="text-sm font-bold text-zinc-900">{nights} {nights === 1 ? 'Night' : 'Nights'}, {days} {days === 1 ? 'Day' : 'Days'}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Guests</p>
                      <p className="text-sm font-bold text-zinc-900">{guestsText} {guestsText === 1 ? 'Guest' : 'Guests'}, {roomsText} {roomsText === 1 ? 'Room' : 'Rooms'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-indigo-600">Total Price</span>
                    <span className="text-sm text-zinc-400 line-through">₹{(hotel.price * nights).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-indigo-900">
                    ₹{(selectedRoom && fullDetails?.roomTypes ? (fullDetails.roomTypes.find((r: any) => r.id === selectedRoom)?.ratePlans?.[0]?.price || 5000) * nights : hotel.discountPrice * nights).toLocaleString('en-IN')}
                    <span className="text-xs font-bold bg-white text-indigo-600 px-2 py-0.5 rounded-full ml-3 uppercase">40% OFF</span>
                  </div>
                  <p className="text-[10px] text-indigo-400 font-bold mt-2 uppercase tracking-tight">Inclusive of all taxes & fees</p>
                </div>

                <button 
                  disabled={!selectedRoom}
                  onClick={() => {
                    if (fullDetails?.roomTypes && selectedRoom) {
                      const roomType = fullDetails.roomTypes.find((r: any) => r.id === selectedRoom);
                      if (roomType) {
                        const price = roomType.ratePlans?.[0]?.price || 5000;
                        const mappedRoom = {
                          id: roomType.id,
                          type: roomType.name || 'Standard Room',
                          desc: roomType.description || 'Comfortable room',
                          price: price,
                          image: roomType.images?.[0] || hotel.image,
                          amenities: roomType.amenities || []
                        };
                        onProceedToCheckout(mappedRoom);
                      }
                    }
                  }}
                  className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  Confirm & Pay
                  <span className="block text-[10px] opacity-60 font-normal uppercase tracking-widest group-disabled:hidden">Secure Checkout</span>
                </button>
                
                {!selectedRoom && (
                  <p className="text-center text-xs text-rose-500 font-bold mt-4 flex items-center justify-center gap-1 italic">
                    <Info className="w-3 h-3" />
                    Please select a room to continue
                  </p>
                )}
              </div>

              <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-zinc-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-zinc-600">Join Over <span className="text-zinc-900 font-bold">4.5M+</span> happy travelers worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
