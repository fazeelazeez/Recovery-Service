
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, FileText } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: "Hi! I'm Fazeel's AI Assistant. I can help fast-track your recovery case. What specific issue are you facing?", 
      sender: 'bot',
      options: ['Hacked YouTube Channel', 'Locked Gmail Account', 'AdSense Issue', 'Other Inquiry']
    }
  ]);
  
  // Store user answers to build the final WhatsApp message
  const [answers, setAnswers] = useState({
    issue: '',
    time: '',
    formSubmitted: false
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const scrollToForm = () => {
    const element = document.getElementById('recovery-form');
    if (element) {
      setIsOpen(false); // Close chat to show the form
      // small delay to allow close animation
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleOptionClick = (option: string) => {
    // Add user response
    const userMsg: Message = { id: Date.now().toString(), text: option, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Logic Flow
    setTimeout(() => {
      let nextBotMsg: Message | null = null;

      if (step === 0) {
        // Step 0: User selected Issue -> Ask about Form
        setAnswers(prev => ({ ...prev, issue: option }));
        nextBotMsg = {
          id: 'bot-form-check',
          text: "Important: Have you already filled out the Recovery Form on this page? We need those technical details to analyze your case.",
          sender: 'bot',
          options: ['Yes, I submitted it', 'No, not yet']
        };
        setStep(1);
      } 
      else if (step === 1) {
        // Step 1: User answered Form Check
        if (option.includes('Yes')) {
          // If Yes -> Continue to timing
          setAnswers(prev => ({ ...prev, formSubmitted: true }));
          nextBotMsg = {
            id: 'bot-time',
            text: "Great! One last thing: When did this incident happen?",
            sender: 'bot',
            options: ['Last 24 Hours (Urgent)', 'Within 7 Days', 'Over a Month ago']
          };
          setStep(2);
        } else {
          // If No -> Direct to Form
          setAnswers(prev => ({ ...prev, formSubmitted: false }));
           nextBotMsg = {
            id: 'bot-goto-form',
            text: "Please fill out the form first. It collects the proof (URLs, Date, IP) needed to start a recovery case with Google/YouTube support. Shall I take you there?",
            sender: 'bot',
            options: ['Go to Form']
          };
          setStep(99); // Special step for redirection
        }
      } 
      else if (step === 2) {
        // Step 2: User answered Time (after saying Yes to form)
        setAnswers(prev => ({ ...prev, time: option }));
        nextBotMsg = {
          id: 'bot-final',
          text: "Perfect. I've prepared your case summary. Click below to open WhatsApp and send this to Fazeel.",
          sender: 'bot'
        };
        setStep(3); // Final WhatsApp step
      }
      else if (step === 99) {
        // Step 99: User clicked "Go to Form"
        scrollToForm();
        // Reset typing and stop here
        setIsTyping(false);
        return;
      }

      if (nextBotMsg) {
        setMessages(prev => [...prev, nextBotMsg!]);
      }
      setIsTyping(false);
    }, 1000); // 1s delay to simulate thinking
  };

  const openWhatsApp = () => {
    const text = `*New Recovery Enquiry via AI Agent*%0A%0A*Issue:* ${answers.issue}%0A*Form Submitted:* Yes%0A*Timing:* ${answers.time}%0A%0AHi Fazeel, I have submitted the form. Please check my case.`;
    window.open(`https://wa.me/917012402241?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end font-sans pointer-events-none">
      
      {/* Chat Window */}
      <div className={`transition-all duration-300 origin-bottom-right transform ${isOpen ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'} mb-4 w-[350px] max-w-[calc(100vw-48px)] bg-brand-900 border border-brand-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col`}>
        
        {/* Header */}
        <div className="bg-brand-800 p-4 flex items-center justify-between border-b border-brand-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center relative">
              <Bot className="w-6 h-6 text-white" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-brand-800 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Recovery Assistant</h3>
              <p className="text-xs text-brand-accent">Online | Replies Instantly</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 h-[350px] overflow-y-auto bg-brand-900 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-brand-blue text-white rounded-tr-none' 
                  : 'bg-brand-800 text-slate-200 border border-brand-700 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-brand-800 border border-brand-700 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Actions Area */}
        <div className="p-4 bg-brand-800/50 border-t border-brand-700">
          {step !== 3 ? (
            <div className="flex flex-wrap gap-2 justify-end">
              {messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  className={`text-xs py-2 px-3 rounded-full transition-colors animate-fadeIn ${
                    opt === 'Go to Form' 
                    ? 'bg-brand-accent text-brand-900 font-bold hover:bg-white border-none' 
                    : 'bg-brand-900 hover:bg-brand-700 border border-brand-600 text-brand-accent'
                  }`}
                >
                  {opt} {opt === 'Go to Form' && <FileText className="inline w-3 h-3 ml-1" />}
                </button>
              ))}
            </div>
          ) : (
             <button 
              onClick={openWhatsApp}
              className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all animate-pulse shadow-lg"
            >
              <span>Open WhatsApp Chat</span>
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Toggle Button with Tooltip */}
      <div className="relative group pointer-events-auto">
        {/* Tooltip */}
        <div className={`absolute right-20 top-1/2 -translate-y-1/2 bg-white text-brand-900 text-sm font-bold px-4 py-2 rounded-lg shadow-xl transition-all duration-300 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-0 group-hover:opacity-100 scale-100'}`}>
          Need Recovery Help?
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-600 text-white rounded-full shadow-2xl hover:shadow-brand-blue/40 transition-all duration-300 hover:scale-110 flex items-center justify-center relative z-10"
          aria-label="Open AI Chat"
        >
          {isOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <>
              <MessageSquare className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-brand-900 animate-bounce">
                1
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};