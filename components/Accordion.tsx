'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-colors shadow-sm"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-5 h-5 text-cyan-600 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
