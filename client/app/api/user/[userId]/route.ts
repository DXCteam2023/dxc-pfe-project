import { prisma } from "@/app/api/_base";
import { ObjectId } from "mongodb";

import { NextApiRequest } from "next";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { userId: string } },
) {
  const mongoDBId: ObjectId = new ObjectId(params.userId);
  const user = await prisma.users.findFirst({
    where: { id: mongoDBId.toString() },
  });
  return new Response(user ? JSON.stringify(user) : JSON.stringify({}), {
    status: user ? 200 : 404,
    headers: { "Content-Type": "application/json" },
  });
}
