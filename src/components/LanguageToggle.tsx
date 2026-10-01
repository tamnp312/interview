'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'var(--surface-raised)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '2px',
        gap: '2px',
        height: '36px'
      }}
      title={t.nav.switchLanguage}
    >
      <button
        type="button"
        onClick={() => setLanguage('vi')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 8px',
          borderRadius: 'calc(var(--radius) - 2px)',
          border: 'none',
          background: language === 'vi' ? 'var(--accent-solid)' : 'transparent',
          color: language === 'vi' ? '#fff' : 'var(--ink-secondary)',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          lineHeight: 1
        }}
        aria-label="Chọn Tiếng Việt"
      >
        <span>VN</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 8px',
          borderRadius: 'calc(var(--radius) - 2px)',
          border: 'none',
          background: language === 'en' ? 'var(--accent-solid)' : 'transparent',
          color: language === 'en' ? '#fff' : 'var(--ink-secondary)',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          lineHeight: 1
        }}
        aria-label="Switch to English"
      >
        <span>EN</span>
      </button>
    </div>
  );
}
