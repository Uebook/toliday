import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    value: string;
    onChange: (val: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder = 'Select...', className = '' }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between bg-[var(--table-header)] border ${isOpen ? 'border-[hsl(var(--accent))] ring-2 ring-[hsl(var(--accent)/0.2)]' : 'border-[var(--glass-border)] hover:border-[hsl(var(--accent))]'} rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:border-[hsl(var(--accent))]`}
            >
                <span className={`block truncate ${selectedOption ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown size={16} className={`flex-shrink-0 text-[hsl(var(--muted-foreground))] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-[hsl(var(--background))] border border-[var(--glass-border)] rounded-xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => { onChange(option.value); setIsOpen(false); }}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-[hsl(var(--accent)/0.1)] hover:text-[hsl(var(--accent))] transition-colors"
                            >
                                <span className="block truncate">{option.label}</span>
                                {value === option.value && <Check size={16} className="text-[hsl(var(--accent))]" />}
                            </button>
                        ))}
                        {options.length === 0 && (
                            <div className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))] text-center">No options available</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
