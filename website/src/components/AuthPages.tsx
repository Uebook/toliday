import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, ChevronRight, ArrowLeft, Sparkles, Star } from 'lucide-react';

interface AuthPagesProps {
  onBack: () => void;
  onLogin: (user: any) => void;
}

const TESTIMONIALS = [
  { name: 'Priya S.', text: 'Booked my Goa trip in minutes. Best travel app ever!', rating: 5 },
  { name: 'Arjun M.', text: 'Cab service was amazing – on time and very comfortable.', rating: 5 },
  { name: 'Sneha K.', text: 'Found the best hotel deals here. Highly recommend!', rating: 5 },
];

export default function AuthPages({ onBack, onLogin }: AuthPagesProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: formData.name || 'John Doe',
        email: formData.email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex pt-20">
      {/* Left Panel — Branding / Social Proof */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden flex-col justify-between p-14">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-orange/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
          />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <img src="https://toliday.in/images/logo.png" alt="Toliday" className="h-12 brightness-0 invert mb-16" />
          <h2 className="text-4xl font-display font-extrabold text-white leading-tight mb-4">
            Travel smarter,<br />
            <span className="text-brand-orange">explore more.</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Join over 2 million happy travelers. Book hotels, buses, cabs & holidays all in one place.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Happy Travelers', value: '2M+' },
            { label: 'Cities Covered', value: '500+' },
            { label: 'Hotels Listed', value: '10K+' },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <p className="text-2xl font-display font-extrabold text-brand-orange">{s.value}</p>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="relative z-10 space-y-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center shrink-0 text-brand-orange font-bold text-xs border border-brand-orange/20">
                {t.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-2.5 h-2.5 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <p className="text-white/70 text-xs leading-relaxed">"{t.text}"</p>
                <p className="text-brand-orange text-[10px] font-bold mt-1">— {t.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 py-10">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-brand-orange transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          {/* Card */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-zinc-200/60 border border-zinc-100 relative overflow-hidden"
          >
            {/* Decorative blobs */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-orange/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-50 rounded-full blur-2xl pointer-events-none" />

            {/* Icon + Header */}
            <div className="text-center mb-8 relative z-10">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-brand-orange to-orange-400 flex items-center justify-center shadow-lg shadow-brand-orange/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <motion.h1 layout className="text-3xl font-display font-extrabold text-zinc-900 mb-2">
                {isLogin ? 'Welcome Back!' : 'Join Toliday'}
              </motion.h1>
              <motion.p layout className="text-zinc-400 text-sm">
                {isLogin
                  ? 'Sign in to access your bookings and deals.'
                  : 'Create an account and start exploring the world.'}
              </motion.p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5 overflow-hidden"
                  >
                    <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest pl-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/30 transition-all font-medium text-sm text-zinc-900"
                        placeholder="John Doe"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/30 transition-all font-medium text-sm text-zinc-900"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center pr-1">
                  <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest pl-1">Password</label>
                  {isLogin && (
                    <button type="button" className="text-[10px] font-bold text-brand-orange uppercase hover:underline outline-none">
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/30 transition-all font-sans text-sm text-zinc-900"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-orange text-white py-4.5 rounded-2xl font-bold text-base hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/30 flex items-center justify-center gap-2 group mt-2 active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-7 relative z-10">
              <div className="relative flex items-center justify-center mb-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-100"></div>
                </div>
                <span className="relative px-4 bg-white text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Or continue with
                </span>
              </div>

              <button className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-zinc-50 border border-zinc-100 rounded-2xl hover:bg-zinc-100 transition-all font-bold text-sm text-zinc-700 shadow-sm hover:shadow-md active:scale-[0.98]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Toggle Sign In / Sign Up */}
            <p className="mt-7 text-center text-sm text-zinc-400 relative z-10">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-bold text-brand-orange hover:underline outline-none"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
