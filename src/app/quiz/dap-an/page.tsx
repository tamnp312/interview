import React from 'react';
import { getAllCategories } from '../../../lib/data';
import QuizAnswersClient from './QuizAnswersClient';

export const dynamic = 'force-dynamic';

export default function QuizAnswersPage() {
  const categories = getAllCategories();
  return <QuizAnswersClient categories={categories} />;
}
