'use client';

import { useEffect } from 'react';

/**
 * Suppresses known false-positive hydration warnings caused by browser extensions
 * (e.g. Honey, BIS, Bitdefender) that inject attributes like `bis_skin_checked`
 * into DOM elements before React hydrates.
 *
 * This does NOT hide real hydration errors — only filters extension-specific ones.
 */
export default function HydrationErrorSuppressor() {
  useEffect(() => {
    const originalError = console.error.bind(console);

    console.error = (...args: unknown[]) => {
      const msg = typeof args[0] === 'string' ? args[0] : '';

      // Filter out hydration warnings caused by browser extensions
      const isBrowserExtensionMismatch =
        msg.includes('bis_skin_checked') ||
        msg.includes('Hydration') && args.some(a =>
          typeof a === 'string' && a.includes('bis_skin_checked')
        );

      if (isBrowserExtensionMismatch) return;

      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
