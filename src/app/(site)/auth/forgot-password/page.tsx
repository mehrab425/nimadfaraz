'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const response = await fetch('/api/v1/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setLoading(false);
    setMessage(data.message || 'درخواست شما ثبت شد.');
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_55%)] px-4 py-24 text-vanilla">
      <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-cosmic/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
        <h1 className="text-3xl font-bold text-white">بازیابی رمز عبور</h1>
        <p className="mt-4 text-sm leading-8 text-secondary">ایمیل خود را وارد کنید تا دستورالعمل بازیابی برایتان آماده شود.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">ایمیل</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {message ? <p className="text-sm text-gold">{message}</p> : null}
          <Button type="submit" disabled={loading}>{loading ? 'در حال ارسال…' : 'ارسال لینک بازیابی'}</Button>
          <Link href="/auth/login" className="block text-sm text-secondary hover:text-gold">بازگشت به ورود</Link>
        </form>
      </div>
    </section>
  );
}
