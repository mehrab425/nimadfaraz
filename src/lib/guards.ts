import { notFound, redirect } from 'next/navigation';
import { getSessionUserFromCookieStore } from '@/lib/auth';

export async function requireAuth(redirectTo = '/auth/login') {
  const user = await getSessionUserFromCookieStore();
  if (!user) {
    redirect(redirectTo);
  }
  return user;
}

export async function requireRole(allowed: string[]) {
  const user = await requireAuth();
  if (!allowed.includes(user.role)) {
    notFound();
  }
  return user;
}
