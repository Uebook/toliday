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
        <div className="ios-sheet rounded-[28px] border border-border/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden animate-fadeIn">
            <div className="p-6 md:p-8 border-b border-border/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-black/[0.01] dark:bg-white/[0.01]">
                <div>
                    <h2 className="font-extrabold text-sm uppercase tracking-wider text-muted-foreground/60">{title}</h2>
                    {description && <p className="text-xl font-black tracking-tight text-foreground mt-1">{description}</p>}
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    {onSearch && (
                        <div className="relative flex-1 md:w-64 group">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-blue-500 transition-colors" />
                            <input 
                                type="text"
                                placeholder="Search records..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    onSearch(e.target.value);
                                }}
                                className="w-full bg-black/[0.02] dark:bg-white/[0.03] border border-border/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-muted-foreground/60"
                            />
                        </div>
                    )}
                    {headerAction}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                    <thead>
                        <tr className="bg-black/[0.01] dark:bg-white/[0.01] border-b border-border/5">
                            {columns.map((col, i) => (
                                <th key={i} className="px-6 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    {col.header}
                                </th>
                            ))}
                            {actions && <th className="px-6 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/5">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse bg-white/50 dark:bg-slate-900/50">
                                    {columns.map((_, j) => (
                                        <td key={j} className="px-6 md:px-8 py-6">
                                            <div className="h-4 bg-black/5 dark:bg-white/5 rounded-full w-3/4"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : currentData.length > 0 ? (
                            currentData.map((item, i) => (
                                <tr key={i} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors group cursor-default">
                                    {columns.map((col, j) => (
                                        <td key={j} className="px-6 md:px-8 py-5">
                                            {col.render ? col.render(item) : (
                                                <span className="text-xs font-bold text-foreground/90">{item[col.accessor]}</span>
                                            )}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-6 md:px-8 py-5 text-right">
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
                                        <div className="w-20 h-20 bg-black/[0.02] dark:bg-white/[0.02] rounded-[2rem] flex items-center justify-center text-muted-foreground/40 mb-6 shadow-inner">
                                            <Search size={32} />
                                        </div>
                                        <h3 className="text-xl font-black text-foreground mb-2">No records found</h3>
                                        <p className="text-muted-foreground text-sm font-bold max-w-sm">We couldn't find any data matching your current filters and search criteria.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Elegant Pagination Footer */}
            <div className="p-6 border-t border-border/10 bg-black/[0.01] dark:bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Showing {totalItems > 0 ? startIndex + 1 : 0} to {endIndex} of {totalItems}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="p-2.5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-border/10 rounded-xl text-foreground hover:text-blue-500 disabled:opacity-50 disabled:hover:text-foreground transition-all shadow-sm"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    
                    <div className="flex items-center gap-1.5 px-2">
                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                            const page = i + 1;
                            return (
                                <button 
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${currentPage === page 
                                        ? 'bg-blue-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.3)] scale-110' 
                                        : 'bg-transparent text-muted-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'}`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        {totalPages > 5 && <span className="px-2 text-muted-foreground font-bold">...</span>}
                    </div>

                    <button 
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="p-2.5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-border/10 rounded-xl text-foreground hover:text-blue-500 disabled:opacity-50 disabled:hover:text-foreground transition-all shadow-sm"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
