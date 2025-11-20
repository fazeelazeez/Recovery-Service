
import React from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-brand-900 border-t border-brand-800 scroll-mt-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-slate-400 mb-8">
              Have questions before starting? Reach out. <br/>
              <span className="text-brand-blue">Note: Recovery process begins only after form submission.</span>
            </p>

            <div className="space-y-6">
              <a href="https://wa.me/917012402241" className="flex items-center gap-4 bg-brand-800/50 p-4 rounded-xl hover:bg-brand-800 transition-colors group border border-brand-700/50">
                <div className="w-12 h-12 bg-brand-900 rounded-full flex items-center justify-center border border-brand-700 group-hover:border-brand-blue transition-colors">
                  <Phone className="w-6 h-6 text-slate-400 group-hover:text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-white font-bold">WhatsApp Support</h3>
                  <p className="text-slate-400 text-sm">Enquiries Only</p>
                </div>
              </a>
              
              <a href="mailto:fazeelazeez.in@gmail.com" className="flex items-center gap-4 bg-brand-800/50 p-4 rounded-xl hover:bg-brand-800 transition-colors group border border-brand-700/50">
                <div className="w-12 h-12 bg-brand-900 rounded-full flex items-center justify-center border border-brand-700 group-hover:border-brand-blue transition-colors">
                  <Mail className="w-6 h-6 text-slate-400 group-hover:text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Email Support</h3>
                  <p className="text-slate-400 text-sm">fazeelazeez.in@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-brand-800/50 p-4 rounded-xl border border-brand-700/50">
                <div className="w-12 h-12 bg-brand-900 rounded-full flex items-center justify-center border border-brand-700">
                  <MapPin className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Location</h3>
                  <p className="text-slate-400 text-sm">Ernakulam, Kerala, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-brand-700/50 relative group">
             {/* Visual Placeholder for Map to ensure clean aesthetic */}
             <div className="absolute inset-0 bg-brand-800 flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                <div className="absolute inset-0 bg-brand-900/40"></div>
                <div className="z-10 text-center p-6">
                    <MapPin className="w-12 h-12 text-brand-blue mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Fazeel Azeez</h3>
                    <p className="text-slate-400 mb-6">Digital Marketer & Recovery Specialist</p>
                    <a 
                      href="https://maps.app.goo.gl/Lehr5thXFAb5adT99" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-brand-900 px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors"
                    >
                        Open Google Maps
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};