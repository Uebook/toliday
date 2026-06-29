'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
       Star, Search, MessageSquare, AlertCircle,
       CheckCircle, Clock, Trash2, Filter, CornerDownRight,
       CarFront
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CabsReviewsPage() {
       const [search, setSearch] = useState('');

       
       const queryClient = useQueryClient();
       
       const { data: reviews = [], isLoading } = useQuery({
              queryKey: ['reviews', '/reviews/admin/all?vertical=CAB'],
              queryFn: async () => {
                     const res = await api.get('/reviews/admin/all?vertical=CAB');
                     return res.data.map((r: any) => ({
                            id: r.id,
                            partnerName: r.vendorName,
                            guestName: r.guestName,
                            rating: r.rating,
                            comment: r.comment,
                            status: r.status,
                            date: r.createdAt
                     }));
              }
       });

       const updateStatusMutation = useMutation({
              mutationFn: async ({ id, status }: { id: string, status: string }) => {
                     return api.patch(`/reviews/admin/${id}/status`, { status });
              },
              onSuccess: () => {
                     queryClient.invalidateQueries({ queryKey: ['reviews', '/reviews/admin/all?vertical=CAB'] });
                     toast.success('Review status updated');
              }
       });

       const deleteMutation = useMutation({
              mutationFn: async (id: string) => {
                     return api.delete(`/reviews/admin/${id}`);
              },
              onSuccess: () => {
                     queryClient.invalidateQueries({ queryKey: ['reviews', '/reviews/admin/all?vertical=CAB'] });
                     toast.success('Review deleted');
              }
       });
    

       const handleAction = (id: string, action: string) => {
              if (action === 'DELETE') {
                     deleteMutation.mutate(id);
              } else if (action === 'APPROVE') {
                     updateStatusMutation.mutate({ id, status: 'PUBLISHED' });
              }
       };

       const filteredReviews = reviews.filter((r: any) =>
              r.partnerName.toLowerCase().includes(search.toLowerCase()) ||
              r.guestName.toLowerCase().includes(search.toLowerCase()) ||
              r.comment.toLowerCase().includes(search.toLowerCase())
       );

       return (
              <div className="p-8 lg:p-12 animate-fadeIn space-y-8">
                     <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                   <div className="flex items-center gap-3 mb-2">
                                          <div className="p-2 bg-rose-600 rounded-xl text-white shadow-lg shadow-rose-600/20">
                                                 <Star size={20} />
                                          </div>
                                          <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Cab Operations</span>
                                   </div>
                                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">Reviews & CX Moderation</h1>
                                   <p className="text-slate-400 font-bold mt-2">Monitor and moderate guest feedback across all cab partners</p>
                            </div>
                     </header>

                     <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                   <div className="flex gap-4">
                                          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm min-w-[150px]">
                                                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Rating</div>
                                                 <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
                                                        4.8 <Star className="text-amber-400 fill-amber-400" size={20} />
                                                 </div>
                                          </div>
                                          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm min-w-[150px]">
                                                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending</div>
                                                 <div className="text-2xl font-black text-amber-500">
                                                        {reviews.filter((r: any) => r.status === 'PENDING').length}
                                                 </div>
                                          </div>
                                   </div>
                                   <div className="relative">
                                          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                          <input
                                                 type="text"
                                                 placeholder="Search reviews..."
                                                 value={search}
                                                 onChange={(e) => setSearch(e.target.value)}
                                                 className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none w-full md:w-80 transition-all"
                                          />
                                   </div>
                            </CardHeader>
                            
                             <CardContent className="p-0">
                                           
                                   {isLoading ? (
                                           <div className="p-20 flex items-center justify-center">
                                                  <Loader2 className="animate-spin text-rose-500 w-8 h-8" />
                                           </div>
                                    ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                                          {filteredReviews.map((review: any) => (
                                                 <Card key={review.id} className="relative overflow-hidden group hover:border-rose-200 transition-all shadow-sm hover:shadow-xl bg-white border-slate-100 rounded-[2rem]">
                                                        <CardContent className="p-6">
                                                               <div className="flex items-center justify-between mb-4">
                                                                      <div className="flex gap-1">
                                                                             {[...Array(5)].map((_, i) => (
                                                                                    <Star
                                                                                           key={i}
                                                                                           size={14}
                                                                                           className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
                                                                                    />
                                                                             ))}
                                                                      </div>
                                                                      <div className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg ${
                                                                             review.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                                      }`}>
                                                                             {review.status}
                                                                      </div>
                                                               </div>

                                                               <p className="text-sm font-medium text-slate-700 leading-relaxed mb-6 line-clamp-3">
                                                                      "{review.comment}"
                                                               </p>

                                                               <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                                                                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                                                                             <CarFront size={14} />
                                                                      </div>
                                                                      <div className="flex-1 min-w-0">
                                                                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner</div>
                                                                             <div className="text-xs font-bold text-slate-900 truncate">{review.partnerName}</div>
                                                                      </div>
                                                               </div>

                                                               <div className="flex items-center justify-between mt-4">
                                                                      <div>
                                                                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guest</div>
                                                                             <div className="text-xs font-bold text-slate-900">{review.guestName}</div>
                                                                      </div>
                                                                      <div className="text-[10px] font-bold text-slate-400">{review.date}</div>
                                                               </div>

                                                               <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-2xl backdrop-blur-sm shadow-sm border border-slate-100">
                                                                      {review.status === 'PENDING' && (
                                                                             <button
                                                                                    onClick={() => handleAction(review.id, 'APPROVE')}
                                                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors tooltip-trigger"
                                                                                    title="Approve & Publish"
                                                                             >
                                                                                    <CheckCircle size={16} />
                                                                             </button>
                                                                      )}
                                                                      <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors tooltip-trigger" title="Reply to Guest">
                                                                             <CornerDownRight size={16} />
                                                                      </button>
                                                                      <button
                                                                             onClick={() => handleAction(review.id, 'DELETE')}
                                                                             className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors tooltip-trigger"
                                                                             title="Delete Review"
                                                                      >
                                                                             <Trash2 size={16} />
                                                                      </button>
                                                               </div>
                                                        </CardContent>
                                                 </Card>
                                          ))}

                                          {filteredReviews.length === 0 && (
                                                 <div className="col-span-full p-20 text-center flex flex-col items-center">
                                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                                                               <MessageSquare size={24} />
                                                        </div>
                                                        <div className="text-slate-400 font-bold">No reviews found matching your criteria.</div>
                                                 </div>
                                          )}
                                   </div>
                                   )}
                            </CardContent>
                     </Card>
              </div>
       );
}
