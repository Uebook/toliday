import re

with open('./website/src/components/Hero.tsx', 'r') as f:
    content = f.read()

# Add useEffect to update activeService
use_effect_code = """
  const [activeService, setActiveService] = useState<ServiceType>(defaultService || 'hotels');
  
  useEffect(() => {
    if (defaultService) {
      setActiveService(defaultService);
    }
  }, [defaultService]);
"""

content = content.replace("  const [activeService, setActiveService] = useState<ServiceType>(defaultService || 'hotels');", use_effect_code)

with open('./website/src/components/Hero.tsx', 'w') as f:
    f.write(content)

print("Done")
