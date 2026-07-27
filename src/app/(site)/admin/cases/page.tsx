import { requireRole } from '@/lib/guards';

export default async function AdminCasesPage() {
  await requireRole(['ADMIN']);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_55%)] px-4 py-24 text-vanilla">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-cosmic/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
        <h1 className="text-3xl font-bold text-white">مدیریت پرونده‌ها</h1>
        <p className="mt-4 text-sm text-secondary">این بخش برای نسخه بعدی فعال خواهد شد.</p>
      </div>
    </section>
  );
}

