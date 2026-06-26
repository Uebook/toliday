export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const fetchHotels = async () => {
  const response = await fetch(`${API_BASE_URL}/public/hotels`);
  if (!response.ok) throw new Error('Failed to fetch hotels');
  return response.json();
};

export const fetchHotelDetails = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/public/hotels/${id}`);
  if (!response.ok) throw new Error('Failed to fetch hotel details');
  return response.json();
};

export const createBooking = async (payload: {
  guestName: string;
  guestEmail: string;
  guestContact?: string;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  totalAmount: number;
  roomTypeId: string;
  hotelId: string;
  gstCompany?: string;
  gstNumber?: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/public/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to create booking');
  }
  return response.json();
};

// BUS APIs
export const searchBuses = async (query: { origin: string; destination: string; date: string }) => {
  const params = new URLSearchParams(query);
  const response = await fetch(`${API_BASE_URL}/public/buses/search?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to search buses');
  return response.json();
};

export const getBusSeatMatrix = async (scheduleId: string) => {
  const response = await fetch(`${API_BASE_URL}/public/buses/schedules/${scheduleId}/seat-matrix`);
  if (!response.ok) throw new Error('Failed to fetch seat matrix');
  return response.json();
};

export const lockBusSeats = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/public/buses/bookings/lock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to lock seats');
  }
  return response.json();
};

export const initiatePayment = async (payload: { bookingId: string; hotelId?: string; bookingType?: 'HOTEL' | 'BUS' }) => {
  const response = await fetch(`${API_BASE_URL}/public/payment/initiate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to initiate payment');
  }
  return response.json();
};

export const fetchBookingsByEmail = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/public/bookings/${email}`);
  if (!response.ok) throw new Error('Failed to fetch bookings');
  return response.json();
};

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNo: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  price: number;
  rewardsPoints: number;
  class: string;
  date: string;
}

export const AIRPORTS: Airport[] = [
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj Intl Airport', city: 'Mumbai', country: 'India' },
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', country: 'India' },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', country: 'India' },
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India' },
  { code: 'CCU', name: 'Netaji Subhash Chandra Bose Intl Airport', city: 'Kolkata', country: 'India' },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India' },
  { code: 'GOI', name: 'Dabolim Airport', city: 'Goa', country: 'India' },
  { code: 'PNQ', name: 'Pune Airport', city: 'Pune', country: 'India' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
];

const AIRLINES = [
  { name: 'IndiGo', code: '6E', basePrice: 4200 },
  { name: 'Air India', code: 'AI', basePrice: 5100 },
  { name: 'Vistara', code: 'UK', basePrice: 5800 },
  { name: 'SpiceJet', code: 'SG', basePrice: 3800 },
  { name: 'Akasa Air', code: 'QP', basePrice: 4000 },
  { name: 'Emirates', code: 'EK', basePrice: 22000 },
  { name: 'Singapore Airlines', code: 'SQ', basePrice: 25000 },
];

