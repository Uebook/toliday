'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataTable from '@/components/admin/DataTable';
import { Users, ShieldCheck, ShieldAlert, Ban, Clock, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ConsumerUsersPage() {
       const [search, setSearch] = useState('');
       
       const { data: consumers = [], isLoading, error } = useQuery({
              queryKey: ['admin-consumers'],
              queryFn: async () => {
                     const res = await api.get('/bookings/admin/consumers');
                     return res.data;
              }
       });

       const filteredConsumers = consumers.filter((c: any) => 
              c.name.toLowerCase().includes(search.toLowerCase()) || 
              c.email.toLowerCase().includes(search.toLowerCase())
       );

       const handleAction = (id: string, action: string) => {
              if (action === 'VERIFY') {
                     toast('KYC Verification requires the Consumer App Identity Provider to be active.', { icon: '🔒' });
              } else if (action === 'SUSPEND') {
                     toast('Consumer App Identity Provider integration required to suspend accounts.', { icon: '🔒' });
              }
       };

       const columns = [
              {
                     header: 'Consumer Profile',
                     accessor: 'name',
                     render: (user: any) => (
                            <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                                          {user.name ? user.name.charAt(0) : '?'}
                                   </div>
                                   <div>
                                          <div className="font-black text-slate-900 text-sm">{user.name || 'Unknown'}</div>
                                          <div className="text-xs text-slate-500 font-bold mt-0.5">{user.email}</div>
                                   </div>
                            </div>
                     )
              },
              {
                     header: 'Platform Activity',
                     accessor: 'bookingsCount',
                     render: (user: any) => (
                            <div>
                                   <div className="text-sm font-black text-slate-900">{user.totalBookings} Bookings</div>
                                   <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">₹{user.ltv || 0} LTV</div>
                            </div>
                     )
              },
              {
                     header: 'Last Active',
                     accessor: 'lastActive',
                     render: (user: any) => (
                            <div className="text-sm font-bold text-slate-700">
                                   {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'N/A'}
                            </div>
                     )
              },
              {
                     header: 'KYC Status',
                     accessor: 'kycStatus',
                     render: (user: any) => (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest
                                   ${user.kycStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600' : ''}
                                   ${user.kycStatus === 'PENDING' ? 'bg-amber-50 text-amber-600' : ''}
                                   ${user.kycStatus === 'REJECTED' ? 'bg-red-50 text-red-600' : ''}
                            `}>
                                   {user.kycStatus === 'VERIFIED' && <ShieldCheck size={12} />}
                                   {user.kycStatus === 'PENDING' && <Clock size={12} />}
                                   {user.kycStatus === 'REJECTED' && <ShieldAlert size={12} />}
                                   {user.kycStatus}
                            </div>
                     )
              }
       ];

       const actions = (user: any) => (
              <div className="flex gap-2">
                     {user.kycStatus === 'PENDING' && (
                            <button
                                   onClick={() => handleAction(user.id, 'VERIFY')}
                                   className="px-4 py-2 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                            >
                                   Approve KYC
                            </button>
                     )}
                     <button
                            onClick={() => handleAction(user.id, 'SUSPEND')}
                            className="px-4 py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                     >
                            <Ban size={14} className="mr-1 inline" /> Suspend
                     </button>
              </div>
       );

       return (
              <div className="p-8 lg:p-12 animate-fadeIn space-y-8">
                     <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                   <div className="flex items-center gap-3 mb-2">
                                          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
                                                 <Users size={20} />
                                          </div>
                                          <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Global Intelligence</span>
                                   </div>
                                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">All Consumers (KYC)</h1>
                                   <p className="text-slate-400 font-bold mt-2">Manage user identities, approvals, and platform access</p>
                            </div>
                     </header>

                     {isLoading ? (
                            <Card className="rounded-[2.5rem] border-slate-100 shadow-xl">
                                   <CardContent className="p-16 flex items-center justify-center">
                                          <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
                                   </CardContent>
                            </Card>
                     ) : error ? (
                            <Card className="rounded-[2.5rem] border-red-100 shadow-xl bg-red-50/50">
                                   <CardContent className="p-16 flex flex-col items-center justify-center text-center">
                                          <ShieldAlert className="text-red-500 w-12 h-12 mb-4" />
                                          <h3 className="text-xl font-black text-slate-900 mb-2">Error Loading Consumers</h3>
                                          <p className="text-slate-500 font-bold">Please try again later.</p>
                                   </CardContent>
                            </Card>
                     ) : (
                            <DataTable 
                                   title="Consumer Directory"
                                   description={`${filteredConsumers.length} users registered`}
                                   columns={columns}
                                   data={filteredConsumers}
                                   onSearch={setSearch}
                                   actions={actions}
                            />
                     )}
              </div>
       );
}
