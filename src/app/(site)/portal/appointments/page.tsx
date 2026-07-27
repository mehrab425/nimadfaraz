import { requireAuth } from '@/lib/guards';
import { getUserAppointments } from '@/lib/repositories';

export default async function PortalAppointmentsPage() {
  const user = await requireAuth();
  const appointments = await getUserAppointments(user);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_55%)] px-4 py-24 text-vanilla">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-cosmic/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
        <h1 className="text-3xl font-bold text-white">قرارهای ملاقات من</h1>
        <div className="mt-8 space-y-4">
          {appointments.length ? appointments.map((item) => (
            <div key={item.id} className="rounded-[24px] border border-white/10 bg-black/20 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-white">{item.subject}</p>
                  <p className="text-sm text-secondary">{item.category}</p>
                </div>
                <span className="rounded-full border border-gold/30 px-3 py-1 text-sm text-gold">{item.status}</span>
              </div>
              <p className="mt-3 text-sm leading-8 text-secondary">{item.description || 'بدون توضیح'}</p>
            </div>
          )) : <p className="text-sm text-secondary">هنوز قرار ملاقات ثبت نشده است.</p>}
        </div>
      </div>
    </section>
  );
}
