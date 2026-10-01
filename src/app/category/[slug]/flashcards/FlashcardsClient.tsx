'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';
import { useLanguage } from '../../../../i18n/LanguageContext';
import FlashcardViewer from './FlashcardViewer';
import type { Question, CategoryMeta } from '../../../../lib/types';

export default function FlashcardsClient({
  slug,
  isAll,
  category,
  fullQuestions
}: {
  slug: string;
  isAll: boolean;
  category: CategoryMeta | null;
  fullQuestions: Question[];
}) {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ padding: '36px 20px 80px', maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          href={`/category/${slug}`}
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
          <ArrowLeft size={16} /> {t.flashcards.backToQuestions}
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius)',
            background: 'var(--accent-subtle)',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Layers size={20} />
          </div>

          <div>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--ink)'
            }}>
              {t.flashcards.title}: {isAll ? t.flashcards.allTitle : category?.name}
            </h1>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.88rem' }}>
              {t.flashcards.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Flashcard Component */}
      <FlashcardViewer questions={fullQuestions} />
    </div>
  );
}
