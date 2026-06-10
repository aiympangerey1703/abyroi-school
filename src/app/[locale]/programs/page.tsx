"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProgramsPage() {
  const t = useTranslations("programs_page");

  const programs = [
    {
      id: 1,
      name: "Естественно-математическое",
      langKey: "kz",
      badgeKey: "badge_kz",
      langLabelKey: "lang_kz",
      grade: "10–11",
      hours: "35",
      subjects: [t("badge_kz") === "KZ" ? "Math" : "Математика", "Физика", "Химия", "Биология", "Информатика"],
      subjectsKz: ["Математика", "Физика", "Химия", "Биология", "Информатика"],
      desc: "Углублённая подготовка по естественным наукам и математике на казахском языке. Идеально для будущих инженеров, врачей и IT-специалистов.",
      color: "bg-blue-50 border-blue-200",
      badge: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      name: "Общественно-гуманитарное",
      langKey: "kz",
      badgeKey: "badge_kz",
      langLabelKey: "lang_kz",
      grade: "10–11",
      hours: "35",
      subjectsKz: ["Казахский язык", "История Казахстана", "Всемирная история", "География"],
      desc: "Подготовка по общественным наукам и гуманитарным дисциплинам на казахском языке. Для будущих юристов, историков и педагогов.",
      color: "bg-purple-50 border-purple-200",
      badge: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      name: "Естественно-математическое",
      langKey: "ru",
      badgeKey: "badge_ru",
      langLabelKey: "lang_ru",
      grade: "10–11",
      hours: "35",
      subjectsKz: ["Математика", "Физика", "Химия", "Биология"],
      desc: "Углублённая подготовка по естественным наукам и математике на русском языке. Системный подход к решению задач ЕНТ.",
      color: "bg-green-50 border-green-200",
      badge: "bg-green-100 text-green-700",
    },
    {
      id: 4,
      name: "Общественно-гуманитарное",
      langKey: "ru",
      badgeKey: "badge_ru",
      langLabelKey: "lang_ru",
      grade: "10–11",
      hours: "35",
      subjectsKz: ["Русский язык", "История", "Всемирная история", "Иностранный язык"],
      desc: "Подготовка по гуманитарным наукам на русском языке. Развитие аналитического мышления и навыков работы с текстом.",
      color: "bg-orange-50 border-orange-200",
      badge: "bg-orange-100 text-orange-700",
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} t={t} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#f0f7f2]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1b6b3a] mb-8">{t("common_title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: t("small_groups"), value: t("small_groups_val") },
              { label: t("mock_tests"), value: t("mock_tests_val") },
              { label: t("error_review"), value: t("error_review_val") },
              { label: t("support"), value: t("support_val") },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-xl font-bold text-[#1b6b3a]">{item.value}</div>
                <div className="text-sm text-gray-500 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgramCard({
  program,
  t,
}: {
  program: { id: number; name: string; badgeKey: string; langLabelKey: string; grade: string; hours: string; subjectsKz: string[]; desc: string; color: string; badge: string };
  t: ReturnType<typeof useTranslations<"programs_page">>;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`rounded-2xl border-2 p-6 ${program.color}`}>
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${program.badge}`}>
          {t(program.badgeKey as "badge_kz")} · {t(program.langLabelKey as "lang_kz")}
        </span>
        <h3 className="text-xl font-bold text-[#1b6b3a]">{program.name}</h3>
      </div>
      <div className="flex gap-4 mb-4 text-sm text-gray-500">
        <span>📚 {program.grade} {t("grade")}</span>
        <span>⏱ {program.hours} {t("hours")}</span>
      </div>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{program.desc}</p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-[#1b6b3a] font-medium text-sm hover:underline"
      >
        {expanded ? t("hide") : t("detail")}
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-[#1b6b3a] mb-3">{t("subjects_label")}</h4>
          <ul className="space-y-2">
            {program.subjectsKz.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-2 h-2 bg-[#28a745] rounded-full shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
