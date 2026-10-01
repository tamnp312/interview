'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams = {}
}: {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const createPageUrl = (p: number) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(searchParams)) {
      if (v && k !== 'page') params.set(k, v);
    }
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    return qs ? `${baseUrl}?${qs}` : baseUrl;
  };

  // Generate page range (e.g. 1, 2, 3 ... 10)
  const pages: (number | string)[] = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <nav className="pagination" aria-label="Phân trang câu hỏi">
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`page-btn ${currentPage <= 1 ? 'disabled' : ''}`}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : 0}
        style={{ pointerEvents: currentPage <= 1 ? 'none' : 'auto' }}
        prefetch={true}
      >
        <ChevronLeft size={16} />
      </Link>

      {pages.map((p, idx) => {
        if (p === '...') {
          return (
            <span key={`dots-${idx}`} style={{ padding: '0 6px', color: 'var(--ink-muted)' }}>
              …
            </span>
          );
        }

        const pageNum = p as number;
        const isActive = pageNum === currentPage;

        return (
          <Link
            key={`page-${pageNum}`}
            href={createPageUrl(pageNum)}
            className={`page-btn ${isActive ? 'active' : ''}`}
            prefetch={true}
          >
            {pageNum}
          </Link>
        );
      })}

      <Link
        href={createPageUrl(currentPage + 1)}
        className={`page-btn ${currentPage >= totalPages ? 'disabled' : ''}`}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : 0}
        style={{ pointerEvents: currentPage >= totalPages ? 'none' : 'auto' }}
        prefetch={true}
      >
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
