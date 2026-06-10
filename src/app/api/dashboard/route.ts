import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as { id: string }).id;
  const application = await prisma.application.findUnique({
    where: { userId },
    include: { combo: true },
  });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return NextResponse.json({ application, user });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as { id: string }).id;
  const body = await req.json();
  const { name, phone } = body;
  const user = await prisma.user.update({
    where: { id: userId },
    data: { ...(name && { name }), ...(phone !== undefined && { phone }) },
  });
  return NextResponse.json(user);
}
