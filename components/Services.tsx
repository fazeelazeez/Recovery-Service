import React from 'react';
import { Youtube, Mail, ShieldAlert } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      icon: Youtube,
      title: "YouTube Channel Recovery",
      desc: "Restoration of hijacked channels, deleted videos, and ownership transfer issues. We communicate directly with internal support teams.",
      color: "text-brand-accent",
      bg: "bg-brand-accent/10"
    },
    {
      icon: Mail,
      title: "Google Account Recovery",
      desc: "Regain access to locked Gmail accounts, Adsense, and related Google services efficiently and securely.",
      color: "text-brand-blue",
      bg: "bg-brand-blue/10"
    },
    {
      icon: ShieldAlert,
      title: "Post-Recovery Security",
      desc: "After recovery, we set up 2FA, backup codes, and security keys to ensure your account is bulletproof against future attacks.",
      color: "text-slate-300",
      bg: "bg-slate-700/30"
    }
  ];

  return (
    <section id="services" className="py-20 bg-brand-800/30 scroll-mt-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Our Core Services</h2>
          <p className="text-slate-400">Specialized assistance for creators and professionals.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-brand-900 border border-brand-700/50 rounded-2xl p-8 hover:shadow-2xl hover:border-brand-600 transition-all duration-300 group">
              <div className={`w-16 h-16 ${s.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <s.icon className={`w-8 h-8 ${s.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-6">{s.desc}</p>
              <div className="w-full h-1 bg-brand-800 rounded-full overflow-hidden">
                <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-brand-blue to-brand-accent transition-all duration-700 ease-out"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};