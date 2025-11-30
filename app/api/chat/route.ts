import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message, provider } = await request.json();

  // Simulate a response from an AI provider
  const response = `Response from ${provider}: You said "${message}"`;

  return NextResponse.json({ response });
}