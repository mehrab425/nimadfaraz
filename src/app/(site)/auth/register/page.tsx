'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error || 'ثبت‌نام ناموفق بود');
      return;
    }

    window.location.href = '/portal';
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_55%)] px-4 py-24 text-vanilla">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-cosmic/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Client Registration</p>
        <h1 className="mt-4 text-3xl font-bold text-white">ثبت‌نام</h1>
        <p className="mt-4 text-sm leading-8 text-secondary">نام کاربری و رمز عبور خود را انتخاب کنید.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <div>
            <Label htmlFor="username">نام کاربری</Label>
            <Input id="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="نام کاربری" />
          </div>
          <div>
            <Label htmlFor="password">رمز عبور</Label>
            <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="رمز عبور" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
            <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="تکرار رمز عبور" />
          </div>
          {message ? <p className="text-sm text-gold">{message}</p> : null}
          <div className="flex items-center justify-between gap-4">
            <Button type="submit" disabled={loading}>{loading ? 'در حال ثبت…' : 'ثبت‌نام'}</Button>
            <Link href="/auth/login" className="text-sm text-secondary hover:text-gold">ورود به حساب فعلی</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
