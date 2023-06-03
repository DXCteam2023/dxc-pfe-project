import { prisma } from "@/app/api/_base";
import { ObjectId } from "mongodb";

import { NextApiRequest } from "next";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { customerOrderId: string } },
) {
  const mongoDBId: ObjectId = new ObjectId(params.customerOrderId);
  const user = await prisma.customer_orders.findFirst({
    where: { id: mongoDBId.toString() },
  });
  return new Response(user ? JSON.stringify(user) : JSON.stringify({}), {
    status: user ? 200 : 404,
    headers: { "Content-Type": "application/json" },
  });
}
