"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  Accessibility, 
  Volume2, 
  Contrast, 
  Link as LinkIcon, 
  Type, 
  Space,
  X
} from "lucide-react";

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceReader, setVoiceReader] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [textSpacing, setTextSpacing] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Apply CSS classes to body
  useEffect(() => {
    if (highContrast) document.body.classList.add('high-contrast');
    else document.body.classList.remove('high-contrast');
    
    if (highlightLinks) document.body.classList.add('highlight-links');
    else document.body.classList.remove('highlight-links');
    
    if (largeText) document.body.classList.add('large-text');
    else document.body.classList.remove('large-text');
    
    if (textSpacing) document.body.classList.add('text-spacing');
    else document.body.classList.remove('text-spacing');
  }, [highContrast, highlightLinks, largeText, textSpacing]);

  // Voice Reader logic
  useEffect(() => {
    if (!voiceReader) {
      window.speechSynthesis.cancel();
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const validTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'BUTTON', 'LABEL', 'LI', 'TD', 'TH', 'STRONG', 'EM', 'B', 'I'];
      
      // Prevent reading the widget itself
      if (target.closest('.accessibility-widget-container')) {
        return;
      }

      if (!validTags.includes(target.tagName) && !target.textContent?.trim()) {
        return;
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        let elToRead: HTMLElement = target;
        const textToRead = elToRead.innerText || elToRead.textContent;
        
        if (textToRead && textToRead.trim().length > 1) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(textToRead.trim());
          utterance.lang = 'id-ID';
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }
      }, 500); 
    };

    const handleMouseOut = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.speechSynthesis.cancel();
    };
  }, [voiceReader]);

  return (
    <div className="fixed bottom-6 right-6 z-50 accessibility-widget-container print:hidden">
      {/* Menu Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 animate-in slide-in-from-bottom-5">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold text-sm">Menu Aksesibilitas</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-blue-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 grid grid-cols-2 gap-3">
            {/* Voice Reader Toggle */}
            <button 
              onClick={() => setVoiceReader(!voiceReader)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-colors ${
                voiceReader 
                  ? "bg-blue-50 border-blue-500 text-blue-700" 
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Volume2 size={24} className={voiceReader ? "text-blue-600" : "text-slate-500"} />
              <span className="text-xs font-medium text-center">Pembaca Suara</span>
            </button>

            {/* High Contrast Toggle */}
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-colors ${
                highContrast 
                  ? "bg-blue-50 border-blue-500 text-blue-700" 
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Contrast size={24} className={highContrast ? "text-blue-600" : "text-slate-500"} />
              <span className="text-xs font-medium text-center">Kontras +</span>
            </button>

            {/* Highlight Links Toggle */}
            <button 
              onClick={() => setHighlightLinks(!highlightLinks)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-colors ${
                highlightLinks 
                  ? "bg-blue-50 border-blue-500 text-blue-700" 
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <LinkIcon size={24} className={highlightLinks ? "text-blue-600" : "text-slate-500"} />
              <span className="text-xs font-medium text-center">Sorot Tautan</span>
            </button>

            {/* Large Text Toggle */}
            <button 
              onClick={() => setLargeText(!largeText)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-colors ${
                largeText 
                  ? "bg-blue-50 border-blue-500 text-blue-700" 
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Type size={24} className={largeText ? "text-blue-600" : "text-slate-500"} />
              <span className="text-xs font-medium text-center">Teks Lebih Besar</span>
            </button>

            {/* Text Spacing Toggle */}
            <button 
              onClick={() => setTextSpacing(!textSpacing)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-colors ${
                textSpacing 
                  ? "bg-blue-50 border-blue-500 text-blue-700" 
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Space size={24} className={textSpacing ? "text-blue-600" : "text-slate-500"} />
              <span className="text-xs font-medium text-center">Spasi Teks</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#105193] text-white rounded-full shadow-lg hover:bg-blue-800 transition-colors flex items-center justify-center border-4 border-white outline outline-1 outline-slate-200"
        aria-label="Buka Menu Aksesibilitas"
        title="Menu Aksesibilitas"
      >
        <Accessibility size={28} />
      </button>
    </div>
  );
}
