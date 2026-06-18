import { motion } from 'motion/react';
import { ArrowLeft, Award, Users, ShieldCheck, Heart } from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

export default function AboutUs({ onBack }: AboutUsProps) {
  return (
    <div className="bg-zinc-50 min-h-screen pb-24 text-left pt-28">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-800 px-4 py-2.5 rounded-full border border-zinc-200 transition-all font-semibold text-sm cursor-pointer shadow-sm mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Hero title */}
        <div className="space-y-6 mb-16">
          <span className="bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-zinc-900 leading-tight">
            Redefining how the world <br />
            <span className="text-indigo-600">experiences travel</span>
          </h1>
          <p className="text-zinc-650 text-lg md:text-xl leading-relaxed">
            At TolidayTrip, we believe that traveling is more than just arriving at a destination. It is about the stories created along the way, the hidden spots discovered, and the flawless, stress-free journeys that make it memorable.
          </p>
        </div>

        {/* Core Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Listed Hotels', value: '1.2M+' },
            { label: 'Holiday Packages', value: '500+' },
            { label: 'Happy Customers', value: '100K+' },
            { label: 'Support SLA', value: '24/7' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-sm">
              <p className="text-3xl font-extrabold text-indigo-600 mb-1">{stat.value}</p>
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Vision & Mission */}
        <div className="bg-zinc-900 text-white rounded-[3rem] p-8 md:p-12 mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-indigo-400 font-bold uppercase tracking-wider text-xs">Our Mission</h3>
            <h4 className="text-2xl md:text-3xl font-display font-bold leading-tight">
              To build the ultimate all-in-one companion for the modern traveler.
            </h4>
          </div>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            We integrate premium hotels, transport (cabs, buses), customized itinerary packages, and robust financial wallet features into one unified platform. No switching tabs, no unexpected fees—just clean, pure, transparent travel planning.
          </p>
        </div>

        {/* Values */}
        <div className="space-y-8 mb-16">
          <h3 className="text-2xl font-bold text-zinc-900">What we stand for</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Uncompromised Trust',
                desc: 'Verified stays and fully transparent pricing with zero hidden surcharges.'
              },
              {
                icon: Users,
                title: 'Customer First',
                desc: 'Support that never sleeps. Our specialists are ready round the clock to keep you moving.'
              },
              {
                icon: Award,
                title: 'Premium Quality',
                desc: 'Curating the best boutique properties and standardizing road trip operators.'
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-zinc-900 text-base">{value.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-3xl p-8 text-center space-y-4">
          <Heart className="w-8 h-8 text-indigo-600 mx-auto" />
          <h3 className="text-xl font-bold text-indigo-900">Join Us on the Journey</h3>
          <p className="text-sm text-zinc-650 max-w-lg mx-auto">
            Ready to explore? Browse our curated hotels, packages, and services to start planning your next getaway.
          </p>
          <button 
            onClick={onBack}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer inline-block"
          >
            Start Booking
          </button>
        </div>
      </div>
    </div>
  );
}
