'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function CaseAdminForm() {
  const [form, setForm] = useState({
    caseNumber: '',
    title: '',
    caseType: '',
    court: '',
    description: '',
    clientId: '',
    lawyerId: '',
    priority: 'MEDIUM',
    deadline: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const response = await fetch('/api/v1/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setLoading(false);
    setMessage(data.ok ? 'پرونده با موفقیت ثبت شد.' : data.error || 'ثبت ناموفق بود');
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-[24px] border border-white/10 bg-black/20 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="caseNumber">شماره پرونده</Label>
          <Input id="caseNumber" value={form.caseNumber} onChange={(e) => setForm({ ...form, caseNumber: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="title">عنوان پرونده</Label>
          <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="caseType">نوع پرونده</Label>
          <Input id="caseType" value={form.caseType} onChange={(e) => setForm({ ...form, caseType: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="court">دادگاه</Label>
          <Input id="court" value={form.court} onChange={(e) => setForm({ ...form, court: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="clientId">شناسه مشتری</Label>
          <Input id="clientId" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="lawyerId">شناسه وکیل</Label>
          <Input id="lawyerId" value={form.lawyerId} onChange={(e) => setForm({ ...form, lawyerId: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="priority">اولویت</Label>
          <Input id="priority" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="deadline">موعد</Label>
          <Input id="deadline" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">توضیحات</Label>
          <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
      </div>
      {message ? <p className="text-sm text-gold">{message}</p> : null}
      <Button type="submit" disabled={loading}>{loading ? 'در حال ثبت…' : 'ثبت پرونده'}</Button>
    </form>
  );
}
