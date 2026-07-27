import { requireRole } from '@/lib/guards';
import { prisma } from '@/lib/prisma';

export default async function AdminAppointmentsPage() {
  await requireRole(['ADMIN']);
  const appointments = await prisma.appointment.findMany({ 
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_55%)] px-4 py-24 text-vanilla">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-cosmic/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
        <h1 className="text-3xl font-bold text-white">درخواست‌های مشاوره</h1>
        <p className="mt-2 text-sm text-secondary">کل درخواست‌های ثبت شده: {appointments.length}</p>
        
        <div className="mt-8 space-y-4">
          {appointments.length ? appointments.map((item: any) => (
            <div key={item.id} className="rounded-[24px] border border-white/10 bg-black/20 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-lg font-semibold text-white">{item.fullName}</p>
                  <p className="text-sm text-secondary">{item.subject}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  item.status === 'PENDING' ? 'border border-yellow-400/30 text-yellow-200 bg-yellow-400/5' :
                  item.status === 'APPROVED' ? 'border border-green-400/30 text-green-200 bg-green-400/5' :
                  item.status === 'REJECTED' ? 'border border-red-400/30 text-red-200 bg-red-400/5' :
                  'border border-blue-400/30 text-blue-200 bg-blue-400/5'
                }`}>{item.status}</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><span className="text-gold">دسته:</span> <span className="text-secondary">{item.category}</span></p>
                <p><span className="text-gold">تماس:</span> <span className="text-secondary">{item.phone} • {item.email}</span></p>
                {item.description && <p><span className="text-gold">توضیح:</span> <span className="text-secondary">{item.description}</span></p>}
                <p className="text-xs text-secondary/60">{new Date(item.createdAt).toLocaleDateString('fa-IR')}</p>
              </div>
            </div>
          )) : <p className="text-sm text-secondary">هنوز درخواستی ثبت نشده است.</p>}
        </div>
      </div>
    </section>
  );
}

