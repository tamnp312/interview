import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Bookmark, Share2, ChevronLeft, ChevronRight, Globe, Code2 } from 'lucide-react';
import { getQuestionBySlug, getQuestionMetaById } from '../../../lib/data';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import QuestionDetailClient from './QuestionDetailClient';

export const dynamic = 'force-dynamic';

export default async function QuestionDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const question = getQuestionBySlug(slug);

  if (!question) {
    notFound();
  }

  // Find prev & next question using instant in-memory metadata (zero disk I/O)
  const prevQuestion = question.id > 1 ? getQuestionMetaById(question.id - 1) : null;
  const nextQuestion = getQuestionMetaById(question.id + 1);

  return (
    <div className="container qd-container">
      {/* Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '20px' }}>
        <Link href="/" style={{ color: 'var(--ink-muted)' }}>Trang chủ</Link>
        <span>/</span>
        <Link href="/category/all" style={{ color: 'var(--ink-muted)' }}>Câu hỏi</Link>
        <span>/</span>
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{question.category}</span>
      </nav>

      {/* Header */}
      <header className="qd-header">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--surface-raised)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--ink-muted)'
          }}>
            #{question.id}
          </span>

          <span className={`badge ${
            question.level === 'beginner'
              ? 'badge-beginner'
              : question.level === 'advanced'
              ? 'badge-advanced'
              : 'badge-intermediate'
          }`}>
            {question.level === 'beginner' ? 'Cơ bản' : question.level === 'advanced' ? 'Nâng cao' : 'Trung cấp'}
          </span>

          <span className="badge badge-subcat">{question.category}</span>

          {question.subcategory && (
            <span className="badge badge-subcat">{question.subcategory}</span>
          )}
        </div>

        <h1 className="qd-title">{question.question_vi}</h1>

        {question.question_en && question.question_en !== question.question_vi && (
          <p style={{ color: 'var(--ink-secondary)', fontStyle: 'italic', fontSize: '1.05rem', marginBottom: '16px' }}>
            &ldquo;{question.question_en}&rdquo;
          </p>
        )}
      </header>

      {/* Client Interactive Area (Language switch, Bookmark, Content) */}
      <QuestionDetailClient question={question} />

      {/* References */}
      {question.references && question.references.length > 0 && (
        <section className="qd-references">
          <h3 className="qd-references-title">Tài liệu tham khảo chính thức</h3>
          <ul className="qd-references-list">
            {question.references.map((ref, idx) => (
              <li key={idx}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qd-ref-link"
                >
                  <span>{ref.label || ref.url}</span>
                  <ExternalLink size={13} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <nav className="qd-nav" aria-label="Điều hướng câu hỏi">
        {prevQuestion ? (
          <Link href={`/question/${prevQuestion.slug}`} className="qd-nav-card">
            <span className="qd-nav-label">← Câu trước</span>
            <span className="qd-nav-title">#{prevQuestion.id} {prevQuestion.question_vi}</span>
          </Link>
        ) : (
          <div style={{ opacity: 0.4 }} className="qd-nav-card">
            <span className="qd-nav-label">Câu trước</span>
            <span className="qd-nav-title">Không còn câu hỏi trước</span>
          </div>
        )}

        {nextQuestion ? (
          <Link href={`/question/${nextQuestion.slug}`} className="qd-nav-card" style={{ textAlign: 'right' }}>
            <span className="qd-nav-label">Câu kế tiếp →</span>
            <span className="qd-nav-title">#{nextQuestion.id} {nextQuestion.question_vi}</span>
          </Link>
        ) : (
          <div style={{ opacity: 0.4, textAlign: 'right' }} className="qd-nav-card">
            <span className="qd-nav-label">Câu kế tiếp</span>
            <span className="qd-nav-title">Đã hết câu hỏi</span>
          </div>
        )}
      </nav>

      {/* Related Questions */}
      {question.related && question.related.length > 0 && (
        <section style={{ marginTop: '48px' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: 700,
            marginBottom: '16px',
            color: 'var(--ink)'
          }}>
            Câu hỏi liên quan
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '12px',
            alignItems: 'stretch'
          }}>
            {question.related.map((rel, idx) => {
              const fullUrl = rel.url.startsWith('/q/') ? rel.url.replace('/q/', '/question/') : rel.url;
              return (
                <Link
                  key={idx}
                  href={fullUrl}
                  className="related-card"
                >
                  {rel.title}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
