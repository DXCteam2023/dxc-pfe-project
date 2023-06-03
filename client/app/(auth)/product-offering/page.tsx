"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProductOfferingPage() {
  const { data: session } = useSession({
    required: true,
  });

  return redirect("/product-offering/all");
}
