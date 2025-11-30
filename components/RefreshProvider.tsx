'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';

export function RefreshProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}
