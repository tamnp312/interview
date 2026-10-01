'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Bookmark, Share2, Check } from 'lucide-react';
import type { Question } from '../../../lib/types';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import { useLanguage } from '../../../i18n/LanguageContext';

export default function QuestionDetailClient({ question }: { question: Question }) {
  const { language, setLanguage, t } = useLanguage();
  const [bookmarked, setBookmarked] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bookmarked_questions') || '[]');
      setBookmarked(saved.includes(question.id));
    } catch (e) {}
  }, [question.id]);

  const toggleBookmark = () => {
    try {
      const saved: number[] = JSON.parse(localStorage.getItem('bookmarked_questions') || '[]');
      let next: number[];
      if (saved.includes(question.id)) {
        next = saved.filter(id => id !== question.id);
        setBookmarked(false);
      } else {
        next = [...saved, question.id];
        setBookmarked(true);
      }
      localStorage.setItem('bookmarked_questions', JSON.stringify(next));
    } catch (e) {}
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (e) {}
  };

  const currentContent = language === 'en' && question.answer_en
    ? question.answer_en
    : question.answer_vi;

  return (
    <div>
      {/* Top language and action bar */}
      <div className="qd-lang-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={18} color="var(--ink-muted)" />
          <div className="lang-switch">
            <button
              onClick={() => setLanguage('vi')}
              className={`lang-btn ${language === 'vi' ? 'active' : ''}`}
            >
              🇻🇳 Tiếng Việt
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={toggleBookmark}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              background: bookmarked ? 'var(--amber-bg)' : 'var(--surface)',
              border: '1px solid var(--border)',
              color: bookmarked ? 'var(--amber-solid)' : 'var(--ink-secondary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
            <span>{bookmarked ? t.question.saved : t.question.save}</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--ink-secondary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            {shared ? (
              <>
                <Check size={15} color="var(--green-solid)" />
                <span style={{ color: 'var(--green-solid)' }}>{t.question.copied}</span>
              </>
            ) : (
              <>
                <Share2 size={15} />
                <span>{t.question.copyLink}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Answer content box */}
      <article className="qd-content">
        <MarkdownRenderer content={currentContent} />
      </article>
    </div>
  );
}
