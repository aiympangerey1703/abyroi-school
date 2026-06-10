import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });

  const [teachers, newsPosts, combos] = await Promise.all([
    prisma.teacher.findMany({ take: 4, orderBy: { createdAt: "asc" } }),
    prisma.newsPost.findMany({ take: 3, orderBy: { publishedAt: "desc" } }),
    prisma.uNTCombo.findMany({ take: 4 }),
  ]);

  void t;

  return (
    <HomeClient
      locale={locale}
      teachers={teachers}
      newsPosts={newsPosts}
      combos={combos}
    />
  );
}
