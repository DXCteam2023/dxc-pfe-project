"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session;
}) {
  return (
    <div className="provider">
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  );
}
