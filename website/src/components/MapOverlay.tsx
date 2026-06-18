import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { X, Navigation, Star, IndianRupee, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface MapOverlayProps {
  hotels: any[];
  onClose: () => void;
  onSelectHotel: (hotel: any) => void;
}

interface MarkerWithInfoWindowProps {
  key?: string | number;
  hotel: any;
  onSelect: (hotel: any) => void;
}

function MarkerWithInfoWindow({ hotel, onSelect }: MarkerWithInfoWindowProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: hotel.lat, lng: hotel.lng }}
        onClick={() => setOpen(true)}
      >
        <div className="bg-indigo-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg border-2 border-white transform hover:scale-110 transition-transform active:scale-95">
          ₹{hotel.discountPrice.toLocaleString('en-IN')}
        </div>
      </AdvancedMarker>
      {open && (
        <InfoWindow anchor={marker} onCloseClick={() => setOpen(false)}>
          <div className="p-1 max-w-[200px]" onClick={() => onSelect(hotel)}>
             <img src={hotel.image} className="w-full h-24 object-cover rounded-lg mb-2" alt={hotel.name} />
             <h4 className="font-bold text-zinc-900 text-sm mb-1">{hotel.name}</h4>
             <div className="flex items-center gap-1 mb-2">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold">{hotel.rating}</span>
             </div>
             <p className="text-indigo-600 font-bold text-sm">₹{hotel.discountPrice.toLocaleString('en-IN')}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function MapOverlay({ hotels, onClose, onSelectHotel }: MapOverlayProps) {
  if (!hasValidKey) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Navigation className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-display font-bold text-zinc-900 mb-4">Google Maps API Key Required</h2>
          <p className="text-zinc-500 mb-8 leading-relaxed">
            To view the map, you need to add your Google Maps Platform API key to the project secrets.
          </p>
          <div className="bg-zinc-50 p-6 rounded-3xl text-left space-y-4 border border-zinc-100">
            <p className="text-sm font-medium text-zinc-700"><strong>Step 1:</strong> Get a key from <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noopener" className="text-indigo-600 hover:underline">Google Cloud Console</a></p>
            <p className="text-sm font-medium text-zinc-700"><strong>Step 2:</strong> Open Application Settings (⚙️) → Secrets</p>
            <p className="text-sm font-medium text-zinc-700"><strong>Step 3:</strong> Add <code>GOOGLE_MAPS_PLATFORM_KEY</code></p>
          </div>
          <p className="mt-8 text-xs text-zinc-400">The application will automatically refresh once the key is added.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 150 }}
      className="fixed inset-0 z-[100] bg-white"
    >
      <div className="absolute top-6 left-6 z-10 flex gap-3">
        <button 
          onClick={onClose}
          className="bg-white px-6 py-3 rounded-2xl font-bold shadow-xl border border-zinc-100 flex items-center gap-2 hover:bg-zinc-50 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to List
        </button>
      </div>

      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: 18.9218, lng: 72.8347 }} // Mumbai
          defaultZoom={13}
          mapId="HOTEL_EXPLORER_MAP"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          className="w-full h-full"
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          {hotels.map(hotel => (
            <MarkerWithInfoWindow 
              key={hotel.id} 
              hotel={hotel} 
              onSelect={onSelectHotel}
            />
          ))}
        </Map>
      </APIProvider>
    </motion.div>
  );
}
