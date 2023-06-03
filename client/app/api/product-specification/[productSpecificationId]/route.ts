import { prisma } from "@/app/api/_base";
import { ObjectId } from "mongodb";

import { NextApiRequest } from "next";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { productSpecificationId: string } },
) {
  const mongoDBId: ObjectId = new ObjectId(params.productSpecificationId);
  const user = await prisma.product_specifications.findFirst({
    where: { id: mongoDBId.toString() },
  });
  return new Response(user ? JSON.stringify(user) : JSON.stringify({}), {
    status: user ? 200 : 404,
    headers: { "Content-Type": "application/json" },
  });
}
