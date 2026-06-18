import React, { useState } from 'react';
import { ChevronRight, Check, MapPin, Clock, Calendar, Users, Star, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ActivityDetails({ activity, onBack, onProceedToBooking }: any) {
  const [activeTab, setActiveTab] = useState('options');
  const [selectedRatePlan, setSelectedRatePlan] = useState<any>(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1 = pax, 2 = time slot
  
  // Selection states
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  if (!activity) return null;

  const handleSelectRatePlan = (plan: any) => {
    setSelectedRatePlan(plan);
    setAdults(1);
    setChildren(0);
    setSelectedTimeSlot('');
    setModalStep(1);
    setShowModal(true);
  };

  const handleContinue = () => {
    onProceedToBooking(selectedRatePlan, { adults, children }, selectedTimeSlot);
  };

  const totalSelectedPrice = selectedRatePlan ? ((selectedRatePlan.price * adults) + ((selectedRatePlan.price * 0.7) * children)) : 0;

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-[100px] pb-20">
      
      {/* HEADER BANNER */}
      <div className="w-full h-[300px] lg:h-[400px] relative">
        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-bold text-white/70 mb-4 uppercase tracking-widest">
            <button onClick={onBack} className="hover:text-white transition-colors">Activities</button>
            <ChevronRight className="w-3 h-3" />
            <span>{activity.city}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{activity.title}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{activity.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        
        {/* TABS */}
        <div className="bg-white rounded-t-2xl border-b border-zinc-200 flex overflow-x-auto custom-scrollbar sticky top-[80px] z-30 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
          {[
            { id: 'about', label: 'About' },
            { id: 'highlights', label: 'Highlights' },
            { id: 'options', label: 'Activity Options' },
            { id: 'info', label: 'Important Info' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-5 text-sm font-extrabold uppercase tracking-widest whitespace-nowrap transition-all border-b-4 ${
                activeTab === tab.id 
                  ? 'text-brand-blue border-brand-blue bg-brand-blue/5' 
                  : 'text-zinc-500 border-transparent hover:text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT SECTIONS */}
        <div className="bg-white rounded-b-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          
          <div className="space-y-12">
            
            {/* ABOUT */}
            <div id="about" className={activeTab === 'about' || activeTab === 'options' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-black text-zinc-800 mb-4">About Activity</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 mb-4 uppercase tracking-widest">
                <Users className="w-4 h-4" /> Suitable for Adults and Child
              </div>
              <p className="text-sm font-semibold text-zinc-600 leading-relaxed max-w-4xl">
                {activity.about}
              </p>
            </div>

            {/* HIGHLIGHTS */}
            <div id="highlights" className={activeTab === 'highlights' || activeTab === 'options' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-black text-zinc-800 mb-4">Highlights</h2>
              <ul className="space-y-3">
                {activity.detailedHighlights.map((h: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-blue" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-700 leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* OPTIONS */}
            <div id="options" className={activeTab === 'options' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-black text-zinc-800 mb-6">Activity Options</h2>
              
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-bold text-zinc-700 shadow-sm cursor-pointer hover:border-blue-600">
                  <Calendar className="w-4 h-4 text-zinc-400" /> Tomorrow
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-blue-600 rounded-lg text-sm font-bold text-white shadow-md cursor-pointer">
                  <Calendar className="w-4 h-4" /> 30 May
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-bold text-zinc-700 shadow-sm cursor-pointer hover:border-blue-600">
                  <Calendar className="w-4 h-4 text-zinc-400" /> 31 May
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-extrabold text-zinc-500 uppercase tracking-widest mb-2 px-2">Rate Plan Options</div>
                {activity.ratePlans.map((plan: any) => (
                  <div key={plan.id} className="border border-zinc-200 rounded-2xl p-6 bg-white hover:border-blue-600 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-zinc-800 mb-3">{plan.title}</h3>
                        <ul className="space-y-2 mb-2">
                          {plan.features.map((f: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-xs font-bold text-zinc-600">
                              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> {f}
                            </li>
                          ))}
                        </ul>
                        <button className="text-xs font-bold text-brand-blue hover:underline">More Details</button>
                      </div>
                      
                      <div className="flex flex-col items-end min-w-[150px]">
                        <div className="text-xs font-bold text-zinc-400 line-through mb-1">From ₹{plan.originalPrice.toLocaleString()}</div>
                        <div className="flex items-end gap-1 mb-1">
                          <span className="text-2xl font-black text-zinc-900 leading-none">₹{plan.price.toLocaleString()}</span>
                        </div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">per Adult</div>
                        
                        <button 
                          onClick={() => handleSelectRatePlan(plan)}
                          className="w-full py-3 bg-white border-2 border-brand-blue text-brand-blue rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-colors"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INFO */}
            <div id="info" className={activeTab === 'info' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-black text-zinc-800 mb-4">Important Info</h2>
              <div className="space-y-4">
                {['Terms & Conditions', 'Driver Information', 'FAQs'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-zinc-200 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors">
                    <span className="text-sm font-bold text-zinc-700">{item}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SELECTION MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                <div>
                  <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">
                    Step {modalStep} of 2
                  </div>
                  <h3 className="text-lg font-black text-zinc-800">
                    {modalStep === 1 ? 'Select Travellers' : 'Select Time Slot'}
                  </h3>
                </div>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full hover:bg-zinc-200 flex items-center justify-center text-zinc-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {modalStep === 1 ? (
                  <div className="space-y-6">
                    {/* Adult Pax */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-black text-zinc-800">Adult</div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">From ₹{selectedRatePlan?.price.toLocaleString()} / Adult</div>
                      </div>
                      <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 rounded-xl p-1">
                        <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200 rounded-lg transition-colors font-bold text-lg">-</button>
                        <span className="w-4 text-center font-black text-zinc-800">{adults}</span>
                        <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200 rounded-lg transition-colors font-bold text-lg">+</button>
                      </div>
                    </div>
                    
                    {/* Child Pax */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-black text-zinc-800">Child</div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">From ₹{Math.round(selectedRatePlan?.price * 0.7).toLocaleString()} / Child</div>
                      </div>
                      <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 rounded-xl p-1">
                        <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200 rounded-lg transition-colors font-bold text-lg">-</button>
                        <span className="w-4 text-center font-black text-zinc-800">{children}</span>
                        <button onClick={() => setChildren(children + 1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200 rounded-lg transition-colors font-bold text-lg">+</button>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-amber-800">If age is near the cut off between two age groups, we recommend choosing the higher age group for better experience.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs font-bold text-amber-800">
                      Timings listed as per local time of the destination
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {activity.timeSlots.map((time: string) => (
                        <label key={time} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedTimeSlot === time ? 'border-brand-blue bg-brand-blue/5' : 'border-zinc-200 hover:border-zinc-300'}`}>
                          <input 
                            type="radio" 
                            name="timeSlot" 
                            checked={selectedTimeSlot === time} 
                            onChange={() => setSelectedTimeSlot(time)}
                            className="w-5 h-5 text-brand-blue focus:ring-brand-blue" 
                          />
                          <div>
                            <div className="text-base font-black text-zinc-800">{time}</div>
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total ₹{totalSelectedPrice.toLocaleString()}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1">Starting From</div>
                  <div className="text-xl font-black text-zinc-900 leading-none">₹{totalSelectedPrice.toLocaleString()}</div>
                </div>
                
                <div className="flex gap-3">
                  {modalStep === 2 && (
                    <button onClick={() => setModalStep(1)} className="px-6 py-3 rounded-xl border border-brand-blue text-brand-blue font-black text-xs uppercase tracking-widest hover:bg-brand-blue/5 transition-colors">
                      Back
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      if (modalStep === 1) setModalStep(2);
                      else {
                        if (!selectedTimeSlot && activity.timeSlots.length > 0) return alert('Please select a time slot.');
                        handleContinue();
                      }
                    }} 
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-[0_4px_15px_rgba(20,100,255,0.3)]"
                  >
                    {modalStep === 1 ? 'Select Time Slot' : 'Continue'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
