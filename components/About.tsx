import React from 'react';
import { Youtube, Shield, History, UserCheck } from 'lucide-react';

export const About: React.FC = () => {
  const features = [
    { icon: Youtube, label: "YouTube Certified", desc: "Officially recognized expertise." },
    { icon: History, label: "300+ Recoveries", desc: "Proven track record of success." },
    { icon: Shield, label: "End-to-End Secure", desc: "We handle everything safely." },
    { icon: UserCheck, label: "No Passwords Needed", desc: "We work with recovery systems." },
  ];

  return (
    <section className="py-20 bg-brand-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Expert Recovery, Without the Stress
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Navigating Google and YouTube support systems can be overwhelming, especially when your digital assets are at risk. 
            With over 5 years of experience as a Music Tech Consultant and Account Specialist, I provide a bridge between you and the recovery you need. 
            I handle the technical complexity so you can focus on creating.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-brand-800/50 p-6 rounded-2xl border border-brand-700/50 flex flex-col items-center text-center hover:border-brand-blue/50 transition-colors">
              <div className="w-14 h-14 bg-brand-900 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <f.icon className="w-7 h-7 text-brand-blue" />
              </div>
              <h3 className="text-white font-bold mb-2">{f.label}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
