'use client';

import React from 'react';
import Topbar from '@/components/layout/Topbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Clock, Sparkles, Shield } from 'lucide-react';

export default function SupportPage() {
       return (
              <div className="p-6 md:p-8 space-y-6 md:space-y-8 animate-fadeIn max-w-[1600px] mx-auto min-h-full">
                     <Topbar title="Global Support Desk" subtitle="Centralized helpdesk for all verticals" />

                     <div className="rounded-[28px] border-border/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                   <Wrench size={200} />
                            </div>
                            <div className="p-12 flex flex-col items-center justify-center min-h-[400px] text-center relative z-10">
                                   <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center text-muted-foreground mb-8 relative">
                                          <Sparkles size={40} />
                                          <div className="absolute -top-2 -right-2 bg-slate-900 text-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                                 v2.1
                                          </div>
                                   </div>
                                   <h2 className="text-2xl font-black text-foreground mb-4">Module In Development</h2>
                                   <p className="text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed mb-8">
                                          The engineering team is currently integrating the core APIs for the <strong>Global Support Desk</strong> module. This dashboard will be unlocked in the upcoming Extranet OS release.
                                   </p>
                                   <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                                          <Clock size={16} className="text-muted-foreground" /> Expected Completion: Soon
                                   </div>
                            </div>
                     </div>
              </div>
       );
}
