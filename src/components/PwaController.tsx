'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi, Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PwaController() {
  const [isOffline, setIsOffline] = useState(false);
  const [showOnlineToast, setShowOnlineToast] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }

    // 2. Online / Offline status
    setIsOffline(!navigator.onLine);

    const handleOffline = () => {
      setIsOffline(true);
      setShowOnlineToast(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineToast(true);
      setTimeout(() => {
        setShowOnlineToast(false);
      }, 3500);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // 3. Catch PWA Install Prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);

      // Check if user dismissed recently
      const dismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setShowInstallBanner(false);
      }
      setInstallPrompt(null);
    } catch (e) {
      console.warn('Install prompt error:', e);
    }
  };

  const handleDismissInstall = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  return (
    <>
      {/* Offline Toast Banner */}
      {isOffline && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99998,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(245, 158, 11, 0.95)',
            color: '#000',
            fontWeight: 600,
            fontSize: '0.85rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            maxWidth: '92vw',
            animation: 'fadeInUp 0.3s ease'
          }}
          role="status"
        >
          <WifiOff size={16} />
          <span>Đang ngoại tuyến — Bạn vẫn có thể học Quiz & xem nội dung đã tải</span>
        </div>
      )}

      {/* Online Restored Toast */}
      {showOnlineToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99998,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.95)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.85rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            maxWidth: '92vw',
            animation: 'fadeInUp 0.3s ease'
          }}
          role="status"
        >
          <Wifi size={16} />
          <span>Đã kết nối lại Internet</span>
        </div>
      )}

      {/* Install App Prompt Banner */}
      {showInstallBanner && installPrompt && (
        <div
          style={{
            position: 'fixed',
            bottom: '76px',
            right: '20px',
            zIndex: 99997,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: 'var(--radius)',
            background: 'var(--surface-raised)',
            border: '1px solid var(--accent)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            maxWidth: '340px'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'var(--indigo-subtle)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Download size={18} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--ink)' }}>
              Cài đặt ứng dụng
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', lineHeight: 1.3 }}>
              Học phỏng vấn mọi lúc kể cả khi không có mạng
            </div>
          </div>

          <button
            onClick={handleInstallClick}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-solid)',
              color: '#fff',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Cài đặt
          </button>

          <button
            onClick={handleDismissInstall}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--ink-muted)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="Đóng"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </>
  );
}
