'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Bookmark,
  GraduationCap,
  Maximize2,
  Minimize2,
  ArrowUpRight,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import dynamic from 'next/dynamic';
import type { Question, QuestionMeta } from '../lib/types';
import { useLanguage } from '../i18n/LanguageContext';

const MarkdownRenderer = dynamic(() => import('./MarkdownRenderer'), {
  ssr: false,
  loading: () => <div className="q-row-loading"><div className="q-row-spinner"></div></div>
});

interface QuestionRowProps {
  question: QuestionMeta;
  displayIndex: number;
}

export default function QuestionRow({ question, displayIndex }: QuestionRowProps) {
  const { language: globalLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>(globalLang);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setLang(globalLang);
  }, [globalLang]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bookmarked_questions') || '[]');
      setBookmarked(saved.includes(question.id));
    } catch (e) {}
  }, [question.id]);

  // Load question details on first expand
  const handleToggle = async () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState && !data && !loading) {
      setLoading(true);
      try {
        const res = await fetch(`/api/questions/${question.id}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load question details:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const currentTitle = lang === 'en' && question.question_en
    ? question.question_en
    : question.question_vi;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = `${currentTitle}\n${window.location.origin}/question/${question.slug}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const level = question.level?.toLowerCase() || 'beginner';
  const levelLabel =
    level === 'beginner' 
      ? t.common.beginner.toUpperCase() 
      : level === 'advanced' 
      ? t.common.advanced.toUpperCase() 
      : t.common.intermediate.toUpperCase();

  const levelClass =
    level === 'beginner'
      ? 'q-level-beginner'
      : level === 'advanced'
      ? 'q-level-advanced'
      : 'q-level-intermediate';

  return (
    <div className={`question-row-item ${isOpen ? 'is-open' : ''}`}>
      {/* Header Row (Clickable to expand/collapse) */}
      <div
        onClick={handleToggle}
        className="q-row-header"
      >
        <div className="q-row-top-bar">
          {/* Index & Level badge */}
          <div className="q-row-meta">
            <span className="q-row-index">#{displayIndex}</span>
            <span className={`q-row-level ${levelClass}`}>{levelLabel}</span>
            {question.subcategory && (
              <span className="q-row-subcat">{question.subcategory}</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="q-row-actions">
            {/* Bookmark */}
            <button
              onClick={toggleBookmark}
              className="row-action-btn"
              title={bookmarked ? t.question.saved : t.question.save}
              aria-label={t.question.save}
            >
              <Bookmark size={15} fill={bookmarked ? 'var(--amber-solid)' : 'none'} color={bookmarked ? 'var(--amber-solid)' : 'currentColor'} />
            </button>

            {/* Flashcard */}
            <Link
              href={`/category/${question.catSlug || 'all'}/flashcards`}
              onClick={e => e.stopPropagation()}
              className="row-action-btn q-row-action-desktop"
              title={t.category.flashcardsBtn}
              aria-label={t.category.flashcardsBtn}
            >
              <GraduationCap size={15} />
            </Link>

            {/* External detail link */}
            <Link
              href={`/question/${question.slug}`}
              onClick={e => e.stopPropagation()}
              className="row-action-btn"
              title={t.question.viewDetail}
              aria-label={t.question.viewDetail}
            >
              <ArrowUpRight size={15} />
            </Link>

            {/* Toggle Expand / Collapse (Đóng mở trực tiếp) */}
            <button
              onClick={e => {
                e.stopPropagation();
                handleToggle();
              }}
              className={`row-action-btn q-row-toggle-btn ${isOpen ? 'active' : ''}`}
              title={isOpen ? t.question.collapse : t.question.expand}
              aria-label={isOpen ? t.question.collapse : t.question.expand}
            >
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Title & Copy button */}
        <div className="q-row-title-wrap">
          <h3 className={`q-row-title ${isOpen ? 'open' : ''}`} title={currentTitle}>
            {currentTitle}
          </h3>

          <button
            onClick={handleCopy}
            className="q-row-copy-btn"
            title={copied ? t.question.copied : t.question.copyLink}
            aria-label={t.question.copyLink}
          >
            {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {/* Accordion Expanded Content */}
      {isOpen && (
        <div className="q-row-body">
          {loading ? (
            <div className="q-row-loading">
              <div className="q-row-spinner"></div>
              <span>{t.common.loading}</span>
            </div>
          ) : data ? (
            <div>
              {/* Language switcher tabs if English answer exists */}
              {data.answer_en && (
                <div className="q-row-lang-tabs">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setLang('vi');
                    }}
                    className={`q-row-lang-btn ${lang === 'vi' ? 'active' : ''}`}
                  >
                    🇻🇳 Tiếng Việt
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setLang('en');
                    }}
                    className={`q-row-lang-btn ${lang === 'en' ? 'active' : ''}`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              )}

              {/* Formatted Answer Body */}
              <div className="prose q-row-prose">
                <MarkdownRenderer
                  content={lang === 'vi' ? data.answer_vi : (data.answer_en || data.answer_vi)}
                />
              </div>

              {/* References */}
              {data.references && data.references.length > 0 && (
                <div className="q-row-references">
                  <span className="q-row-ref-label">{t.question.referencesTitle}:</span>
                  <div className="q-row-ref-list">
                    {data.references.map((ref, idx) => (
                      <a
                        key={idx}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="q-row-ref-item"
                      >
                        <span>{ref.label || ref.url}</span>
                        <ExternalLink size={11} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer action bar */}
              <div className="q-row-footer">
                <Link
                  href={`/question/${question.slug}`}
                  className="q-row-view-detail"
                >
                  <span>{t.question.viewDetail}</span>
                  <ArrowUpRight size={13} />
                </Link>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="q-row-collapse-btn"
                >
                  <span>{t.question.collapse}</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '16px', color: 'var(--rose-solid)', fontSize: '0.88rem' }}>
              {t.common.loading}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
