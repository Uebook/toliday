'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import Topbar from '@/components/layout/Topbar';
import { ArrowLeft, Clock, LogIn, LogOut, CheckCircle2, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function StaffAttendancePage() {
    const queryClient = useQueryClient();
    const [selectedStaff, setSelectedStaff] = useState('');

    // Fetch staff list
    const { data: staffList = [], isLoading: staffLoading } = useQuery({
        queryKey: ['hotel-staff'],
        queryFn: async () => {
            const profileRes = await api.get('/hotel/my-hotel');
            const hotelId = profileRes.data.id;
            const res = await api.get(`/staff?hotelId=${hotelId}`);
            return res.data;
        }
    });

    // Fetch attendance logs
    const { data: logs = [], isLoading: logsLoading } = useQuery({
        queryKey: ['staff-attendance-logs'],
        queryFn: async () => {
            const res = await api.get('/staff/attendance/all');
            return res.data;
        }
    });

    // Clock Mutation
    const clockMutation = useMutation({
        mutationFn: async (vars: { staffId: string; action: 'IN' | 'OUT' }) => {
            return api.post('/staff/attendance/clock', vars);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff-attendance-logs'] });
            setSelectedStaff('');
            alert('Attendance logged successfully!');
        },
        onError: (err: any) => {
            alert(err.response?.data?.message || 'Failed to log attendance');
        }
    });

    const handleClock = (action: 'IN' | 'OUT') => {
        if (!selectedStaff) {
            alert('Please select a staff member.');
            return;
        }
        clockMutation.mutate({ staffId: selectedStaff, action });
    };

    if (staffLoading || logsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 size={32} className="animate-spin text-[hsl(var(--accent))]" />
            </div>
        );
    }

    return (
        <div>
            <Topbar title="Staff Attendance Roster" subtitle="Log daily clock-ins and clock-outs" />
            <div className="p-6 space-y-6 animate-fadeIn max-w-[1200px] mx-auto">
                <div className="flex items-center">
                    <Link href="/hotel/staff" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[hsl(var(--foreground))] text-[hsl(var(--muted-foreground))]">
                        <ArrowLeft size={16} /> Back to Staff Management
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Log Card */}
                    <div className="glass-card p-6 space-y-6 h-fit">
                        <h3 className="font-semibold text-lg text-[hsl(var(--foreground))] flex items-center gap-2">
                            <Clock size={20} className="text-[hsl(var(--accent))]" /> Log Clock-In/Out
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1.5">Select Staff Member</label>
                                <select 
                                    value={selectedStaff}
                                    onChange={(e) => setSelectedStaff(e.target.value)}
                                    className="form-input w-full bg-[var(--table-header)]"
                                >
                                    <option value="">Choose Staff...</option>
                                    {staffList.map((st: any) => (
                                        <option key={st.id} value={st.id}>{st.name} ({st.role})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <button 
                                    onClick={() => handleClock('IN')}
                                    disabled={clockMutation.isPending}
                                    className="px-4 py-3 rounded-xl border border-green-500/20 bg-green-500/10 text-green-500 hover:bg-green-500/15 flex items-center justify-center gap-2 font-bold text-sm disabled:opacity-50"
                                >
                                    <LogIn size={16} /> Clock In
                                </button>
                                <button 
                                    onClick={() => handleClock('OUT')}
                                    disabled={clockMutation.isPending}
                                    className="px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/15 flex items-center justify-center gap-2 font-bold text-sm disabled:opacity-50"
                                >
                                    <LogOut size={16} /> Clock Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* History Table */}
                    <div className="lg:col-span-2 glass-card overflow-hidden">
                        <div className="p-6 border-b border-[var(--glass-border-light)]">
                            <h3 className="font-semibold text-lg text-[hsl(var(--foreground))]">Attendance History</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[var(--table-header)] border-b border-[var(--glass-border)] text-[hsl(var(--muted-foreground))] text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Staff Member</th>
                                        <th className="px-6 py-4 font-bold">Clock In</th>
                                        <th className="px-6 py-4 font-bold">Clock Out</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log: any) => (
                                        <tr key={log.id} className="border-b border-[var(--glass-border)] hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-[hsl(var(--accent))/0.1] text-[hsl(var(--accent))] flex items-center justify-center font-bold text-xs uppercase">
                                                        {log.staff?.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm">{log.staff?.name}</p>
                                                        <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase font-bold">{log.staff?.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-semibold">{log.clockIn ? new Date(log.clockIn).toLocaleString() : '-'}</td>
                                            <td className="px-6 py-4 text-xs font-semibold">{log.clockOut ? new Date(log.clockOut).toLocaleString() : <span className="text-green-500 font-bold">Active Shift</span>}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-bold">{log.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {logs.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-center py-10 text-[hsl(var(--muted-foreground))]">No attendance logs found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
