'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { IndianRupee, Download, ArrowUpRight, ArrowDownRight, RefreshCcw, Clock } from 'lucide-react';

export default function GlobalLedgerPage() {
       const [search, setSearch] = useState('');

       
       const { data: transactions = [], isLoading, error } = useQuery({
              queryKey: ['ledger', '/finance/admin/ledger'],
              queryFn: async () => {
                     const res = await api.get('/finance/admin/ledger');
                     return res.data.map((t: any) => ({
                            id: t.id,
                            vendor: t.vendorId, // Generic vendor ID for now
                            
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
              t.vendor.toLowerCase().includes(search.toLowerCase())
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
                     header: 'Vendor / Partner',
                     accessor: 'vendor',
                     render: (trx: any) => (
                            <div>
                                   <div className="font-bold text-slate-700 text-sm">{trx.vendor}</div>
                                   <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">{trx.vertical}</div>
                            </div>
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
                                          {trx.type === 'INCOME' ? 'Revenue' : 'Payout'}
                                   </span>
                            </div>
                     )
              },
              {
                     header: 'Amount',
                     accessor: 'amount',
                     render: (trx: any) => (
                            <div className="text-sm font-black text-slate-900">${trx.amount.toLocaleString()}</div>
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
                                   {trx.status === 'PENDING' && <Clock size={12} className="lucide-clock" />}
                                   {trx.status}
                            </div>
                     )
              }
       ];

       const headerAction = (
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 group">
                     <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Export Statement
              </button>
       );

       return (
              <div className="p-8 lg:p-12 animate-fadeIn space-y-8">
                     <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                   <div className="flex items-center gap-3 mb-2">
                                          <div className="p-2 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                                                 <IndianRupee size={20} />
                                          </div>
                                          <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Global Intelligence</span>
                                   </div>
                                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">Global Transactions</h1>
                                   <p className="text-slate-400 font-bold mt-2">Master ledger tracking all incoming revenue and vendor payouts</p>
                            </div>
                     </header>

                     {/* Top Level Metrics */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform">
                                   <CardContent className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Total Platform Revenue (YTD)</div>
                                          <div className="text-4xl font-black text-slate-900 mb-4">₹1.24M</div>
                                   </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform">
                                   <CardContent className="p-8 relative z-10">
                                          <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">Pending Vendor Payouts</div>
                                          <div className="text-4xl font-black text-slate-900 mb-4">₹42,500</div>
                                   </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-transform bg-slate-900 text-white">
                                   <CardContent className="p-8 relative z-10 h-full flex flex-col justify-center">
                                          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Available Balance</div>
                                          <div className="text-4xl font-black mb-4">₹854,200</div>
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
