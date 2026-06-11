'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
       Activity, TrendingUp, Users, IndianRupee, 
       Building2, Map, Bus, CarFront, Download, ArrowUpRight
} from 'lucide-react';

export default function SuperDashboardPage() {
       return (
              <div className="p-8 lg:p-12 animate-fadeIn space-y-8">
                     <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                   <div className="flex items-center gap-3 mb-2">
                                          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/20">
                                                 <Activity size={20} />
                                          </div>
                                          <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Global Intelligence</span>
                                   </div>
                                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">Super Dashboard</h1>
                                   <p className="text-slate-400 font-bold mt-2">Platform-wide overview and real-time metrics</p>
                            </div>
                            <button className="px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl active:scale-95 group">
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
                                          <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Total Gross Volume (TGV)</div>
                                          <div className="text-4xl font-black text-slate-900 mb-4">₹2.4M</div>
                                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 w-max px-3 py-1 rounded-lg">
                                                 <TrendingUp size={14} /> +14.2% from last month
                                          </div>
                                   </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform">
                                   <div className="absolute top-0 right-0 p-8 opacity-5">
                                          <Activity size={100} />
                                   </div>
                                   <CardContent className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Total Bookings</div>
                                          <div className="text-4xl font-black text-slate-900 mb-4">12,492</div>
                                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 w-max px-3 py-1 rounded-lg">
                                                 <TrendingUp size={14} /> +8.1% from last month
                                          </div>
                                   </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform">
                                   <div className="absolute top-0 right-0 p-8 opacity-5">
                                          <Users size={100} />
                                   </div>
                                   <CardContent className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Active Consumers</div>
                                          <div className="text-4xl font-black text-slate-900 mb-4">24,591</div>
                                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 w-max px-3 py-1 rounded-lg">
                                                 <TrendingUp size={14} /> +1.2k new this week
                                          </div>
                                   </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform bg-slate-900 text-white">
                                   <CardContent className="p-8 relative z-10 h-full flex flex-col justify-center">
                                          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Net Platform Revenue</div>
                                          <div className="text-4xl font-black mb-4">₹360K</div>
                                          <div className="text-xs font-bold text-slate-400">
                                                 Calculated from 15% flat commission.
                                          </div>
                                   </CardContent>
                            </Card>
                     </div>

                     {/* Vertical Performance */}
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden">
                                   <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                                          <CardTitle className="text-xl font-black text-slate-900">Vertical Performance</CardTitle>
                                   </CardHeader>
                                   <CardContent className="p-0">
                                          <div className="divide-y divide-slate-50">
                                                 {[
                                                        { name: 'Hotel Operations', icon: Building2, color: 'text-indigo-500', bg: 'bg-indigo-50', rev: '₹1.2M', bookings: '5,230' },
                                                        { name: 'Tour Operations', icon: Map, color: 'text-emerald-500', bg: 'bg-emerald-50', rev: '₹800K', bookings: '3,100' },
                                                        { name: 'Bus Operations', icon: Bus, color: 'text-amber-500', bg: 'bg-amber-50', rev: '₹250K', bookings: '2,800' },
                                                        { name: 'Cab Operations', icon: CarFront, color: 'text-rose-500', bg: 'bg-rose-50', rev: '₹150K', bookings: '1,362' },
                                                 ].map((vert, i) => (
                                                        <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors">
                                                               <div className="flex items-center gap-4">
                                                                      <div className={`p-3 rounded-2xl ${vert.bg} ${vert.color}`}>
                                                                             <vert.icon size={20} />
                                                                      </div>
                                                                      <div>
                                                                             <div className="font-black text-slate-900 text-sm">{vert.name}</div>
                                                                             <div className="text-xs font-bold text-slate-500 mt-1">{vert.bookings} Bookings</div>
                                                                      </div>
                                                               </div>
                                                               <div className="text-right">
                                                                      <div className="font-black text-slate-900">{vert.rev}</div>
                                                                      <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
                                                                             <TrendingUp size={10} /> Growing
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 ))}
                                          </div>
                                   </CardContent>
                            </Card>

                            <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden bg-indigo-600 text-white relative">
                                   <div className="absolute top-0 right-0 p-8 opacity-10">
                                          <Activity size={200} />
                                   </div>
                                   <CardHeader className="p-8 border-b border-indigo-500/30">
                                          <CardTitle className="text-xl font-black text-white">System Health & Live Events</CardTitle>
                                   </CardHeader>
                                   <CardContent className="p-8 relative z-10">
                                          <div className="space-y-6">
                                                 <div className="flex items-center justify-between bg-indigo-700/50 p-4 rounded-2xl">
                                                        <div className="flex items-center gap-3">
                                                               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                               <span className="font-bold text-sm">Booking API Node 1</span>
                                                        </div>
                                                        <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Operational</span>
                                                 </div>
                                                 <div className="flex items-center justify-between bg-indigo-700/50 p-4 rounded-2xl">
                                                        <div className="flex items-center gap-3">
                                                               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                               <span className="font-bold text-sm">Payment Gateway (Stripe)</span>
                                                        </div>
                                                        <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Operational</span>
                                                 </div>
                                                 <div className="flex items-center justify-between bg-indigo-700/50 p-4 rounded-2xl">
                                                        <div className="flex items-center gap-3">
                                                               <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                                               <span className="font-bold text-sm">Redis Caching Layer</span>
                                                        </div>
                                                        <span className="text-xs font-black uppercase tracking-widest text-amber-400">High Load</span>
                                                 </div>
                                          </div>
                                   </CardContent>
                            </Card>
                     </div>
              </div>
       );
}
