"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProgramsPage() {
  const t = useTranslations("programs_page");

  const programs = [
    {
      id: 1,
      nameKey: "prog1_name" as const,
      descKey: "prog1_desc" as const,
      subjectsKey: "prog1_subjects" as const,
      badgeKey: "badge_kz" as const,
      langLabelKey: "lang_kz" as const,
      grade: "10–11",
      hours: "35",
      color: "bg-blue-50 border-blue-200",
      badge: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      nameKey: "prog2_name" as const,
      descKey: "prog2_desc" as const,
      subjectsKey: "prog2_subjects" as const,
      badgeKey: "badge_kz" as const,
      langLabelKey: "lang_kz" as const,
      grade: "10–11",
      hours: "35",
      color: "bg-purple-50 border-purple-200",
      badge: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      nameKey: "prog3_name" as const,
      descKey: "prog3_desc" as const,
      subjectsKey: "prog3_subjects" as const,
      badgeKey: "badge_ru" as const,
      langLabelKey: "lang_ru" as const,
      grade: "10–11",
      hours: "35",
      color: "bg-green-50 border-green-200",
      badge: "bg-green-100 text-green-700",
    },
    {
      id: 4,
      nameKey: "prog4_name" as const,
      descKey: "prog4_desc" as const,
      subjectsKey: "prog4_subjects" as const,
      badgeKey: "badge_ru" as const,
      langLabelKey: "lang_ru" as const,
      grade: "10–11",
      hours: "35",
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

type ProgramDef = {
  id: number;
  nameKey: "prog1_name" | "prog2_name" | "prog3_name" | "prog4_name";
  descKey: "prog1_desc" | "prog2_desc" | "prog3_desc" | "prog4_desc";
  subjectsKey: "prog1_subjects" | "prog2_subjects" | "prog3_subjects" | "prog4_subjects";
  badgeKey: "badge_kz" | "badge_ru";
  langLabelKey: "lang_kz" | "lang_ru";
  grade: string;
  hours: string;
  color: string;
  badge: string;
};

function ProgramCard({
  program,
  t,
}: {
  program: ProgramDef;
  t: ReturnType<typeof useTranslations<"programs_page">>;
}) {
  const [expanded, setExpanded] = useState(false);
  const subjects = t(program.subjectsKey).split(",").map((s) => s.trim());

  return (
    <div className={`rounded-2xl border-2 p-6 ${program.color}`}>
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${program.badge}`}>
          {t(program.badgeKey)} · {t(program.langLabelKey)}
        </span>
        <h3 className="text-xl font-bold text-[#1b6b3a]">{t(program.nameKey)}</h3>
      </div>
      <div className="flex gap-4 mb-4 text-sm text-gray-500">
        <span>📚 {program.grade} {t("grade")}</span>
        <span>⏱ {program.hours} {t("hours")}</span>
      </div>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{t(program.descKey)}</p>
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
            {subjects.map((s) => (
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
