import re

with open('./website/src/components/PromoBanners.tsx', 'r') as f:
    content = f.read()

new_props = """
interface PromoBannersProps {
  service?: string;
}

export default function PromoBanners({ service = 'home' }: PromoBannersProps) {
"""

content = content.replace("export default function PromoBanners() {", new_props)

data_logic = """
  let activeData = PROMO_DATA;
  if (service === 'flights') {
    activeData = [
      { id: 1, type: 'flight-sale', bgClass: 'bg-gradient-to-br from-blue-950 via-sky-900 to-blue-950', titleBadge: 'Mega', subtitleBadge: 'Flight Sale', discount: 'Flat 15% Off', description: 'On Domestic Flights.', cta: 'Book now', brandLogo: Sparkles },
      { id: 2, type: 'flight-baggage', bgClass: 'bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-950', bgImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=400', brandName: 'AIRLINES', title: 'Extra Baggage Allowance', cta: 'Claim Offer', brandLogo: Sparkles }
    ];
  } else if (service === 'bus') {
    activeData = [
      { id: 1, type: 'bus-sale', bgClass: 'bg-gradient-to-br from-green-950 via-emerald-900 to-green-950', titleBadge: 'Summer', subtitleBadge: 'Bus Sale', discount: 'Up to ₹500 off', description: 'On AC Sleeper Buses.', cta: 'Book now', brandLogo: Sparkles },
      { id: 2, type: 'bus-cashback', bgClass: 'bg-gradient-to-br from-teal-900 via-cyan-800 to-teal-950', bgImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400', brandName: 'VOLVO', title: 'Premium Comfort, Less Price', cta: 'View Deals', brandLogo: Sparkles }
    ];
  } else if (service === 'cab') {
    activeData = [
      { id: 1, type: 'cab-sale', bgClass: 'bg-gradient-to-br from-yellow-950 via-amber-900 to-yellow-950', titleBadge: 'City', subtitleBadge: 'Rides', discount: 'Flat ₹150 off', description: 'On Airport Drops.', cta: 'Book now', brandLogo: Sparkles },
      { id: 2, type: 'cab-outstation', bgClass: 'bg-gradient-to-br from-orange-900 via-red-800 to-orange-950', bgImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400', brandName: 'OUTSTATION', title: 'Weekend Getaways Made Easy', cta: 'Explore', brandLogo: Sparkles }
    ];
  } else if (service === 'holidays') {
    activeData = [
      { id: 1, type: 'holiday-sale', bgClass: 'bg-gradient-to-br from-rose-950 via-pink-900 to-rose-950', titleBadge: 'Family', subtitleBadge: 'Packages', discount: 'Get 2 Nights Free', description: 'On 5+ Night Stays.', cta: 'Book now', brandLogo: Sparkles },
      { id: 2, type: 'holiday-honeymoon', bgClass: 'bg-gradient-to-br from-fuchsia-900 via-purple-800 to-fuchsia-950', bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400', brandName: 'HONEYMOON', title: 'Romantic Getaways for Couples', cta: 'View Packages', brandLogo: Sparkles }
    ];
  }
"""

content = content.replace("  const scrollRef = useRef<HTMLDivElement>(null);", "  const scrollRef = useRef<HTMLDivElement>(null);\n" + data_logic)
content = content.replace("PROMO_DATA.map", "activeData.map")

with open('./website/src/components/PromoBanners.tsx', 'w') as f:
    f.write(content)

print("Done")
