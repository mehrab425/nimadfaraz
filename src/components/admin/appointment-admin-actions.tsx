'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function AppointmentAdminActions({ appointmentId }: { appointmentId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function updateStatus(status: 'APPROVED' | 'REJECTED' | 'COMPLETED') {
    setLoading(true);
    setMessage(null);
    const response = await fetch(`/api/v1/appointments/${appointmentId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    setLoading(false);
    setMessage(data.ok ? 'وضعیت بروزرسانی شد.' : data.error || 'عملیات ناموفق بود');
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={() => updateStatus('APPROVED')} disabled={loading}>تأیید</Button>
        <Button type="button" size="sm" variant="secondary" onClick={() => updateStatus('REJECTED')} disabled={loading}>رد</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => updateStatus('COMPLETED')} disabled={loading}>تکمیل</Button>
      </div>
      {message ? <p className="text-sm text-gold">{message}</p> : null}
    </div>
  );
}
