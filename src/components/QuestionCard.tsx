'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Bookmark } from 'lucide-react';
import type { Question, QuestionMeta } from '../lib/types';
import { useLanguage } from '../i18n/LanguageContext';

export default function QuestionCard({ question }: { question: Question | QuestionMeta }) {
  const [bookmarked, setBookmarked] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bookmarked_questions') || '[]');
      setBookmarked(saved.includes(question.id));
    } catch (e) {}
  }, [question.id]);

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

  const levelClass =
    question.level === 'beginner'
      ? 'badge-beginner'
      : question.level === 'advanced'
      ? 'badge-advanced'
      : 'badge-intermediate';

  const levelLabel =
    question.level === 'beginner'
      ? t.common.beginner
      : question.level === 'advanced'
      ? t.common.advanced
      : t.common.intermediate;

  const title = language === 'en' && question.question_en 
    ? question.question_en 
    : question.question_vi;

  const rawAnswer = language === 'en' && 'answer_en' in question && (question as Question).answer_en
    ? (question as Question).answer_en
    : 'answer_vi' in question && (question as Question).answer_vi
    ? (question as Question).answer_vi
    : '';

  return (
    <Link href={`/question/${question.slug}`} className="q-card">
      <div className="q-card-num">#{question.id}</div>

      <div className="q-card-body">
        <div className="q-card-badges">
          <span className={`badge ${levelClass}`}>{levelLabel}</span>
          <span className="badge badge-subcat">{question.category}</span>
          {question.subcategory && (
            <span className="badge badge-subcat">{question.subcategory}</span>
          )}
        </div>

        <h3 className="q-card-title">{title}</h3>

        <p className="q-card-snippet">
          {rawAnswer
            ? rawAnswer.replace(/[#*`]/g, '').slice(0, 160) + '...'
            : `${t.question.expand}...`}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={toggleBookmark}
          title={bookmarked ? t.question.saved : t.question.save}
          style={{
            background: 'transparent',
            border: 'none',
            color: bookmarked ? 'var(--amber-solid)' : 'var(--ink-faint)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>

        <ChevronRight size={18} className="q-card-arrow" />
      </div>
    </Link>
  );
}
