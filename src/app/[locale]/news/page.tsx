import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
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
                <Image
                  src={post.imageUrl || `https://picsum.photos/seed/${idx + 50}/600/300`}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />
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
