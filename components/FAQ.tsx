
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is it guaranteed that my channel will be recovered?",
      answer: "While we have a very high success rate (300+ recoveries), no service can guarantee 100% results as the final decision lies with Google/YouTube internal teams. However, we ensure your case is presented through the correct certified escalation paths, significantly increasing your chances compared to standard support forms."
    },
    {
      question: "Do I need to pay anything upfront?",
      answer: "No. Our standard recovery service works on a strict 'No Fix, No Fee' basis. We assess your case for free. You only pay the $300 success fee once your account access is fully restored and verified."
    },
    {
      question: "How long does the recovery process take?",
      answer: "Initial assessment takes 24 hours. Once the case is escalated, most simple hacks are resolved within 2-4 business days. Complex cases involving ownership disputes or AdSense bans can take up to 2 weeks. We keep you updated daily."
    },
    {
      question: "Is my personal data safe with you?",
      answer: "Absolutely. We operate under strict non-disclosure agreements. We do NOT require your password to start the process. We only need the technical details (URLs, dates, device info) to prove your ownership to the platform. Your data is deleted after the case is closed."
    },
    {
      question: "My AdSense was disabled due to the hacker. Can you fix it?",
      answer: "Yes. This is a common issue. Once we prove the account was compromised, we can appeal the AdSense ban by showing that the policy violations occurred during the hijack period. We have successfully reinstated monetization for many creators."
    },
    {
      question: "I don't have my channel URL anymore. What do I do?",
      answer: "Check your browser history, old emails from YouTube, or social media posts where you might have shared your videos. Even a link to a single video that was on the channel helps us trace the Channel ID."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-brand-900 relative border-t border-brand-800 scroll-mt-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-800 border border-brand-700 rounded-full px-4 py-1.5 mb-6">
            <HelpCircle className="w-4 h-4 text-brand-accent" />
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">Common Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about the recovery process, security, and payments.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-brand-800/50 border-brand-blue/50 shadow-lg shadow-brand-blue/5' 
                  : 'bg-brand-900 border-brand-800 hover:border-brand-700'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-white' : 'text-slate-300'}`}>
                  {faq.question}
                </span>
                <div className={`p-1 rounded-full transition-colors ${openIndex === index ? 'bg-brand-blue text-white' : 'bg-brand-800 text-slate-400'}`}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-dashed border-brand-700/50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
