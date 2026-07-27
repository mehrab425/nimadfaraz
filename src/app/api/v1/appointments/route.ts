import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  const formData = await request.formData();
  const fullName = formData.get('fullName')?.toString() || '';
  const phone = formData.get('phone')?.toString() || '';
  const email = formData.get('email')?.toString() || '';
  const subject = formData.get('subject')?.toString() || '';
  const category = formData.get('category')?.toString() || '';
  const description = formData.get('description')?.toString() || '';
  const file = formData.get('attachment');

  if (!fullName || !phone || !email || !subject || !category) {
    return NextResponse.json({ error: 'Please fill the required fields' }, { status: 400 });
  }

  let attachmentPath: string | null = null;
  if (file && file instanceof File && file.size > 0) {
    const uploadDir = path.join(process.cwd(), 'uploads', 'appointments');
    await fs.mkdir(uploadDir, { recursive: true });
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
    attachmentPath = `/uploads/appointments/${fileName}`;
  }

  const appointment = await prisma.appointment.create({
    data: {
      fullName,
      phone,
      email,
      subject,
      category,
      description: description || null,
      userId: user?.id || null,
    },
  });

  return NextResponse.json({ ok: true, appointment }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const appointments = user.role === 'ADMIN'
    ? await prisma.appointment.findMany({ orderBy: { createdAt: 'desc' } })
    : await prisma.appointment.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });

  return NextResponse.json(appointments);
}
