'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LeadingToggleProps {
  id: number;
  type: 'berita' | 'artikel';
  initialState: boolean;
}

export default function LeadingToggle({ id, type, initialState }: LeadingToggleProps) {
  const [isLeading, setIsLeading] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLeading = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    const newState = !isLeading;
    
    try {
      const response = await fetch('/api/leading', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, type, is_leading: newState }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to update: ${errorText}`);
      }

      setIsLeading(newState);
    } catch (error) {
      console.error('Error toggling leading state:', error);
      // Optional: show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLeading}
      disabled={isLoading}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
        isLeading ? 'bg-cyan-500' : 'bg-slate-700'
      }`}
      aria-label="Toggle Tampil di Beranda"
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          isLeading ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-3 w-3 animate-spin text-white opacity-70" />
        </span>
      )}
    </button>
  );
}
