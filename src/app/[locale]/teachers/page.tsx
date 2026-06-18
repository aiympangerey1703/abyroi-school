"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const TEACHERS = [
  { id: "1",  name: "Ержан Берікұлы",        subject: "Дүние жүзі тарихы",                      experience: 15, bio: "ҰБТ саласында 15 жыл тәжірибесі бар мұғалім. 1000+ оқушы дайындаған.",                                                                         photo: "/teachers/teacher1.jpg" },
  { id: "2",  name: "Эльвира Вахитовна",      subject: "Математика",                              experience: 10, bio: "ҰБТ саласында 10 жыл тәжірибесі бар математика мұғалімі. 1000+ оқушы.",                                                                     photo: "/teachers/teacher2.jpg" },
  { id: "3",  name: "Есболат Тілеккабылұлы", subject: "География",                               experience: 6,  bio: "ҰБТ саласында 6 жыл тәжірибесі бар география мұғалімі. 500+ оқушы.",                                                                         photo: "/teachers/teacher3.jpg" },
  { id: "4",  name: "Жанерке Ерболатқызы",   subject: "Биология",                                experience: 5,  bio: "ҰБТ саласында 5 жыл тәжірибесі бар биология мұғалімі. 400+ оқушы.",                                                                          photo: "/teachers/teacher4.jpg" },
  { id: "5",  name: "Айнагүл Мауленбайқызы", subject: "Оқу сауаттылығы",                        experience: 34, bio: "Жалпы педагогикалық тәжірибесі 34 жыл, ҰБТ саласында 5 жыл. Педагогика магистрі.",                                                            photo: "/teachers/teacher5.jpg" },
  { id: "6",  name: "Ақжүніс Сержанқызы",    subject: "Математика",                              experience: 5,  bio: "ҰБТ саласында 5 жыл тәжірибесі бар математика мұғалімі. 500+ оқушы.",                                                                         photo: "/teachers/teacher6.jpg" },
  { id: "7",  name: "Нұрболат Берікұлы",     subject: "Қазақстан тарихы",                       experience: 5,  bio: "ҰБТ саласында 5 жыл тәжірибесі бар тарих мұғалімі. 500+ оқушы.",                                                                             photo: "/teachers/teacher7.jpg" },
  { id: "8",  name: "Инабат Шынболатовна",   subject: "Биология",                                experience: 5,  bio: "ҰБТ саласында 5 жыл тәжірибесі бар биология мұғалімі. 400+ оқушы.",                                                                          photo: "/teachers/teacher8.jpg" },
  { id: "9",  name: "Асланбек Асқарұлы",     subject: "Математика",                              experience: 5,  bio: "ҰБТ саласында 5 жыл тәжірибесі бар математика мұғалімі. 500+ оқушы.",                                                                         photo: "/teachers/teacher9.jpg" },
  { id: "10", name: "Асель Болатқызы",        subject: "Қазақ тілі және әдебиеті",               experience: 4,  bio: "ҰБТ саласында 4 жыл тәжірибесі бар қазақ тілі мұғалімі. 300+ оқушы.",                                                                         photo: "/teachers/teacher10.jpg" },
  { id: "11", name: "Аяжан Талғатқызы",       subject: "Ағылшын тілі",                           experience: 3,  bio: "ҰБТ саласында 3 жыл тәжірибесі бар ағылшын тілі мұғалімі. 500+ оқушы. Педагогика ғылымдарының магистрі.",                                       photo: "/teachers/teacher11.jpg" },
  { id: "12", name: "Гүлзат Талапқызы",       subject: "Математика және математикалық сауаттылық", experience: 6, bio: "ҰБТ саласында 6 жыл тәжірибесі бар математика мұғалімі. 700+ оқушы. Физ-мат, инфо-мат сыныптары 100% грант.",                                 photo: "/teachers/teacher12.jpg" },
  { id: "13", name: "Айжан Ергенқызы",        subject: "Ағылшын тілі",                           experience: 3,  bio: "ҰБТ саласында 3 жыл. Оңтүстік Корея, Донгук университеті түлегі. Педагогика магистрі.",                                                         photo: "/teachers/teacher13.jpg" },
  { id: "14", name: "Мадина Наурызғалиқызы",  subject: "Химия",                                  experience: 4,  bio: "ҰБТ саласында 4 жыл тәжірибесі бар химия мұғалімі. 500+ оқушы. Педагог-модератор, педагогика ғылымдарының магистрі.",                          photo: "/teachers/teacher14.jpg" },
  { id: "15", name: "Әлібек Сансызбайұлы",    subject: "Қазақстан тарихы",                       experience: 2,  bio: "ҰБТ саласында 2 жыл тәжірибесі бар тарих мұғалімі. 200+ оқушы. Педагог-модератор.",                                                            photo: "/teachers/teacher15.jpg" },
];

export default function TeachersPage() {
  const t = useTranslations("teachers_page");
  const [filter, setFilter] = useState(t("filter_all"));

  const all = t("filter_all");
  const subjects = [all, ...Array.from(new Set(TEACHERS.map((t) => t.subject)))];
  const filtered = filter === all ? TEACHERS : TEACHERS.filter((t) => t.subject === filter);

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
            {filtered.map((teacher) => (
              <div key={teacher.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={teacher.photo}
                  alt={teacher.name}
                  width={400}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-[#1b6b3a] text-lg mb-1">{teacher.name}</h3>
                  <p className="text-[#28a745] text-sm font-medium mb-2">{teacher.subject}</p>
                  <p className="text-xs text-gray-400 mb-3">{teacher.experience} {t("years")}</p>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{teacher.bio || ""}</p>
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
