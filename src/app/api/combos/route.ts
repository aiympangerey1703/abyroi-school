import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const combos = await prisma.uNTCombo.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(combos);
}
