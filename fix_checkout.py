import re

with open('website/src/components/CheckoutFlow.tsx', 'r') as f:
    content = f.read()

# Replace overly rounded corners
content = re.sub(r'rounded-\[2\.5rem\]', 'rounded-xl', content)
content = re.sub(r'rounded-\[3rem\]', 'rounded-xl', content)
content = re.sub(r'rounded-\[2rem\]', 'rounded-lg', content)
content = re.sub(r'rounded-3xl', 'rounded-xl', content)
content = re.sub(r'rounded-2xl', 'rounded-md', content)

# Replace heavy shadows
content = re.sub(r'shadow-2xl', 'shadow-sm', content)
content = re.sub(r'shadow-xl', 'shadow-sm', content)
content = re.sub(r'shadow-lg', 'shadow-sm', content)
content = re.sub(r'shadow-indigo-\d+(/\d+)?', '', content)
content = re.sub(r'shadow-brand-orange-\d+(/\d+)?', '', content)
content = re.sub(r'shadow-emerald-\d+(/\d+)?', '', content)
content = re.sub(r'shadow-zinc-\d+(/\d+)?', '', content)

# Reduce huge paddings on inputs and buttons
content = re.sub(r'py-5', 'py-3.5', content)
content = re.sub(r'py-4\b', 'py-2.5', content)
content = re.sub(r'p-8\b', 'p-6', content)
content = re.sub(r'p-10\b', 'p-6', content)

# Standardize colors to blue-600/brand-orange for a more professional look
content = re.sub(r'bg-indigo-600', 'bg-blue-600', content)
content = re.sub(r'bg-indigo-700', 'bg-blue-700', content)
content = re.sub(r'text-indigo-600', 'text-blue-600', content)
content = re.sub(r'bg-indigo-50\b', 'bg-blue-50', content)
content = re.sub(r'focus:ring-indigo-500/10', 'focus:ring-blue-500/20', content)
content = re.sub(r'border-indigo-100', 'border-blue-100', content)
content = re.sub(r'border-indigo-200', 'border-blue-200', content)

# Tweak typography
content = re.sub(r'font-display\s+', '', content)
content = re.sub(r'text-3xl', 'text-2xl', content)

with open('website/src/components/CheckoutFlow.tsx', 'w') as f:
    f.write(content)

print("CheckoutFlow updated!")
