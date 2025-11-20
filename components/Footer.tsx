import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  openLegal: (type: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ openLegal }) => {
  return (
    <footer className="bg-brand-950 py-12 border-t border-brand-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <Shield className="w-6 h-6 text-brand-blue" />
             <span className="font-heading font-bold text-white text-lg">FAZEEL AZEEZ</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Fazeel Azeez. All rights reserved.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-slate-500 mb-8">
          <button onClick={() => openLegal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
          <button onClick={() => openLegal('terms')} className="hover:text-white transition-colors">Terms & Conditions</button>
          <button onClick={() => openLegal('refund')} className="hover:text-white transition-colors">Refund Policy</button>
          <button onClick={() => openLegal('disclaimer')} className="hover:text-white transition-colors">Disclaimer</button>
        </div>

        <div className="border-t border-brand-900 pt-8 text-center md:text-left">
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            Disclaimer: Fazeel Azeez offers independent consulting and account recovery assistance. We are not employees of Google LLC, YouTube, or their affiliates. While we possess specialized knowledge and certification to assist in these matters, final decisions regarding account restoration rest with the respective platform service providers.
          </p>
        </div>
      </div>
    </footer>
  );
};
