import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: string;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          text: 'We value your privacy. All personal data collected through the recovery form is used strictly for the purpose of account recovery and communicating with platform support teams. We do not sell, share, or distribute your data to third parties unrelated to the recovery process. Your data is encrypted and stored securely during the active case period.'
        };
      case 'terms':
        return {
          title: 'Terms & Conditions',
          text: 'By using our services, you agree to provide accurate and truthful information regarding your account ownership. False claims or attempts to recover accounts you do not own will result in immediate termination of service without refund. We act as a consultant and facilitator; while our success rate is high, specific outcomes depend on platform policies.'
        };
      case 'refund':
        return {
          title: 'Refund Policy',
          text: 'Our service operates on a success-fee basis for standard recoveries ($300). No payment is required upfront. If we cannot recover your account, you do not pay. If a deposit was agreed upon for special complex cases, it is refundable if the outcome is negative, minus a small administrative processing fee if applicable.'
        };
      case 'disclaimer':
        return {
          title: 'Disclaimer',
          text: 'Fazeel Azeez is an independent specialist. We are not Google or YouTube. We use official partner channels and standard support mechanisms to expedite and manage your case. We cannot guarantee results if the account was banned for severe policy violations (e.g., copyright strikes, severe community guideline breaches) rather than hijacking.'
        };
      default:
        return { title: '', text: '' };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-brand-900 border border-brand-700 rounded-2xl p-8 max-w-lg w-full relative z-10 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-slate-300 text-sm leading-relaxed">{content.text}</p>
        <button onClick={onClose} className="mt-8 w-full bg-brand-800 hover:bg-brand-700 text-white py-3 rounded-xl font-medium transition-colors">
          Close
        </button>
      </div>
    </div>
  );
};
