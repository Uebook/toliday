import os

filepath = "/Users/vansh/Toliday/Extranetportel/website/src/components/FlightList.tsx"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

target_signature = "suggestDate2.setDate(suggestDate2.getDate() + 2);"

start_idx = content.find(target_signature)
if start_idx == -1:
    print("Error: target_signature not found")
    exit(1)

end_idx = content.find("// Airline Logos Stylers")
if end_idx == -1:
    print("Error: getAirlineColor not found")
    exit(1)

middle_content = """
  const suggestDate2Str = suggestDate2.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });

  return (
    <div className="py-12 bg-white rounded-3xl border border-dashed border-zinc-200 text-center px-6 shadow-sm">
      <AlertCircle className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
      <h4 className="font-bold text-zinc-950 text-xs">No Flights Found on this Date</h4>
      <p className="text-[10px] text-zinc-400 font-medium mt-1">Try filtering by other carriers or search adjacent dates:</p>
      <div className="flex gap-2 justify-center mt-4">
        <button type="button" className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-650 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors">
          {suggestDate1Str} (+₹200)
        </button>
        <button type="button" className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-655 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors">
          {suggestDate2Str} (-₹100)
        </button>
      </div>
    </div>
  );
}

function DateCarousel({
  selectedDate,
  onChangeDate,
  minDate
}: {
  selectedDate: string;
  onChangeDate: (dateStr: string) => void;
  minDate?: Date;
}) {
  const today = minDate || new Date();
  today.setHours(0, 0, 0, 0);

  // Visible window start date state
  const [startDate, setStartDate] = useState<Date>(() => {
    const current = new Date(selectedDate);
    const start = new Date(current);
    start.setDate(start.getDate() - 4); // Shift so current selected is roughly centered
    return start < today ? today : start;
  });

  // Keep carousel starting date in sync with changes to selectedDate
  useEffect(() => {
    const current = new Date(selectedDate);
    const start = new Date(current);
    start.setDate(start.getDate() - 4);
    setStartDate(start < today ? today : start);
  }, [selectedDate, today.getTime()]);

  // We want to show a fixed window of 9 days (Fri, Sat, Sun, Mon, Tue, Wed, Thu, Fri, Sat)
  const visibleDays = 9;
  const dates: Date[] = [];
  for (let i = 0; i < visibleDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    dates.push(d);
  }

  const handlePrev = () => {
    setStartDate(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 1);
      return next < today ? today : next;
    });
  };

  const handleNext = () => {
    setStartDate(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      return next;
    });
  };

  const formatDateLabel = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });
  };

  const formatDateValue = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getPrice = (date: Date) => {
    const dayOfWeek = date.getDay();
    const basePrices = [8968, 7429, 7140, 7562, 6628, 7057, 7601];
    const variation = (date.getDate() % 3) * 150 - 100;
    return basePrices[dayOfWeek] + variation;
  };

  return (
    <div className="bg-white border-t border-b border-zinc-200 py-1.5 flex items-center justify-between select-none relative w-full">
      {/* Left Arrow */}
      <button 
        type="button"
        onClick={handlePrev}
        className="w-10 h-14 flex items-center justify-center text-zinc-850 hover:text-zinc-555 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
        disabled={startDate.getTime() <= today.getTime()}
      >
        <svg className="w-6 h-6 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Date list */}
      <div className="flex-1 flex justify-between items-stretch overflow-x-auto no-scrollbar gap-1 mx-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {dates.map((date, idx) => {
          const dateVal = formatDateValue(date);
          const isSelected = dateVal === selectedDate;
          const price = getPrice(date);
          
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChangeDate(dateVal)}
              className={`flex-1 min-w-[85px] md:min-w-[105px] flex flex-col items-center justify-center py-2 px-1 relative transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? 'text-blue-600 font-bold' 
                  : 'text-zinc-650 hover:text-zinc-900'
              }`}
            >
              <span className={`text-[11px] md:text-xs font-semibold ${isSelected ? 'text-blue-600' : 'text-zinc-500'}`}>
                {formatDateLabel(date)}
              </span>
              <span className={`text-[12px] md:text-sm font-extrabold mt-1 ${isSelected ? 'text-blue-600' : 'text-zinc-755'}`}>
                ₹{price.toLocaleString('en-IN')}
              </span>
              {/* Underline for active state */}
              {isSelected && (
                <div className="absolute bottom-0 left-1 right-1 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button 
        type="button"
        onClick={handleNext}
        className="w-10 h-14 flex items-center justify-center text-zinc-800 hover:text-zinc-555 transition-colors cursor-pointer shrink-0"
      >
        <svg className="w-6 h-6 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

"""

new_content = content[:start_idx + len(target_signature)] + middle_content + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Success: FlightList.tsx fixed successfully!")
