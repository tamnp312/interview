import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getQuestions, getQuestionById } from '../../../../lib/data';
import FlashcardsClient from './FlashcardsClient';

export const dynamic = 'force-dynamic';

export default async function FlashcardsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const isAll = slug === 'all';
  const category = isAll ? null : getCategoryBySlug(slug);

  if (!isAll && !category) {
    notFound();
  }

  // Load up to 50 questions for the flashcard session
  const { questions: metaList } = getQuestions({
    category: isAll ? undefined : slug,
    limit: 50
  });

  // Load full content for these questions
  const fullQuestions = metaList
    .map(m => getQuestionById(m.id))
    .filter(Boolean);

  return (
    <FlashcardsClient
      slug={slug}
      isAll={isAll}
      category={category}
      fullQuestions={fullQuestions as any}
    />
  );
}
