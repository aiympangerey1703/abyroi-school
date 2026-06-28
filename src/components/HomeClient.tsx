"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Award, Users, Target, Shield, CheckCircle, BookOpen } from "lucide-react";

type Teacher = { id: string; name: string; subject: string; experience: number; bio: string; photoUrl: string | null };

const TEACHER_PHOTOS: Record<string, string> = {
  "Ержан Берікұлы": "/teachers/teacher1.jpg",
  "Эльвира Вахитовна": "/teachers/teacher2.jpg",
  "Есболат Тілеккабылұлы": "/teachers/teacher3.jpg",
  "Жанерке Ерболатқызы": "/teachers/teacher4.jpg",
  "Айнагүл Мауленбайқызы": "/teachers/teacher5.jpg",
  "Ақжүніс Сержанқызы": "/teachers/teacher6.jpg",
  "Нұрболат Берікұлы": "/teachers/teacher7.jpg",
  "Инабат Шынболатовна": "/teachers/teacher8.jpg",
  "Асланбек Асқарұлы": "/teachers/teacher9.jpg",
  "Асель Болатқызы": "/teachers/teacher10.jpg",
  "Аяжан Талғатқызы": "/teachers/teacher11.jpg",
  "Гүлзат Талапқызы": "/teachers/teacher12.jpg",
  "Айжан Ергенқызы": "/teachers/teacher13.jpg",
  "Мадина Наурызғалиқызы": "/teachers/teacher14.jpg",
  "Әлібек Сансызбайұлы": "/teachers/teacher15.jpg",
};

const FEATURED_TEACHERS = [
  { id: "12", name: "Гүлзат Талапқызы",     subjectKz: "Математика және математикалық сауаттылық", subjectRu: "Математика и математическая грамотность", experience: 6,  photo: "/teachers/teacher12.jpg" },
  { id: "1",  name: "Ержан Берікұлы",        subjectKz: "Дүние жүзі тарихы",                       subjectRu: "Всемирная история",                       experience: 15, photo: "/teachers/teacher1.jpg" },
  { id: "11", name: "Аяжан Талғатқызы",      subjectKz: "Ағылшын тілі",                            subjectRu: "Английский язык",                         experience: 3,  photo: "/teachers/teacher11.jpg" },
  { id: "14", name: "Мадина Наурызғалиқызы", subjectKz: "Химия",                                   subjectRu: "Химия",                                   experience: 4,  photo: "/teachers/teacher14.jpg" },
];
type NewsPost = { id: string; title: string; titleKz: string | null; content: string; contentKz: string | null; imageUrl: string | null; publishedAt: Date };
type Combo = { id: string; name: string; subjects: string; professions: string; difficulty: string; spotsTotal: number; spotsFilled: number };

