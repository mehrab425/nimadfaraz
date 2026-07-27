import { requireRole } from '@/lib/guards';
import { getDashboardStats } from '@/lib/repositories';
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
  await requireRole(['SUPER_ADMIN', 'STAFF']);
  const stats = await getDashboardStats();
  const recentAppointments = await prisma.appointment.findMany({ take: 5, orderBy: { createdAt: 'desc' } });

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_55%)] px-4 py-24 text-vanilla">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-cosmic/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Admin Panel</p>
          <h1 className="mt-4 text-3xl font-bold text-white">داشبورد مدیریتی</h1>
          <p className="mt-4 text-sm leading-8 text-secondary">آمار کاربران، پرونده‌ها، قرارهای ملاقات و درخواست‌های در انتظار را در یکجا مدیریت کنید.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Clients', stats.clients],
            ['Lawyers', stats.lawyers],
            ['Cases', stats.cases],
            ['Pending Requests', stats.pendingRequests],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[24px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-secondary">{label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-cosmic/70 p-6">
            <h2 className="text-xl font-semibold text-white">آخرین درخواست‌های ملاقات</h2>
            <div className="mt-4 space-y-3">
              {recentAppointments.length ? recentAppointments.map((item: any) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="font-semibold text-white">{item.subject}</p>
                  <p className="text-sm text-secondary">{item.email} · {item.status}</p>
                </div>
              )) : <p className="text-sm text-secondary">درخواستی وجود ندارد.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
