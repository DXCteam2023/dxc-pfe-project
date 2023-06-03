"use client";

import { useSession } from "next-auth/react";

export default function AllProductOfferingsPage() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div className="all-product-offerings">
      <h1>All Product Offerings Page</h1>
    </div>
  );
}
