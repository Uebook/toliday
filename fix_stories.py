import re

with open('./website/src/components/TravelStories.tsx', 'r') as f:
    content = f.read()

new_props = """
interface TravelStoriesProps {
  service?: string;
  onSelectStory: (story: Story) => void;
}

export default function TravelStories({ onSelectStory, service = 'home' }: TravelStoriesProps) {
"""

content = content.replace("export default function TravelStories({ onSelectStory }: { onSelectStory: (story: Story) => void }) {", new_props)

data_logic = """
  let activeData = STORIES_DATA;
  let sectionTitle = "India Travel Stories";
  let sectionSubtitle = "Explore the best of India with our curated travel stories";
  
  if (service === 'flights') {
    sectionTitle = "Flight & Airport Hacks";
    sectionSubtitle = "Tips for smooth flying and airport experiences";
    activeData = [
      { id: 1, title: 'Skip Airport Queues Like a Pro With This Hack', image: 'https://images.unsplash.com/photo-1530521951415-340479d0263f?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 2, title: 'How to Pack Carry-On Only for a 2-Week Trip', image: 'https://images.unsplash.com/photo-1551525211-1c0903330669?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 3, title: 'The Best Airport Lounges in India', image: 'https://images.unsplash.com/photo-1513681469550-9f5b61517cb8?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 4, title: 'What to Do If Your Flight is Delayed or Canceled', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 5, title: 'Tips for Sleeping Comfortably on Long Flights', image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&q=80&w=600', link: '#' }
    ];
  } else if (service === 'bus') {
    sectionTitle = "Road Travel Stories";
    sectionSubtitle = "Incredible journeys experienced on the road";
    activeData = [
      { id: 1, title: 'My Journey Through the Western Ghats by Bus', image: 'https://images.unsplash.com/photo-1477587458883-471a5ed94245?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 2, title: 'Why AC Sleeper Buses are the Best Way to Travel', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 3, title: 'Top 10 Scenic Bus Routes in South India', image: 'https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 4, title: 'A Guide to Night Travel in Volvo Buses', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 5, title: 'Exploring Rajasthan on a Budget via Buses', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=600', link: '#' }
    ];
  } else if (service === 'cab') {
    sectionTitle = "Road Trips & Cab Rides";
    sectionSubtitle = "Weekend getaways and memorable cab experiences";
    activeData = [
      { id: 1, title: 'The Ultimate Mumbai to Pune Weekend Road Trip', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 2, title: 'How to Book Safe Airport Drops at Odd Hours', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 3, title: 'Exploring the Hills: Delhi to Shimla by Cab', image: 'https://images.unsplash.com/photo-1521330784804-5f69f8a17b1d?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 4, title: 'Benefits of Hiring Outstation Cabs Over Driving', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 5, title: 'Best Stopovers on the Bangalore-Mysore Highway', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600', link: '#' }
    ];
  } else if (service === 'holidays') {
    sectionTitle = "Inspiring Holiday Packages";
    sectionSubtitle = "Curated itineraries to inspire your next vacation";
    activeData = [
      { id: 1, title: 'A 5-Day Itinerary for the Perfect Bali Honeymoon', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 2, title: 'Why Kerala is the Ultimate Family Holiday Destination', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 3, title: 'Top 10 International Destinations for Indian Travelers', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 4, title: 'Exploring the Pristine Beaches of Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600', link: '#' },
      { id: 5, title: 'Winter in Kashmir: What to Pack and Expect', image: 'https://images.unsplash.com/photo-1566837497312-7c701bcbf71b?auto=format&fit=crop&q=80&w=600', link: '#' }
    ];
  }
"""

content = content.replace("  const scrollRef = useRef<HTMLDivElement>(null);", "  const scrollRef = useRef<HTMLDivElement>(null);\n" + data_logic)
content = content.replace("STORIES_DATA.map", "activeData.map")
content = content.replace("India Travel Stories", "{sectionTitle}")
content = content.replace("Explore the best of India with our curated travel stories", "{sectionSubtitle}")

with open('./website/src/components/TravelStories.tsx', 'w') as f:
    f.write(content)

print("Done stories")
