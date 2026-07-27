import { NextResponse } from 'next/server';
import { z } from 'zod';
import { comparePassword, createSessionCookie, signToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    const { username, password } = parsed.data;
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, passwordHash: true, role: true },
    });

    if (!user || !(await comparePassword(password, user.passwordHash))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ id: user.id, username: user.username, role: user.role });
    const cookie = createSessionCookie(token);

    return NextResponse.json({ ok: true, user: { id: user.id, username: user.username, role: user.role } }, {
      headers: { 'Set-Cookie': cookie },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
