
import React, { useState, useEffect } from 'react';
import { Send, AlertTriangle, Check, MapPin, X } from 'lucide-react';
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

  const closePopup = () => {
    setStatus('idle');
    setData(initialData);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // -----------------------------------------------------------
    // EMAILJS CONFIGURATION
    // -----------------------------------------------------------
    const SERVICE_ID = "service_hyaya34";
    const PUBLIC_KEY = "MGimM5hOd76G-Fcw7";
    const ADMIN_EMAIL = "fazeelazeez.in@gmail.com";

    // TEMPLATE 1: For the Client (Beautiful Welcome Message)
    const CLIENT_TEMPLATE_ID = "template_25e8ta2";

    // TEMPLATE 2: For the Admin (Raw Data Dump)
    const ADMIN_TEMPLATE_ID = "template_on64o7u"; 

    try {
      // Format the Data Dump for the Admin (Terminal Style)
      const dataDump = `
NAME: ${data.fullName}
EMAIL: ${data.email}
WHATSAPP: ${data.whatsapp}
LOC: ${data.currentLocation} (${data.country})

--- ACCOUNT ---
URL: ${data.channelUrl}
HANDLE: ${data.channelHandle}
HIJACKED: ${data.accountEmail}
RECOVERY: ${data.recoveryEmail}

--- INCIDENT ---
DATE: ${data.hijackDateTime}
HIJACK_LOC: ${data.hijackLocation}

--- PROOF ---
${data.videoLinks}

--- TECH ---
DEVICE: ${data.signingDevice}
IP: ${data.ipAddress}
PHONE_END: **${data.linkedPhone}
BACKUP_CODES: ${data.backupCodes}
LAST_LOGIN: ${data.lastLogin}

--- HISTORY ---
${data.previousAttempts}
`;

      // 1. Admin Email Payload
      const adminParams = {
        to_name: "Fazeel",
        to_email: ADMIN_EMAIL, 
        email: ADMIN_EMAIL,    
        
        client_email: data.email, 
        name: data.fullName, // Added for Admin Card
        phone: data.whatsapp || "Not Provided",
        title: "New Recovery Form Submission",
        
        admin_payload: dataDump, 
        
        reply_to: data.email
      };

      // 2. Client Email Payload
      const clientParams = {
        to_name: data.fullName,
        from_name: "Fazeel Azeez Team",
        
        to_email: data.email,
        email: data.email, 
        
        reply_to: ADMIN_EMAIL,
        title: "Recovery Request Received"
      };

      // API Call 1: Send to Admin
      const adminRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: ADMIN_TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: adminParams,
        }),
      });
      
      if (!adminRes.ok) {
        const errorText = await adminRes.text();
        console.error("Admin email failed", errorText);
      }

      // API Call 2: Send to Client
      const clientRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: CLIENT_TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: clientParams,
        }),
      });

      if (!clientRes.ok) {
        const errorText = await clientRes.text();
        console.error("Client email failed", errorText);
        if (!adminRes.ok) throw new Error(errorText);
      }

      // Update UI to success state
      setStatus('success');

    } catch (error: any) {
      console.error("EmailJS Error:", error);
      setErrorMessage("Error submitting form. Please try again.");
      setStatus('error');
    }
  };

  return (
    <section id="recovery-form" className="py-20 bg-brand-800/30 scroll-mt-28 relative">
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
             <input type="checkbox" name="consent" id="consent" required checked={data.consent} onChange={handleCheckbox} className="w-5 h-5 rounded border-brand-700 bg-brand-800 text-brand-blue focus:ring-brand-blue/50" />
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

      {/* SUCCESS POPUP MODAL */}
      {status === 'success' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closePopup}></div>
          <div className="bg-brand-900 border border-brand-accent/30 rounded-3xl p-8 md:p-12 max-w-lg w-full relative z-10 shadow-2xl transform scale-100 transition-transform">
            <button onClick={closePopup} className="absolute top-4 right-4 text-slate-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            
            <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-brand-accent" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Request Sent Successfully</h2>
            <p className="text-slate-400 mb-8 text-center leading-relaxed">
              Thank you, {data.fullName}. Our team is reviewing your case details. 
              <br/><br/>
              We will contact you shortly via the email <strong>{data.email}</strong> or WhatsApp number provided.
            </p>
            
            <button 
              onClick={closePopup} 
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 rounded-xl text-base font-bold transition-colors"
            >
              Close & Return to Site
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
