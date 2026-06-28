"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const TEACHERS = [
  { id: "1",  nameKz: "Ержан Берікұлы",        nameRu: "Ержан Берікұлы",        subjectKz: "Дүние жүзі тарихы",                       subjectRu: "Всемирная история",                               experience: 15, bioKz: "ҰБТ саласында 15 жыл тәжірибесі бар мұғалім. 1000+ оқушы дайындаған.",                                                                          bioRu: "Преподаватель с 15-летним опытом подготовки к ЕНТ. Подготовил 1000+ учеников.",                                                               photo: "/teachers/teacher1.jpg" },
  { id: "2",  nameKz: "Эльвира Вахитовна",      nameRu: "Эльвира Вахитовна",      subjectKz: "Математика",                               subjectRu: "Математика",                                      experience: 10, bioKz: "ҰБТ саласында 10 жыл тәжірибесі бар математика мұғалімі. 1000+ оқушы.",                                                                      bioRu: "Преподаватель математики с 10-летним опытом подготовки к ЕНТ. 1000+ учеников.",                                                               photo: "/teachers/teacher2.jpg" },
  { id: "3",  nameKz: "Есболат Тілеккабылұлы", nameRu: "Есболат Тілеккабылұлы", subjectKz: "География",                                subjectRu: "География",                                       experience: 6,  bioKz: "ҰБТ саласында 6 жыл тәжірибесі бар география мұғалімі. 500+ оқушы.",                                                                          bioRu: "Преподаватель географии с 6-летним опытом. 500+ учеников.",                                                                                   photo: "/teachers/teacher3.jpg" },
  { id: "4",  nameKz: "Жанерке Ерболатқызы",   nameRu: "Жанерке Ерболатқызы",   subjectKz: "Биология",                                 subjectRu: "Биология",                                        experience: 5,  bioKz: "ҰБТ саласында 5 жыл тәжірибесі бар биология мұғалімі. 400+ оқушы.",                                                                           bioRu: "Преподаватель биологии с 5-летним опытом. 400+ учеников.",                                                                                    photo: "/teachers/teacher4.jpg" },
  { id: "5",  nameKz: "Айнагүл Мауленбайқызы", nameRu: "Айнагүл Мауленбайқызы", subjectKz: "Оқу сауаттылығы",                         subjectRu: "Грамотность чтения",                              experience: 34, bioKz: "Жалпы педагогикалық тәжірибесі 34 жыл, ҰБТ саласында 5 жыл. Педагогика магистрі.",                                                             bioRu: "Общий педагогический стаж 34 года, 5 лет подготовки к ЕНТ. Магистр педагогики.",                                                             photo: "/teachers/teacher5.jpg" },
  { id: "6",  nameKz: "Ақжүніс Сержанқызы",    nameRu: "Ақжүніс Сержанқызы",    subjectKz: "Математика",                               subjectRu: "Математика",                                      experience: 5,  bioKz: "ҰБТ саласында 5 жыл тәжірибесі бар математика мұғалімі. 500+ оқушы.",                                                                          bioRu: "Преподаватель математики с 5-летним опытом. 500+ учеников.",                                                                                  photo: "/teachers/teacher6.jpg" },
  { id: "7",  nameKz: "Нұрболат Берікұлы",     nameRu: "Нұрболат Берікұлы",     subjectKz: "Қазақстан тарихы",                        subjectRu: "История Казахстана",                              experience: 5,  bioKz: "ҰБТ саласында 5 жыл тәжірибесі бар тарих мұғалімі. 500+ оқушы.",                                                                              bioRu: "Преподаватель истории с 5-летним опытом. 500+ учеников.",                                                                                     photo: "/teachers/teacher7.jpg" },
  { id: "8",  nameKz: "Инабат Шынболатовна",   nameRu: "Инабат Шынболатовна",   subjectKz: "Биология",                                 subjectRu: "Биология",                                        experience: 5,  bioKz: "ҰБТ саласында 5 жыл тәжірибесі бар биология мұғалімі. 400+ оқушы.",                                                                           bioRu: "Преподаватель биологии с 5-летним опытом. 400+ учеников.",                                                                                    photo: "/teachers/teacher8.jpg" },
  { id: "9",  nameKz: "Асланбек Асқарұлы",     nameRu: "Асланбек Асқарұлы",     subjectKz: "Математика",                               subjectRu: "Математика",                                      experience: 5,  bioKz: "ҰБТ саласында 5 жыл тәжірибесі бар математика мұғалімі. 500+ оқушы.",                                                                          bioRu: "Преподаватель математики с 5-летним опытом. 500+ учеников.",                                                                                  photo: "/teachers/teacher9.jpg" },
  { id: "10", nameKz: "Асель Болатқызы",        nameRu: "Асель Болатқызы",        subjectKz: "Қазақ тілі және әдебиеті",                subjectRu: "Казахский язык и литература",                     experience: 4,  bioKz: "ҰБТ саласында 4 жыл тәжірибесі бар қазақ тілі мұғалімі. 300+ оқушы.",                                                                          bioRu: "Преподаватель казахского языка с 4-летним опытом. 300+ учеников.",                                                                            photo: "/teachers/teacher10.jpg" },
  { id: "11", nameKz: "Аяжан Талғатқызы",       nameRu: "Аяжан Талғатқызы",       subjectKz: "Ағылшын тілі",                            subjectRu: "Английский язык",                                 experience: 3,  bioKz: "ҰБТ саласында 3 жыл тәжірибесі бар ағылшын тілі мұғалімі. 500+ оқушы. Педагогика ғылымдарының магистрі.",                                        bioRu: "Преподаватель английского языка с 3-летним опытом. 500+ учеников. Магистр педагогических наук.",                                              photo: "/teachers/teacher11.jpg" },
  { id: "12", nameKz: "Гүлзат Талапқызы",       nameRu: "Гүлзат Талапқызы",       subjectKz: "Математика және математикалық сауаттылық", subjectRu: "Математика и математическая грамотность",        experience: 6,  bioKz: "ҰБТ саласында 6 жыл тәжірибесі бар математика мұғалімі. 700+ оқушы. Физ-мат, инфо-мат сыныптары 100% грант.",                                    bioRu: "Преподаватель математики с 6-летним опытом. 700+ учеников. Физ-мат и инфо-мат классы — 100% грант.",                                         photo: "/teachers/teacher12.jpg" },
  { id: "13", nameKz: "Айжан Ергенқызы",        nameRu: "Айжан Ергенқызы",        subjectKz: "Ағылшын тілі",                            subjectRu: "Английский язык",                                 experience: 3,  bioKz: "ҰБТ саласында 3 жыл. Оңтүстік Корея, Донгук университеті түлегі. Педагогика магистрі.",                                                            bioRu: "3 года подготовки к ЕНТ. Выпускница университета Донгук, Южная Корея. Магистр педагогики.",                                                   photo: "/teachers/teacher13.jpg" },
  { id: "14", nameKz: "Мадина Наурызғалиқызы",  nameRu: "Мадина Наурызғалиқызы",  subjectKz: "Химия",                                   subjectRu: "Химия",                                           experience: 4,  bioKz: "ҰБТ саласында 4 жыл тәжірибесі бар химия мұғалімі. 500+ оқушы. Педагог-модератор, педагогика ғылымдарының магистрі.",                           bioRu: "Преподаватель химии с 4-летним опытом. 500+ учеников. Педагог-модератор, магистр педагогических наук.",                                       photo: "/teachers/teacher14.jpg" },
  { id: "15", nameKz: "Әлібек Сансызбайұлы",    nameRu: "Әлібек Сансызбайұлы",    subjectKz: "Қазақстан тарихы",                        subjectRu: "История Казахстана",                              experience: 2,  bioKz: "ҰБТ саласында 2 жыл тәжірибесі бар тарих мұғалімі. 200+ оқушы. Педагог-модератор.",                                                               bioRu: "Преподаватель истории с 2-летним опытом. 200+ учеников. Педагог-модератор.",                                                                  photo: "/teachers/teacher15.jpg" },
];

export default function TeachersPage() {
  const t = useTranslations("teachers_page");
  const locale = useLocale();
  const isKz = locale === "kz";

  const all = t("filter_all");
  const [filter, setFilter] = useState(all);

  const subjects = [all, ...Array.from(new Set(TEACHERS.map((t) => isKz ? t.subjectKz : t.subjectRu)))];
  const filtered = filter === all
    ? TEACHERS
    : TEACHERS.filter((t) => (isKz ? t.subjectKz : t.subjectRu) === filter);

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
                  alt={isKz ? teacher.nameKz : teacher.nameRu}
                  width={400}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-[#1b6b3a] text-lg mb-1">{isKz ? teacher.nameKz : teacher.nameRu}</h3>
                  <p className="text-[#28a745] text-sm font-medium mb-2">{isKz ? teacher.subjectKz : teacher.subjectRu}</p>
                  <p className="text-xs text-gray-400 mb-3">{teacher.experience} {t("years")}</p>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{isKz ? teacher.bioKz : teacher.bioRu}</p>
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
