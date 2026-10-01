import { NextResponse } from 'next/server';
import { getQuestionById } from '../../../../lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolved = await params;
  const id = parseInt(resolved.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const question = getQuestionById(id);
  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }

  return NextResponse.json(question);
}
