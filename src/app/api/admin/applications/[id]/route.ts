import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { status, examDate, adminNotes } = body;

  const updated = await prisma.application.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(examDate !== undefined && { examDate: examDate ? new Date(examDate) : null }),
      ...(adminNotes !== undefined && { adminNotes }),
    },
    include: { user: true, combo: true },
  });

  return NextResponse.json(updated);
}
