'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Clock, Sparkles, Shield } from 'lucide-react';

export default function ApprovalsPage() {
       return (
              <div className="p-8 lg:p-12 animate-fadeIn space-y-8">
                     <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                   <div className="flex items-center gap-3 mb-2">
                                          <div className="p-2 bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-900/20">
                                                 <Shield size={20} />
                                          </div>
                                          <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">System Core</span>
                                   </div>
                                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">Vendor Approvals</h1>
                                   <p className="text-slate-400 font-bold mt-2">Manage vendor onboarding and verifications</p>
                            </div>
                     </header>

                     <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                   <Wrench size={200} />
                            </div>
                            <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px] text-center relative z-10">
                                   <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-500 mb-8 relative">
                                          <Sparkles size={40} />
                                          <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                                 v2.1
                                          </div>
                                   </div>
                                   <h2 className="text-2xl font-black text-slate-900 mb-4">Module In Development</h2>
                                   <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed mb-8">
                                          The engineering team is currently integrating the core APIs for the <strong>Vendor Approvals</strong> module. This dashboard will be unlocked in the upcoming Extranet OS release.
                                   </p>
                                   <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                                          <Clock size={16} className="text-slate-500" /> Expected Completion: Soon
                                   </div>
                            </CardContent>
                     </Card>
              </div>
       );
}
