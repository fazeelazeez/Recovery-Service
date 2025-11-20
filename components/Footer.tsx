
import React from 'react';
import { Shield, Mail } from 'lucide-react';

interface FooterProps {
  openLegal: (type: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ openLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-black py-16 border-t border-brand-900 font-sans">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-blue rounded-md flex items-center justify-center">
                 <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-white text-lg tracking-tight">FAZEEL AZEEZ</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Professional YouTube Certified specialist helping creators and businesses recover compromised digital assets securely and efficiently.
            </p>
            {/* Social Icons - Only Email is kept as it is the primary verified channel */}
            <div className="flex gap-4">
              <a href="mailto:fazeelazeez.in@gmail.com" className="w-10 h-10 bg-brand-900 rounded-full flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-all border border-brand-800">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-brand-accent transition-colors">Services</a></li>
              <li><a href="#process" className="hover:text-brand-accent transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-brand-accent transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-brand-accent transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-6">Legal</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><button onClick={() => openLegal('privacy')} className="hover:text-brand-accent transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => openLegal('terms')} className="hover:text-brand-accent transition-colors text-left">Terms & Conditions</button></li>
              <li><button onClick={() => openLegal('refund')} className="hover:text-brand-accent transition-colors text-left">Refund Policy</button></li>
              <li><button onClick={() => openLegal('disclaimer')} className="hover:text-brand-accent transition-colors text-left">Disclaimer</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex flex-col">
                <span className="text-xs text-slate-600 uppercase font-bold">Email Support</span>
                <span className="text-slate-300">fazeelazeez.in@gmail.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-slate-600 uppercase font-bold">WhatsApp</span>
                <span className="text-slate-300">+91 70124 02241</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-slate-600 uppercase font-bold">Location</span>
                <span className="text-slate-300">Ernakulam, Kerala, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-900 pt-8 flex justify-center items-center">
          <p className="text-slate-600 text-xs text-center">
            &copy; {new Date().getFullYear()} Fazeel Azeez. All rights reserved.
          </p>
        </div>

        <div className="mt-8 p-6 bg-brand-900/50 rounded-xl border border-brand-900">
          <p className="text-[11px] text-slate-600 leading-relaxed text-center">
            Disclaimer: Fazeel Azeez offers independent consulting and account recovery assistance. We are not employees of Google LLC, YouTube, or their affiliates. While we possess specialized knowledge and certification to assist in these matters, final decisions regarding account restoration rest with the respective platform service providers.
          </p>
        </div>
      </div>
    </footer>
  );
};