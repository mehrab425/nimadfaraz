'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error || 'ورود ناموفق بود');
      return;
    }

    if (data.user.role === 'ADMIN') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/portal';
    }
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_55%)] px-4 py-24 text-vanilla">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-[32px] border border-white/10 bg-cosmic/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)] lg:flex-row lg:p-12">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Portal Access</p>
          <h1 className="mt-4 text-3xl font-bold text-white">ورود به سیستم</h1>
          <p className="mt-4 text-sm leading-8 text-secondary">
            نام کاربری و رمز عبور خود را وارد کنید.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 rounded-[24px] border border-white/10 bg-black/20 p-6 backdrop-blur">
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">نام کاربری</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="نام کاربری" />
            </div>
            <div>
              <Label htmlFor="password">رمز عبور</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            {message ? <p className="text-sm text-gold">{message}</p> : null}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'در حال ورود…' : 'ورود'}
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-secondary">
            <Link href="/auth/register" className="text-gold hover:underline">ثبت‌نام جدید</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

