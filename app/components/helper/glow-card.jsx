"use client"

import { useEffect, useRef, useCallback } from 'react';

const GlowCard = ({ children , identifier}) => {
  const rafRef = useRef(null);
  const lastUpdateRef = useRef(0);

  // Throttled update function using requestAnimationFrame
  const throttledUpdate = useCallback((event, CARDS, CONFIG) => {
    const now = performance.now();
    // Throttle to ~30fps for better mobile performance
    if (now - lastUpdateRef.current < 33) return;
    lastUpdateRef.current = now;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      for (const CARD of CARDS) {
        const CARD_BOUNDS = CARD.getBoundingClientRect();

        if (
          event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
          event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
          event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
          CARD.style.setProperty('--active', 1);
        } else {
          CARD.style.setProperty('--active', CONFIG.opacity);
        }

        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
        ];

        let ANGLE =
          (Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) *
            180) /
          Math.PI;

        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;

        CARD.style.setProperty('--start', ANGLE + 90);
      }
    });
  }, []);

  useEffect(() => {
    // Disable glow effect on mobile/touch devices for better performance
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const CONTAINER = document.querySelector(`.glow-container-${identifier}`);
    const CARDS = document.querySelectorAll(`.glow-card-${identifier}`);

    if (!CONTAINER || CARDS.length === 0) return;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const UPDATE = (event) => {
      throttledUpdate(event, CARDS, CONFIG);
    };

    document.body.addEventListener('pointermove', UPDATE, { passive: true });

    const RESTYLE = () => {
      CONTAINER.style.setProperty('--gap', CONFIG.gap);
      CONTAINER.style.setProperty('--blur', CONFIG.blur);
      CONTAINER.style.setProperty('--spread', CONFIG.spread);
      CONTAINER.style.setProperty(
        '--direction',
        CONFIG.vertical ? 'column' : 'row'
      );
    };

    RESTYLE();

    // Cleanup event listener
    return () => {
      document.body.removeEventListener('pointermove', UPDATE);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [identifier, throttledUpdate]);

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article 
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border transition-all duration-300 relative rounded-xl hover:border-transparent w-full`}
        style={{ 
          borderColor: 'var(--border-color)',
          backgroundColor: 'var(--background-secondary)',
          color: 'var(--text-primary)'
        }}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
