'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { CategoryMeta } from '../../../lib/types';

export default function QuizAnswersClient({ categories }: { categories: CategoryMeta[] }) {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ padding: '36px 20px 80px', maxWidth: '960px' }}>
      <div style={{ marginBottom: '28px' }}>
        <Link
          href="/quiz"
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
          <ArrowLeft size={16} /> {t.quiz.backToQuiz}
        </Link>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--ink)'
        }}>
          {t.quiz.answersPageTitle}
        </h1>
        <p style={{ color: 'var(--ink-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
          {t.quiz.answersPageSubtitle}
        </p>
      </div>

      {/* Categories Grid for Quiz Answers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {categories.map(c => (
          <Link
            key={c.id}
            href={`/category/${c.slug}`}
            style={{
              padding: '18px 20px',
              borderRadius: 'var(--radius)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.15s',
              textDecoration: 'none'
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
                {c.name}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                {c.count} {t.category.questionsBadge}
              </span>
            </div>
            <CheckCircle2 size={18} color="var(--green-solid)" />
          </Link>
        ))}
      </div>
    </div>
  );
}
