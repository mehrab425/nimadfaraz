import { Suspense } from 'react';
import { ResetPasswordForm } from './reset-password-form';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen px-4 py-24 text-vanilla">در حال بارگذاری…</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
