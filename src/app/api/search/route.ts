import { NextRequest, NextResponse } from 'next/server';
import { searchQuestions } from '../../../lib/data';


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  if (!q.trim()) {
    return NextResponse.json({ results: [] });
  }

  const results = searchQuestions(q, limit).map(item => ({
    id: item.id,
    slug: item.slug,
    category: item.category,
    subcategory: item.subcategory,
    level: item.level,
    question_vi: item.question_vi,
    question_en: item.question_en
  }));

  return NextResponse.json({ results });
}
