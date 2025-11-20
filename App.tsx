
import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Lock } from 'lucide-react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { RecoveryForm } from './components/RecoveryForm';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { AiChatWidget } from './components/AiChatWidget';
import { FAQ } from './components/FAQ';
import { BackToTop } from './components/BackToTop';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Services', href: 'services' },
    { name: 'Process', href: 'process' },
    { name: 'Pricing', href: 'pricing' },
    { name: 'Testimonials', href: 'testimonials' },
    { name: 'Contact', href: 'contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-900 text-slate-300 relative overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-brand-900/95 backdrop-blur-md border-brand-800 py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 z-50">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-heading font-bold text-lg md:text-xl text-white tracking-tight leading-none">FAZEEL AZEEZ</div>
              <span className="text-[10px] font-bold text-brand-accent tracking-widest uppercase mt-0.5">YouTube Certified</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={`#${link.href}`}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#recovery-form" 
              onClick={(e) => scrollToSection(e, 'recovery-form')}
              className="bg-white text-brand-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-all shadow-lg hover:shadow-white/10"
            >
              Start Recovery
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="md:hidden text-white p-2 z-50" aria-label="Toggle Menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-brand-900/98 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-xl font-medium text-white hover:text-brand-accent"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#recovery-form"
            onClick={(e) => scrollToSection(e, 'recovery-form')}
            className="bg-brand-blue text-white px-8 py-3 rounded-full text-lg font-bold shadow-xl shadow-brand-blue/20"
          >
            Start Recovery
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Hero />
        <div className="bg-brand-800/50 border-y border-brand-700/50">
           <div className="container mx-auto px-4 py-6 text-center">
              <p className="text-brand-accent font-medium flex items-center justify-center gap-2 text-sm md:text-base">
                <Lock className="w-4 h-4" />
                <span>Immediate action increases success. Share your details once — we handle the rest privately.</span>
              </p>
           </div>
        </div>
        <About />
        <Services />
        <Process />
        <RecoveryForm />
        <Pricing />
        <FAQ />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer openLegal={(type) => setActiveLegalModal(type)} />

      {/* Floating Elements */}
      <AiChatWidget />
      <BackToTop />

      {/* Legal Modals */}
      {activeLegalModal && (
        <LegalModal 
          type={activeLegalModal} 
          onClose={() => setActiveLegalModal(null)} 
        />
      )}
    </div>
  );
};

export default App;
