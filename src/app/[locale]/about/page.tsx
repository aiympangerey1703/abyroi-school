import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Award, Users, Shield, Target, MapPin } from "lucide-react";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "values" });

  const values = [
    { icon: Award, title: t("academic"), desc: t("academic_desc") },
    { icon: Users, title: t("individual"), desc: t("individual_desc") },
    { icon: Shield, title: t("safe"), desc: t("safe_desc") },
    { icon: Target, title: t("result"), desc: t("result_desc") },
  ];

  const photos = [31, 32, 33, 34, 35, 36];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#f0f7f2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1b6b3a] mb-6">О школе Абырой</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Частная подготовительная школа к ЕНТ в Уральске, Казахстан
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1b6b3a] mb-6">Наша миссия</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Миссия Абырой — обеспечить каждому ученику качественную подготовку к Единому национальному тестированию. Мы верим, что при правильном наставничестве, системном подходе и индивидуальной работе каждый способен достичь своего максимального результата.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Мы создаём среду, где учёба становится интересной, а высокий балл на ЕНТ — достижимой целью, а не мечтой.
            </p>
            <h2 className="text-2xl font-bold text-[#1b6b3a] mt-8 mb-4">Наше видение</h2>
            <p className="text-gray-600 leading-relaxed">
              Стать ведущим образовательным центром подготовки к ЕНТ в Западном Казахстане, откуда выходят студенты топовых университетов страны.
            </p>
          </div>
          <div className="relative">
            <Image
              src="https://picsum.photos/seed/about1/600/400"
              alt="Абырой школа"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#1b6b3a] text-white p-4 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold">5+</div>
              <div className="text-green-200 text-sm">лет работы</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-[#f0f7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1b6b3a] mb-8">История Абырой</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Школа Абырой была основана в Уральске группой опытных педагогов с единой целью: дать детям Западного Казахстана доступ к качественной подготовке к ЕНТ на уровне ведущих образовательных центров страны.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Название «Абырой» — казахское слово, означающее «честь» и «достоинство». Это не просто название — это принцип, которым мы руководствуемся в работе с каждым учеником.
              </p>
              <p className="text-gray-600 leading-relaxed">
                За годы работы мы помогли более 200 выпускникам поступить в лучшие университеты Казахстана: НУ, КазГЮУ, КБТУ, МУА и другие.
              </p>
            </div>
            <Image
              src="https://picsum.photos/seed/about2/600/400"
              alt="История школы"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Values */}
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

      {/* Gallery */}
      <section className="py-16 bg-[#f0f7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1b6b3a] mb-8">Наша школа</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((seed) => (
              <Image
                key={seed}
                src={`https://picsum.photos/seed/${seed}/600/400`}
                alt="Школа Абырой"
                width={600}
                height={400}
                className="rounded-2xl object-cover w-full h-48 md:h-64"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-[#1b6b3a] mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-[#1b6b3a] text-xl mb-2">Местоположение</h3>
              <p className="text-gray-600">г. Уральск, Казахстан</p>
              <p className="text-gray-500 text-sm mt-1">Свяжитесь с нами для уточнения точного адреса</p>
              <Link href={`/${locale}/contact`} className="inline-block mt-3 text-[#28a745] font-medium hover:underline">
                Контакты →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
