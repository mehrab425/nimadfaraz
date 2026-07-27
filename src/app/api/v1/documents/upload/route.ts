import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const kind = formData.get('kind')?.toString() || 'document';
  const caseId = formData.get('caseId')?.toString() || null;
  const appointmentId = formData.get('appointmentId')?.toString() || null;
  const clientId = formData.get('clientId')?.toString() || null;

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), 'uploads', kind === 'avatar' ? 'avatars' : kind === 'case' ? 'cases' : kind === 'appointment' ? 'appointments' : 'documents');
  await fs.mkdir(uploadDir, { recursive: true });
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  const document = await prisma.document.create({
  data: {
    name: fileName,
    storagePath: `/uploads/${kind === 'avatar' ? 'avatars' : kind === 'case' ? 'cases' : kind === 'appointment' ? 'appointments' : 'documents'}/${fileName}`,
    kind,
    uploadedById: user.id,
  },
  });

  return NextResponse.json({ ok: true, document });
}
