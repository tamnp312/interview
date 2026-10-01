'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, ArrowLeft, Trash2 } from 'lucide-react';
import QuestionCard from '../../components/QuestionCard';
import type { Question } from '../../lib/types';
import { useLanguage } from '../../i18n/LanguageContext';

export default function BookmarksPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const saved = JSON.parse(localStorage.getItem('bookmarked_questions') || '[]');
        if (saved.length === 0) {
          setQuestions([]);
          setLoading(false);
          return;
        }

        const res = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: saved })
        });
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadBookmarks();
  }, []);

  const clearAll = () => {
    if (confirm(t.bookmarks.clearAll + '?')) {
      localStorage.removeItem('bookmarked_questions');
      setQuestions([]);
    }
  };

  return (
    <div className="container" style={{ padding: '36px 20px 80px', maxWidth: '920px' }}>
      <div style={{ marginBottom: '28px' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--ink-muted)',
            fontSize: '0.85rem',
            marginBottom: '16px',
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} /> {t.common.back} {t.nav.home}
        </Link>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--ink)'
            }}>
              {t.bookmarks.title} ({questions.length})
            </h1>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
              {t.bookmarks.subtitle}
            </p>
          </div>

          {questions.length > 0 && (
            <button
              onClick={clearAll}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--rose-bg)',
                color: 'var(--rose-ink)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Trash2 size={15} /> {t.bookmarks.clearAll}
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--ink-muted)' }}>
          {t.common.loading}
        </div>
      ) : questions.length === 0 ? (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '60px 20px',
          textAlign: 'center',
          color: 'var(--ink-muted)'
        }}>
          <Bookmark size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)', fontSize: '1.2rem', marginBottom: '6px' }}>
            {t.bookmarks.emptyTitle}
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
            {t.bookmarks.emptyDesc}
          </p>
          <Link
            href="/category/all"
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius)',
              background: 'var(--accent-solid)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'inline-block',
              textDecoration: 'none'
            }}
          >
            {t.bookmarks.exploreBtn}
          </Link>
        </div>
      ) : (
        <div className="q-list">
          {questions.map(q => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
    </div>
  );
}
