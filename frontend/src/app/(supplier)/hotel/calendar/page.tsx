'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import Topbar from '@/components/layout/Topbar';
import { ChevronLeft, ChevronRight, Calendar, Users, MoveRight, Loader2, Info } from 'lucide-react';
import { useState, useMemo } from 'react';
import {
    format, addMonths, subMonths, startOfMonth, endOfMonth,
    eachDayOfInterval, getDay, addDays, differenceInCalendarDays, parseISO
} from 'date-fns';

export default function ReservationCalendarPage() {
    const queryClient = useQueryClient();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Fetch Bookings
    const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await api.get('/bookings');
            return res.data;
        }
    });

    // Fetch Room Types
    const { data: rooms = [], isLoading: roomsLoading } = useQuery({
        queryKey: ['room-types'],
        queryFn: async () => {
            const res = await api.get('/room-types');
            return res.data;
        }
    });

    // Date calculations for calendar grid
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const dateRange = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Empty spaces for padding at start of month
    const startPadding = getDay(monthStart);

    // Mutation to update booking date
    const updateBookingDateMutation = useMutation({
        mutationFn: async (vars: { id: string; startDate: string; endDate: string }) => {
            return api.patch(`/bookings/${vars.id}`, {
                startDate: vars.startDate,
                endDate: vars.endDate
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            alert('Booking dates reallocated successfully!');
        },
        onError: (err: any) => {
            alert(err.response?.data?.message || 'Failed to update booking dates');
        }
    });

    // Drag and Drop handlers
    const handleDragStart = (e: React.DragEvent, bookingId: string) => {
        e.dataTransfer.setData('bookingId', bookingId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetDate: Date) => {
        e.preventDefault();
        const bookingId = e.dataTransfer.getData('bookingId');
        if (!bookingId) return;

        const booking = bookings.find((b: any) => b.id === bookingId);
        if (!booking) return;

        // Calculate same duration in days
        const start = parseISO(booking.startDate);
        const end = parseISO(booking.endDate);
        const duration = differenceInCalendarDays(end, start);

        const newStartStr = format(targetDate, 'yyyy-MM-dd');
        const newEndStr = format(addDays(targetDate, duration), 'yyyy-MM-dd');

        if (confirm(`Move stay for ${booking.guestName} to start on ${newStartStr} (Ending ${newEndStr})?`)) {
            updateBookingDateMutation.mutate({
                id: bookingId,
                startDate: newStartStr,
                endDate: newEndStr
            });
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // Filter active bookings on a day
    const getBookingsForDay = (date: Date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return bookings.filter((b: any) => b.startDate === dateStr && b.status !== 'CANCELLED');
    };

    if (bookingsLoading || roomsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 size={32} className="animate-spin text-[hsl(var(--accent))]" />
            </div>
        );
    }

    return (
        <div>
            <Topbar title="Reservation Calendar" subtitle="Monthly drag & drop booking layout and allocation" />
            <div className="p-6 space-y-6 animate-fadeIn">
                {/* Legend & Month Select */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-lg hover:bg-[var(--table-header)] border border-[var(--glass-border)]">
                            <ChevronLeft size={18} />
                        </button>
                        <span className="font-bold text-lg min-w-[150px] text-center">
                            {format(currentMonth, 'MMMM yyyy')}
                        </span>
                        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-lg hover:bg-[var(--table-header)] border border-[var(--glass-border)]">
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/40"></div>
                            <span>Pending</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                            <span>Confirmed / In House</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-zinc-500/20 border border-zinc-500/40"></div>
                            <span>Checked Out</span>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="glass-card p-5">
                    <div className="grid grid-cols-7 gap-2 mb-4 text-center text-xs font-bold text-[hsl(var(--muted-foreground))] uppercase">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {/* Start padding */}
                        {Array.from({ length: startPadding }).map((_, i) => (
                            <div key={`pad-${i}`} className="min-h-[120px] rounded-xl bg-black/5 opacity-30 border border-dashed border-[var(--glass-border)]" />
                        ))}

                        {/* Month days */}
                        {dateRange.map((date) => {
                            const dayBookings = getBookingsForDay(date);
                            return (
                                <div
                                    key={date.toString()}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, date)}
                                    className="min-h-[120px] rounded-xl p-2 border border-[var(--glass-border-light)] bg-white/5 flex flex-col justify-between hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs font-bold text-[hsl(var(--foreground))]">{format(date, 'd')}</span>
                                        {dayBookings.length > 0 && (
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                                                {dayBookings.length} Bookings
                                            </span>
                                        )}
                                    </div>

                                    {/* Bookings Blocks */}
                                    <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[85px] scrollbar-thin">
                                        {dayBookings.map((b: any) => {
                                            const statusClass = b.status === 'PENDING' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                                                                b.status === 'CHECKED_OUT' ? 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400' :
                                                                'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
                                            return (
                                                <div
                                                    key={b.id}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, b.id)}
                                                    className={`p-1.5 rounded-lg border text-[10px] font-bold cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform ${statusClass}`}
                                                    title={`${b.guestName} (${b.roomType?.name || 'Room'})`}
                                                >
                                                    <div className="truncate">{b.guestName}</div>
                                                    <div className="opacity-75 truncate text-[9px] mt-0.5">{b.roomType?.name}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="glass-card p-4 flex items-center gap-3">
                    <Info size={16} className="text-indigo-400 shrink-0" />
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        <strong>Tip:</strong> Drag and drop any booking card to another day to instantly reallocate its check-in date. The system automatically preserves the number of nights.
                    </p>
                </div>
            </div>
        </div>
    );
}
