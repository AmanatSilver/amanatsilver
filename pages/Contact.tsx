
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiService } from '../services/api';

const Contact: React.FC = () => {
  const location = useLocation();
  const initialProduct = location.state?.productName || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: initialProduct ? `I am interested in the ${initialProduct}.` : ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await apiService.submitEnquiry(formData);
      if (response.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-stone-50 pt-48 pb-32 min-h-screen relative z-10" data-scroll-section>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          
          <div data-scroll data-scroll-speed="0.5">
            <h1 className="text-6xl font-light mb-12 serif tracking-tight gsap-fade-up">Initiate a Conversation</h1>
            <p className="text-stone-500 font-light leading-relaxed text-lg mb-12 gsap-fade-up">
              Our pieces are often bespoke or produced in limited editions. Please use the form to enquire about availability, private commissions, or to schedule an appointment at our London atelier.
            </p>
            
            <div className="space-y-12 gsap-fade-up">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-4">Location</h4>
                <p className="text-sm font-light leading-loose">
                  14 Albemarle Street<br/>
                  Mayfair, London<br/>
                  W1S 4PH
                </p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-4">Contact</h4>
                <p className="text-sm font-light leading-loose">
                  atelier@amanatsilver.com<br/>
                  +44 (0) 20 7946 0123
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 shadow-sm" data-scroll data-scroll-speed="0.3">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-[1px] bg-stone-900 mb-8"></div>
                <h2 className="text-3xl serif italic mb-4">Message Received</h2>
                <p className="text-stone-400 font-light">Our concierge will contact you within 24 hours.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-12 text-[10px] uppercase tracking-[0.3em] line-reveal"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    placeholder=" "
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border-b border-stone-200 py-4 outline-none focus:border-stone-900 transition-colors bg-transparent peer"
                  />
                  <label className="absolute left-0 top-4 text-[10px] uppercase tracking-[0.3em] text-stone-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px]">Full Name</label>
                </div>

                <div className="relative">
                  <input 
                    type="email" 
                    required
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border-b border-stone-200 py-4 outline-none focus:border-stone-900 transition-colors bg-transparent peer"
                  />
                  <label className="absolute left-0 top-4 text-[10px] uppercase tracking-[0.3em] text-stone-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px]">Email Address</label>
                </div>

                <div className="relative">
                  <textarea 
                    rows={4}
                    required
                    placeholder=" "
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full border-b border-stone-200 py-4 outline-none focus:border-stone-900 transition-colors bg-transparent peer resize-none"
                  ></textarea>
                  <label className="absolute left-0 top-4 text-[10px] uppercase tracking-[0.3em] text-stone-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px]">Enquiry Details</label>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-stone-900 text-white py-6 text-[10px] uppercase tracking-[0.5em] hover:bg-stone-800 transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Processing...' : 'Submit Enquiry'}
                </button>
                {status === 'error' && <p className="text-red-500 text-[10px] uppercase text-center">Something went wrong. Please try again.</p>}
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
