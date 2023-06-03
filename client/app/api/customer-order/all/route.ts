import { prisma } from "@/app/api/_base";

export async function GET() {
  const customerOrders = await prisma.customer_orders.findMany();
  return new Response(JSON.stringify(customerOrders), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
