
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "The hacker changed my 2FA, Recovery Email, and Phone. Is recovery still possible?",
      answer: "Yes. This is the most common scenario. Hackers always change security details first. We do NOT rely on standard 'Forgot Password' forms. We use internal escalation paths that verify ownership based on historical device data (Device ID), IP logs, and creation date, which the hacker cannot change."
    },
    {
      question: "The hacker deleted my videos or started a crypto live stream. Can this be fixed?",
      answer: "Yes. YouTube maintains backups of deleted content for a limited time. Once we recover the channel, we submit a 'Rollback Request' to restore your channel to the exact state it was in before the hack—bringing back all views, comments, and deleted videos."
    },
    {
      question: "I already appealed to Google/YouTube and got rejected. Can you help?",
      answer: "Yes. Standard support forms are often automated and reject cases due to 'insufficient info'. We build a professional legal & technical case file that is reviewed by actual human specialists on the Internal Creator Support team, drastically improving success rates."
    },
    {
      question: "I am from outside India (USA/UK/UAE/Europe). How do I pay?",
      answer: "We work with clients globally. For international clients, we accept payments via PayPal, Stripe (Credit/Debit Card), or USDT (Crypto) to ensure smooth transactions. You do not need an Indian bank account."
    },
    {
      question: "Do I need to pay anything upfront?",
      answer: "No. Our standard recovery service works on a strict 'No Fix, No Fee' basis. We assess your case for free. You only pay the success fee once your account access is fully restored and verified by you."
    },
    {
      question: "How long does the recovery process take?",
      answer: "Initial assessment takes 24 hours. Simple hacks are often resolved within 2-4 business days. Complex cases (Brand Account transfers or AdSense bans) can take up to 2 weeks. We provide daily status updates via WhatsApp."
    },
    {
      question: "Is my personal data safe with you?",
      answer: "Absolutely. We operate under strict non-disclosure agreements (NDA). We never ask for your new password. We only need the technical descriptors (Channel ID, Creation Date, historical IPs) to prove ownership."
    },
    {
      question: "My AdSense was disabled due to the hacker. Can you fix it?",
      answer: "Yes. If a hacker posted violating content that banned your AdSense, we submit a specific appeal proving 'Unautherized Access'. This usually clears the ban and reinstates monetization."
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
            Answers to common concerns about hacked accounts, security, and the recovery process.
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
                <span className={`font-bold text-lg pr-8 ${openIndex === index ? 'text-white' : 'text-slate-300'}`}>
                  {faq.question}
                </span>
                <div className={`p-1 rounded-full transition-colors shrink-0 ${openIndex === index ? 'bg-brand-blue text-white' : 'bg-brand-800 text-slate-400'}`}>
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
