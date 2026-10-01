import { NextRequest, NextResponse } from 'next/server';
import { getQuestionById } from '../../../lib/data';


export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids)) {
      return NextResponse.json({ questions: [] });
    }

    const questions = ids
      .slice(0, 100) // limit to 100
      .map(id => getQuestionById(Number(id)))
      .filter(Boolean);

    return NextResponse.json({ questions });
  } catch (e) {
    return NextResponse.json({ questions: [] });
  }
}