export const searchFlights = async (params: {
  fromCode: string;
  toCode: string;
  date: string;
  fareType?: 'regular' | 'student' | 'senior' | 'armed';
  cabinClass?: 'economy' | 'premium' | 'business' | 'premium_business' | 'first';
}): Promise<Flight[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const fromAirport = AIRPORTS.find(a => a.code.toUpperCase() === params.fromCode.toUpperCase()) || AIRPORTS[0];
  const toAirport = AIRPORTS.find(a => a.code.toUpperCase() === params.toCode.toUpperCase()) || AIRPORTS[1];

  const isInternational = fromAirport.country !== 'India' || toAirport.country !== 'India';

  // Filter airlines - only international airlines fly to foreign hubs
  const eligibleAirlines = AIRLINES.filter(airline => {
    if (isInternational) {
      return ['AI', 'EK', 'SQ'].includes(airline.code);
    } else {
      return ['6E', 'AI', 'UK', 'SG', 'QP'].includes(airline.code);
    }
  });

  const flights: Flight[] = [];
  const flightTimes = [
    { dep: '06:00', arr: '08:15', dur: '2h 15m', stops: 0 },
    { dep: '09:30', arr: '11:50', dur: '2h 20m', stops: 0 },
    { dep: '12:15', arr: '16:45', dur: '4h 30m', stops: 1, stopDetails: '1 Stop via BLR (1h)' },
    { dep: '15:40', arr: '18:00', dur: '2h 20m', stops: 0 },
    { dep: '18:50', arr: '21:10', dur: '2h 20m', stops: 0 },
    { dep: '21:15', arr: '02:30', dur: '5h 15m', stops: 1, stopDetails: '1 Stop via HYD (2h)' },
    { dep: '23:30', arr: '01:50', dur: '2h 20m', stops: 0 },
  ];

  eligibleAirlines.forEach((airline, airlineIdx) => {
    // Generate 3-4 flights per airline
    const scheduleIndices = [
      (airlineIdx) % flightTimes.length,
      (airlineIdx + 2) % flightTimes.length,
      (airlineIdx + 4) % flightTimes.length
    ];

    scheduleIndices.forEach((timeIdx) => {
      const time = flightTimes[timeIdx];
      
      // Calculate price modifier based on cabin class
      let classModifier = 1.0;
      if (params.cabinClass === 'premium') classModifier = 1.4;
      else if (params.cabinClass === 'business') classModifier = 2.5;
      else if (params.cabinClass === 'premium_business') classModifier = 3.0;
      else if (params.cabinClass === 'first') classModifier = 4.0;

      // Calculate price modifier based on special fare type
      let fareModifier = 1.0;
      if (params.fareType === 'student') fareModifier = 0.90; // 10% off
      else if (params.fareType === 'senior') fareModifier = 0.92; // 8% off
      else if (params.fareType === 'armed') fareModifier = 0.88; // 12% off

      let price = Math.round(airline.basePrice * classModifier * fareModifier);
      
      // Add random slight variation
      price += (timeIdx * 120) - 200;

      // International flights multiplier
      if (isInternational) {
        price = Math.round(price * 2.5);
      }

      flights.push({
        id: `F-${airline.code}-${time.dep.replace(':', '')}-${timeIdx}`,
        airline: airline.name,
        airlineCode: airline.code,
        flightNo: `${airline.code}-${100 + timeIdx * 15 + airlineIdx}`,
        fromCode: fromAirport.code,
        fromCity: fromAirport.city,
        toCode: toAirport.code,
        toCity: toAirport.city,
        departureTime: time.dep,
        arrivalTime: time.arr,
        duration: time.dur,
        stops: time.stops,
        stopDetails: time.stopDetails,
        price,
        rewardsPoints: Math.round(price * 0.02), // 2% back in rewards
        class: params.cabinClass ? (params.cabinClass === 'premium_business' ? 'Premium Business' : params.cabinClass === 'premium' ? 'Premium Economy' : params.cabinClass.charAt(0).toUpperCase() + params.cabinClass.slice(1)) : 'Economy',
        date: params.date,
      });
    });
  });

  // Sort by price initially
  return flights.sort((a, b) => a.price - b.price);
};



