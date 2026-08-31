'use client';

import { ReactNode } from 'react';
import { AppProvider } from '@/lib/auth';
import { ToastProvider } from '@/lib/toast';
import { ToastContainer } from './ToastContainer';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <ToastProvider>
        {children}
        <ToastContainer />
      </ToastProvider>
    </AppProvider>
  );
}