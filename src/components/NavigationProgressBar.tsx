'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // Complete progress on route change
  useEffect(() => {
    if (visible) {
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    let animTimer: NodeJS.Timeout | null = null;

    const startProgress = () => {
      setVisible(true);
      setProgress(20);

      animTimer = setTimeout(() => {
        setProgress(65);
        animTimer = setTimeout(() => {
          setProgress(85);
        }, 300);
      }, 100);
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Ignore external links, anchor hashes, new tabs, modifier keys
      if (!href || href.startsWith('http') || href.startsWith('#') || targetAttr === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl) return;

      startProgress();
    };

    const handlePopState = () => {
      startProgress();
    };

    document.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
      if (animTimer) clearTimeout(animTimer);
    };
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 99999,
        pointerEvents: 'none',
        background: 'transparent'
      }}
      aria-hidden="true"
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6, #ec4899)',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.7), 0 0 5px rgba(236, 72, 153, 0.5)',
          transition: progress === 100 ? 'width 200ms ease-out, opacity 250ms ease 100ms' : 'width 300ms cubic-bezier(0.1, 0.5, 0.1, 1)',
          opacity: visible ? 1 : 0
        }}
      />
    </div>
  );
}
