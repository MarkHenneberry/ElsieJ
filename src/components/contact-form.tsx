'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { careForOptions, validateContact, type ContactInput, type ContactErrors } from '@/lib/contact';
export function ContactForm({ available }: { available: boolean }) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const result = useRef<HTMLDivElement>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (status === 'sending') return;
    const data = new FormData(event.currentTarget);
    const input = Object.fromEntries(['name', 'phone', 'email', 'careFor', 'message', 'website'].map(key => [key, String(data.get(key) || '').trim()])) as ContactInput;
    const validation = validateContact(input); setErrors(validation);
    if (Object.keys(validation).length) { setStatus('idle'); form.current?.querySelector<HTMLElement>(`[name="${Object.keys(validation)[0]}"]`)?.focus(); return; }
    if (!available) { setServerMessage('Online requests are not available yet. Your request has not been sent.'); setStatus('error'); setTimeout(() => result.current?.focus(), 0); return; }
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
      const body = await response.json();
      if (!response.ok) { setErrors(body.errors || {}); throw new Error(body.message || 'We could not send your request. Please try again.'); }
      form.current?.reset(); setStatus('success');
    } catch (error) { setServerMessage(error instanceof Error ? error.message : 'We could not send your request. Please try again.'); setStatus('error'); }
    setTimeout(() => result.current?.focus(), 0);
  }
  if (status === 'success') return <div className="form-success" ref={result} role="status" tabIndex={-1}><h2>Thank you for reaching out.</h2><p>Your request has been sent to Elsie J’s Home Care. We look forward to speaking with you.</p><button type="button" className="button secondary" onClick={() => { setStatus('idle'); setErrors({}); }}>Send Another Request</button></div>;
  const attributes = (name: keyof ContactInput) => ({ name, id: name, 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${name}-error` : undefined });
  const error = (name: keyof ContactInput) => errors[name] ? <p className="field-error" id={`${name}-error`}>{errors[name]}</p> : null;
  return <><h2 className="form-title">Send a care enquiry.</h2><form className="contact-form" onSubmit={submit} noValidate ref={form} aria-label="Care enquiry">
    {!available && <p className="form-notice">Online requests will be available soon. This form is not currently accepting enquiries.</p>}
    <p className="form-help">Your name, phone number, and email are all we need to reply. Please leave out all medical and sensitive information.</p>
    <div className="field"><label htmlFor="name">Your Name</label><input {...attributes('name')} autoComplete="name" maxLength={100} required />{error('name')}</div>
    <div className="form-row"><div className="field"><label htmlFor="phone">Phone Number</label><input {...attributes('phone')} type="tel" autoComplete="tel" maxLength={35} required />{error('phone')}</div><div className="field"><label htmlFor="email">Email</label><input {...attributes('email')} type="email" autoComplete="email" maxLength={254} required />{error('email')}</div></div>
    <div className="field"><label htmlFor="careFor">Who Are You Looking for Care For? <span>(optional)</span></label><select {...attributes('careFor')} defaultValue=""><option value="">Please choose</option>{careForOptions.map(option => <option key={option}>{option}</option>)}</select>{error('careFor')}</div>
    <div className="field"><label htmlFor="message">What Would You Like Us to Know? <span>(optional)</span></label><textarea {...attributes('message')} rows={4} maxLength={2000} />{error('message')}</div>
    <div hidden aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input name="website" id="website" tabIndex={-1} autoComplete="off" /></div>
    {status === 'error' && <div className="form-error" role="alert" ref={result} tabIndex={-1}>{serverMessage}</div>}
    <button type="submit" className="button primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending Your Request…' : 'Send My Request'}<ArrowRight size={19} aria-hidden="true" /></button>
    <p className="form-help">We’ll use your information only to respond to your request. <Link href="/privacy">Read our Privacy Policy.</Link></p>
  </form></>;
}
