import { prisma } from '@/lib/prisma';
import type { SessionUser } from '@/lib/auth';

export async function getDashboardStats() {
  const [clients, lawyers, casesCount, appointmentsCount, articlesCount, messagesCount, pendingRequests] = await Promise.all([
    prisma.user.count({ where: { role: 'CLIENT' } }),
    prisma.user.count({ where: { role: 'LAWYER' } }),
    prisma.case.count(),
    prisma.appointment.count(),
    prisma.article.count(),
    prisma.message.count(),
    prisma.appointment.count({ where: { status: 'PENDING' } }),
  ]);

  return {
    clients,
    lawyers,
    cases: casesCount,
    appointments: appointmentsCount,
    articles: articlesCount,
    messages: messagesCount,
    pendingRequests,
  };
}

export async function getUserDashboard(user: SessionUser) {
  const cases = await prisma.case.findMany({
    where: user.role === 'CLIENT' ? { clientId: user.id } : user.role === 'LAWYER' ? { lawyerId: user.id } : {},
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { lawyer: true, client: true },
  });

  const appointments = await prisma.appointment.findMany({
  where: {
    userId: user.id
  },
  orderBy: {
    createdAt: "desc"
  },
  take: 5,
  include: {
    user: true
  }
});

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return { cases, appointments, notifications };
}

export async function getUserAppointments(user: SessionUser) {
  return prisma.appointment.findMany({
  where: {
    userId: user.id
  },
  orderBy: {
    createdAt: "desc"
  },
  include: {
    user: true
  }
});
}

export async function getUserCases(user: SessionUser) {
  return prisma.case.findMany({
    where: user.role === 'CLIENT' ? { clientId: user.id } : user.role === 'LAWYER' ? { lawyerId: user.id } : {},
    orderBy: { createdAt: 'desc' },
    include: { lawyer: true, client: true },
  });
}

export async function getUserDocuments(user: SessionUser) {
  return prisma.document.findMany({
    where: {
      uploadedById: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

