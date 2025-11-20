import React from 'react';
import { Testimonial } from '../types';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    { id: 1, initials: "JD", text: "My 100k sub channel was hacked. Fazeel guided me through the process when Google support was silent. Got it back in 5 days.", service: "YouTube Recovery" },
    { id: 2, initials: "MK", text: "I lost access to my AdSense due to a compromised Gmail. The team handled everything professionally. Trustworthy service.", service: "Google Account" },
    { id: 3, initials: "SAR", text: "Fast, private, and secure. I was panicked, but the WhatsApp support was reassuring. Highly recommended for any creator.", service: "Security Setup" },
  ];

  return (
    <section id="testimonials" className="py-20 bg-brand-800/30 scroll-mt-28">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white text-center mb-16">Success Stories</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-brand-900 border border-brand-700/50 rounded-2xl p-8 relative">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-accent fill-brand-accent" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-800 rounded-full flex items-center justify-center text-brand-blue font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Client {t.initials}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">{t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};