"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Teacher = {
  id: string;
  name: string;
  subject: string;
  experience: number;
  bio: string;
  photoUrl: string | null;
};

export default function TeachersPage() {
  const t = useTranslations("teachers_page");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filter, setFilter] = useState(t("filter_all"));

  useEffect(() => {
    fetch("/api/teachers").then((r) => r.json()).then(setTeachers);
  }, []);

  const all = t("filter_all");
  const subjects = [all, ...Array.from(new Set(teachers.map((t) => t.subject)))];
  const filtered = filter === all ? teachers : teachers.filter((t) => t.subject === filter);

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
          <div className="flex flex-wrap gap-2 mb-10">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filter === s
                    ? "bg-[#1b6b3a] text-white"
                    : "bg-[#f0f7f2] text-[#1b6b3a] hover:bg-green-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((teacher, idx) => (
              <div key={teacher.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={teacher.photoUrl || `https://picsum.photos/seed/${idx + 40}/400/400`}
                  alt={teacher.name}
                  width={400}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-[#1b6b3a] text-lg mb-1">{teacher.name}</h3>
                  <p className="text-[#28a745] text-sm font-medium mb-2">{teacher.subject}</p>
                  <p className="text-xs text-gray-400 mb-3">{teacher.experience} {t("years")}</p>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{teacher.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">{t("empty")}</div>
          )}
        </div>
      </section>
    </div>
  );
}
