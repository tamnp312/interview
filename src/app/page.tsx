import React from 'react';
import { getAllCategories, getQuestions } from '../lib/data';
import HomeClient from '../components/HomeClient';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const categories = getAllCategories();
  const { questions: recentQuestions, total } = getQuestions({ limit: 8 });

  return (
    <HomeClient
      categories={categories}
      recentQuestions={recentQuestions}
      total={total}
    />
  );
}
