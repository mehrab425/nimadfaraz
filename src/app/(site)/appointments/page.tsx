'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AppointmentsPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    nationalId: '',
    phone: '',
    email: '',
    subject: '',
    category: '',
    lawyerId: '',
    preferredDate: '',
    preferredTime: '',
    description: '',
    attachment: null as File | null,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value) {
        formData.append(key, value as string);
      }
    });

    const response = await fetch('/api/v1/appointments', { method: 'POST', body: formData });
    const data = await response.json();
    setLoading(false);
    setMessage(data.ok ? 'درخواست ملاقات با موفقیت ثبت شد.' : data.error || 'ثبت ناموفق بود');
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_56%)] px-4 py-24 text-vanilla">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-cosmic/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Appointment Request</p>
        <h1 className="mt-4 text-3xl font-bold text-white">درخواست مشاوره آنلاین</h1>
        <p className="mt-4 text-sm leading-8 text-secondary">از فرم زیر برای ثبت درخواست مشاوره استفاده کنید. پس از بررسی، وضعیت درخواست برای شما اعلام می‌شود.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="fullName">نام و نام خانوادگی</Label>
            <Input id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="phone">شماره تماس</Label>
            <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="email">ایمیل</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="nationalId">کد ملی (اختیاری)</Label>
            <Input id="nationalId" value={form.nationalId} onChange={(e) => setForm({ ...form, nationalId: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="subject">موضوع پرونده</Label>
            <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="category">دسته بندی حقوقی</Label>
            <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="lawyerId">وکیل پیشنهادی (اختیاری)</Label>
            <Input id="lawyerId" value={form.lawyerId} onChange={(e) => setForm({ ...form, lawyerId: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="preferredDate">تاریخ پیشنهادی</Label>
            <Input id="preferredDate" type="date" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="preferredTime">ساعت پیشنهادی</Label>
            <Input id="preferredTime" value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="attachment">پیوست</Label>
            <Input id="attachment" type="file" onChange={(e) => setForm({ ...form, attachment: e.target.files?.[0] || null })} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">توضیحات</Label>
            <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          {message ? <p className="md:col-span-2 text-sm text-gold">{message}</p> : null}
          <div className="md:col-span-2">
            <Button type="submit" disabled={loading}>{loading ? 'در حال ثبت…' : 'ارسال درخواست'}</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
