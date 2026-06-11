'use client';

import React, { useState } from 'react';
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
              <div className="p-8 lg:p-12 animate-fadeIn space-y-8">
                     <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                   <div className="flex items-center gap-3 mb-2">
                                          <div className="p-2 bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-900/20">
                                                 <Settings size={20} />
                                          </div>
                                          <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">System & Security</span>
                                   </div>
                                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">Global Configurations</h1>
                                   <p className="text-slate-400 font-bold mt-2">Manage platform-wide settings, branding, and integrations</p>
                            </div>
                            <button 
                                   onClick={handleSave}
                                   disabled={isSaving}
                                   className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                            >
                                   <Save size={18} />
                                   {isSaving ? 'Saving Configurations...' : 'Save All Changes'}
                            </button>
                     </header>

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Sidebar - Navigation */}
                            <div className="lg:col-span-1 space-y-2">
                                   <button className="w-full flex items-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-left shadow-sm hover:border-indigo-500 transition-colors group">
                                          <Globe size={20} className="text-indigo-600" />
                                          <div>
                                                 <div className="text-sm font-black text-slate-900">Platform Identity</div>
                                                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Branding & SEO</div>
                                          </div>
                                   </button>
                                   <button className="w-full flex items-center gap-4 px-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-left hover:bg-white hover:border-slate-200 transition-colors group">
                                          <CreditCard size={20} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                          <div>
                                                 <div className="text-sm font-black text-slate-700">Payment Gateways</div>
                                                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Stripe, Razorpay</div>
                                          </div>
                                   </button>
                                   <button className="w-full flex items-center gap-4 px-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-left hover:bg-white hover:border-slate-200 transition-colors group">
                                          <Shield size={20} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
                                          <div>
                                                 <div className="text-sm font-black text-slate-700">Security & Compliance</div>
                                                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">2FA, Session Limits</div>
                                          </div>
                                   </button>
                                   <button className="w-full flex items-center gap-4 px-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-left hover:bg-white hover:border-slate-200 transition-colors group">
                                          <BellRing size={20} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                                          <div>
                                                 <div className="text-sm font-black text-slate-700">Communication</div>
                                                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Email & SMS Config</div>
                                          </div>
                                   </button>
                            </div>

                            {/* Main Content Area */}
                            <div className="lg:col-span-2 space-y-8">
                                   <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden">
                                          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                                                 <CardTitle className="text-xl font-black text-slate-900">Platform Identity</CardTitle>
                                                 <CardDescription className="text-slate-500 font-bold mt-2">These settings affect how your brand is displayed publicly.</CardDescription>
                                          </CardHeader>
                                          <CardContent className="p-8 space-y-8">
                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <div className="space-y-3">
                                                               <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Platform Name</label>
                                                               <input type="text" defaultValue="Toliday Extranet" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                                        </div>
                                                        <div className="space-y-3">
                                                               <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Support Email</label>
                                                               <input type="email" defaultValue="support@toliday.in" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                                        </div>
                                                 </div>
                                                 
                                                 <div className="space-y-3">
                                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Global Commission Rate (%)</label>
                                                        <p className="text-[10px] font-bold text-slate-400 mb-2">This is the default commission taken from all vendors unless overridden at the vendor level.</p>
                                                        <input type="number" defaultValue="15" className="w-full md:w-1/3 bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-black text-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                                 </div>

                                                 <div className="pt-4 border-t border-slate-100">
                                                        <div className="flex items-center justify-between">
                                                               <div>
                                                                      <div className="font-black text-slate-900">Maintenance Mode</div>
                                                                      <div className="text-xs font-bold text-slate-400 mt-1">Suspend all public access temporarily</div>
                                                               </div>
                                                               <label className="relative inline-flex items-center cursor-pointer">
                                                                      <input type="checkbox" className="sr-only peer" />
                                                                      <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                                                               </label>
                                                        </div>
                                                 </div>
                                          </CardContent>
                                   </Card>

                                   <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden">
                                          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                                                 <CardTitle className="text-xl font-black text-slate-900 flex items-center gap-3">
                                                        <Database className="text-indigo-500" /> Database & Storage
                                                 </CardTitle>
                                          </CardHeader>
                                          <CardContent className="p-8">
                                                 <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                                        <div>
                                                               <div className="font-black text-slate-900 text-sm">System Cache</div>
                                                               <div className="text-xs font-bold text-slate-500 mt-1">Clear Redis cache for pricing and availability</div>
                                                        </div>
                                                        <button className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 transition-all shadow-sm active:scale-95">
                                                               Purge Cache
                                                        </button>
                                                 </div>
                                          </CardContent>
                                   </Card>
                            </div>
                     </div>
              </div>
       );
}
