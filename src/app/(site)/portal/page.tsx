import Link from 'next/link';
import { requireAuth } from '@/lib/guards';
import { getUserDashboard } from '@/lib/repositories';

export default async function PortalPage() {
  const user = await requireAuth();
  const data = await getUserDashboard(user);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_55%)] px-4 py-24 text-vanilla">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-cosmic/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Client Portal</p>
          <h1 className="mt-4 text-3xl font-bold text-white">سلام {user.username}</h1>
          <p className="mt-4 text-sm leading-8 text-secondary">
            این داشبورد وضعیت پرونده‌ها، قرارهای ملاقات، پیام‌ها و اسناد شما را در یکجا نمایش می‌دهد.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-6">
            <p className="text-sm text-secondary">پرونده‌های من</p>
            <p className="mt-3 text-3xl font-bold text-white">{data.cases.length}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-6">
            <p className="text-sm text-secondary">قرارهای ملاقات</p>
            <p className="mt-3 text-3xl font-bold text-white">{data.appointments.length}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-6">
            <p className="text-sm text-secondary">اعلان‌ها</p>
            <p className="mt-3 text-3xl font-bold text-white">{data.notifications.length}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-cosmic/70 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">آخرین پرونده‌ها</h2>
              <Link href="/portal/cases" className="text-sm text-gold hover:underline">مشاهده همه</Link>
            </div>
            <div className="space-y-3">
              {data.cases.length ? data.cases.map((item: any) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-secondary">{item.caseType}</p>
                    </div>
                    <span className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold">{item.status}</span>
                  </div>
                </div>
              )) : <p className="text-sm text-secondary">هنوز پرونده‌ای ثبت نشده است.</p>}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-cosmic/70 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">آخرین قرارهای ملاقات</h2>
              <Link href="/portal/appointments" className="text-sm text-gold hover:underline">مشاهده همه</Link>
            </div>
            <div className="space-y-3">
              {data.appointments.length ? data.appointments.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{item.subject}</p>
                      <p className="text-sm text-secondary">{item.category}</p>
                    </div>
                    <span className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold">{item.status}</span>
                  </div>
                </div>
              )) : <p className="text-sm text-secondary">هنوز قرار ملاقات ثبت نشده است.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
