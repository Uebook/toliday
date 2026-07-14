import re
import os

components = [
    'Hero.tsx',
    'IndiaDestinations.tsx',
    'PromoBanners.tsx',
    'FeaturedHomes.tsx',
    'OutsideDestinations.tsx',
    'AppDownload.tsx',
    'TravelStories.tsx',
    'TrustSection.tsx',
    'AboutSection.tsx'
]

directory = 'website/src/components/'

def process_file(filename):
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        return
        
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace overly rounded corners
    content = re.sub(r'rounded-\[2\.5rem\]', 'rounded-xl', content)
    content = re.sub(r'rounded-\[3rem\]', 'rounded-xl', content)
    content = re.sub(r'rounded-\[2rem\]', 'rounded-lg', content)
    content = re.sub(r'rounded-3xl', 'rounded-xl', content)
    
    # We won't blindly replace rounded-2xl because some cards might actually need it,
    # but we can replace it for input fields or buttons if we find it. 
    # For now, let's keep rounded-2xl as rounded-xl for generic divs.
    content = re.sub(r'(<div[^>]*className="[^"]*)rounded-2xl', r'\1rounded-xl', content)
    content = re.sub(r'(<button[^>]*className="[^"]*)rounded-2xl', r'\1rounded-lg', content)
    content = re.sub(r'(<input[^>]*className="[^"]*)rounded-2xl', r'\1rounded-md', content)

    # Replace heavy blurry shadows
    content = re.sub(r'shadow-2xl', 'shadow-md', content)
    content = re.sub(r'shadow-xl', 'shadow-md', content)
    content = re.sub(r'shadow-indigo-\d+(/\d+)?', '', content)
    content = re.sub(r'shadow-brand-orange-\d+(/\d+)?', '', content)
    content = re.sub(r'shadow-emerald-\d+(/\d+)?', '', content)
    content = re.sub(r'shadow-blue-\d+(/\d+)?', '', content)

    # Standardize specific generic colors used in AI designs
    content = re.sub(r'bg-indigo-600', 'bg-blue-600', content)
    content = re.sub(r'bg-indigo-700', 'bg-blue-700', content)
    content = re.sub(r'text-indigo-600', 'text-blue-600', content)
    content = re.sub(r'bg-indigo-50\b', 'bg-blue-50', content)
    content = re.sub(r'border-indigo-100', 'border-blue-100', content)
    content = re.sub(r'focus:ring-indigo-500/10', 'focus:ring-blue-500/20', content)
    
    # Tweak typography
    content = re.sub(r'font-display\s+', '', content)
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Processed {filename}")

for comp in components:
    process_file(comp)

print("Home components style cleanup done!")
