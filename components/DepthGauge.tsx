'use client';

import { useEffect, useRef } from 'react';

// [scrollFraction, depthMeters, zoneLabel]
const STOPS: [number, number, string][] = [
  [0.00,   50, 'Zona Dangkal'],
  [0.15,  120, 'Zona Dangkal'],
  [0.30,  200, 'Zona Cahaya'],
  [0.45,  450, 'Zona Twilight'],
  [0.60,  900, 'Zona Twilight'],
  [0.75, 1500, 'Zona Tengah Malam'],
  [0.90, 3200, 'Zona Tengah Malam'],
  [1.00, 4500, 'Zona Abisal'],
];

function interp(frac: number): { depth: number; zone: string } {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [af, ad, az] = STOPS[i];
    const [bf, bd, bz] = STOPS[i + 1];
    if (frac >= af && frac <= bf) {
      const t = (frac - af) / (bf - af || 1);
      return { depth: Math.round(ad + (bd - ad) * t), zone: t < 0.5 ? az : bz };
    }
  }
  return { depth: STOPS[STOPS.length - 1][1], zone: STOPS[STOPS.length - 1][2] };
}

export default function DepthGauge() {
  const valRef    = useRef<HTMLSpanElement>(null);
  const fillRef   = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const zoneRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Spawn bubbles ──
    const heroEl = document.getElementById('bubblesHero');
    if (heroEl && !reduceMotion) {
      for (let i = 0; i < 18; i++) {
        const b = document.createElement('i');
        const size = 4 + Math.random() * 11;
        b.style.width  = size + 'px';
        b.style.height = size + 'px';
        b.style.left   = Math.random() * 100 + '%';
        b.style.setProperty('--drift', (Math.random() * 44 - 22) + 'px');
        const dur = 9 + Math.random() * 12;
        b.style.animationDuration = dur + 's';
        b.style.animationDelay   = (-Math.random() * dur) + 's';
        heroEl.appendChild(b);
      }
    }

    // ── Spawn glow particles ──
    if (!reduceMotion) {
      ['glowLayanan', 'glowBerita', 'glowPortal', 'glowSemuaBerita', 'glowSpotlight',
       'glowNewsHero', 'glowNewsSidebar', 'glowNewsGrid'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        for (let i = 0; i < 14; i++) {
          const g = document.createElement('i');
          g.style.left = Math.random() * 100 + '%';
          g.style.top  = Math.random() * 100 + '%';
          const dur = 3 + Math.random() * 4;
          g.style.animationDuration = dur + 's';
          g.style.animationDelay   = (-Math.random() * dur) + 's';
          el.appendChild(g);
        }
      });
    }

    // ── Spawn bubbles for news page too ──
    ['bubblesNews'].forEach(id => {
      const el = document.getElementById(id);
      if (!el || reduceMotion) return;
      for (let i = 0; i < 22; i++) {
        const b = document.createElement('i');
        const size = 4 + Math.random() * 14;
        b.style.width  = size + 'px';
        b.style.height = size + 'px';
        b.style.left   = Math.random() * 100 + '%';
        b.style.setProperty('--drift', (Math.random() * 50 - 25) + 'px');
        const dur = 10 + Math.random() * 14;
        b.style.animationDuration = dur + 's';
        b.style.animationDelay   = (-Math.random() * dur) + 's';
        el.appendChild(b);
      }
    });

    // ── Scroll → depth update ──
    let ticking = false;
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const frac = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const { depth, zone } = interp(frac);

      if (valRef.current)    valRef.current.textContent   = depth.toLocaleString('id-ID');
      if (fillRef.current)   fillRef.current.style.height = frac * 100 + '%';
      if (markerRef.current) markerRef.current.style.top  = frac * 100 + '%';
      if (zoneRef.current && zoneRef.current.textContent !== zone) {
        zoneRef.current.textContent = zone;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside className="depth-gauge" aria-label="Indikator Kedalaman Laut">
      <div className="depth-readout">
        <span className="val" ref={valRef}>50</span>
        <span className="unit">METER</span>
      </div>
      <div className="depth-track">
        <div className="depth-fill"   ref={fillRef} />
        <div className="depth-marker" ref={markerRef} />
      </div>
      <div className="depth-zone" ref={zoneRef}>Zona Dangkal</div>
    </aside>
  );
}
