import re

with open('./website/src/components/IndiaDestinations.tsx', 'r') as f:
    content = f.read()

new_props = """
interface IndiaDestinationsProps {
  service?: string;
  onSelectDestination: (dest: any) => void;
}

export default function IndiaDestinations({ onSelectDestination, service = 'home' }: IndiaDestinationsProps) {
"""

content = content.replace("export default function IndiaDestinations({ onSelectDestination }: { onSelectDestination: (dest: any) => void }) {", new_props)

data_logic = """
  let activeData = INDIA_DATA;
  let sectionTitle = "Explore India's Best Stays";
  let sectionSubtitle = "These popular destinations have a lot to offer";
  
  if (service === 'flights') {
    sectionTitle = "Popular Flight Routes";
    sectionSubtitle = "Most booked domestic and international flights";
    activeData = [
      { id: 1, name: 'Delhi to Mumbai', accommodations: '50+ flights daily', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=400' },
      { id: 2, name: 'Bangalore to Delhi', accommodations: '45+ flights daily', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=400' },
      { id: 3, name: 'Mumbai to Goa', accommodations: '30+ flights daily', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=400' },
      { id: 4, name: 'Delhi to Dubai', accommodations: '20+ flights daily', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400' },
      { id: 5, name: 'Hyderabad to Chennai', accommodations: '25+ flights daily', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&q=80&w=400' },
      { id: 6, name: 'Kolkata to Bangalore', accommodations: '15+ flights daily', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&q=80&w=400' },
    ];
  } else if (service === 'bus') {
    sectionTitle = "Trending Bus Routes";
    sectionSubtitle = "Comfortable AC sleeper buses for your journey";
    activeData = [
      { id: 1, name: 'Delhi to Jaipur', accommodations: '40+ buses daily', image: 'https://images.unsplash.com/photo-1477587458883-471a5ed94245?auto=format&fit=crop&q=80&w=400' },
      { id: 2, name: 'Bangalore to Hyderabad', accommodations: '35+ buses daily', image: 'https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&q=80&w=400' },
      { id: 3, name: 'Mumbai to Pune', accommodations: '100+ buses daily', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=400' },
      { id: 4, name: 'Chennai to Coimbatore', accommodations: '25+ buses daily', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&q=80&w=400' },
      { id: 5, name: 'Delhi to Manali', accommodations: '15+ buses daily', image: 'https://images.unsplash.com/photo-1605649487212-4dcb18000c8c?auto=format&fit=crop&q=80&w=400' },
      { id: 6, name: 'Pune to Goa', accommodations: '20+ buses daily', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=400' },
    ];
  } else if (service === 'cab') {
    sectionTitle = "Popular Cab Routes";
    sectionSubtitle = "Reliable outstation rides and airport drops";
    activeData = [
      { id: 1, name: 'Mumbai Airport', accommodations: 'Available 24/7', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=400' },
      { id: 2, name: 'Delhi to Agra', accommodations: 'Round trip offers', image: 'https://images.unsplash.com/photo-1564507592224-2fc3317c7689?auto=format&fit=crop&q=80&w=400' },
      { id: 3, name: 'Bangalore Airport', accommodations: 'Available 24/7', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=400' },
      { id: 4, name: 'Pune to Mahabaleshwar', accommodations: 'Round trip offers', image: 'https://images.unsplash.com/photo-1623131754021-3fc5f09cbba0?auto=format&fit=crop&q=80&w=400' },
      { id: 5, name: 'Chandigarh to Shimla', accommodations: 'Round trip offers', image: 'https://images.unsplash.com/photo-1521330784804-5f69f8a17b1d?auto=format&fit=crop&q=80&w=400' },
      { id: 6, name: 'Chennai to Pondicherry', accommodations: 'Round trip offers', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&q=80&w=400' },
    ];
  } else if (service === 'holidays') {
    sectionTitle = "Top Holiday Packages";
    sectionSubtitle = "Curated experiences for your perfect getaway";
    activeData = [
      { id: 1, name: 'Kashmir', accommodations: '5 Nights / 6 Days', image: 'https://images.unsplash.com/photo-1566837497312-7c701bcbf71b?auto=format&fit=crop&q=80&w=400' },
      { id: 2, name: 'Kerala', accommodations: '4 Nights / 5 Days', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=400' },
      { id: 3, name: 'Goa', accommodations: '3 Nights / 4 Days', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=400' },
      { id: 4, name: 'Maldives', accommodations: '4 Nights / 5 Days', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=400' },
      { id: 5, name: 'Dubai', accommodations: '5 Nights / 6 Days', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400' },
      { id: 6, name: 'Bali', accommodations: '6 Nights / 7 Days', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400' },
    ];
  }
"""

content = content.replace("  const scrollRef = useRef<HTMLDivElement>(null);", "  const scrollRef = useRef<HTMLDivElement>(null);\n" + data_logic)
content = content.replace("INDIA_DATA.map", "activeData.map")
content = content.replace("Explore India's Best Stays", "{sectionTitle}")
content = content.replace("These popular destinations have a lot to offer", "{sectionSubtitle}")

with open('./website/src/components/IndiaDestinations.tsx', 'w') as f:
    f.write(content)

print("Done destinations")
