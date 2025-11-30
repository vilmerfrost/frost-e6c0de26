import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a list of available AI providers
  const providers = ['openai', 'anthropic', 'google'];
  return NextResponse.json({ providers });
}