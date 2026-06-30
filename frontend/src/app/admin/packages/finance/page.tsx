'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import DataTable from '@/components/admin/DataTable';
import Topbar from '@/components/layout/Topbar';
import { IndianRupee, ArrowUpRight, ArrowDownRight, RefreshCcw, Download, Clock } from 'lucide-react';

export default function PackagesFinancePage() {
       const [search, setSearch] = useState('');

       
       const { data: transactions = [], isLoading, error } = useQuery({
              queryKey: ['ledger', '/finance/admin/ledger?vertical=PACKAGE'],
              queryFn: async () => {
                     const res = await api.get('/finance/admin/ledger?vertical=PACKAGE');
                     return res.data.map((t: any) => ({
                            id: t.id,
                            vendor: t.vendorId, // Generic vendor ID for now
                            package: t.vendorId,
                            vertical: t.vertical,
                            amount: t.amount,
                            type: t.type === 'CREDIT' ? 'INCOME' : 'PAYOUT',
                            status: t.status,
                            date: t.createdAt
                     }));
              }
       });
    

       const filteredTransactions = transactions.filter((t: any) => 
              t.id.toLowerCase().includes(search.toLowerCase()) || 
              t.package.toLowerCase().includes(search.toLowerCase())
       );

       const columns = [
              {
                     header: 'Transaction Info',
                     accessor: 'id',
                     render: (trx: any) => (
                            <div>
                                   <div className="font-black text-foreground text-sm">{trx.id}</div>
                                   <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                                          {new Date(trx.date).toLocaleString()}
                                   </div>
                            </div>
                     )
              },
              {
                     header: 'Property',
                     accessor: 'hotel',
                     render: (trx: any) => (
                            <div className="font-bold text-slate-700 text-sm">{trx.package}</div>
                     )
              },
              {
                     header: 'Direction',
                     accessor: 'type',
                     render: (trx: any) => (
                            <div className="flex items-center gap-2">
                                   {trx.type === 'INCOME' ? (
                                          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                                 <ArrowDownRight size={16} />
                                          </div>
                                   ) : (
                                          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                                                 <ArrowUpRight size={16} />
                                          </div>
                                   )}
                                   <span className={`text-[10px] font-black uppercase tracking-widest ${trx.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                          {trx.type === 'INCOME' ? 'Booking Revenue' : 'Vendor Payout'}
                                   </span>
                            </div>
                     )
              },
              {
                     header: 'Amount',
                     accessor: 'amount',
                     render: (trx: any) => (
                            <div>
                                   <div className="text-sm font-black text-foreground">${trx.amount.toLocaleString()}</div>
                                   {trx.type === 'INCOME' && (
                                          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">
                                                 +${trx.fee} Platform Fee
                                          </div>
                                   )}
                            </div>
                     )
              },
              {
                     header: 'Status',
                     accessor: 'status',
                     render: (trx: any) => (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest
                                   ${trx.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : ''}
                                   ${trx.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : ''}
                            `}>
                                   {trx.status === 'COMPLETED' && <RefreshCcw size={12} />}
                                   {trx.status === 'PENDING' && <Clock size={12} />}
                                   {trx.status}
                            </div>
                     )
              }
       ];

       const headerAction = (
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 group">
                     <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Export Statement
              </button>
       );

       return (
              <div className="min-h-full">
                     <Topbar title="Finance & Payments" subtitle="Manage revenue, commissions, and payouts for tour partners" />
                     
                     <div className="p-6 md:p-8 space-y-6 md:space-y-8 animate-fadeIn max-w-[1600px] mx-auto">
                            {/* Top Level Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                   <div className="ios-platter p-6 rounded-[24px] border border-border/10 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform hover:scale-[1.03]">
                                          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Total Vertical Revenue</div>
                                          <div className="text-4xl font-black text-foreground mb-4">₹342,500</div>
                                   </div>
                                   <div className="ios-platter p-6 rounded-[24px] border border-border/10 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform hover:scale-[1.03]">
                                          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Platform Commissions</div>
                                          <div className="text-4xl font-black text-foreground mb-4">₹34,250</div>
                                   </div>
                                   <div className="ios-platter p-6 rounded-[24px] border border-border/10 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform hover:scale-[1.03] bg-indigo-600 dark:bg-indigo-900/50">
                                          <div className="text-[10px] font-black text-rose-300 uppercase tracking-widest mb-2">Pending Partner Payouts</div>
                                          <div className="text-4xl font-black text-white mb-4">₹18,400</div>
                                   </div>
                            </div>

                     
                     {isLoading ? (
                            <Card className="rounded-[2.5rem] border-border/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)]">
                                   <CardContent className="p-16 flex items-center justify-center">
                                          <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
                                   </CardContent>
                            </Card>
                     ) : (
                            <DataTable 
                            title="Recent Transactions"
                            description={`${filteredTransactions.length} records found in the ledger`}
                            columns={columns}
                            data={filteredTransactions}
                            onSearch={setSearch}
                            headerAction={headerAction}
                     />
                     )}
              </div>
       </div>
       );
}
