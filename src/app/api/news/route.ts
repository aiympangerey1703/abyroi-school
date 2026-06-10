import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const news = await prisma.newsPost.findMany({ orderBy: { publishedAt: "desc" } });
  return NextResponse.json(news);
}
