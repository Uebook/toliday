'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
       Activity, TrendingUp, Users, IndianRupee, 
       Bus, Download
} from 'lucide-react';

export default function BusesAnalyticsPage() {
       return (
              <div className="p-8 lg:p-12 animate-fadeIn space-y-8">
                     <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                   <div className="flex items-center gap-3 mb-2">
                                          <div className="p-2 bg-amber-600 rounded-xl text-white shadow-lg shadow-amber-600/20">
                                                 <Activity size={20} />
                                          </div>
                                          <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Buses Operations</span>
                                   </div>
                                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">Analytics & Reports</h1>
                                   <p className="text-slate-400 font-bold mt-2">Insights, performance metrics, and reporting for your properties</p>
                            </div>
                            <button className="px-8 py-4 bg-slate-900 hover:bg-amber-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl active:scale-95 group">
                                   <Download size={18} className="group-hover:translate-y-1 transition-transform" /> Export Report
                            </button>
                     </header>

                     {/* Top Level Metrics */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform">
                                   <div className="absolute top-0 right-0 p-8 opacity-5">
                                          <IndianRupee size={100} />
                                   </div>
                                   <CardContent className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Revenue Generated</div>
                                          <div className="text-4xl font-black text-slate-900 mb-4">₹32,540</div>
                                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 w-max px-3 py-1 rounded-lg">
                                                 <TrendingUp size={14} /> +12.4% from last month
                                          </div>
                                   </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform">
                                   <div className="absolute top-0 right-0 p-8 opacity-5">
                                          <Activity size={100} />
                                   </div>
                                   <CardContent className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Total Bookings</div>
                                          <div className="text-4xl font-black text-slate-900 mb-4">142</div>
                                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 w-max px-3 py-1 rounded-lg">
                                                 <TrendingUp size={14} /> +8.1% from last month
                                          </div>
                                   </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform">
                                   <div className="absolute top-0 right-0 p-8 opacity-5">
                                          <Bus size={100} />
                                   </div>
                                   <CardContent className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Occupancy Rate</div>
                                          <div className="text-4xl font-black text-slate-900 mb-4">78%</div>
                                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 w-max px-3 py-1 rounded-lg">
                                                 <TrendingUp size={14} /> +5.2% from last month
                                          </div>
                                   </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform bg-slate-900 text-white">
                                   <CardContent className="p-8 relative z-10 h-full flex flex-col justify-center">
                                          <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-2">Average Daily Rate (ADR)</div>
                                          <div className="text-4xl font-black mb-4">₹229</div>
                                          <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                                                 <TrendingUp size={14} /> +₹14 from last month
                                          </div>
                                   </CardContent>
                            </Card>
                     </div>

                     <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                                   <CardTitle className="text-xl font-black text-slate-900">Unit Type Performance</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                   <div className="divide-y divide-slate-50">
                                          {[
                                                 { name: 'Deluxe Ocean View', rev: '₹18,200', bookings: '62', occ: '92%' },
                                                 { name: 'Standard Unit', rev: '₹9,140', bookings: '60', occ: '85%' },
                                                 { name: 'Premium Suite', rev: '₹5,200', bookings: '20', occ: '45%' }
                                          ].map((room, i) => (
                                                 <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors">
                                                        <div className="flex items-center gap-4">
                                                               <div className={`p-3 rounded-2xl bg-amber-50 text-amber-500`}>
                                                                      <Bus size={20} />
                                                               </div>
                                                               <div>
                                                                      <div className="font-black text-slate-900 text-sm">{room.name}</div>
                                                                      <div className="text-xs font-bold text-slate-500 mt-1">{room.bookings} Bookings</div>
                                                               </div>
                                                        </div>
                                                        <div className="text-right">
                                                               <div className="font-black text-slate-900">{room.rev}</div>
                                                               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
                                                                      {room.occ} Occupancy
                                                               </div>
                                                        </div>
                                                 </div>
                                          ))}
                                   </div>
                            </CardContent>
                     </Card>
              </div>
       );
}
