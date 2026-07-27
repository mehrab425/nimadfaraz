import { NextResponse } from 'next/server';
import { z } from 'zod';
import { hashPassword, createSessionCookie, signToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    const { username, password, confirmPassword } = parsed.data;
    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
        role: 'CLIENT',
      },
      select: { id: true, username: true, role: true },
    });

    const token = signToken({ id: user.id, username: user.username, role: user.role });
    const cookie = createSessionCookie(token);

    return NextResponse.json({ ok: true, user }, {
      status: 201,
      headers: { 'Set-Cookie': cookie },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
