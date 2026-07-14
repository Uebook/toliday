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

export default function HotelDetails({ hotel, onBack, onProceedToCheckout, searchParams }: HotelDetailsProps) {
  const [selectedRoom, setSelectedRoom] = useState<{roomId: string, ratePlanId: string, price: number} | null>(null);
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

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalActiveIndex, setModalActiveIndex] = useState(0);

  const openImageModal = (index: number) => {
    setModalActiveIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => setIsImageModalOpen(false);

  const [detailsModalData, setDetailsModalData] = useState<{
    title: string;
    description: string;
    features?: string[];
  } | null>(null);

  const nextImage = (e: any) => {
    e.stopPropagation();
    setModalActiveIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = (e: any) => {
    e.stopPropagation();
    setModalActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

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

  const displayReviews = (fullDetails?.reviews || []).map((r: any) => ({
    id: r.id,
    user: r.guestName || 'Anonymous Guest',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    date: new Date(r.createdAt || Date.now()).toLocaleDateString(),
    rating: r.rating || 5,
    comment: r.comment || 'No comment provided.',
  }));

  // Dynamic Pricing Calculations
  const selectedRoomObj = selectedRoom && fullDetails?.roomTypes
    ? fullDetails.roomTypes.find((r: any) => r.id === selectedRoom.roomId)
    : null;
  
  const currentPricePerNight = selectedRoom 
    ? selectedRoom.price 
    : Number(hotel.discountPrice || 4000);

  const originalPricePerNight = selectedRoomObj
    ? Math.round(currentPricePerNight / 0.6)
    : Number(hotel.price || 5000);

  const finalTotalPrice = currentPricePerNight * nights;
  const originalTotalPrice = originalPricePerNight * nights;

  return (
    <div className="bg-zinc-50 min-h-screen pt-32 pb-20 font-sans">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] text-zinc-500 mb-6">
          <button onClick={onBack} className="hover:text-blue-600 transition-colors font-medium">Home</button>
          <span>›</span>
          <span className="hover:text-blue-600 cursor-pointer font-medium">Hotels In {hotel.city || 'India'}</span>
          <span>›</span>
          <span className="text-zinc-900 font-medium">{hotel.name}</span>
        </div>

        {/* Header (Title, Rating, Address) */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-zinc-900 leading-tight">{hotel.name}</h1>
              <div className="flex gap-0.5 mt-1">
                {[...Array(Math.floor(hotel.rating || 4))].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-zinc-800 text-zinc-800" />
                ))}
              </div>
            </div>
            <p className="text-[13px] text-zinc-500 font-medium">
               {hotel.city || hotel.location?.split(',')[0]}
               {hotel.address && hotel.address !== (hotel.city || hotel.location?.split(',')[0]) && `, ${hotel.address}`}
            </p>
          </div>
          <button className="flex items-center gap-2 text-zinc-700 text-sm font-bold px-4 py-2 hover:bg-zinc-100 rounded-md transition-colors">
            <Heart className="w-4 h-4" />
            Add to Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* MakeMyTrip Style Image Grid */}
            <div className={`grid gap-2 h-[420px] rounded-xl overflow-hidden bg-zinc-200 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              <div className={`${images.length >= 3 ? 'col-span-2' : 'col-span-1'} relative h-full group cursor-pointer`} onClick={() => openImageModal(0)}>
                <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={hotel.name} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                {hasRealImages && images.length > 1 && (
                  <button onClick={(e) => { e.stopPropagation(); openImageModal(0); }} className="absolute bottom-4 right-4 bg-black/80 hover:bg-black text-white px-5 py-2.5 text-xs font-bold rounded-full flex items-center gap-2 transition-all">
                    {images.length} Property & Guest Photos <span className="text-base leading-none">→</span>
                  </button>
                )}
              </div>
              
              {images.length >= 2 && (
                <div className={`col-span-1 flex ${images.length === 2 ? 'flex-row' : 'flex-col'} gap-2 h-full`}>
                  <div className={`${images.length === 2 ? 'w-full h-full' : 'h-[calc(50%-4px)]'} relative group cursor-pointer overflow-hidden`} onClick={() => openImageModal(1)}>
                    <img src={images[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </div>
                  {images.length >= 3 && (
                    <div className="h-[calc(50%-4px)] relative group cursor-pointer overflow-hidden" onClick={() => openImageModal(2)}>
                      <img src={images[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* About Property */}
            {fullDetails?.description && (
              <div className="bg-white rounded-xl p-6 border border-zinc-200">
                <h2 className="text-[17px] font-bold text-zinc-900 mb-3">About Property</h2>
                <p className="text-[13px] text-zinc-600 leading-relaxed">
                  {fullDetails.description}
                </p>
              </div>
            )}

            {/* Amenities */}
            {displayAmenities.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-zinc-200">
                <h2 className="text-[17px] font-bold text-zinc-900 mb-5">Amenities</h2>
                <div className="flex flex-wrap gap-x-12 gap-y-5">
                  {displayAmenities.slice(0, 6).map((amenity: string, i: number) => {
                    const lower = amenity.toLowerCase();
                    let Icon = Check;
                    if (lower.includes('wifi') || lower.includes('internet')) Icon = Wifi;
                    else if (lower.includes('pool') || lower.includes('swim')) Icon = Activity;
                    else if (lower.includes('game') || lower.includes('sport')) Icon = Briefcase;
                    else if (lower.includes('room service') || lower.includes('24h') || lower.includes('clock')) Icon = Clock;
                    else if (lower.includes('dine') || lower.includes('food') || lower.includes('restaurant') || lower.includes('bar')) Icon = Utensils;
                    else if (lower.includes('park') || lower.includes('secure')) Icon = ShieldCheck;
                    
                    return (
                      <div key={i} className="flex items-center gap-3 text-[13px] text-zinc-800 capitalize font-medium">
                        <Icon className="w-5 h-5 text-zinc-400 stroke-[1.5]" />
                        {amenity}
                      </div>
                    );
                  })}
                  {displayAmenities.length > 6 && (
                    <button className="text-[13px] font-bold text-blue-600 hover:underline">
                      View All
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Room Selection Section */}
            <div id="rooms-section" className="space-y-4">
              <h2 className="text-[17px] font-bold text-zinc-900 mb-2">Room Types</h2>
              {isLoading && <p className="text-[13px] text-zinc-500">Loading rooms...</p>}
              
              <div className="flex flex-col gap-4">
                {(fullDetails?.roomTypes || []).length > 0 ? fullDetails.roomTypes.map((roomType: any) => {
                  const basePrice = Number(roomType.price || hotel.price || 5000);
                  const ratePlans = roomType.ratePlans?.length > 0 ? roomType.ratePlans.map((rp: any) => {
                    const markupAmt = Number(rp.markupAmount || 0);
                    const markupPct = Number(rp.markupPercentage || 0);
                    const calculatedPrice = basePrice + markupAmt + (basePrice * (markupPct / 100));
                    
                    const features = [
                      rp.isRefundable ? 'Free Cancellation' : 'Non-Refundable',
                      ...(rp.inclusions || []),
                      rp.mealPlan ? `Meal Plan: ${rp.mealPlan}` : null,
                      rp.cancellationPolicy
                    ].filter(Boolean);

                    return {
                      ...rp,
                      price: calculatedPrice,
                      features
                    };
                  }) : [{ 
                    id: 'default', 
                    name: 'Standard Rate', 
                    price: basePrice, 
                    features: ['Non-Refundable', 'Room Only'] 
                  }];

                  const mappedRoom = {
                    id: roomType.id,
                    type: roomType.name || 'Standard Room',
                    desc: roomType.description || 'Comfortable room with modern amenities.',
                    image: roomType.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
                    amenities: roomType.amenities || ['Free WiFi', 'TV', 'Air Conditioning', 'Room Service'],
                    maxAdults: roomType.maxAdults || 2,
                    ratePlans
                  };

                  return (
                    <div key={mappedRoom.id} className="bg-white rounded-xl border border-zinc-200 overflow-hidden flex flex-col md:flex-row">
                      {/* Left: Room Details */}
                      <div className="w-full md:w-[32%] bg-zinc-50 p-4 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col">
                        <div className="w-full h-36 rounded-lg overflow-hidden mb-4 relative">
                          <img src={mappedRoom.image} className="w-full h-full object-cover" alt={mappedRoom.type} referrerPolicy="no-referrer" />
                          <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-zinc-800">
                            1 PHOTO
                          </div>
                        </div>
                        <h3 className="text-[15px] font-bold text-zinc-900 mb-1">{mappedRoom.type}</h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium mb-3">
                          <Users className="w-3.5 h-3.5" />
                          <span>Max {mappedRoom.maxAdults} Guests</span>
                        </div>
                        <div className="grid grid-cols-2 gap-y-1.5 gap-x-1.5 mt-auto">
                          {mappedRoom.amenities.slice(0, 6).map((a: string) => (
                            <span key={a} className="flex items-center gap-1.5 text-[11px] text-zinc-600">
                              <span className="w-1 h-1 rounded-full bg-zinc-300" />
                              {a}
                            </span>
                          ))}
                        </div>
                        <button 
                          onClick={() => setDetailsModalData({
                            title: mappedRoom.type,
                            description: mappedRoom.desc,
                            features: mappedRoom.amenities
                          })}
                          className="text-[11px] text-blue-600 font-bold hover:underline mt-4 self-start"
                        >
                          More Details
                        </button>
                      </div>

                      {/* Right: Rate Plans */}
                      <div className="w-full md:w-[68%] flex flex-col">
                        {mappedRoom.ratePlans.map((plan: any, idx: number) => (
                          <div key={plan.id || idx} className={`p-5 flex flex-col sm:flex-row gap-6 justify-between ${idx !== mappedRoom.ratePlans.length - 1 ? 'border-b border-zinc-200' : ''}`}>
                            <div className="flex-1">
                              <h4 className="text-[14px] font-bold text-zinc-900 mb-3">{plan.name}</h4>
                              <ul className="space-y-2">
                                {(plan.features || ['Non-Refundable', 'Pay at Hotel']).map((feature: string, fIdx: number) => (
                                  <li key={fIdx} className="flex items-start gap-2 text-[11px] text-zinc-600">
                                    <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              <button 
                                onClick={() => setDetailsModalData({
                                  title: plan.name,
                                  description: plan.cancellationPolicy || 'View the full inclusions and cancellation policies for this rate plan.',
                                  features: plan.features
                                })}
                                className="text-[11px] text-blue-600 font-bold hover:underline mt-4"
                              >
                                More Details
                              </button>
                            </div>
                            <div className="sm:w-[160px] sm:text-right flex flex-col items-start sm:items-end shrink-0">
                              <div className="text-xl font-bold text-zinc-900 mb-0.5">₹ {Number(plan.price).toLocaleString('en-IN')}</div>
                              <div className="text-[10px] text-zinc-500 mb-4">+ ₹ {Math.round(plan.price * 0.12)} Taxes & Fees Per Night</div>
                              
                              <button 
                                onClick={() => setSelectedRoom({
                                  roomId: mappedRoom.id,
                                  ratePlanId: plan.id || 'default',
                                  price: plan.price
                                })}
                                className={`w-full py-2 rounded-md font-bold text-[12px] transition-colors ${
                                  selectedRoom?.roomId === mappedRoom.id && selectedRoom?.ratePlanId === (plan.id || 'default')
                                  ? 'bg-emerald-600 text-white' 
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                              >
                                {selectedRoom?.roomId === mappedRoom.id && selectedRoom?.ratePlanId === (plan.id || 'default') ? 'SELECTED' : 'BOOK NOW'}
                              </button>
                              
                              {!selectedRoom && (
                                <p className="text-[10px] text-zinc-500 mt-2 text-left sm:text-right leading-tight">
                                  <span className="text-blue-600 font-bold cursor-pointer hover:underline">Login Now</span> and get this for <span className="font-bold text-zinc-900">₹ {Math.round(plan.price * 0.9).toLocaleString('en-IN')}</span> or less
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }) : !isLoading && (
                  <div className="p-8 text-center bg-white border border-zinc-200 rounded-xl">
                    <p className="text-[13px] text-zinc-500 font-medium">No rooms available for selected dates.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <h2 className="text-[17px] font-bold text-zinc-900 mb-6">User Rating & Reviews</h2>
              
              <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-zinc-200">
                <div className="flex items-center gap-6">
                  <div className="bg-blue-600 text-white p-4 rounded-xl text-center min-w-[100px]">
                    <div className="text-3xl font-bold mb-1">{hotel.rating || '4.0'}</div>
                    <div className="text-[11px] font-medium opacity-80 uppercase tracking-wide">Out of 5</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-zinc-900 mb-1">
                      {Number(hotel.rating) >= 4.5 ? 'Excellent' : Number(hotel.rating) >= 4 ? 'Very Good' : 'Good'}
                    </div>
                    <div className="text-[12px] text-zinc-500">Based on {hotel.reviews || 0} Ratings</div>
                  </div>
                </div>

                <div className="flex-1 w-full max-w-sm space-y-2 border-l border-zinc-200 pl-8">
                  {[
                    { label: 'Excellent', percent: 65, color: 'bg-emerald-500' },
                    { label: 'Very Good', percent: 25, color: 'bg-emerald-400' },
                    { label: 'Average', percent: 5, color: 'bg-yellow-500' },
                    { label: 'Poor', percent: 3, color: 'bg-orange-500' },
                    { label: 'Bad', percent: 2, color: 'bg-red-500' }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-[11px] text-zinc-600 w-16">{item.label}</span>
                      <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {displayReviews.length > 0 ? (
                  displayReviews.map((review: any, idx: number) => (
                    <div key={review.id} className={`pb-6 ${idx !== displayReviews.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-600 text-white px-2 py-0.5 rounded text-[12px] font-bold flex items-center gap-1">
                          {review.rating || '5.0'} <Star className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-[13px] font-bold text-zinc-900">{review.user}</span>
                        <span className="text-[12px] text-zinc-500 ml-auto">{review.date}</span>
                      </div>
                      <p className="text-[13px] text-zinc-700 leading-relaxed mb-3">
                        {review.comment}
                      </p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 hover:text-blue-600">
                          <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[13px] text-zinc-500">No reviews yet for this property.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Property Rules */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200 mb-6">
              <h2 className="text-[17px] font-bold text-zinc-900 mb-2">Property Rules</h2>
              <div className="flex items-center gap-6 text-[13px] font-bold text-zinc-600 mb-6 pb-4 border-b border-zinc-100">
                <span>Check-in: {hotel.checkInTime || '2 PM'}</span>
                <span>Check-out: {hotel.checkOutTime || '12 PM'}</span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                {(() => {
                  const pRules = hotel.propertyRules || [];
                  const guestProfileRules = pRules.filter((r: string) => r.startsWith('Guest Profile|')).map((r: string) => r.split('|')[1]);
                  const mustReadRules = pRules.filter((r: string) => r.startsWith('Must Read Rules|')).map((r: string) => r.split('|')[1]);
                  const otherRules = pRules.filter((r: string) => !r.startsWith('Guest Profile|') && !r.startsWith('Must Read Rules|')).map((r: string) => r.includes('|') ? r.split('|')[1] : r);

                  return (
                    <>
                      {/* Left Side */}
                      <div className="w-full md:w-[60%]">
                        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-100 relative z-10 ml-2">
                          <Heart className="w-3.5 h-3.5 fill-current text-rose-500" /> Couple/Bachelor Rules
                        </div>
                        <div className="border border-zinc-200 rounded-lg p-3 pt-6 -mt-3.5 text-[12px] text-zinc-700 mb-6">
                          {guestProfileRules.length > 0 ? guestProfileRules.join('. ') : 'Unmarried couples allowed. Local ids are allowed.'}
                        </div>
                        
                        <ul className="space-y-3">
                          {mustReadRules.length > 0 ? (
                            mustReadRules.map((rule: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-[12px] text-zinc-600">
                                <div className="w-1 h-1 rounded-full border border-zinc-400 shrink-0 mt-1.5" />
                                {rule}
                              </li>
                            ))
                          ) : (
                            <>
                              <li className="flex items-start gap-2 text-[12px] text-zinc-600">
                                <div className="w-1 h-1 rounded-full border border-zinc-400 shrink-0 mt-1.5" />
                                Primary Guest should be atleast 18 years of age.
                              </li>
                              <li className="flex items-start gap-2 text-[12px] text-zinc-600">
                                <div className="w-1 h-1 rounded-full border border-zinc-400 shrink-0 mt-1.5" />
                                Groups with only male guests are also allowed at the property
                              </li>
                              <li className="flex items-start gap-2 text-[12px] text-zinc-600">
                                <div className="w-1 h-1 rounded-full border border-zinc-400 shrink-0 mt-1.5" />
                                Passport, Aadhaar and Driving License are accepted as ID proof(s)
                              </li>
                            </>
                          )}
                          {hotel.petPolicy && (
                            <li className="flex items-start gap-2 text-[12px] text-zinc-600">
                              <div className="w-1 h-1 rounded-full border border-zinc-400 shrink-0 mt-1.5" />
                              {hotel.petPolicy}
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      {/* Right Side */}
                      <div className="w-full md:w-[40%] md:pt-10">
                        <ul className="space-y-3">
                          {otherRules.length > 0 ? (
                            otherRules.map((rule: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-[12px] text-zinc-600">
                                <div className="w-1 h-1 rounded-full border border-zinc-400 shrink-0 mt-1.5" />
                                {rule}
                              </li>
                            ))
                          ) : (
                            <>
                              <li className="flex items-start gap-2 text-[12px] text-zinc-600">
                                <div className="w-1 h-1 rounded-full border border-zinc-400 shrink-0 mt-1.5" />
                                Optional: Fee for buffet breakfast: approximately INR 350 for adults and INR 300 for children
                              </li>
                              <li className="flex items-start gap-2 text-[12px] text-zinc-600">
                                <div className="w-1 h-1 rounded-full border border-zinc-400 shrink-0 mt-1.5" />
                                Extra-person charges may apply and vary depending on property policy. Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges.
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="mt-8 pt-6 flex flex-wrap items-center gap-3">
                <button className="px-3 py-1.5 border border-zinc-200 rounded text-[12px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm">Must Read Rules</button>
                <button className="px-3 py-1.5 border border-zinc-200 rounded text-[12px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm">Guest Profile</button>
                <button className="px-3 py-1.5 border border-zinc-200 rounded text-[12px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm">Guest Profile (Hourly)</button>
                <button 
                  onClick={() => setDetailsModalData({
                    title: 'Property Rules & Policies',
                    description: 'Full list of property rules, policies, and guidelines directly from the hotel.',
                    features: [
                      `Check-in Time: ${hotel.checkInTime || '2 PM'}`,
                      `Check-out Time: ${hotel.checkOutTime || '12 PM'}`,
                      hotel.childPolicy ? `Child Policy: ${hotel.childPolicy}` : null,
                      hotel.cancellationPolicy ? `Cancellation Policy: ${hotel.cancellationPolicy}` : null,
                      hotel.petPolicy ? `Pet Policy: ${hotel.petPolicy}` : null,
                      ...(hotel.propertyRules && hotel.propertyRules.length > 0 
                        ? hotel.propertyRules 
                        : [
                            `Primary Guest should be atleast 18 years of age.`,
                            `Groups with only male guests are also allowed at the property`,
                            `Passport, Aadhaar and Driving License are accepted as ID proof(s)`
                          ]
                      )
                    ].filter(Boolean) as string[]
                  })}
                  className="text-[12px] font-bold text-orange-500 hover:underline ml-1"
                >
                  Read All Property Rules
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-xl p-6 border border-zinc-200 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200">
                  <span className="font-bold text-[15px] text-zinc-900">Your Booking Summary</span>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{selectedRoom ? 'Selected Room' : 'Starts from'}</p>
                    <p className="text-xl font-bold text-zinc-900">₹ {currentPricePerNight.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase">Check-In</p>
                    <p className="text-[13px] font-bold text-zinc-900 mt-1">{arrivalDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase">Check-Out</p>
                    <p className="text-[13px] font-bold text-zinc-900 mt-1">{departureDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <div className="col-span-2 bg-zinc-50 p-3 rounded-lg border border-zinc-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase">Guests & Rooms</p>
                      <p className="text-[13px] font-bold text-zinc-900 mt-1">{guestsText} Guests, {roomsText} Room</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100 mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[13px] font-bold text-zinc-900">Total Amount</span>
                    <span className="text-[12px] text-zinc-400 line-through">₹ {originalTotalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-[11px] text-zinc-500">Includes Taxes & Fees</p>
                    <div className="text-2xl font-bold text-zinc-900">
                      ₹ {finalTotalPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <button 
                  disabled={!selectedRoom}
                  onClick={() => {
                    if (fullDetails?.roomTypes && selectedRoom) {
                      const roomType = fullDetails.roomTypes.find((r: any) => r.id === selectedRoom.roomId);
                      if (roomType) {
                        const mappedRoom = {
                          id: roomType.id,
                          type: roomType.name || 'Standard Room',
                          desc: roomType.description || 'Comfortable room',
                          price: selectedRoom.price,
                          image: roomType.images?.[0] || (hotel.images && hotel.images[0]) || 'https://images.unsplash.com/photo-1542314831-c53cd3816002?auto=format&fit=crop&q=80&w=400',
                          amenities: roomType.amenities || []
                        };
                        onProceedToCheckout(mappedRoom);
                      }
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-[15px] hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  CONTINUE TO BOOK
                </button>
                
                {!selectedRoom && (
                  <p className="text-center text-[11px] text-rose-500 font-bold mt-3 flex items-center justify-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    Please select a room to continue
                  </p>
                )}
              </div>

              {/* Map/Location Mini Widget */}
              <div className="bg-white rounded-xl p-0 border border-zinc-200 overflow-hidden shadow-sm">
                <div className="bg-zinc-100 h-32 relative">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400&h=200" alt="Map" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      onClick={() => {
                        const query = encodeURIComponent(`${hotel.name} ${hotel.location || hotel.city || ''}`);
                        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                      }}
                      className="bg-white px-3 py-1.5 rounded shadow text-[12px] font-bold text-zinc-900 flex items-center gap-1.5 cursor-pointer hover:bg-zinc-50 transition-all hover:scale-105"
                    >
                      <MapPin className="w-3 h-3 text-blue-600" /> View on Map
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-[13px] font-bold text-zinc-900 mb-1">{hotel.location?.split(',')[0] || hotel.city || 'Location'}</h4>
                  <p className="text-[12px] text-zinc-500">{hotel.address || hotel.location || 'Great location for travelers'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center backdrop-blur-sm"
            onClick={closeImageModal}
          >
            <button 
              className="absolute top-6 right-6 text-white bg-black/50 hover:bg-zinc-800 p-2 rounded-full transition-colors z-50"
              onClick={closeImageModal}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="absolute top-6 left-6 text-white font-bold text-lg drop-shadow-md">
              {modalActiveIndex + 1} / {images.length}
            </div>

            {images.length > 1 && (
              <button 
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-zinc-800 p-4 rounded-full transition-colors z-50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
            )}

            <motion.img
              key={modalActiveIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'tween', duration: 0.2 }}
              src={images[modalActiveIndex]}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              alt={`Gallery image ${modalActiveIndex + 1}`}
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <button 
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-zinc-800 p-4 rounded-full transition-colors z-50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            )}

            <div className="absolute bottom-6 flex gap-2 max-w-[80vw] overflow-x-auto p-2" onClick={(e) => e.stopPropagation()}>
              {images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setModalActiveIndex(i)}
                  className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${modalActiveIndex === i ? 'border-white opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-80'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${i}`} referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {detailsModalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDetailsModalData(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                <h3 className="text-lg font-bold text-zinc-900">{detailsModalData.title}</h3>
                <button onClick={() => setDetailsModalData(null)} className="text-zinc-400 hover:text-zinc-700 bg-white shadow-sm p-1.5 rounded-full border border-zinc-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div className="p-6">
                <p className="text-[14px] text-zinc-600 leading-relaxed mb-6 whitespace-pre-wrap">{detailsModalData.description}</p>
                {detailsModalData.features && detailsModalData.features.length > 0 && (
                  <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {(() => {
                      const groups: Record<string, string[]> = {};
                      const ungrouped: string[] = [];
                      
                      detailsModalData.features.forEach(f => {
                        if (f.includes('|')) {
                          const [cat, val] = f.split('|');
                          if (!groups[cat]) groups[cat] = [];
                          groups[cat].push(val);
                        } else {
                          ungrouped.push(f);
                        }
                      });

                      return (
                        <>
                          {ungrouped.length > 0 && (
                            <div className="mb-6">
                              <h4 className="text-[13px] font-bold text-zinc-900 mb-3 uppercase tracking-wider">Features & Inclusions</h4>
                              <ul className="space-y-3">
                                {ungrouped.map((f, i) => (
                                  <li key={i} className="flex items-start gap-3 text-[13px] text-zinc-700">
                                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {Object.entries(groups).map(([cat, vals]) => (
                            <div key={cat} className="mb-6 pb-6 border-b border-zinc-100 last:border-0 last:pb-0 last:mb-0">
                              <h4 className="text-[15px] font-bold text-zinc-900 mb-3">{cat}</h4>
                              <ul className="space-y-3">
                                {vals.map((v, i) => (
                                  <li key={i} className="flex items-start gap-3 text-[13px] text-zinc-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-2" />
                                    <span className="leading-relaxed">{v}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
