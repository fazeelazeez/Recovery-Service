
import React from 'react';
import { ShieldCheck, Clock, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToRecovery = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('recovery-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Abstract Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] left-[10%] w-4 h-4 bg-brand-blue/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-[30%] right-[15%] w-3 h-3 bg-brand-accent/30 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-800/80 border border-brand-700/50 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm shadow-lg shadow-black/20">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">Verified Recovery Specialist</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] mb-6">
              Recover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-accent">YouTube or Google Account</span> <br />
              <span className="relative inline-block">
                <span className="relative z-10">Fast & Secure</span>
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-2 font-medium">
              Music Tech Consultant · Digital Account Recovery Specialist
            </p>
            
            <p className="text-slate-400 text-sm font-semibold mb-8 flex items-center justify-center lg:justify-start gap-2">
              <Clock className="w-4 h-4 text-brand-accent" />
              Contact within 2–3 days for best recovery success.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a 
                href="#recovery-form" 
                onClick={scrollToRecovery}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-accent hover:opacity-90 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                Start Recovery
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/917012402241" 
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-xl font-medium text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                WhatsApp Enquiry
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-400 font-medium border-t border-white/5 pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                <span>300+ Recoveries</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-brand-accent" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-blue" />
                <span>Secure Handling</span>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 border border-brand-700/50 p-8 shadow-2xl flex items-center justify-center overflow-hidden group">
               {/* Abstract Illustration */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-5"></div>
               
               {/* Animated Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl animate-pulse"></div>

               <div className="relative z-10 grid grid-cols-2 gap-6 w-full max-w-sm">
                  <div className="bg-brand-900/80 backdrop-blur-xl p-6 rounded-2xl border border-brand-700 shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-brand-accent border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                    <div className="h-2 w-20 bg-slate-700 rounded mb-2"></div>
                    <div className="h-2 w-12 bg-slate-700 rounded"></div>
                  </div>
                  <div className="bg-brand-900/80 backdrop-blur-xl p-6 rounded-2xl border border-brand-700 shadow-xl mt-8 transform group-hover:translate-y-2 transition-transform duration-500">
                    <div className="w-12 h-12 bg-brand-blue/20 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div className="h-2 w-24 bg-slate-700 rounded mb-2"></div>
                    <div className="h-2 w-16 bg-slate-700 rounded"></div>
                  </div>
                  <div className="bg-brand-900/80 backdrop-blur-xl p-6 rounded-2xl border border-brand-700 shadow-xl transform group-hover:-translate-y-1 transition-transform duration-500">
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4">
                        <ShieldCheck className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div className="h-2 w-16 bg-slate-700 rounded mb-2"></div>
                  </div>
                  <div className="bg-brand-900/80 backdrop-blur-xl p-6 rounded-2xl border border-brand-700 shadow-xl mt-8 transform group-hover:translate-y-1 transition-transform duration-500">
                    <div className="w-12 h-12 bg-slate-700/30 rounded-full flex items-center justify-center mb-4">
                        <div className="w-6 h-6 border-2 border-slate-400 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <div className="h-2 w-20 bg-slate-700 rounded mb-2"></div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
