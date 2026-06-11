import React from 'react';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';

interface AgeVerificationProps {
  onVerify: () => void;
}

export const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  const handleVerify = () => {
    localStorage.setItem('ph_verified_18', 'confirmed');
    onVerify();
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div id="age-verification-overlay" className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div id="age-card" className="bg-[#0f0f12] border border-white/10 w-[480px] p-8 md:p-10 rounded-3xl shadow-[0_0_100px_rgba(139,92,246,0.15)] text-center relative">
        {/* Rotate Graphic badge */}
        <div id="age-badge-glow" className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center rotate-3 shadow-[0_0_20px_rgba(147,51,234,0.4)]">
           <span id="badge-18-label" className="text-2xl font-black text-white uppercase tracking-wider select-none font-serif">18+</span>
        </div>

        {/* Header Texts */}
        <h2 id="age-verification-heading" className="text-3xl font-bold mb-4 tracking-tight text-white font-serif">
          Age Verification
        </h2>
        
        <p id="age-legal-disclaimer" className="text-gray-400 mb-10 text-sm md:text-base leading-relaxed text-balance max-w-sm mx-auto">
          PleasureHub is a premium adult-only wellness sanctuary. You must be at least 18 years of age to access our catalog.
        </p>

        {/* Buttons Action Container */}
        <div id="age-actions" className="flex flex-col gap-4 max-w-xs mx-auto">
          <button
            id="btn-confirm-age"
            onClick={handleVerify}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] tracking-wide cursor-pointer active:scale-95"
          >
            I am over 18 - Enter
          </button>
          
          <button
            id="btn-reject-age"
            onClick={handleExit}
            className="w-full py-4 bg-transparent border border-white/10 text-gray-400 font-medium rounded-xl hover:bg-white/5 hover:text-white transition-all cursor-pointer"
          >
            I am under 18 - Exit
          </button>
        </div>

        {/* Quick divider line */}
        <div className="w-full border-t border-white/5 my-8" />

        {/* Discreet trust tags */}
        <div id="seals-panel" className="flex justify-center items-center gap-4 text-[10px] text-gray-400 uppercase tracking-wider font-mono">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> SECURE</span>
          <span className="text-gray-700">•</span>
          <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-purple-400" /> DISCREET</span>
          <span className="text-gray-700">•</span>
          <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-purple-400" /> PRIVATE</span>
        </div>
      </div>

      <div id="verification-disclaimer-footer" className="absolute bottom-6 left-0 right-0 text-center text-[11px] text-gray-600 px-4 font-mono uppercase tracking-widest">
        © 2026 PleasureHub Boutique • Discreet Logistics Registered
      </div>
    </div>
  );
};
