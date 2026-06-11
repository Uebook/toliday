'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import DataTable from '@/components/admin/DataTable';
import {
       Calendar, CheckCircle, XCircle, Clock,
       Bus, Download
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function BusesBookingsPage() {
       const queryClient = useQueryClient();
       const [search, setSearch] = useState('');

       const { data: bookings = [], isLoading } = useQuery({
              queryKey: ['buses-bookings'],
              queryFn: async () => {
                     const res = await api.get('/bookings/admin/all');
                     // Note: In real app, endpoint should be filtered by vertical
                     return res.data.filter((b: any) => b.buseId);
              }
       });

       const updateStatusMutation = useMutation({
              mutationFn: async ({ id, status }: { id: string, status: string }) => {
                     return api.patch(`/bookings/${id}/status`, { status });
              },
              onSuccess: () => {
                     queryClient.invalidateQueries({ queryKey: ['buses-bookings'] });
                     toast.success('Booking status updated successfully');
              }
       });

       const filteredBookings = bookings.filter((b: any) =>
              (b.guestName || '').toLowerCase().includes(search.toLowerCase()) ||
              (b.bookingReference || '').toLowerCase().includes(search.toLowerCase())
       );

       const columns = [
              {
                     header: 'Guest Info',
                     accessor: 'guestName',
                     render: (booking: any) => (
                            <div>
                                   <div className="font-black text-slate-900 text-sm">{booking.guestName}</div>
                                   <div className="text-xs text-slate-500 font-bold mt-1">{booking.guestEmail}</div>
                                   <div className="text-[10px] text-amber-500 font-black uppercase tracking-widest mt-1">Ref: {booking.bookingReference}</div>
                            </div>
                     )
              },
              {
                     header: 'Property Details',
                     accessor: 'vendor',
                     render: (booking: any) => (
                            <div className="flex items-center gap-3">
                                   <div className="p-2 rounded-lg bg-amber-50 text-amber-500">
                                          <Bus size={16} />
                                   </div>
                                   <div>
                                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">HOTEL</div>
                                          <div className="text-xs font-bold text-slate-700 truncate max-w-[150px]">{booking.buse?.name || 'Unknown Property'}</div>
                                   </div>
                            </div>
                     )
              },
              {
                     header: 'Stay Dates',
                     accessor: 'dates',
                     render: (booking: any) => (
                            <div>
                                   <div className="text-sm font-bold text-slate-700">{new Date(booking.startDate).toLocaleDateString()}</div>
                                   <div className="text-xs text-slate-400 font-bold mt-1">to {new Date(booking.endDate).toLocaleDateString()}</div>
                            </div>
                     )
              },
              {
                     header: 'Booking Value',
                     accessor: 'totalAmount',
                     render: (booking: any) => (
                            <div className="text-sm font-black text-slate-900">${booking.totalAmount}</div>
                     )
              },
              {
                     header: 'Status',
                     accessor: 'status',
                     render: (booking: any) => (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest
                                   ${booking.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600' : ''}
                                   ${booking.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : ''}
                                   ${booking.status === 'CANCELLED' ? 'bg-red-50 text-red-600' : ''}
                            `}>
                                   {booking.status === 'CONFIRMED' && <CheckCircle size={12} />}
                                   {booking.status === 'PENDING' && <Clock size={12} />}
                                   {booking.status === 'CANCELLED' && <XCircle size={12} />}
                                   {booking.status}
                            </div>
                     )
              }
       ];

       const actions = (booking: any) => {
              if (booking.status === 'CANCELLED') return null;
              return (
                     <button
                            onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'CANCELLED' })}
                            disabled={updateStatusMutation.isPending}
                            className="px-4 py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                     >
                            Cancel
                     </button>
              );
       };

       const headerAction = (
              <button className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-amber-600/20 active:scale-95 group">
                     <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Export Report
              </button>
       );

       return (
              <div className="p-8 lg:p-12 animate-fadeIn space-y-8">
                     <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                   <div className="flex items-center gap-3 mb-2">
                                          <div className="p-2 bg-amber-600 rounded-xl text-white shadow-lg shadow-amber-600/20">
                                                 <Calendar size={20} />
                                          </div>
                                          <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Buses Operations</span>
                                   </div>
                                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">Bookings & Reservations</h1>
                                   <p className="text-slate-400 font-bold mt-2">Manage all incoming bookings for bus partners</p>
                            </div>
                     </header>

                     <DataTable 
                            title="Recent Reservations"
                            description={`${filteredBookings.length} records found`}
                            columns={columns}
                            data={filteredBookings}
                            onSearch={setSearch}
                            isLoading={isLoading}
                            actions={actions}
                            headerAction={headerAction}
                     />
              </div>
       );
}
