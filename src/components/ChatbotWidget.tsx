import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles } from 'lucide-react';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm the PyHire AI assistant. How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), text: inputValue, isBot: false }]);
    setInputValue("");
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our platform.", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#FF6B00] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <img src="/chatbot-robot.webp" alt="" width={160} height={160} className="w-6 h-6" decoding="async" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px]">PyHire AI Assistant</h3>
                  <p className="text-[12px] text-white/80">Typically replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-[14px] leading-relaxed ${
                    msg.isBot 
                      ? 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-sm' 
                      : 'bg-[#FF6B00] text-white rounded-tr-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3 text-[14px] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#FF6B00] text-white disabled:opacity-50 disabled:bg-slate-300 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat" : "Chat with the PyHire assistant"}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white border-2 border-[#FF6B00] flex items-center justify-center shadow-[0_6px_18px_rgba(249,115,22,0.55),0_0_34px_rgba(249,115,22,0.35)] hover:shadow-[0_8px_22px_rgba(249,115,22,0.65),0_0_44px_rgba(249,115,22,0.5)] transition-all z-50 hover:-translate-y-1 outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2"
      >
        {isOpen
          ? <X className="w-6 h-6 text-[#FF6B00]" aria-hidden="true" />
          : <img src="/chatbot-robot.webp" alt="" width={160} height={160} className="w-9 h-9" decoding="async" />}
      </button>
    </>
  );
}
