'use client';

import React from 'react';
import QuestionRow from './QuestionRow';
import type { QuestionMeta } from '../lib/types';


interface QuestionListViewProps {
  questions: QuestionMeta[];
  currentPage: number;
  limit: number;
}

export default function QuestionListView({
  questions,
  currentPage,
  limit
}: QuestionListViewProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {questions.map((q, idx) => {
        const displayIndex = (currentPage - 1) * limit + idx + 1;
        return (
          <QuestionRow
            key={q.id}
            question={q}
            displayIndex={displayIndex}
          />
        );
      })}
    </div>
  );
}
