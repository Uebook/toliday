'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import DataTable from '@/components/admin/DataTable';
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
                                   <div className="font-black text-slate-900 text-sm">{trx.id}</div>
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
                                   <div className="text-sm font-black text-slate-900">${trx.amount.toLocaleString()}</div>
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
              <div className="p-8 lg:p-12 animate-fadeIn space-y-8">
                     <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                   <div className="flex items-center gap-3 mb-2">
                                          <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-600/20">
                                                 <IndianRupee size={20} />
                                          </div>
                                          <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Packages Operations</span>
                                   </div>
                                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">Finance & Payments</h1>
                                   <p className="text-slate-400 font-bold mt-2">Manage revenue, commissions, and payouts for tour partners</p>
                            </div>
                     </header>

                     {/* Top Level Metrics */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform">
                                   <CardContent className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Total Vertical Revenue</div>
                                          <div className="text-4xl font-black text-slate-900 mb-4">₹342,500</div>
                                   </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform">
                                   <CardContent className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Platform Commissions</div>
                                          <div className="text-4xl font-black text-slate-900 mb-4">₹34,250</div>
                                   </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform bg-slate-900 text-white">
                                   <CardContent className="p-8 relative z-10 h-full flex flex-col justify-center">
                                          <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2">Pending Partner Payouts</div>
                                          <div className="text-4xl font-black mb-4">₹18,400</div>
                                   </CardContent>
                            </Card>
                     </div>

                     
                     {isLoading ? (
                            <Card className="rounded-[2.5rem] border-slate-100 shadow-xl">
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
       );
}
