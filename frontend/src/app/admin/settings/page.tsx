'use client';

import React, { useState } from 'react';
import Topbar from '@/components/layout/Topbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
       Settings, Globe, Shield, CreditCard, Mail, 
       Smartphone, BellRing, Save, Database, Key
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SystemSettingsPage() {
       const [isSaving, setIsSaving] = useState(false);

       const handleSave = () => {
              setIsSaving(true);
              setTimeout(() => {
                     setIsSaving(false);
                     toast.success('System configurations updated successfully');
              }, 1000);
       };

       return (
              <div className="p-6 md:p-8 space-y-6 md:space-y-8 animate-fadeIn max-w-[1600px] mx-auto min-h-full">
                     <Topbar title="Global Configurations" subtitle="Manage platform-wide settings, branding, and integrations" />

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Sidebar - Navigation */}
                            <div className="lg:col-span-1 space-y-2">
                                   <button className="w-full flex items-center gap-4 px-6 py-4 ios-platter border-border/10 rounded-2xl text-left shadow-sm hover:border-indigo-500 transition-colors group">
                                          <Globe size={20} className="text-indigo-600" />
                                          <div>
                                                 <div className="text-sm font-black text-foreground">Platform Identity</div>
                                                 <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Branding & SEO</div>
                                          </div>
                                   </button>
                                   <button className="w-full flex items-center gap-4 px-6 py-4 bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl text-left hover:bg-black/10 dark:hover:bg-white/10 transition-colors group">
                                          <CreditCard size={20} className="text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                                          <div>
                                                 <div className="text-sm font-black text-muted-foreground">Payment Gateways</div>
                                                 <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Stripe, Razorpay</div>
                                          </div>
                                   </button>
                                   <button className="w-full flex items-center gap-4 px-6 py-4 bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl text-left hover:bg-black/10 dark:hover:bg-white/10 transition-colors group">
                                          <Shield size={20} className="text-muted-foreground group-hover:text-rose-500 transition-colors" />
                                          <div>
                                                 <div className="text-sm font-black text-muted-foreground">Security & Compliance</div>
                                                 <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">2FA, Session Limits</div>
                                          </div>
                                   </button>
                                   <button className="w-full flex items-center gap-4 px-6 py-4 bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl text-left hover:bg-black/10 dark:hover:bg-white/10 transition-colors group">
                                          <BellRing size={20} className="text-muted-foreground group-hover:text-amber-500 transition-colors" />
                                          <div>
                                                 <div className="text-sm font-black text-muted-foreground">Communication</div>
                                                 <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Email & SMS Config</div>
                                          </div>
                                   </button>
                            </div>

                            {/* Main Content Area */}
                            <div className="lg:col-span-2 space-y-8">
                                   <div className="ios-sheet rounded-[28px] border-border/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden">
                                          <div className="bg-background/40 backdrop-blur-md border-b border-border/10 p-8">
                                                 <div className="text-xl font-black text-foreground">Platform Identity</div>
                                                 <CardDescription className="text-muted-foreground font-bold mt-2">These settings affect how your brand is displayed publicly.</CardDescription>
                                          </div>
                                          <div className="p-8 space-y-8">
                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <div className="space-y-3">
                                                               <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">Platform Name</label>
                                                               <input type="text" defaultValue="Toliday Extranet" className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl py-3 px-4 font-bold text-foreground focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                                        </div>
                                                        <div className="space-y-3">
                                                               <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">Support Email</label>
                                                               <input type="email" defaultValue="support@toliday.in" className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl py-3 px-4 font-bold text-foreground focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                                        </div>
                                                 </div>
                                                 
                                                 <div className="space-y-3">
                                                        <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">Global Commission Rate (%)</label>
                                                        <p className="text-[10px] font-bold text-muted-foreground mb-2">This is the default commission taken from all vendors unless overridden at the vendor level.</p>
                                                        <input type="number" defaultValue="15" className="w-full md:w-1/3 bg-black/5 dark:bg-white/5 border border-transparent rounded-xl py-3 px-4 font-black text-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                                 </div>

                                                 <div className="pt-4 border-t border-border/10">
                                                        <div className="flex items-center justify-between">
                                                               <div>
                                                                      <div className="font-black text-foreground">Maintenance Mode</div>
                                                                      <div className="text-xs font-bold text-muted-foreground mt-1">Suspend all public access temporarily</div>
                                                               </div>
                                                               <label className="relative inline-flex items-center cursor-pointer">
                                                                      <input type="checkbox" className="sr-only peer" />
                                                                      <div className="w-14 h-7 bg-black/10 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                                                               </label>
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>

                                   <div className="ios-sheet rounded-[28px] border-border/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden">
                                          <div className="bg-background/40 backdrop-blur-md border-b border-border/10 p-8">
                                                 <div className="text-xl font-black text-foreground flex items-center gap-3">
                                                        <Database className="text-indigo-500" /> Database & Storage
                                                 </div>
                                          </div>
                                          <div className="p-8">
                                                 <div className="flex items-center justify-between p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-transparent text-foreground">
                                                        <div>
                                                               <div className="font-black text-foreground text-sm">System Cache</div>
                                                               <div className="text-xs font-bold text-muted-foreground mt-1">Clear Redis cache for pricing and availability</div>
                                                        </div>
                                                        <button className="px-6 py-3 ios-platter border border-border/10 rounded-xl text-xs font-black uppercase tracking-widest text-foreground transition-all shadow-sm active:scale-95 hover:bg-black/5 dark:hover:bg-white/5">
                                                               Purge Cache
                                                        </button>
                                                 </div>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>
       );
}
