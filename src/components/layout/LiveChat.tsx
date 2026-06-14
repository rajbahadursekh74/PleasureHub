import React from 'react';
import { MessageSquare, X, Send, ShieldCheck, Headphones } from 'lucide-react';

export const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Welcome to PleasureHub Concierge Services. I am your discrete assistant. How may I secure your peace of mind today?",
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setInputVal('');
    setIsTyping(true);

    // Dynamic, empathetic discrete responses
    setTimeout(() => {
      let replyText = "I am tracking our dispatch registries. Your details are secured under strict SSL encryption.";
      const lower = userMsg.toLowerCase();

      if (lower.includes('ship') || lower.includes('pack') || lower.includes('box')) {
        replyText = "Rest assured. All orders dispatch inside standard unmarked cardboard cartons with a generic plain return logistics index. Absolutely no product details visible.";
      } else if (lower.includes('bill') || lower.includes('charge') || lower.includes('bank') || lower.includes('card')) {
        replyText = "Complete financial security is standard. The statement descriptor displays only as generic 'PH-Intimate-Svc'. We have zero adult products metadata linked to banking gateways.";
      } else if (lower.includes('vibe') || lower.includes('speed') || lower.includes('motor')) {
        replyText = "All smart devices feature WhisperQuiet physical motors registering below 50dB sound level thresholds, so you can enjoy intimate spaces privately.";
      } else if (lower.includes('liquid') || lower.includes('lube') || lower.includes('silicone')) {
        replyText = "All organic fluids and lubricants undergo dermatologist testing and carry hypoallergenic certifications. Medical-grade silicone bodies are phthalate-free.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: replyText, time: now }]);
      setIsTyping(false);
    }, 1200);
  };

  const selectPreset = (text: string) => {
    setInputVal(text);
  };

  return (
    <div id="live-chat-concierge" className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* FLOATING TRIGGER */}
      {!isOpen && (
        <button
          id="btn-trigger-chat"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4.5 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-95 text-black rounded-full shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 group font-mono text-[11px] uppercase font-bold tracking-wider"
        >
          <Headphones className="w-4.5 h-4.5 animate-pulse" />
          <span>Concierge Help</span>
        </button>
      )}

      {/* CHAT DISPLAY SCREEN CARD */}
      {isOpen && (
        <div id="chat-scaffold-card" className="w-80 md:w-96 bg-[#0c0c0e] border border-zinc-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col justify-between h-112 animate-slide-in-right overflow-hidden flex-shrink-0 text-zinc-100">
          
          {/* HEADER SCREEN */}
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-4 border-b border-zinc-800/55 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h4 className="text-xs uppercase font-bold tracking-widest font-mono text-zinc-200">Discreet Agent</h4>
                <p className="text-[10px] text-zinc-400 font-sans">Empathetic intimate support helper</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* MESSAGES LOGS CONTAINER */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${m.sender === 'user' ? 'ml-auto items-end text-right' : 'items-start text-left'}`}
              >
                <div className={`p-3 rounded-2xl font-sans leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-amber-950/20 border border-amber-900 text-amber-100 rounded-tr-none'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
                <span className="text-[9px] text-[#A1A1AA] font-mono mt-1 block">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-1 items-center max-w-[85%] bg-[#111] border border-zinc-800 p-3 rounded-2xl rounded-tl-none text-zinc-400">
                <span className="text-[10px] font-mono tracking-widest animate-pulse">Typing secure reply...</span>
              </div>
            )}
          </div>

          {/* CHAT INPUT FORM AND PRESETS BOTTOM SCREEN */}
          <div className="p-4 bg-[#0a0a0c] border-t border-zinc-800/60 space-y-3 font-mono text-[10px]">
            
            {/* Quick preset chips */}
            {messages.length < 3 && (
              <div className="flex flex-wrap gap-1.5 justify-center py-1">
                {[
                  'Discreet Packaging guaranteed?',
                  'How does billing descriptor look?',
                  'Testing device whisper levels'
                ].map((txt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectPreset(txt)}
                    className="py-1 px-2.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer truncate max-w-full text-left"
                  >
                    {txt}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                placeholder="Type intimate logistics query..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                className="flex-1 bg-[#111] text-xs px-3.5 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-amber-500 placeholder-zinc-600"
              />
              <button
                type="submit"
                className="p-2.5 bg-amber-500 hover:bg-amber-600 border border-amber-600 rounded-xl text-black cursor-pointer flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-[9.5px] text-zinc-500 text-center uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Covenant confidentiality guaranteed</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
