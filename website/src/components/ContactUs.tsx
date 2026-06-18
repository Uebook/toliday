import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Phone, Mail, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

interface ContactUsProps {
  onBack: () => void;
}

export default function ContactUs({ onBack }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="bg-zinc-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="text-zinc-500 text-sm font-medium hover:text-indigo-600 mb-8 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100">
            Contact Support
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-zinc-900 leading-tight">
            We'd love to hear from you
          </h1>
          <p className="text-zinc-500 text-lg">
            Have questions about bookings, partners, or packages? Our team is available 24/7 to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-zinc-900 text-lg">Call Us</h3>
                <p className="text-zinc-500 text-sm">Our customer support line is open 24/7.</p>
                <p className="text-indigo-600 font-extrabold text-base mt-1">+1 (800) TOLIDAY</p>
                <p className="text-indigo-600 font-bold text-sm">+91 (987) 654-3210</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-zinc-900 text-lg">Email Us</h3>
                <p className="text-zinc-500 text-sm">Drop us a line and we'll reply within 2 hours.</p>
                <p className="text-emerald-600 font-extrabold text-base mt-1">support@tolidaytrip.com</p>
                <p className="text-emerald-600 font-bold text-sm">partners@tolidaytrip.com</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-zinc-900 text-lg">Corporate Office</h3>
                <p className="text-zinc-500 text-sm">Visit our headquarters or mail correspondence here.</p>
                <p className="text-zinc-700 font-medium text-sm mt-2 leading-relaxed">
                  TolidayTrip Private Limited<br />
                  Level 5, Capital Tower, Sector 44,<br />
                  Gurugram, Haryana - 122003, India
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-indigo-950 text-white rounded-[2.5rem] p-8 shadow-xl flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-indigo-300 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-lg">Support Hours</h3>
                <p className="text-zinc-400 text-sm">We cover all timezones around the globe.</p>
                <p className="text-indigo-300 font-bold text-sm mt-1">Hotels & Stays: 24/7/365</p>
                <p className="text-indigo-300 font-bold text-sm">Cabs & Buses: 6:00 AM - 11:59 PM IST</p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] p-10 border border-zinc-100 shadow-lg text-left">
              <h2 className="text-2xl font-bold text-zinc-900 mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-zinc-50 border border-zinc-150 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-zinc-50 border border-zinc-150 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-zinc-50 border border-zinc-150 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Subject</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-150 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-600 transition-colors cursor-pointer"
                    >
                      <option>General Inquiry</option>
                      <option>Booking Modification</option>
                      <option>Cancellation & Refunds</option>
                      <option>Partner Onboarding</option>
                      <option>Technical Issue</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Your Message</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need help with..."
                    className="w-full bg-zinc-50 border border-zinc-150 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-600 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-150/50 hover:shadow-xl transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] p-10 max-w-md w-full text-center shadow-2xl relative border border-zinc-100"
            >
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Message Sent!</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Thank you for contacting TolidayTrip. Our customer experience expert will reach out to you shortly.
              </p>
              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-4 rounded-2xl font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
