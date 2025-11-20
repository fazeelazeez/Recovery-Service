
import React, { useState, useEffect } from 'react';
import { Send, AlertTriangle, Check, MapPin } from 'lucide-react';
import { RecoveryFormData } from '../types';

const initialData: RecoveryFormData = {
  fullName: '', email: '', whatsapp: '', channelUrl: '', channelHandle: '',
  accountEmail: '', recoveryEmail: '', videoLinks: '', signingDevice: '',
  ipAddress: '', hijackDateTime: '', hijackLocation: '', lastLogin: '',
  linkedPhone: '', backupCodes: '', previousAttempts: '', country: '',
  currentLocation: '', consent: false
};

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Canada", 
  "China", "Colombia", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "India", "Indonesia", "Iran", "Iraq", 
  "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico", "Morocco", "Nepal", "Netherlands", "New Zealand", 
  "Nigeria", "Norway", "Pakistan", "Philippines", "Poland", "Portugal", "Qatar", "Russia", "Saudi Arabia", "Singapore", 
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", 
  "United Arab Emirates", "United Kingdom", "United States", "Vietnam", "Other"
];

export const RecoveryForm: React.FC = () => {
  const [data, setData] = useState<RecoveryFormData>(initialData);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Auto-detect Country and IP
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const geoData = await response.json();
        if (geoData && !data.country) {
          setData(prev => ({
            ...prev,
            country: geoData.country_name || '',
            ipAddress: geoData.ip || '',
            currentLocation: `${geoData.city || ''}, ${geoData.region || ''}`
          }));
        }
      } catch (error) {
        console.warn("Could not fetch location data automatically.");
      }
    };
    fetchLocation();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({ ...prev, consent: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const formData = new FormData();
      formData.append("access_key", "ecd208fd-3c99-43c0-b2cc-9fc158a3bba7");
      formData.append("subject", `New Recovery Request: ${data.fullName} from ${data.country}`);
      formData.append("from_name", "Fazeel Azeez Recovery Site");
      formData.append("botcheck", ""); 

      (Object.keys(data) as Array<keyof RecoveryFormData>).forEach((key) => {
        if (key === 'consent') {
          formData.append(key, data[key] ? "Yes" : "No");
        } else {
          formData.append(key, String(data[key]));
        }
      });

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        console.log("Success:", result);
      } else {
        console.error("Submission Error:", result);
        setErrorMessage(result.message || "An error occurred. Please try again.");
        setStatus('error');
      }
    } catch (error: any) {
      console.error("Network/System Error:", error);
      setErrorMessage(error.message || "Network error. Please check your internet connection.");
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="recovery-form" className="py-20 bg-brand-800/30 scroll-mt-28">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-brand-900 border border-brand-accent/30 rounded-3xl p-10 text-center shadow-2xl">
            <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-brand-accent" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">We received your details.</h2>
            <p className="text-slate-400 mb-8">
              Our team is reviewing your case. We will contact you shortly via the email or WhatsApp number provided.
            </p>
            <button 
              onClick={() => {
                setStatus('idle'); 
                setData(initialData);
                setErrorMessage('');
              }} 
              className="bg-brand-800 hover:bg-brand-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="recovery-form" className="py-20 bg-brand-800/30 scroll-mt-28">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Secure Submission
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Start Your Recovery</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Please provide as much detail as possible. All data is encrypted and used strictly for recovery purposes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-brand-900 border border-brand-700/50 rounded-3xl p-6 md:p-10 shadow-xl">
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Personal Info */}
            <div className="md:col-span-2">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2 border-b border-brand-800 pb-2">
                <span className="w-6 h-6 bg-brand-800 rounded-full flex items-center justify-center text-xs text-brand-blue">1</span>
                Contact Information
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Full Name *</label>
              <input required name="fullName" value={data.fullName} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Email Address *</label>
              <input required type="email" name="email" value={data.email} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="best@email.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">WhatsApp (Optional)</label>
              <input name="whatsapp" value={data.whatsapp} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="+123..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Country *</label>
              <select required name="country" value={data.country} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors">
                <option value="">Select Country</option>
                {countries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
             <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-400">Current Location (City/Region) *</label>
              <div className="relative">
                <input required name="currentLocation" value={data.currentLocation} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="e.g. Ernakulam, Kerala" />
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
              </div>
            </div>

            {/* Account Info */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2 border-b border-brand-800 pb-2">
                <span className="w-6 h-6 bg-brand-800 rounded-full flex items-center justify-center text-xs text-brand-blue">2</span>
                Account Details
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Channel/Account URL *</label>
              <input required name="channelUrl" value={data.channelUrl} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="youtube.com/..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Channel Handle *</label>
              <input required name="channelHandle" value={data.channelHandle} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="@handle" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Account Email (Hijacked) *</label>
              <input required type="email" name="accountEmail" value={data.accountEmail} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="hijacked@gmail.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Recovery Email (If any)</label>
              <input type="email" name="recoveryEmail" value={data.recoveryEmail} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="recovery@gmail.com" />
            </div>

             {/* Hijack Details */}
             <div className="md:col-span-2 mt-4">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2 border-b border-brand-800 pb-2">
                <span className="w-6 h-6 bg-brand-800 rounded-full flex items-center justify-center text-xs text-brand-blue">3</span>
                Incident Details
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Hijack Date/Time *</label>
              <input 
                required
                type="datetime-local" 
                name="hijackDateTime" 
                value={data.hijackDateTime} 
                onChange={handleChange} 
                className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors [color-scheme:dark]" 
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Hijack Location (if known)</label>
              <input name="hijackLocation" value={data.hijackLocation} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="e.g. Russia/Vietnam IP" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-400">1-3 Video Links (Proof of Ownership) *</label>
              <textarea required name="videoLinks" value={data.videoLinks} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors h-20" placeholder="Paste links here..." />
            </div>

             {/* Technical Details */}
             <div className="md:col-span-2 mt-4">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2 border-b border-brand-800 pb-2">
                <span className="w-6 h-6 bg-brand-800 rounded-full flex items-center justify-center text-xs text-brand-blue">4</span>
                Technical Specifics
              </h3>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Regular Signing Device *</label>
              <input required name="signingDevice" value={data.signingDevice} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="e.g. iPhone 13, Windows PC" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Your IP Address (Auto-Detected)</label>
              <input required name="ipAddress" value={data.ipAddress} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="Fetching..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Linked Phone (Last 2 digits) *</label>
              <input required name="linkedPhone" value={data.linkedPhone} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="e.g. **89" />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Do you have Backup Codes?</label>
               <select name="backupCodes" value={data.backupCodes} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors">
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
               </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-400">Last Login Date/Info *</label>
              <input required name="lastLogin" value={data.lastLogin} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors" placeholder="e.g. Yesterday morning" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-400">Previous Recovery Attempts? *</label>
              <textarea required name="previousAttempts" value={data.previousAttempts} onChange={handleChange} className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-white focus:border-brand-blue focus:outline-none transition-colors h-20" placeholder="List any previous appeals you have made..." />
            </div>
          </div>

          {/* Notice */}
          <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-xl p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300">
              By submitting this form, you consent to Fazeel Azeez and team accessing the necessary details to communicate with YouTube/Google support on your behalf.
            </p>
          </div>

          <div className="flex items-center gap-3 mb-8">
             <input type="checkbox" id="consent" required checked={data.consent} onChange={handleCheckbox} className="w-5 h-5 rounded border-brand-700 bg-brand-800 text-brand-blue focus:ring-brand-blue/50" />
             <label htmlFor="consent" className="text-slate-400 text-sm cursor-pointer select-none">I agree to the Privacy Policy and authorize the recovery attempt.</label>
          </div>

          {status === 'error' && (
             <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-xl text-red-200 text-center text-sm">
                {errorMessage || "There was an error submitting the form. Please check your connection or try again later."}
             </div>
          )}

          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-lg font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Processing...' : 'Submit Recovery Request'}
            {status !== 'submitting' && <Send className="w-5 h-5" />}
          </button>
          <p className="text-center text-xs text-slate-500 mt-4">Secure SSL Encryption. We never share your data.</p>
        </form>
      </div>
    </section>
  );
};
