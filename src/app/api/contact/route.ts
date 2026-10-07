import { NextRequest, NextResponse } from 'next/server';
import { validateContact, type ContactInput } from '@/lib/contact';
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ message: 'Please send your request from this website.' }, { status: 403 });
  if (!request.headers.get('content-type')?.includes('application/json')) return NextResponse.json({ message: 'Please use the contact form.' }, { status: 415 });
  try {
    const text = await request.text();
    if (text.length > 12000) return NextResponse.json({ message: 'Please keep your request short.' }, { status: 413 });
    const body = JSON.parse(text);
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('invalid');
    const input = Object.fromEntries(['name', 'phone', 'email', 'careFor', 'message', 'website'].map(key => [key, typeof body[key] === 'string' ? body[key].trim() : ''])) as ContactInput;
    if (input.website) return NextResponse.json({ message: 'Your request could not be sent. Please use the contact options on this page.' }, { status: 400 });
    const errors = validateContact(input);
    if (Object.keys(errors).length) return NextResponse.json({ errors, message: 'Please check the highlighted fields.' }, { status: 400 });
    const endpoint = process.env.CONTACT_WEBHOOK_URL;
    if (!endpoint) return NextResponse.json({ message: 'Online requests are not available yet. Your request has not been sent.' }, { status: 503 });
    if (new URL(endpoint).protocol !== 'https:') return NextResponse.json({ message: 'Online requests are temporarily unavailable. Please use the other contact options.' }, { status: 503 });
    const { website: _website, ...enquiry } = input;
    void _website;
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify(enquiry), signal: AbortSignal.timeout(10000), redirect: 'error' });
    if (!response.ok) return NextResponse.json({ message: 'We could not send your request. Please try again or use the other contact options.' }, { status: 502 });
    return NextResponse.json({ message: 'Your request has been sent.' });
  } catch {
    return NextResponse.json({ message: 'We could not send your request. Please check your details and try again.' }, { status: 400 });
  }
}
