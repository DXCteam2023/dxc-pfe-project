import { prisma } from "@/app/api/_base";

export async function GET() {
  const productSpecifications = await prisma.product_specifications.findMany();
  return new Response(JSON.stringify(productSpecifications), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
