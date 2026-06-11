'use client';

import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    ChevronLeft, 
    ChevronRight, 
} from 'lucide-react';

interface Column {
    header: string;
    accessor: string;
    render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
    title: string;
    description?: string;
    columns: Column[];
    data: any[];
    onSearch?: (query: string) => void;
    onFilter?: (filter: string) => void;
    isLoading?: boolean;
    actions?: (item: any) => React.ReactNode;
    headerAction?: React.ReactNode;
}

export default function DataTable({
    title,
    description,
    columns,
    data,
    onSearch,
    onFilter,
    isLoading,
    actions,
    headerAction
}: DataTableProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentData = data.slice(startIndex, endIndex);

    return (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden animate-fadeIn">
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
                    {description && <p className="text-slate-400 text-sm font-bold mt-1">{description}</p>}
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    {onSearch && (
                        <div className="relative flex-1 md:w-64 group">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input 
                                type="text"
                                placeholder="Search records..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    onSearch(e.target.value);
                                }}
                                className="w-full bg-slate-50 border border-transparent rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
                            />
                        </div>
                    )}
                    {headerAction}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            {columns.map((col, i) => (
                                <th key={i} className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {col.header}
                                </th>
                            ))}
                            {actions && <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50/80">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    {columns.map((_, j) => (
                                        <td key={j} className="px-8 py-6">
                                            <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : currentData.length > 0 ? (
                            currentData.map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    {columns.map((col, j) => (
                                        <td key={j} className="px-8 py-6">
                                            {col.render ? col.render(item) : (
                                                <span className="text-sm font-bold text-slate-700">{item[col.accessor]}</span>
                                            )}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                {actions(item)}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-8 py-32 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 mb-6 shadow-inner">
                                            <Search size={32} />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2">No records found</h3>
                                        <p className="text-slate-400 text-sm font-bold max-w-sm">We couldn't find any data matching your current filters and search criteria.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Elegant Pagination Footer */}
            <div className="p-6 border-t border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Showing {totalItems > 0 ? startIndex + 1 : 0} to {endIndex} of {totalItems}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all shadow-sm"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    
                    <div className="flex items-center gap-1 px-2">
                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                            const page = i + 1;
                            return (
                                <button 
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${currentPage === page 
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-110' 
                                        : 'bg-transparent text-slate-500 hover:bg-white hover:shadow-sm'}`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        {totalPages > 5 && <span className="px-2 text-slate-400 font-bold">...</span>}
                    </div>

                    <button 
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all shadow-sm"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
