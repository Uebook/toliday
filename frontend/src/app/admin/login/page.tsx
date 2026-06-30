'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import api from '@/lib/api';

export default function AdminLoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(() => {
        if (typeof window !== 'undefined') {
            const err = new URLSearchParams(window.location.search).get('error');
            if (err === 'unauthorized') {
                return 'Access Denied: Administrator role required.';
            }
        }
        return '';
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await api.post('/auth/login', { email, password });
            const decoded: any = jwtDecode(res.data.token);
            if (decoded.role !== 'ADMIN' && decoded.role !== 'superadmin') {
                throw new Error('Access Denied: Administrator role required.');
            }
            localStorage.setItem('token', res.data.token);
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Gorgeous iOS Ambient Background Blur */}
            <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] rounded-full bg-purple-600/10 dark:bg-purple-600/20 blur-[140px] pointer-events-none" />

            <div className="w-full max-w-[440px] z-10 animate-fadeIn">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-[22px] mb-6 shadow-xl transition-transform hover:scale-105 active:scale-95 duration-300 animate-pulse"
                        style={{
                            background: 'linear-gradient(135deg, hsl(230 90% 50%), hsl(260 90% 45%))',
                            boxShadow: '0 8px 30px rgba(79, 70, 229, 0.35)'
                        }}
                    >
                        <Shield size={30} color="white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Toliday Admin OS Portal</p>
                </div>

                {/* iOS Style Glass Card */}
                <div className="bg-white/65 dark:bg-slate-900/40 backdrop-blur-2xl p-8 md:p-10 rounded-[32px] border border-border/10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-destructive/10 border border-destructive/15 text-destructive text-xs font-semibold">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-foreground/75 tracking-wide ml-1 uppercase">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@toliday.com"
                                className="w-full px-4 py-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-border/10 focus:bg-white dark:focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 outline-none text-sm font-medium transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold text-foreground/75 tracking-wide uppercase">Password</label>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-border/10 focus:bg-white dark:focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 outline-none text-sm font-medium transition-all duration-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-blue-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl py-4 transition-all duration-300 ios-tap-scale shadow-[0_8px_25px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2 mt-3 cursor-pointer"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Establish Link <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                                </>
                            )}
                        </button>
                        
                        {/* Seeded Credentials Plist Box */}
                        <div className="mt-6 p-4 rounded-2xl bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100/30 dark:border-blue-900/20">
                            <p className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Seeded Demo Credentials</p>
                            <div className="space-y-2 text-xs font-medium text-foreground/80">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[10px] font-bold text-muted-foreground">GLOBAL ADMIN PORTAL</span>
                                    <div className="flex justify-between font-mono text-[11px] mt-0.5">
                                        <span className="text-muted-foreground">U: admin@toliday.com</span>
                                        <span className="text-foreground font-bold">P: adminpassword123</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="mt-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 text-xs font-bold transition-all group">
                        <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Return to Public Portal
                    </Link>
                </div>
            </div>
        </div>
    );
}
