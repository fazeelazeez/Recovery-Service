
import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    { 
      id: 1, 
      initials: "AN", 
      text: "My gaming channel with 150k subs was hacked and they started a crypto live stream. Fazeel bro stopped the hack and recovered my YouTube channel access within 48 hours.", 
      service: "YouTube Channel Recovery" 
    },
    { 
      id: 2, 
      initials: "PS", 
      text: "I was locked out of my primary Gmail account which is linked to my bank and business. They changed the recovery number. Fazeel recovered the Google account safely.", 
      service: "Gmail Account Recovery" 
    },
    { 
      id: 3, 
      initials: "MR", 
      text: "My AdSense was disabled because the hacker posted bad content. Fazeel helped me appeal and reinstate my monetization. He is an expert in AdSense policy.", 
      service: "AdSense Fix" 
    },
    {
      id: 4,
      initials: "AM",
      text: "My cooking channel was stolen after I clicked a fake sponsorship link. I thought I lost 5 years of work. Fazeel retrieved the channel and secured it.",
      service: "YouTube Channel Recovery"
    },
    {
      id: 5,
      initials: "RK",
      text: "Could not access my Google account because of a 2FA issue on an old phone number. Google support was automated but Fazeel personally handled my case.",
      service: "Google Account Recovery"
    },
    {
      id: 6,
      initials: "SJ",
      text: "I had a 'Step 2 Error' in my YouTube monetization tab for months. No one could fix it. Fazeel solved the AdSense linking issue in 3 days.",
      service: "AdSense Error Fix"
    },
    {
      id: 7,
      initials: "VP",
      text: "Trustworthy person in Kochi. Recovered my vlogging channel from a Russian hacker. He also set up security keys so it never happens again.",
      service: "Hacked Channel Recovery"
    },
    {
      id: 8,
      initials: "DS",
      text: "My business Gmail was compromised. Fazeel acted fast to secure the account before they could access my drive data. Highly recommended professional.",
      service: "Gmail Security"
    }
  ];

  const getName = (initials: string) => {
    switch(initials) {
      case "AN": return "Arjun Nair";
      case "PS": return "Priya Sharma";
      case "MR": return "Mohammed Riaz";
      case "AM": return "Anjali Menon";
      case "RK": return "Rahul Karthik";
      case "SJ": return "Sarah John";
      case "VP": return "Vivek Pillai";
      case "DS": return "Deepak Suresh";
      default: return "Client";
    }
  };

  const getLocation = (initials: string) => {
    switch(initials) {
      case "AN": return "Kerala";
      case "PS": return "Bangalore";
      case "MR": return "Ernakulam";
      case "AM": return "Kochi";
      case "RK": return "Trivandrum";
      case "SJ": return "Kottayam";
      case "VP": return "Dubai/Kerala";
      case "DS": return "Chennai";
      default: return "India";
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-brand-800/30 scroll-mt-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Trusted by Creators</h2>
          <p className="text-slate-400">Real stories from people who got their digital lives back.</p>
        </div>
      </div>
      
      {/* Scrolling Marquee Container */}
      <div className="relative w-full">
        {/* Gradient Masks for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-brand-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-brand-900 to-transparent z-10 pointer-events-none"></div>

        {/* Inner Moving Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* Render the list twice to create seamless loop */}
          {[...testimonials, ...testimonials].map((t, index) => (
            <div 
              key={`${t.id}-${index}`} 
              className="w-[320px] md:w-[400px] mx-4 bg-brand-900 border border-brand-700/50 rounded-2xl p-8 relative flex-shrink-0 hover:border-brand-blue/30 transition-colors shadow-lg"
            >
              <div className="absolute -top-4 -left-2 bg-brand-800 text-brand-blue p-2 rounded-full border border-brand-700">
                <Quote className="w-5 h-5 fill-current" />
              </div>
              <div className="flex gap-1 mb-6 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-accent fill-brand-accent" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 italic leading-relaxed text-sm md:text-base min-h-[80px]">"{t.text}"</p>
              <div className="flex items-center gap-4 border-t border-brand-800 pt-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-800 to-brand-900 border border-brand-700 rounded-full flex items-center justify-center text-brand-blue font-bold text-base md:text-lg shadow-inner shrink-0">
                  {t.initials}
                </div>
                <div className="overflow-hidden">
                  <p className="text-white font-bold text-sm md:text-base truncate">
                    {getName(t.initials)}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>{getLocation(t.initials)}</span>
                  </div>
                  <p className="text-xs text-brand-accent mt-0.5 truncate">{t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
