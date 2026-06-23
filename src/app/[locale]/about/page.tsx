export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Award, Users, Shield, Target, MapPin } from "lucide-react";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "values" });
  const a = await getTranslations({ locale, namespace: "about_page" });

  const values = [
    { icon: Award, title: t("academic"), desc: t("academic_desc") },
    { icon: Users, title: t("individual"), desc: t("individual_desc") },
    { icon: Shield, title: t("safe"), desc: t("safe_desc") },
    { icon: Target, title: t("result"), desc: t("result_desc") },
  ];

return (
    <div>
      <section className="bg-[#f0f7f2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1b6b3a] mb-6">{a("hero_title")}</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">{a("hero_subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1b6b3a] mb-6">{a("mission_title")}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{a("mission_p1")}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{a("mission_p2")}</p>
            <h2 className="text-2xl font-bold text-[#1b6b3a] mt-8 mb-4">{a("vision_title")}</h2>
            <p className="text-gray-600 leading-relaxed">{a("vision_p1")}</p>
          </div>
          <div className="relative">
            <Image
              src="/teachers/teacher12.jpg"
              alt="Абырой"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#1b6b3a] text-white p-4 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold">5+</div>
              <div className="text-green-200 text-sm">{a("years_label")}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f0f7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1b6b3a] mb-8">{a("story_title")}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">{a("story_p1")}</p>
              <p className="text-gray-600 leading-relaxed mb-4">{a("story_p2")}</p>
              <p className="text-gray-600 leading-relaxed">{a("story_p3")}</p>
            </div>
            <Image
              src="/teachers/teacher1.jpg"
              alt="Абырой"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#1b6b3a] mb-12">{t("title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#f0f7f2] rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-[#1b6b3a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#1b6b3a] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-[#1b6b3a] mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-[#1b6b3a] text-xl mb-2">{a("location_title")}</h3>
              <p className="text-gray-600">{a("location_city")}</p>
              <p className="text-gray-500 text-sm mt-1">{a("location_hint")}</p>
              <Link href={`/${locale}/contact`} className="inline-block mt-3 text-[#28a745] font-medium hover:underline">
                {a("location_link")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
