import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  receiverId: z.string().min(1),
  content: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      senderId: user.id,
      receiverId: parsed.data.receiverId,
      content: parsed.data.content,
    },
  });

  await prisma.notification.create({
    data: {
      title: 'پیام جدید',
      body: 'شما یک پیام جدید دارید.',
      kind: 'NEW_MESSAGE',
      userId: parsed.data.receiverId,
    },
  });

  return NextResponse.json({ ok: true, message });
}

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const messages = await prisma.message.findMany({
    where: { OR: [{ senderId: user.id }, { receiverId: user.id }] },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return NextResponse.json({ messages });
}
