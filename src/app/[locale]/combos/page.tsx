import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";

export default async function CombosPage() {
  const locale = await getLocale();
  const t = await getTranslations("combos_page");
  const combos = await prisma.uNTCombo.findMany({ orderBy: { name: "asc" } });

  const diffColor = (d: string) =>
    d === "Сложно"
      ? "bg-red-100 text-red-700"
      : d === "Средне"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <div>
      <section className="bg-[#f0f7f2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1b6b3a] mb-4">{t("title")}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {combos.map((combo) => {
              const subjects = combo.subjects.split(",").map((s) => s.trim());
              const professions = combo.professions.split(",").map((p) => p.trim());
              const spotsLeft = combo.spotsTotal - combo.spotsFilled;

              return (
                <div key={combo.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#28a745] hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${diffColor(combo.difficulty)}`}>
                      {combo.difficulty}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg ${spotsLeft <= 5 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
                      {t("spots_left", { n: spotsLeft })}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1b6b3a] mb-3">{combo.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{combo.description}</p>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{t("subjects_label")}</p>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((s) => (
                        <span key={s} className="px-2 py-1 bg-[#f0f7f2] text-[#1b6b3a] text-xs rounded-lg font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{t("professions_label")}</p>
                    <div className="flex flex-wrap gap-1">
                      {professions.map((p) => (
                        <span key={p} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/${locale}/apply?combo=${combo.id}`}
                    className="block w-full text-center py-3 bg-[#1b6b3a] text-white font-semibold rounded-xl hover:bg-[#155730] transition-colors"
                  >
                    {t("choose_btn")}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#f0f7f2]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">{t("consult_text")}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-8 py-3 border-2 border-[#1b6b3a] text-[#1b6b3a] font-semibold rounded-xl hover:bg-[#1b6b3a] hover:text-white transition-colors"
          >
            {t("consult_btn")}
          </Link>
        </div>
      </section>
    </div>
  );
}
