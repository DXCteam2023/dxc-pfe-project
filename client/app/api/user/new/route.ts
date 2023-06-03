import { prisma } from "@/app/api/_base";
import { ObjectId } from "mongodb";

export async function POST() {
  const user = await prisma.users.create({
    data: {
      id: new ObjectId().toString(),
      username: "user",
      password: "test",
    },
  });
  return new Response(JSON.stringify({ message: "New user inserted" }));
}
