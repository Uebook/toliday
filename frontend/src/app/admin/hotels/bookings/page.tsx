'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import DataTable from '@/components/admin/DataTable';
import Topbar from '@/components/layout/Topbar';
import {
       Calendar, CheckCircle, XCircle, Clock,
       Building2, Download
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function HotelsBookingsPage() {
       const queryClient = useQueryClient();
       const [search, setSearch] = useState('');
       const [verticalFilter, setVerticalFilter] = useState('HOTEL');
       const [statusFilter, setStatusFilter] = useState('ALL');

       const { data: bookings = [], isLoading } = useQuery({
              queryKey: ['hotels-bookings'],
              queryFn: async () => {
                     try {
                         const res = await api.get('/bookings/admin/all');
                         const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
                         // Sort so latest booking is at the top
                         return data.sort((a: any, b: any) => new Date(b.createdAt || b.startDate).getTime() - new Date(a.createdAt || a.startDate).getTime());
                     } catch (err) {
                         console.error("Error fetching bookings:", err);
                         return [];
                     }
              }
       });

       const updateStatusMutation = useMutation({
              mutationFn: async ({ id, status }: { id: string, status: string }) => {
                     return api.patch(`/bookings/${id}/status`, { status });
              },
              onSuccess: () => {
                     queryClient.invalidateQueries({ queryKey: ['hotels-bookings'] });
                     toast.success('Booking status updated successfully');
              }
       });

       const filteredBookings = bookings.filter((b: any) => {
              const matchesSearch = (b.guestName || '').toLowerCase().includes(search.toLowerCase()) ||
                                  (b.bookingReference || '').toLowerCase().includes(search.toLowerCase());
              
              const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
              
              let matchesVertical = false;
              if (verticalFilter === 'HOTEL') matchesVertical = !!b.hotelId;
              if (verticalFilter === 'CAB') matchesVertical = !!b.cabVendorId;
              if (verticalFilter === 'BUS') matchesVertical = !!b.busVendorId;
              if (verticalFilter === 'TOUR') matchesVertical = !!b.tourPartnerId;
              if (verticalFilter === 'FLIGHT') matchesVertical = !!b.flightDetails;

              return matchesSearch && matchesStatus && matchesVertical;
       });

       const columns = [
              {
                     header: 'Guest Info',
                     accessor: 'guestName',
                     render: (booking: any) => (
                            <div>
                                   <div className="font-black text-foreground text-sm">{booking.guestName}</div>
                                   <div className="text-xs text-slate-500 font-bold mt-1">{booking.guestEmail}</div>
                                   <div className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1">Ref: {booking.bookingReference}</div>
                            </div>
                     )
              },
              {
                     header: 'Property Details',
                     accessor: 'vendor',
                     render: (booking: any) => (
                            <div className="flex items-center gap-3">
                                   <div className="p-2 rounded-lg bg-indigo-50 text-indigo-500">
                                          <Building2 size={16} />
                                   </div>
                                   <div>
                                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                              {booking.hotelId ? 'HOTEL' : booking.cabVendorId ? 'CAB' : booking.busVendorId ? 'BUS' : booking.tourPartnerId ? 'TOUR' : 'SERVICE'}
                                          </div>
                                          <div className="text-xs font-bold text-slate-700 truncate max-w-[150px]">
                                              {booking.hotel?.name || booking.cabVendor?.name || booking.busVendor?.name || booking.tourPartner?.name || 'Unknown Property'}
                                          </div>
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
                            <div className="text-sm font-black text-foreground">₹{Number(booking.totalAmount).toLocaleString()}</div>
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
           <div className="flex items-center gap-3 w-full md:w-auto">
               <select
                   value={verticalFilter}
                   onChange={(e) => setVerticalFilter(e.target.value)}
                   className="bg-black/[0.02] dark:bg-white/[0.03] border border-border/10 rounded-2xl py-3 px-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-foreground"
               >
                   <option value="HOTEL">Hotels Only</option>
                   <option value="CAB">Cabs Only</option>
                   <option value="BUS">Bus Only</option>
                   <option value="TOUR">Tours Only</option>
                   <option value="FLIGHT">Flights Only</option>
               </select>

               <select
                   value={statusFilter}
                   onChange={(e) => setStatusFilter(e.target.value)}
                   className="bg-black/[0.02] dark:bg-white/[0.03] border border-border/10 rounded-2xl py-3 px-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-foreground"
               >
                   <option value="ALL">All Status</option>
                   <option value="CONFIRMED">Confirmed</option>
                   <option value="PENDING">Pending</option>
                   <option value="CANCELLED">Cancelled</option>
               </select>

               <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 group ml-auto md:ml-0">
                      <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Export
               </button>
           </div>
       );

       return (
              <div className="min-h-full">
                     <Topbar title="Bookings & Reservations" subtitle="Manage all incoming bookings across verticals" />
                     
                     <div className="p-6 md:p-8 space-y-6 md:space-y-8 animate-fadeIn max-w-[1600px] mx-auto">
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
              </div>
       );
}
