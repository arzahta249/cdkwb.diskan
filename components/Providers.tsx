"use client";

import React from "react";

import { SessionProvider } from "next-auth/react";
import { AccessibilityWidget } from "./AccessibilityWidget";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <AccessibilityWidget />
    </SessionProvider>
  );
}
