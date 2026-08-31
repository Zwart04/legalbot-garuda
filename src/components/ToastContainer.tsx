'use client';

import { useToast } from '@/lib/toast';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => {
        const Icon =
          t.type === 'success'
            ? CheckCircle2
            : t.type === 'error'
              ? XCircle
              : t.type === 'warning'
                ? AlertTriangle
                : Info;
        const color =
          t.type === 'success'
            ? 'text-emerald-600 border-emerald-200 bg-emerald-50'
            : t.type === 'error'
              ? 'text-red-600 border-red-200 bg-red-50'
              : t.type === 'warning'
                ? 'text-amber-600 border-amber-200 bg-amber-50'
                : 'text-blue-600 border-blue-200 bg-blue-50';
        return (
          <div
            key={t.id}
            className={`flex items-start gap-2 border rounded-lg p-3 shadow-sm bg-white dark:bg-gray-800 ${color}`}
            role="status"
          >
            <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p className="text-sm flex-1">{t.message}</p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}