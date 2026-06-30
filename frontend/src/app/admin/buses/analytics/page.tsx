'use client';

import React from 'react';
import Topbar from '@/components/layout/Topbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
       Activity, TrendingUp, Users, IndianRupee, 
       Bus, Download
} from 'lucide-react';

export default function BusesAnalyticsPage() {
       return (
              <div className="p-6 md:p-8 space-y-6 md:space-y-8 animate-fadeIn max-w-[1600px] mx-auto min-h-full">
                     <Topbar title="Analytics & Reports" subtitle="Insights, performance metrics, and reporting for your properties" />

                     {/* Top Level Metrics */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="ios-platter p-6 rounded-[24px] border border-border/10 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform hover:scale-[1.03]">
                                   <div className="absolute top-0 right-0 p-8 opacity-5">
                                          <IndianRupee size={100} />
                                   </div>
                                   <div className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Revenue Generated</div>
                                          <div className="text-4xl font-black text-foreground mb-4">₹32,540</div>
                                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 w-max px-3 py-1 rounded-lg">
                                                 <TrendingUp size={14} /> +12.4% from last month
                                          </div>
                                   </div>
                            </div>
                            <div className="ios-platter p-6 rounded-[24px] border border-border/10 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform hover:scale-[1.03]">
                                   <div className="absolute top-0 right-0 p-8 opacity-5">
                                          <Activity size={100} />
                                   </div>
                                   <div className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Total Bookings</div>
                                          <div className="text-4xl font-black text-foreground mb-4">142</div>
                                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 w-max px-3 py-1 rounded-lg">
                                                 <TrendingUp size={14} /> +8.1% from last month
                                          </div>
                                   </div>
                            </div>
                            <div className="ios-platter p-6 rounded-[24px] border border-border/10 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform hover:scale-[1.03]">
                                   <div className="absolute top-0 right-0 p-8 opacity-5">
                                          <Bus size={100} />
                                   </div>
                                   <div className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Occupancy Rate</div>
                                          <div className="text-4xl font-black text-foreground mb-4">78%</div>
                                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 w-max px-3 py-1 rounded-lg">
                                                 <TrendingUp size={14} /> +5.2% from last month
                                          </div>
                                   </div>
                            </div>
                            <div className="ios-platter p-6 rounded-[24px] border border-border/10 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform hover:scale-[1.03] bg-slate-900 text-foreground">
                                   <div className="p-8 relative z-10 h-full flex flex-col justify-center">
                                          <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-2">Average Daily Rate (ADR)</div>
                                          <div className="text-4xl font-black mb-4">₹229</div>
                                          <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                                                 <TrendingUp size={14} /> +₹14 from last month
                                          </div>
                                   </div>
                            </div>
                     </div>

                     <div className="rounded-[28px] border-border/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden">
                            <div className="bg-slate-50/50 border-b border-slate-100 p-8">
                                   <div className="text-xl font-black text-foreground">Unit Type Performance</div>
                            </div>
                            <div className="p-0">
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
                                                                      <div className="font-black text-foreground text-sm">{room.name}</div>
                                                                      <div className="text-xs font-bold text-muted-foreground mt-1">{room.bookings} Bookings</div>
                                                               </div>
                                                        </div>
                                                        <div className="text-right">
                                                               <div className="font-black text-foreground">{room.rev}</div>
                                                               <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
                                                                      {room.occ} Occupancy
                                                               </div>
                                                        </div>
                                                 </div>
                                          ))}
                                   </div>
                            </div>
                     </div>
              </div>
       );
}
