import { prisma } from "@/app/api/_base";

export async function GET() {
  const users = await prisma.users.findMany();
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
