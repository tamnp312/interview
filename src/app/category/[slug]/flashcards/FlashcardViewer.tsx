'use client';

import React, { useState, useEffect } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, Check, X, Sparkles } from 'lucide-react';
import type { Question } from '../../../../lib/types';
import MarkdownRenderer from '../../../../components/MarkdownRenderer';
import { useLanguage } from '../../../../i18n/LanguageContext';

export default function FlashcardViewer({ questions }: { questions: Question[] }) {
  const { t, isEn } = useLanguage();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<number[]>([]);
  const [needsReview, setNeedsReview] = useState<number[]>([]);

  const current = questions[index];
  const progressPercent = questions.length > 0 ? Math.round(((index + 1) / questions.length) * 100) : 0;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, questions.length]);

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(prev => prev + 1);
      setFlipped(false);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
      setFlipped(false);
    }
  };

  const markMastered = () => {
    if (!current) return;
    if (!mastered.includes(current.id)) {
      setMastered(prev => [...prev, current.id]);
      setNeedsReview(prev => prev.filter(id => id !== current.id));
    }
    handleNext();
  };

  const markReview = () => {
    if (!current) return;
    if (!needsReview.includes(current.id)) {
      setNeedsReview(prev => [...prev, current.id]);
      setMastered(prev => prev.filter(id => id !== current.id));
    }
    handleNext();
  };

  if (!current) return null;

  const displayQuestion = isEn 
    ? (current.question_en || current.question_vi)
    : (current.question_vi || current.question_en);

  const secondaryQuestion = isEn
    ? (current.question_vi && current.question_vi !== current.question_en ? current.question_vi : null)
    : (current.question_en && current.question_en !== current.question_vi ? current.question_en : null);

  const displayAnswer = isEn
    ? (current.answer_en || current.answer_vi)
    : (current.answer_vi || current.answer_en);

  return (
    <div>
      {/* Progress & stats header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        fontSize: '0.85rem',
        color: 'var(--ink-secondary)'
      }}>
        <div style={{ fontWeight: 600 }}>
          {t.flashcards.cardLabel} {index + 1} {t.flashcards.cardOf} {questions.length}
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ color: 'var(--green-ink)', fontWeight: 600 }}>✓ {t.flashcards.mastered}: {mastered.length}</span>
          <span style={{ color: 'var(--rose-ink)', fontWeight: 600 }}>✗ {t.flashcards.needsReview}: {needsReview.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        height: '6px',
        background: 'var(--surface-raised)',
        borderRadius: '999px',
        overflow: 'hidden',
        marginBottom: '24px'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          background: 'var(--accent)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Flashcard container */}
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          minHeight: '340px',
          background: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-md)',
          transition: 'all 0.2s ease',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            fontWeight: 700
          }}>
            #{current.id} • {current.category}
          </span>
          <span style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--surface-raised)',
            color: 'var(--ink-muted)'
          }}>
            {flipped ? t.flashcards.backLabel : t.flashcards.frontLabel}
          </span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {!flipped ? (
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1.4,
                marginBottom: '12px'
              }}>
                {displayQuestion}
              </h2>
              {secondaryQuestion && (
                <p style={{ color: 'var(--ink-muted)', fontStyle: 'italic', fontSize: '0.95rem' }}>
                  {secondaryQuestion}
                </p>
              )}
            </div>
          ) : (
            <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '6px' }}>
              <MarkdownRenderer content={displayAnswer} />
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          marginTop: '20px',
          color: 'var(--ink-muted)',
          fontSize: '0.8rem'
        }}>
          <RotateCw size={14} />
          <span>{t.flashcards.flipPrompt}</span>
        </div>
      </div>

      {/* Control buttons below card */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '24px'
      }}>
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="btn-icon"
          style={{ opacity: index === 0 ? 0.3 : 1 }}
          title={t.flashcards.prevTooltip}
        >
          <ChevronLeft size={20} />
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={markReview}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: 'var(--radius)',
              background: 'var(--rose-bg)',
              color: 'var(--rose-ink)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <X size={16} /> {t.flashcards.unmasteredBtn}
          </button>

          <button
            onClick={markMastered}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: 'var(--radius)',
              background: 'var(--green-bg)',
              color: 'var(--green-ink)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <Check size={16} /> {t.flashcards.masteredBtn}
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={index === questions.length - 1}
          className="btn-icon"
          style={{ opacity: index === questions.length - 1 ? 0.3 : 1 }}
          title={t.flashcards.nextTooltip}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
