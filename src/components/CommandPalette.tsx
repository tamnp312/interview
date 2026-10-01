'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SearchResult {
  id: number;
  slug: string;
  category: string;
  subcategory: string;
  level: string;
  question_vi: string;
  question_en: string;
}

export default function CommandPalette({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t, isEn } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          const event = new CustomEvent('open-command-palette');
          window.dispatchEvent(event);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=8`);
        const data = await res.json();
        setResults(data.results || []);
        setSelectedIndex(0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-modal" onClick={e => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <Search size={20} color="var(--ink-muted)" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder={t.commandPalette.placeholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(1, results.length));
              } else if (e.key === 'Enter' && results[selectedIndex]) {
                window.location.href = `/question/${results[selectedIndex].slug}`;
                onClose();
              }
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'transparent', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer' }}
              aria-label={t.common.close}
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="cmd-results">
          {loading && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--ink-muted)', fontSize: '0.9rem' }}>
              {t.commandPalette.searching}
            </div>
          )}

          {!loading && results.length > 0 && (
            <div>
              {results.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/question/${item.slug}`}
                  onClick={onClose}
                  className={`cmd-item ${index === selectedIndex ? 'active' : ''}`}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '2px' }}>
                      {item.category} • {item.subcategory || item.level}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {isEn ? (item.question_en || item.question_vi) : item.question_vi}
                    </div>
                  </div>
                  <CornerDownLeft size={16} color="var(--ink-faint)" />
                </Link>
              ))}
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--ink-muted)' }}>
              {t.commandPalette.noResults} &quot;{query}&quot;
            </div>
          )}

          {!query.trim() && (
            <div style={{ padding: '24px 20px', color: 'var(--ink-muted)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--ink)' }}>
                <Sparkles size={16} color="var(--accent)" />
                <span style={{ fontWeight: 600 }}>{t.commandPalette.quickSuggestions}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {['React', 'Next.js', 'Node.js', 'Docker', 'System Design', 'TypeScript', 'SQL', 'Kafka'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      color: 'var(--ink-secondary)',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
