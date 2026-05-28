import re

with open('./website/src/App.tsx', 'r') as f:
    content = f.read()

# 1. Update the condition
content = content.replace(
    "{view === 'home' || view === 'flights' ? (",
    "{['home', 'hotels', 'flights', 'bus', 'cab', 'holidays'].includes(view) ? ("
)

# 2. Update defaultService
content = content.replace(
    "defaultService={view === 'flights' ? 'flights' : 'hotels'}",
    "defaultService={['home', 'hotels'].includes(view) ? 'hotels' : view === 'cab' ? 'cabs' : view as any}"
)

# 3. Remove standalone blocks
blocks_to_remove = [
    r"\s*\) : view === 'hotels' \? \([\s\S]*?<HotelBooking[\s\S]*?/>\s*</motion\.div>",
    r"\s*\) : view === 'bus' \? \([\s\S]*?<BusBooking[\s\S]*?/>\s*</motion\.div>",
    r"\s*\) : view === 'cab' \? \([\s\S]*?<CabBooking[\s\S]*?/>\s*</motion\.div>",
    r"\s*\) : view === 'holidays' \? \([\s\S]*?<HolidayBooking[\s\S]*?/>\s*</motion\.div>"
]

for block in blocks_to_remove:
    content = re.sub(block, "", content)

with open('./website/src/App.tsx', 'w') as f:
    f.write(content)

print("Done")
