import React from 'react';
import { MessageSquare, FileInput, Settings, CheckCircle } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    { icon: MessageSquare, title: "Enquiry", desc: "Reach out via WhatsApp or browse services." },
    { icon: FileInput, title: "Submit Form", desc: "Fill out the secure recovery details form below." },
    { icon: Settings, title: "We Handle It", desc: "We process the case directly with support teams." },
    { icon: CheckCircle, title: "Recovery", desc: "Regain access and secure your account." },
  ];

  return (
    <section id="process" className="py-20 bg-brand-900 border-y border-brand-800 scroll-mt-28">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white text-center mb-16">How It Works</h2>
        
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-brand-800 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-brand-900 md:bg-transparent p-4 rounded-xl">
                <div className="w-16 h-16 bg-brand-800 border border-brand-700 rounded-full flex items-center justify-center text-white mb-6 shadow-lg relative">
                  <step.icon className="w-7 h-7" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center text-xs font-bold text-white border border-brand-900">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};