export const ACTIVITIES = [
  {
    id: 'act-1',
    title: 'Chao Phraya Princess Cruise',
    city: 'Bangkok',
    category: 'Boat Tours',
    mainCategory: 'Cruises',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
    originalPrice: 4399,
    price: 2493,
    savingPercentage: 43,
    duration: '2-3 hours',
    timeOfDay: 'Evening (5 PM-12 AM)',
    highlights: [
      'Free Cancellation',
      'Upper deck seating on Chao Phraya Princess Cruise'
    ],
    about: 'The Chao Phraya Princess Cruise takes guests on scenic evening along Bangkok main river. As temples and landmarks light up the skyline, the 2-hour voyage combines buffet dining, live music and riverside views. With open decks, indoor seating and...',
    detailedHighlights: [
      'Cruise for 2 hours along the Chao Phraya River on a scenic evening voyage',
      'See Wat Arun, Grand Palace and Rama VIII Bridge illuminated after sunset',
      'Enjoy a buffet dinner with Indian and international dishes served onboard',
      'Listen to live performances by professional singers and a saxophonist'
    ],
    ratePlans: [
      {
        id: 'rp-1',
        title: 'Dinner Cruise from Iconsiam for Non Thai Residents',
        price: 3524,
        originalPrice: 5680,
        features: ['Free Cancellation', 'Night views of Wat Arun and the Grand Palace', 'International buffet dinner with coffee and tea']
      },
      {
        id: 'rp-2',
        title: 'Dinner Cruise from Terminal 21 Rama 3 with Indian Buffet',
        price: 3524,
        originalPrice: 5680,
        features: ['Free Cancellation', 'Indian buffet with vegetarian and non-vegetarian options', 'Views of illuminated temples and bridges']
      },
      {
        id: 'rp-3',
        title: 'Sunset Cruise from Asiatique with Buffet and Free Flow Beer',
        price: 2497,
        originalPrice: 4680,
        features: ['Free Cancellation', 'Sunset sailing from Asiatique The Riverfront', 'International buffet with coffee and tea']
      }
    ],
    timeSlots: ['05:00 PM', '07:30 PM', '08:00 PM']
  },
  {
    id: 'act-2',
    title: 'Safari World Bangkok',
    city: 'Bangkok',
    category: 'Zoos & Wildlife Parks',
    mainCategory: 'Nature & Wildlife',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=800',
    originalPrice: 2937,
    price: 2218,
    savingPercentage: 24,
    duration: 'Full Day (7+ hours)',
    timeOfDay: 'Morning (6 AM-12 PM)',
    highlights: [
      'Free Cancellation',
      'Drive-through wildlife safari experience'
    ],
    about: 'Safari World Bangkok is Thailand\'s greatest open zoo and leisure park that offers a great variety of entertainment for everyone.',
    detailedHighlights: ['See animals from Africa and Asia', 'Enjoy Marine Park shows'],
    ratePlans: [
      { id: 'rp-sw-1', title: 'Safari Park + Marine Park Ticket Only', price: 2218, originalPrice: 2937, features: ['Free Cancellation'] }
    ],
    timeSlots: ['09:00 AM']
  },
  {
    id: 'act-3',
    title: 'SEA LIFE Bangkok Ocean World',
    city: 'Bangkok',
    category: 'Aquariums',
    mainCategory: 'Attraction Tickets',
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=800',
    originalPrice: 3994,
    price: 3628,
    savingPercentage: 9,
    duration: '3-5 hours',
    timeOfDay: 'Afternoon (12 PM-5 PM)',
    highlights: [
      'Full day entry to SEA LIFE Bangkok Ocean World',
      'Ride a glass bottom boat over the main shark and ray tank'
    ],
    about: 'Explore the underwater world at SEA LIFE Bangkok.',
    detailedHighlights: ['See sharks, penguins, and more', 'Interactive rockpool'],
    ratePlans: [
      { id: 'rp-sl-1', title: 'Admission Ticket', price: 3628, originalPrice: 3994, features: ['Free Cancellation'] }
    ],
    timeSlots: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM']
  },
  {
    id: 'act-4',
    title: 'King Power Mahanakhon Skywalk',
    city: 'Bangkok',
    category: 'Observation Decks',
    mainCategory: 'Attraction Tickets',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7cbf0076?auto=format&fit=crop&q=80&w=800',
    originalPrice: 1500,
    price: 1031,
    savingPercentage: 30,
    duration: '0-3 hours',
    timeOfDay: 'Evening (5 PM-12 AM)',
    highlights: [
      'Free Cancellation',
      'Admission to Mahanakhon Skyverse exhibitions on the 4th floor'
    ],
    about: 'Experience Bangkok from its highest observation deck.',
    detailedHighlights: ['Glass tray experience at 310 meters', '360-degree panoramic views'],
    ratePlans: [
      { id: 'rp-km-1', title: 'Daytime Admission (10:00 - 15:30)', price: 1031, originalPrice: 1500, features: ['Free Cancellation'] },
      { id: 'rp-km-2', title: 'Sunset Admission (16:00 - 18:30)', price: 1200, originalPrice: 1600, features: ['Free Cancellation', 'Access to Glass Tray'] }
    ],
    timeSlots: ['10:00 AM', '04:00 PM', '06:00 PM']
  }
];

export const fetchActivities = async (params: any = {}) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let results = [...ACTIVITIES];
  
  if (params.destination) {
    const term = params.destination.toLowerCase();
    results = results.filter(a => 
      a.city.toLowerCase().includes(term) || 
      a.title.toLowerCase().includes(term) ||
      a.category.toLowerCase().includes(term)
    );
  }
  
  return results;
};
