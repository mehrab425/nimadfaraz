import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromRequest(request);
  if (!user || !['SUPER_ADMIN', 'LAWYER'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status;
  if (!['APPROVED', 'REJECTED', 'COMPLETED'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status },
  });

  await prisma.notification.create({
    data: {
      title: `قرار ملاقات ${status === 'APPROVED' ? 'تأیید' : status === 'REJECTED' ? 'رد' : 'تکمیل'} شد`,
      body: `وضعیت قرار ملاقات شما به ${status} تغییر یافت.`,
      kind: 'APPOINTMENT_STATUS',
      userId: appointment.clientId || user.id,
      appointmentId: appointment.id,
    },
  });

  return NextResponse.json({ ok: true, appointment });
}
