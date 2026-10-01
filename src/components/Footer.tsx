'use client';

import React from 'react';
import Link from 'next/link';
import { Code2, Heart, Shield, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      marginTop: '80px',
      padding: '48px 0 32px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>
          <div>
            <div className="brand" style={{ marginBottom: '14px' }}>
              <div className="brand-icon">
                <Code2 size={20} />
              </div>
              <span>Luyện<span className="brand-accent">PhỏngVấn</span></span>
            </div>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              {t.footer.aboutDesc}
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', color: 'var(--ink)' }}>
              {t.footer.popularTopics}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--ink-secondary)' }}>
              <Link href="/category/react" style={{ transition: 'color 0.15s' }}>React & Next.js</Link>
              <Link href="/category/nodejs" style={{ transition: 'color 0.15s' }}>Node.js & NestJS</Link>
              <Link href="/category/golang" style={{ transition: 'color 0.15s' }}>Golang (Go)</Link>
              <Link href="/category/python" style={{ transition: 'color 0.15s' }}>Python (FastAPI / Django)</Link>
              <Link href="/category/system-design" style={{ transition: 'color 0.15s' }}>System Design & Architecture</Link>
              <Link href="/category/docker" style={{ transition: 'color 0.15s' }}>Docker & Kubernetes</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', color: 'var(--ink)' }}>
              {t.footer.practiceTools}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--ink-secondary)' }}>
              <Link href="/category/all">{t.footer.allQuestions}</Link>
              <Link href="/category/all/flashcards">{t.footer.flashcards}</Link>
              <Link href="/quiz">{t.footer.quiz}</Link>
              <Link href="/quiz/dap-an">{t.footer.quizAnswers}</Link>
              <Link href="/bookmarks">{t.footer.bookmarks}</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', color: 'var(--ink)' }}>
              {t.footer.info}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--ink-secondary)' }}>
              <span>{t.common.appName} — {t.common.tagline}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--green-ink)', marginTop: '8px', fontWeight: 600, fontSize: '0.85rem' }}>
                <Shield size={16} /> 100% {t.hero.statFree}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.85rem',
          color: 'var(--ink-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} {t.common.appName}. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {t.footer.copyright} <Heart size={14} color="var(--rose-solid)" fill="var(--rose-solid)" />
          </div>
        </div>
      </div>
    </footer>
  );
}
