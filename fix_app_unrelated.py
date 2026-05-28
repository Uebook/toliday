import re

with open('./website/src/App.tsx', 'r') as f:
    content = f.read()

# Wrap TrustSection
content = content.replace("<TrustSection />", "{view === 'home' && <TrustSection />}")

# Wrap FeaturedHomes
featured_homes_pattern = r"(<FeaturedHomes[\s\S]*?/>)"
content = re.sub(featured_homes_pattern, r"{view === 'home' && (\n              \1\n            )}", content)

# Wrap OutsideDestinations
content = content.replace("<OutsideDestinations onSelectDestination={() => setView('hotel-list')} />", "{view === 'home' && <OutsideDestinations onSelectDestination={() => setView('hotel-list')} />}")

# Wrap AppDownload
content = content.replace("<AppDownload />", "{view === 'home' && <AppDownload />}")

# Wrap AboutSection
content = content.replace("<AboutSection />", "{view === 'home' && <AboutSection />}")

with open('./website/src/App.tsx', 'w') as f:
    f.write(content)

print("Done")
