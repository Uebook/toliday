'use client';

import React, { useState } from 'react';
import Topbar from '@/components/layout/Topbar';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Calendar as CalendarIcon, IndianRupee, Search, Save, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function HotelsRatesPage() {
       const [search, setSearch] = useState('');
       const [filterType, setFilterType] = useState('ALL');
       const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
       const [isDropdownOpen, setIsDropdownOpen] = useState(false);
       
       const vendors = [
              { id: 'v_1', name: 'Grand Hyatt Mumbai', location: 'Mumbai, India', type: 'Luxury Resort' },
              { id: 'v_2', name: 'Taj Mahal Palace', location: 'Mumbai, India', type: 'Heritage Hotel' },
              { id: 'v_3', name: 'Desert Safari Camp', location: 'Dubai, UAE', type: 'Boutique Camp' },
       ];

       
       const { data: inventory = [], isLoading } = useQuery({
              queryKey: ['inventory', selectedVendor, 'HOTEL'],
              queryFn: async () => {
                     if (!selectedVendor) return [];
                     const res = await api.get(`/global-inventory/admin/vendor/${selectedVendor}?vertical=HOTEL`);
                     if (res.data.length === 0) {
                            // Return empty array if no inventory found in DB, UI will show empty state
                            return [];
                     }
                     const uniqueResources: any[] = [];
                     const resourceMap = new globalThis.Map();
                     res.data.forEach((inv: any) => {
                            if (!resourceMap.has(inv.resourceId)) {
                                   resourceMap.set(inv.resourceId, true);
                                   uniqueResources.push({
                                          id: inv.resourceId,
                                          name: inv.resourceName,
                                          basePrice: Number(inv.basePrice),
                                          available: inv.availableUnits,
                                          total: inv.totalUnits,
                                   });
                            }
                     });
                     return uniqueResources;
              },
              enabled: !!selectedVendor
       });
    

       const filteredInventory = inventory.filter((item: any) => {
              const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
              const matchesFilter = filterType === 'ALL' || (filterType === 'LOW' && item.available < 5);
              return matchesSearch && matchesFilter;
       });

       const handleSave = () => {
              toast.success('Rates and availability updated successfully');
       };

       const activeVendor = vendors.find(v => v.id === selectedVendor);

       return (
              <div className="p-6 md:p-8 space-y-6 md:space-y-8 animate-fadeIn max-w-[1600px] mx-auto min-h-full">
                     <Topbar title="Rates & Availability" subtitle="Manage daily pricing, inventory allocation, and restrictions" />

                     {/* Vendor Selection Dropdown */}
                     <div className="relative z-20">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 block">Select Property Partner</label>
                            <div 
                                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                   className={`w-full md:w-1/2 lg:w-1/3 bg-white border-2 cursor-pointer transition-all rounded-[1.5rem] p-4 flex items-center justify-between ${isDropdownOpen ? 'border-indigo-500 shadow-lg shadow-indigo-500/10' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                                   {activeVendor ? (
                                          <div>
                                                 <div className="text-sm font-black text-foreground">{activeVendor.name}</div>
                                                 <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{activeVendor.location}</div>
                                          </div>
                                   ) : (
                                          <span className="text-sm font-bold text-muted-foreground">Select a property...</span>
                                   )}
                                   <ChevronDown size={20} className={`text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>

                            {isDropdownOpen && (
                                   <div className="absolute top-full left-0 mt-2 w-full md:w-1/2 lg:w-1/3 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] overflow-hidden z-30 animate-fadeIn">
                                          <div className="p-2">
                                                 {vendors.map(vendor => (
                                                        <div 
                                                               key={vendor.id}
                                                               onClick={() => {
                                                                      setSelectedVendor(vendor.id);
                                                                      setIsDropdownOpen(false);
                                                               }}
                                                               className={`p-4 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${selectedVendor === vendor.id ? 'bg-indigo-50 text-indigo-900' : 'hover:bg-slate-50'}`}
                                                        >
                                                               <div>
                                                                      <div className="text-sm font-black">{vendor.name}</div>
                                                                      <div className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${selectedVendor === vendor.id ? 'text-indigo-500' : 'text-muted-foreground'}`}>{vendor.location}</div>
                                                               </div>
                                                               {selectedVendor === vendor.id && <Check size={16} className="text-indigo-600" />}
                                                        </div>
                                                 ))}
                                          </div>
                                   </div>
                            )}
                     </div>

                     {!selectedVendor ? (
                            <div className="rounded-[2.5rem] border-dashed border-2 border-slate-200 bg-transparent shadow-none">
                                   <div className="p-16 flex flex-col items-center justify-center text-center">
                                          <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-[2rem] flex items-center justify-center mb-6">
                                                 <Building2 size={32} />
                                          </div>
                                          <h3 className="text-xl font-black text-foreground mb-2">No Property Selected</h3>
                                          <p className="text-muted-foreground font-bold max-w-sm">Please select a hotel partner from the dropdown above to view and manage their specific rates and availability matrix.</p>
                                   </div>
                            </div>
                     ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fadeIn">
                                   <div className="lg:col-span-1 rounded-[28px] border-border/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)]">
                                          <div className="p-8 pb-4">
                                                 <div className="text-sm font-black text-foreground uppercase tracking-widest">Select Date Range</div>
                                          </div>
                                          <div className="p-8 pt-0 space-y-4">
                                                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3 text-sm font-bold text-slate-700 cursor-pointer hover:border-indigo-500 transition-colors">
                                                        <CalendarIcon size={18} className="text-indigo-500" />
                                                        Today - Next 7 Days
                                                 </div>
                                                 <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-sm font-bold text-muted-foreground cursor-pointer hover:border-indigo-500 transition-colors">
                                                        Custom Range <ArrowRight size={16} />
                                                 </div>
                                                 <div className="pt-6 border-t border-slate-100 space-y-3">
                                                        <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">Quick Filters</label>
                                                        <div className="flex gap-2 flex-wrap">
                                                               <span onClick={() => setFilterType('ALL')} className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest cursor-pointer ${filterType === 'ALL' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-muted-foreground hover:bg-slate-100'}`}>All Rooms</span>
                                                               <span onClick={() => setFilterType('LOW')} className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest cursor-pointer ${filterType === 'LOW' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-muted-foreground hover:bg-slate-100'}`}>Low Inventory</span>
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>

                                   <div className="lg:col-span-3 rounded-[28px] border-border/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden">
                                          <div className="bg-slate-50/50 border-b border-slate-100 p-8 flex flex-col md:flex-row justify-between items-center gap-4">
                                                 <div className="text-xl font-black text-foreground">Inventory Matrix</div>
                                                 <div className="relative w-full md:w-auto">
                                                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none w-full md:w-64 transition-all" />
                                                 </div>
                                          </div>
                                          <div className="p-0 overflow-x-auto">
                                                 
                                                 {isLoading ? (
                                                        <div className="p-20 flex items-center justify-center">
                                                               <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
                                                        </div>
                                                 ) : inventory.length === 0 ? (
                                                        <div className="p-20 text-center text-muted-foreground font-bold">
                                                               Select a vendor to view their rates matrix. If selected and still empty, no inventory exists in the database.
                                                        </div>
                                                 ) : (
                                                        <table className="w-full text-left whitespace-nowrap">
                                                               
                                                        <thead>
                                                               <tr className="bg-slate-50 border-b border-slate-100">
                                                                      <th className="p-6 text-xs font-black text-muted-foreground uppercase tracking-widest">Unit Type</th>
                                                                      <th className="p-6 text-xs font-black text-muted-foreground uppercase tracking-widest text-center">Mon 15</th>
                                                                      <th className="p-6 text-xs font-black text-muted-foreground uppercase tracking-widest text-center">Tue 16</th>
                                                                      <th className="p-6 text-xs font-black text-muted-foreground uppercase tracking-widest text-center">Wed 17</th>
                                                               </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-50">
                                                               {filteredInventory.map((item: any) => (
                                                                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                                                             <td className="p-6">
                                                                                    <div className="font-black text-foreground">{item.name}</div>
                                                                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Base: ₹{item.basePrice} | Total: {item.total}</div>
                                                                             </td>
                                                                             {[15, 16, 17].map(day => (
                                                                                    <td key={day} className="p-4 text-center">
                                                                                           <div className="inline-flex flex-col gap-2">
                                                                                                  <div className="relative">
                                                                                                         <IndianRupee size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                                                                         <input type="number" defaultValue={item.basePrice + (day % 2 === 0 ? 20 : 0)} className="w-24 pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                                                                                                  </div>
                                                                                                  <div className="flex items-center gap-2">
                                                                                                         <input type="number" defaultValue={item.available} className={`w-24 px-3 py-2 bg-white border rounded-xl text-sm font-black text-center outline-none ${item.available < 5 ? 'border-red-200 text-red-600 bg-red-50' : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'}`} />
                                                                                                  </div>
                                                                                           </div>
                                                                                    </td>
                                                                             ))}
                                                                      </tr>
                                                               ))}
                                                        </tbody>
                                                 
                                                        </table>
                                                 )}
        
                                          </div>
                                   </div>
                            </div>
                     )}
              </div>
       );
}
