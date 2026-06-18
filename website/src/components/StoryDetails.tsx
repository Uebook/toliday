import { Calendar, User, Clock, ArrowLeft, Heart, Share2, Compass, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface Story {
  id: number;
  title: string;
  image: string;
}

interface StoryDetailsProps {
  story: Story;
  onBack: () => void;
  onNavigateToBooking: (tab: string) => void;
}

export default function StoryDetails({ story, onBack, onNavigateToBooking }: StoryDetailsProps) {
  // Rich mock contents based on story id
  const getStoryContent = (id: number) => {
    switch (id) {
      case 1:
        return {
          category: 'Travel Hacks',
          author: 'Rohit Sharma',
          date: 'May 12, 2026',
          readTime: '4 min read',
          intro: 'Long airport queues are the ultimate vacation buzzkill. From checking in luggage to security screenings, you can easily waste two hours before your flight even leaves the tarmac. Fortunately, seasoned travelers have a few tricks up their sleeves.',
          paragraphs: [
            'The single biggest game-changer in Indian airports right now is DigiYatra. Using facial recognition technology, this government initiative allows passengers to breeze through entry gates and security checks in less than 5 minutes. All you need to do is download the app, link your Aadhaar card, and upload a selfie before arriving at the terminal.',
            'Another pro-tip is booking a priority luggage service. Most airlines offer this for a small fee during web check-in. Your bags get loaded last and unloaded first, saving you from the chaotic waiting circle at the baggage belt on arrival.',
            'Lastly, did you know that booking a pre-arranged airport transfer can save you another 30 minutes? Instead of standing in taxi lines or waiting for ride-share drivers to locate you, a designated chauffeur can greet you directly at the arrivals exit gate.'
          ],
          tips: [
            'Register for DigiYatra at least 24 hours before your flight.',
            'Fly during off-peak hours (Tuesday and Wednesday afternoons) to avoid crowd peaks.',
            'Always check-in online exactly 24 hours prior to departure.'
          ],
          ctaText: 'Book Airport Cabs Now',
          ctaTab: 'cab'
        };
      case 2:
        return {
          category: 'Destinations',
          author: 'Priya Patel',
          date: 'May 08, 2026',
          readTime: '6 min read',
          intro: 'As summer peaks in India, escaping the scorching heat becomes top priority. May is the perfect month to pack your bags and head to the high-altitude hills or serene green valleys where the breeze is cool and the views are breathtaking.',
          paragraphs: [
            'Ladakh tops the list for May travelers. With the snow melting, the roads from Manali and Srinagar begin to open, revealing pristine lakes like Pangong Tso and the stunning Nubra Valley. It is an adventurer’s paradise with average temperatures hovering around a comfortable 15°C.',
            'If you prefer a quieter escape, Munnar in Kerala offers lush tea gardens shrouded in misty clouds. The plantation walks and spice garden tours are incredibly refreshing during the early morning hours.',
            'For families, Shimla and Manali remain classic favorites. Be sure to explore the Solang Valley for paragliding or take the toy train ride from Kalka to Shimla for a nostalgic slow-travel experience.'
          ],
          tips: [
            'Carry sunblock and sunglasses, as high-altitude sun can be intense.',
            'Acclimatize for 24-48 hours when visiting high-altitude regions like Leh.',
            'Book stays in advance as May is peak holiday season in India.'
          ],
          ctaText: 'Search Ladakh Hotels',
          ctaTab: 'hotels'
        };
      case 3:
        return {
          category: 'Winter Escapes',
          author: 'Vikram Singh',
          date: 'Feb 15, 2026',
          readTime: '5 min read',
          intro: 'February is the golden month of travel in India. The freezing winter chill begins to soften into pleasant spring air, making it the absolute best time for sightseeing, desert safaris, and heritage walks.',
          paragraphs: [
            'Udaipur, the city of lakes, is magical in February. The temperature is perfect for boat rides on Lake Pichola and romantic dinners overlooking the lit-up palaces. The annual heritage festivals also bring the city alive with folk dances and local arts.',
            'Further west, the golden sands of Jaisalmer beckon. Camping under the stars in the Sam Sand Dunes with traditional Rajasthani music and local cuisine is an experience that stays with you forever.',
            'If you love snow, Gulmarg in Jammu & Kashmir is still covered in deep white powder, offering world-class skiing and snowboarding runs via the famous Gondola cable car ride.'
          ],
          tips: [
            'Pack light layers as days are warm but desert nights can get cold.',
            'Try local winter delicacies like Gajar ka Halwa and Rajasthani Dal Baati Churma.',
            'Take a guided walking tour to discover the rich history of palace architectures.'
          ],
          ctaText: 'Browse Udaipur Holiday Packages',
          ctaTab: 'holidays'
        };
      case 4:
        return {
          category: 'Eco Tourism',
          author: 'Anjali Das',
          date: 'Jan 28, 2026',
          readTime: '7 min read',
          intro: 'Responsible travel is no longer just a trend—it is a necessity. Odisha’s state-backed Eco Retreats are leading the way, proving that luxury and absolute sustainability can coexist beautifully along nature’s edges.',
          paragraphs: [
            'Odisha’s Eco Retreats are situated across stunning locations, from the pristine marine drive of Konark to the deep forest biosphere of Bhitarkanika. These luxury glamping sites use biodegradable materials, solar energy, and local waste recycling systems to minimize footprint.',
            'Bhitarkanika Eco Retreat offers a unique look into one of Asia’s largest mangrove ecosystems, home to giant saltwater crocodiles and migratory birds. Kayaking through the creeks at sunrise is an unforgettable experience.',
            'Staying at these retreats directly supports local tribal communities, who are employed as guides, culinary chefs, and hospitality staff, preserving Odisha’s heritage while boosting the local economy.'
          ],
          tips: [
            'Avoid carry-on single-use plastics to eco-sensitive zones.',
            'Hire local naturalists for wildlife boat safaris.',
            'Experience the traditional Odissi cultural dances hosted at the campsites.'
          ],
          ctaText: 'Explore Nature Packages',
          ctaTab: 'holidays'
        };
      default:
        return {
          category: 'Celebrations',
          author: 'Arjun Mehta',
          date: 'Dec 10, 2025',
          readTime: '5 min read',
          intro: 'Ringing in the New Year deserves a special backdrop. Whether your vibe is a high-energy beach party or a silent night around a bonfire in the mountains, India offers incredible destinations to start your year with a bang.',
          paragraphs: [
            'Goa remains the undisputed king of New Year parties. The beaches of Anjuna and Vagator host legendary sun-downer festivals, while southern beaches like Palolem offer silent noise parties under the palm trees.',
            'If you prefer peace over parties, Gokarna in Karnataka is a serene alternative. The half-moon and paradise beaches offer clean sand, beach trekking, and quiet cafes to welcome the sunrise with meditation.',
            'For snow lovers, Manali’s log cabins and bonfires create the ultimate winter wonderland. Celebrate with hot spiced tea and live acoustic music as fresh snow falls outside.'
          ],
          tips: [
            'Book flights and stays at least 2 months in advance for New Year bookings.',
            'Opt for public transport or walk to avoid heavy traffic grids in Goa.',
            'Respect local culture and keep the beaches clean.'
          ],
          ctaText: 'Book Goa Hotels Now',
          ctaTab: 'hotels'
        };
    }
  };

  const details = getStoryContent(story.id);

  return (
    <div className="bg-zinc-50 min-h-screen pb-24 text-left">
      {/* Hero Banner Section */}
      <div className="relative h-[55vh] min-h-[400px] w-full overflow-hidden bg-zinc-950">
        <img 
          src={story.image} 
          alt={story.title} 
          className="w-full h-full object-cover opacity-70 scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Vignette gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/30" />
        
        {/* Top Floating Controls */}
        <div className="absolute top-6 left-0 right-0 z-30">
          <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 transition-all font-semibold text-sm cursor-pointer shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all cursor-pointer">
                <Heart className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all cursor-pointer">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Header content overlay at the bottom of hero */}
        <div className="absolute bottom-0 inset-x-0 pb-12 z-20">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            <span className="bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              {details.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
              {story.title}
            </h1>
            
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-6 text-zinc-300 text-xs font-medium pt-2">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-indigo-400" />
                <span>By {details.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{details.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>{details.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Article Body */}
        <div className="lg:col-span-8 space-y-6">
          <p className="text-zinc-800 text-lg leading-relaxed font-medium">
            {details.intro}
          </p>
          
          <div className="space-y-6 text-zinc-650 leading-relaxed text-base">
            {details.paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>

          {/* Quick tips callout */}
          <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-2xl p-6 mt-8 space-y-3">
            <h4 className="text-indigo-900 font-bold text-base flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <span>Pro Traveler Tips</span>
            </h4>
            <ul className="space-y-2 text-zinc-700 text-sm">
              {details.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="text-indigo-600 font-bold mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Sidebar Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Related Travel Action Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 text-left space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-650">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-zinc-900 text-base">Plan This Adventure</h4>
              <p className="text-xs text-zinc-500">Book your entire trip hassle-free on TolidayTrip with best prices guaranteed.</p>
            </div>
            <button 
              onClick={() => {
                onBack();
                onNavigateToBooking(details.ctaTab);
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-755 text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
            >
              {details.ctaText}
            </button>
          </motion.div>

          {/* Help Center CTA */}
          <div className="bg-zinc-900 text-white rounded-3xl p-6 shadow-sm space-y-3">
            <h5 className="font-bold text-sm">Need Help?</h5>
            <p className="text-xs text-zinc-400 leading-relaxed">Our support center operates 24/7. Reach out via the app or email us.</p>
            <p className="text-xs font-bold text-indigo-400">care@toliday.in</p>
          </div>
        </div>
      </div>
    </div>
  );
}
