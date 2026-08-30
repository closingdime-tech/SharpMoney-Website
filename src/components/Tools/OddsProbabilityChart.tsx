'use client';

import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// Probabilities to American Odds chart
// ============================================================================
// Renders the self-contained /odds-table.html page inside an iframe.
// The page is a fixed 1000x1500 canvas, so we scale it to fit the container.
// ============================================================================

const PAGE_WIDTH = 1000;
const PAGE_HEIGHT = 1500;
const PAGE_URL = '/odds-table.html';

interface OddsProbabilityChartProps {
  isMobile: boolean;
}

export default function OddsProbabilityChart({ isMobile }: OddsProbabilityChartProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      setScale(width > 0 ? Math.min(1, width / PAGE_WIDTH) : 1);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={isMobile ? 'px-1' : ''}>
      <div ref={wrapperRef} className="w-full" style={{ maxWidth: PAGE_WIDTH }}>
        <div
          className="relative overflow-hidden rounded-xl border border-card-border"
          style={{ height: PAGE_HEIGHT * scale }}
        >
          <iframe
            src={PAGE_URL}
            title="Probabilities to American Odds"
            loading="lazy"
            scrolling="no"
            className="absolute top-0 left-0 border-0"
            style={{
              width: PAGE_WIDTH,
              height: PAGE_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
        <a
          href={PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-xs text-cyan hover:text-cyan-dim"
        >
          Open full-size chart
        </a>
      </div>
    </div>
  );
}