export default function HomeClient({
  locale,
  teachers,
  newsPosts,
  combos,
}: {
  locale: string;
  teachers: Teacher[];
  newsPosts: NewsPost[];
  combos: Combo[];
}) {
  const t = useTranslations();

  const steps = [
    t("how_to_apply.step1"),
    t("how_to_apply.step2"),
    t("how_to_apply.step3"),
    t("how_to_apply.step4"),
    t("how_to_apply.step5"),
  ];

  const values = [
    { icon: Award, title: t("values.academic"), desc: t("values.academic_desc") },
    { icon: Users, title: t("values.individual"), desc: t("values.individual_desc") },
    { icon: Shield, title: t("values.safe"), desc: t("values.safe_desc") },
    { icon: Target, title: t("values.result"), desc: t("values.result_desc") },
  ];

  const diffColor = (d: string) =>
    d === "Сложно" ? "bg-red-100 text-red-700" : d === "Средне" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700";

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "#0d3d22" }}>
        <div className="absolute inset-0">
          <Image src="/logo.jpg" alt="" fill className="object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <Image src="/logo.jpg" alt="Абырой" width={120} height={120} className="mx-auto mb-8 rounded-2xl shadow-2xl" />
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-8">
            <CheckCircle className="w-4 h-4 text-green-300" />
            <span>ЕНТ · Уральск · Казахстан</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/apply`}
              className="px-8 py-4 bg-white text-[#1b6b3a] font-bold rounded-2xl text-lg hover:bg-green-50 transition-all shadow-lg hover:shadow-xl"
            >
              {t("hero.cta_apply")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl text-lg hover:bg-white/10 transition-all"
            >
              {t("hero.cta_learn")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1b6b3a] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "2000+", label: t("stats.graduates") },
            { num: "15+", label: t("stats.teachers") },
            { num: "136", label: t("stats.unt_pass") },
            { num: "5+", label: t("stats.directions") },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-white">{s.num}</div>
              <div className="text-green-200 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 bg-[#f0f7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1b6b3a] mb-4">{t("about_snippet.title")}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{t("about_snippet.text")}</p>
            <Link href={`/${locale}/about`} className="inline-flex items-center gap-2 text-[#1b6b3a] font-semibold hover:gap-3 transition-all">
              {t("about_snippet.more")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#1b6b3a] mb-12">{t("values.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#f0f7f2] rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#1b6b3a] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[#1b6b3a] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combos preview */}
      <section className="py-16 bg-[#f0f7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#1b6b3a]">{t("programs.title")}</h2>
              <p className="text-gray-500 mt-2">{t("programs.subtitle")}</p>
            </div>
            <Link href={`/${locale}/combos`} className="hidden sm:block text-[#1b6b3a] font-semibold hover:underline">
              {t("programs.view_all")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {combos.map((combo) => {
              const subjects = combo.subjects.split(",").map((s) => s.trim());
              const professions = combo.professions.split(",").map((p) => p.trim());
              return (
                <div key={combo.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium mb-3 ${diffColor(combo.difficulty)}`}>
                    {combo.difficulty}
                  </span>
                  <h3 className="font-bold text-[#1b6b3a] mb-2">{combo.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{subjects.slice(0, 2).join(" · ")}</p>
                  <p className="text-xs text-gray-400">{professions.slice(0, 2).join(", ")}</p>
                  <div className="mt-4 text-xs text-gray-400">
                    Осталось {combo.spotsTotal - combo.spotsFilled} мест
                  </div>
                </div>
              );
            })}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link href={`/${locale}/combos`} className="text-[#1b6b3a] font-semibold">
              {t("programs.view_all")} →
            </Link>
          </div>
        </div>
      </section>

      {/* How to apply stepper */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#1b6b3a] mb-12">{t("how_to_apply.title")}</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-0">
            {steps.map((step, i) => (
              <div key={i} className="flex sm:flex-col items-center gap-4 sm:gap-2 flex-1">
                <div className="flex sm:flex-col items-center w-full sm:w-auto">
                  <div className="flex sm:flex-col items-center sm:items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                      style={{ background: "#1b6b3a", color: "white" }}
                    >
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="sm:hidden w-8 h-0.5 bg-[#28a745] mx-2" />
                    )}
                    {i < steps.length - 1 && (
                      <div className="hidden sm:block h-0.5 bg-[#28a745] w-full mt-5 -mb-5" style={{ marginLeft: "50%", width: "calc(100% - 0px)" }} />
                    )}
                  </div>
                </div>
                <div className="sm:text-center mt-0 sm:mt-3">
                  <p className="text-sm font-medium text-gray-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={`/${locale}/apply`} className="inline-block px-8 py-3 bg-[#1b6b3a] text-white font-semibold rounded-2xl hover:bg-[#155730] transition-colors">
              {t("nav.apply")}
            </Link>
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-16 bg-[#f0f7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#1b6b3a]">{t("teachers.title")}</h2>
              <p className="text-gray-500 mt-2">{t("teachers.subtitle")}</p>
            </div>
            <Link href={`/${locale}/teachers`} className="hidden sm:block text-[#1b6b3a] font-semibold hover:underline">
              {t("teachers.view_all")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_TEACHERS.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={teacher.photo}
                  alt={teacher.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-[#1b6b3a]">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">{locale === "kz" ? teacher.subjectKz : teacher.subjectRu}</p>
                  <p className="text-xs text-gray-400 mt-1">{teacher.experience} {t("teachers.years")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-[#1b6b3a]">{t("news.title")}</h2>
            <Link href={`/${locale}/news`} className="hidden sm:block text-[#1b6b3a] font-semibold hover:underline">
              {t("news.view_all")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsPosts.map((post) => {
              const realImage = post.imageUrl && !post.imageUrl.includes("picsum") ? post.imageUrl : null;
              return (
              <div key={post.id} className="bg-[#f0f7f2] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                {realImage ? (
                  <Image src={realImage} alt={post.title} width={600} height={300} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 flex flex-col items-center justify-center gap-3" style={{ background: "linear-gradient(135deg, #0d3d22 0%, #1b6b3a 100%)" }}>
                    <BookOpen className="w-14 h-14 text-white opacity-80" />
                    <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Абырой School</span>
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(post.publishedAt).toLocaleDateString(locale === "kz" ? "kk-KZ" : "ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  <h3 className="font-bold text-[#1b6b3a] mb-2 line-clamp-2">{locale === "kz" && post.titleKz ? post.titleKz : post.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{locale === "kz" && post.contentKz ? post.contentKz : post.content}</p>
                  <Link href={`/${locale}/news`} className="inline-block mt-3 text-sm text-[#28a745] font-medium hover:underline">
                    {t("news.read_more")} →
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #1b6b3a 0%, #28a745 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{t("cta_banner.title")}</h2>
          <p className="text-green-100 text-lg mb-8">{t("cta_banner.subtitle")}</p>
          <Link
            href={`/${locale}/apply`}
            className="inline-block px-10 py-4 bg-white text-[#1b6b3a] font-bold text-lg rounded-2xl hover:bg-green-50 transition-all shadow-lg hover:shadow-xl"
          >
            {t("cta_banner.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
