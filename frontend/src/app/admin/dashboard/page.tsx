'use client';

import React from 'react';
import { 
       Activity, TrendingUp, Users, IndianRupee, 
       Building2, Map, Bus, CarFront, Download, ArrowUpRight,
       DollarSign, Clock, CalendarDays, ArrowDownRight, CheckCircle2, AlertCircle
} from 'lucide-react';
import Topbar from '@/components/layout/Topbar';

function AnimatedNumber({ value }: { value: number | string }) {
    return <span>{value}</span>;
}

function Sparkline({ points, color }: { points: number[]; color: string }) {
    if (!points || points.length === 0) return null;
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const height = 24;
    const width = 80;
    const padding = 2;
    
    const coordinates = points.map((p, i) => {
        const x = (i / (points.length - 1)) * (width - padding * 2) + padding;
        const y = height - ((p - min) / range) * (height - padding * 2) - padding;
        return `${x},${y}`;
    });
    
    const pathD = `M ${coordinates.join(' L ')}`;
    
    return (
        <svg className="w-20 h-6 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            <style>{`
                @keyframes drawPath {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>
            <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    strokeDasharray: 120,
                    strokeDashoffset: 120,
                    animation: 'drawPath 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                }}
            />
        </svg>
    );
}

export default function SuperDashboardPage() {
    const stats = [
        {
            label: "Total Gross Volume (TGV)",
            value: "₹2.4M",
            change: 'All time',
            up: true,
            icon: DollarSign,
            color: 'hsl(219 90% 50%)',
            bg: 'rgba(59,130,246,0.08)',
            glow: 'hover:shadow-[0_12px_30px_rgba(59,130,246,0.12)] border-blue-500/10',
            sparklinePoints: [30, 45, 35, 60, 50, 75, 90],
        },
        {
            label: 'Total Bookings',
            value: "12,492",
            change: 'Network wide',
            up: true,
            icon: CheckCircle2,
            color: 'hsl(142 71% 45%)',
            bg: 'rgba(16,185,129,0.08)',
            glow: 'hover:shadow-[0_12px_30px_rgba(16,185,129,0.12)] border-emerald-500/10',
            sparklinePoints: [50, 80, 120, 60, 100, 150, 120],
        },
        {
            label: 'Active Consumers',
            value: "24,591",
            change: 'Growing',
            up: true,
            icon: Users,
            color: 'hsl(38 92% 50%)',
            bg: 'rgba(245,158,11,0.08)',
            glow: 'hover:shadow-[0_12px_30px_rgba(245,158,11,0.12)] border-amber-500/10',
            sparklinePoints: [200, 250, 280, 240, 230, 260, 250],
        },
        {
            label: 'Net Platform Revenue',
            value: "₹360K",
            change: 'Calculated from 15% flat commission',
            up: true,
            icon: Activity,
            color: 'hsl(262 83% 58%)',
            bg: 'rgba(139,92,246,0.08)',
            glow: 'hover:shadow-[0_12px_30px_rgba(139,92,246,0.12)] border-violet-500/10',
            sparklinePoints: [20, 25, 28, 30, 32, 35, 38],
        }
    ];

    const [serviceFilter, setServiceFilter] = React.useState('Hotel');
    
    return (
        <div className="min-h-full">
            <Topbar title="Super Dashboard" subtitle="Global Intelligence and Platform-wide overview" />
            <div className="p-6 md:p-8 space-y-6 md:space-y-8 animate-fadeIn max-w-[1600px] mx-auto">
                
                {/* Global Filters */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <select 
                                value={serviceFilter}
                                onChange={(e) => setServiceFilter(e.target.value)}
                                className="appearance-none bg-white dark:bg-slate-900 border border-border/10 rounded-2xl px-5 py-2.5 pr-10 text-sm font-bold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                <option value="All">All Services</option>
                                <option value="Hotel">Hotel Operations</option>
                                <option value="Packages">Tour & Packages</option>
                                <option value="Buses">Bus Operations</option>
                                <option value="Cabs">Cab Operations</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid - iOS Widgets Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {stats.map((stat) => (
                        <div 
                            key={stat.label} 
                            className={`ios-platter p-5 rounded-[24px] flex flex-col justify-between hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.01)] border ${stat.glow}`}
                            style={{
                                background: 'linear-gradient(135deg, var(--card-bg-start, rgba(255,255,255,0.05)), var(--card-bg-end, rgba(255,255,255,0.02)))',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2.5 rounded-2xl flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]" style={{ background: stat.bg }}>
                                    <stat.icon size={16} style={{ color: stat.color }} />
                                </div>
                                <Sparkline points={stat.sparklinePoints} color={stat.color} />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1.5">{stat.label}</div>
                                <div className="text-xl md:text-2xl font-black tracking-tight text-foreground leading-none">
                                    <AnimatedNumber value={stat.value} />
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/5 dark:border-white/5">
                                    <div className="text-[10px] font-bold text-muted-foreground">
                                        {stat.change}
                                    </div>
                                    {stat.up !== null && (
                                        <div className={`flex items-center gap-0.5 text-[10px] font-extrabold ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {stat.up ? '+' : '-'}
                                            {stat.up ? <ArrowUpRight size={10} className="stroke-[3.5]" /> : <ArrowDownRight size={10} className="stroke-[3.5]" />}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Vertical Performance Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Vertical Performance Widget */}
                    <div className="ios-sheet p-6 rounded-[28px] border border-border/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-extrabold text-sm uppercase tracking-wider text-muted-foreground/60">Vertical Performance</h3>
                        </div>
                        <div className="divide-y divide-border/5">
                            {[
                                { name: 'Hotel Operations', filterKey: 'Hotel', icon: Building2, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10', rev: '₹1.2M', bookings: '5,230' },
                                { name: 'Tour Operations', filterKey: 'Packages', icon: Map, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', rev: '₹800K', bookings: '3,100' },
                                { name: 'Bus Operations', filterKey: 'Buses', icon: Bus, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', rev: '₹250K', bookings: '2,800' },
                                { name: 'Cab Operations', filterKey: 'Cabs', icon: CarFront, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10', rev: '₹150K', bookings: '1,362' },
                            ]
                            .filter(vert => serviceFilter === 'All' || vert.filterKey === serviceFilter)
                            .map((vert, i) => (
                                <div key={i} className="flex items-center justify-between py-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors rounded-xl px-2">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-2xl ${vert.bg} ${vert.color}`}>
                                            <vert.icon size={20} />
                                        </div>
                                        <div>
                                            <div className="font-black text-foreground text-sm">{vert.name}</div>
                                            <div className="text-xs font-bold text-muted-foreground mt-0.5">{vert.bookings} Bookings</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-foreground">{vert.rev}</div>
                                        <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
                                            <TrendingUp size={10} /> Growing
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Health Widget */}
                    <div className="ios-sheet p-6 rounded-[28px] border border-border/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)] relative overflow-hidden bg-indigo-600 dark:bg-indigo-900/50">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Activity size={200} className="text-white" />
                        </div>
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">System Health & Live Events</h3>
                        </div>
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between bg-white/10 dark:bg-black/20 p-4 rounded-2xl backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                    <span className="font-bold text-sm text-white">Booking API Node 1</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Operational</span>
                            </div>
                            <div className="flex items-center justify-between bg-white/10 dark:bg-black/20 p-4 rounded-2xl backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                    <span className="font-bold text-sm text-white">Payment Gateway (Stripe)</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Operational</span>
                            </div>
                            <div className="flex items-center justify-between bg-white/10 dark:bg-black/20 p-4 rounded-2xl backdrop-blur-md border border-amber-500/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                                    <span className="font-bold text-sm text-white">Redis Caching Layer</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">High Load</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

