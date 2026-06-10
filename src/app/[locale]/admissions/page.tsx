"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp, FileText, Clock, Calendar, CheckCircle } from "lucide-react";

const faqs = [
  { qKey: "faq1_q", aKey: "faq1_a" },
  { qKey: "faq2_q", aKey: "faq2_a" },
  { qKey: "faq3_q", aKey: "faq3_a" },
  { qKey: "faq4_q", aKey: "faq4_a" },
  { qKey: "faq5_q", aKey: "faq5_a" },
  { qKey: "faq6_q", aKey: "faq6_a" },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-[#f0f7f2] transition-colors"
      >
        <span className="font-medium text-gray-800 pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-[#1b6b3a] shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-6 py-4 bg-[#f0f7f2] text-gray-600 text-sm leading-relaxed border-t border-gray-200">
          {a}
        </div>
      )}
    </div>
  );
}

export default function AdmissionsPage() {
  const t = useTranslations("admissions_page");
  const { locale } = useParams() as { locale: string };

  const timelineItems = [
    { period: "Сентябрь — Октябрь", event: "Приём заявок на зачисление" },
    { period: "Ноябрь", event: "Проведение вступительного испытания" },
    { period: "Ноябрь", event: "Объявление результатов" },
    { period: "Декабрь — Январь", event: "Начало занятий" },
  ];

  const examContent = [
    "Базовые задания по математике (для естественно-математического направления)",
    "Казахский или русский язык (чтение и грамотность)",
    "История для гуманитарного направления",
    "Логическое мышление",
  ];

  const examFormat = [
    "Продолжительность: 1,5 часа",
    "Формат: тест + короткие задачи",
    "Что взять: удостоверение личности, ручку, простой карандаш",
    "Прийти за 10 минут до начала",
  ];

  const docs = [
    { icon: "📄", title: "Копия удостоверения личности", desc: "Ксерокопия удостоверения личности ученика" },
    { icon: "📋", title: "Табель успеваемости", desc: "Копия табеля оценок за последнюю четверть" },
    { icon: "📸", title: "Фотография 3×4", desc: "2 фотографии формата 3×4 на белом фоне" },
  ];

  return (
    <div>
      <section className="bg-[#f0f7f2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1b6b3a] mb-4">{t("title")}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Who can apply */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1b6b3a] mb-8">{t("who_title")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["9", "10", "11"].map((grade) => (
              <div key={grade} className="bg-[#f0f7f2] rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-[#1b6b3a] mb-2">{grade}</div>
                <div className="text-gray-600 font-medium">{grade} класс</div>
                <p className="text-sm text-gray-500 mt-2">{t("who_desc", { grade })}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam info */}
      <section className="py-16 bg-[#f0f7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1b6b3a] mb-8">{t("exam_title")}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-[#1b6b3a]" />
                <h3 className="font-bold text-[#1b6b3a] text-lg">{t("exam_content")}</h3>
              </div>
              <ul className="space-y-3 text-gray-600 text-sm">
                {examContent.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#28a745] mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#1b6b3a]" />
                <h3 className="font-bold text-[#1b6b3a] text-lg">{t("exam_format")}</h3>
              </div>
              <ul className="space-y-3 text-gray-600 text-sm">
                {examFormat.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#28a745] mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Required docs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1b6b3a] mb-8">{t("docs_title")}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {docs.map((doc) => (
              <div key={doc.title} className="bg-[#f0f7f2] rounded-2xl p-5 flex gap-4">
                <span className="text-3xl">{doc.icon}</span>
                <div>
                  <h3 className="font-semibold text-[#1b6b3a] mb-1">{doc.title}</h3>
                  <p className="text-sm text-gray-600">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tuition */}
      <section className="py-12 bg-[#f0f7f2]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1b6b3a] mb-4">{t("tuition_title")}</h2>
          <p className="text-gray-600 mb-6">{t("tuition_text")}</p>
          <Link href={`/${locale}/contact`} className="inline-block px-8 py-3 bg-[#1b6b3a] text-white font-semibold rounded-xl hover:bg-[#155730] transition-colors">
            {t("tuition_btn")}
          </Link>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1b6b3a] mb-8">
            <Calendar className="inline w-7 h-7 mr-2" />
            {t("timeline_title")}
          </h2>
          <div className="relative pl-8 border-l-2 border-[#28a745] space-y-8">
            {timelineItems.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-10 w-4 h-4 rounded-full bg-[#1b6b3a] border-2 border-white" />
                <div className="bg-[#f0f7f2] rounded-xl p-4">
                  <p className="text-sm font-bold text-[#1b6b3a]">{item.period}</p>
                  <p className="text-gray-700 mt-1">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#f0f7f2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1b6b3a] mb-8 text-center">{t("faq_title")}</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.qKey}
                q={t(faq.qKey as "faq1_q")}
                a={t(faq.aKey as "faq1_a")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1b6b3a] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{t("cta_title")}</h2>
        <p className="text-green-200 mb-8 text-lg">{t("cta_sub")}</p>
        <Link href={`/${locale}/apply`} className="inline-block px-10 py-4 bg-white text-[#1b6b3a] font-bold text-lg rounded-2xl hover:bg-green-50 transition-all">
          {t("cta_btn")}
        </Link>
      </section>
    </div>
  );
}
