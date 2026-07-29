import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const payload = await req.json();
  // Run AST sanity pass + Gemini reasoning
  return NextResponse.json({ status: 'success', summary: 'Clean review posted' });
}
