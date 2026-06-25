export const dynamic = "force-dynamic";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function NewsPage() {
  const locale = await getLocale();
  const t = await getTranslations("news_page");
  const posts = await prisma.newsPost.findMany({ orderBy: { publishedAt: "desc" } });

  const dateLocale = locale === "en" ? "en-US" : locale === "kz" ? "kk-KZ" : "ru-RU";

  return (
    <div>
      <section className="bg-[#f0f7f2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1b6b3a] mb-4">{t("title")}</h1>
          <p className="text-gray-600 text-lg">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <article key={post.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 flex flex-col items-center justify-center gap-3" style={{ background: "linear-gradient(135deg, #0d3d22 0%, #1b6b3a 100%)" }}>
                    <BookOpen className="w-14 h-14 text-white opacity-80" />
                    <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Абырой School</span>
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="font-bold text-[#1b6b3a] text-lg mb-3 leading-snug">{post.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{post.content}</p>
                </div>
              </article>
            ))}
          </div>
          {posts.length === 0 && (
            <div className="text-center py-20 text-gray-400">{t("empty")}</div>
          )}
        </div>
      </section>
    </div>
  );
}
