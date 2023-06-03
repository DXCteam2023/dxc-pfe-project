import { prisma } from "@/app/api/_base";

export async function GET() {
  const productOfferings = await prisma.product_offerings.findMany();
  console.log(productOfferings);
  return new Response(JSON.stringify(productOfferings), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
