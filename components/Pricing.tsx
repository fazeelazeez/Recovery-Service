import React from 'react';
import { Check, Info } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-brand-900 relative overflow-hidden scroll-mt-28">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Transparent Pricing</h2>
          <p className="text-slate-400">No hidden fees. You only pay for results.</p>
        </div>

        <div className="max-w-lg mx-auto bg-brand-800 border border-brand-700 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8 md:p-12 text-center border-b border-brand-700/50">
            <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Standard Recovery</span>
            <h3 className="text-5xl font-bold text-white mt-6 mb-2">$300</h3>
            <p className="text-slate-400">Success Fee</p>
          </div>
          
          <div className="p-8 md:p-12 bg-brand-900/50">
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <span>No upfront charges</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                 <Check className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <span>Full Account Security Audit</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                 <Check className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <span>Direct Support Escalation</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                 <Check className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <span>Fast Communication (WhatsApp)</span>
              </li>
            </ul>
            
            <div className="bg-brand-800 rounded-xl p-4 flex gap-3">
              <Info className="w-5 h-5 text-brand-blue shrink-0" />
              <p className="text-xs text-slate-400 text-left">
                We operate on a trust-based model. Payment is discussed and settled once your case is successfully assessed and processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};