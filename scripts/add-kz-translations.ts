import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Update UNT Combos with KZ translations
  const comboTranslations: Record<string, {
    nameKz: string;
    subjectsKz: string;
    professionsKz: string;
    descriptionKz: string;
    difficultyKz: string;
  }> = {
    "Математика + Физика": {
      nameKz: "Математика + Физика",
      subjectsKz: "Математика, Физика",
      professionsKz: "Инженерия, IT, Архитектура, Құрылыс",
      descriptionKz: "Ең сұранысқа ие комбинациялардың бірі. Техникалық университеттерге, IT, инженерия және архитектура мамандықтарына жол ашады.",
      difficultyKz: "Күрделі",
    },
    "Биология + Химия": {
      nameKz: "Биология + Химия",
      subjectsKz: "Биология, Химия",
      professionsKz: "Медицина, Фармацевтика, Ветеринария, Биотехнологиялар",
      descriptionKz: "Медицина жоғары оқу орындарына түсу үшін қажет. Дайындық органикалық химия мен адам биологиясын тереңдетіп оқуды қамтиды.",
      difficultyKz: "Күрделі",
    },
    "История + География": {
      nameKz: "Тарих + География",
      subjectsKz: "Қазақстан тарихы, Дүние жүзі тарихы, География",
      professionsKz: "Құқық, Халықаралық қатынастар, Педагогика, Мемлекеттік қызмет",
      descriptionKz: "Заң және педагогика мамандықтарына түсуге арналған гуманитарлық комбинация. Аналитикалық ойлауды және мәтінмен жұмыс істеу дағдыларын дамытады.",
      difficultyKz: "Орташа",
    },
    "Казахский язык + География": {
      nameKz: "Қазақ тілі + География",
      subjectsKz: "Қазақ тілі, Қазақ әдебиеті, География",
      professionsKz: "Мемлекеттік қызмет, Педагогика, Журналистика",
      descriptionKz: "Мемлекеттік қызмет және педагогика қазақтілді мамандықтарына түсуге арналған комбинация. Орысша оқитын оқушыларға да қолжетімді.",
      difficultyKz: "Оңай",
    },
    "Математика + Информатика": {
      nameKz: "Математика + Информатика",
      subjectsKz: "Математика, Информатика",
      professionsKz: "IT, Data Science, Бағдарламалау, Киберқауіпсіздік",
      descriptionKz: "Болашақ IT-маманға арналған ең перспективті комбинация. Ведущие техникалық университеттердің деректерді талдау және әзірлеу мамандықтарына түсуге мүмкіндік береді.",
      difficultyKz: "Орташа",
    },
  };

  const combos = await prisma.uNTCombo.findMany();
  for (const combo of combos) {
    const kz = comboTranslations[combo.name];
    if (kz) {
      await prisma.uNTCombo.update({ where: { id: combo.id }, data: kz });
      console.log(`Updated combo: ${combo.name}`);
    }
  }

  // Update News Posts with KZ translations
  const newsTranslations: Record<string, { titleKz: string; contentKz: string }> = {
    "Открыт набор на 2024-2025 учебный год": {
      titleKz: "2024-2025 оқу жылына қабылдау ашылды",
      contentKz: "Абырой мектебі жаңа оқу жылына қабылдауды бастағанын хабарлайды. ҰБТ-ға дайындықтың барлық 5 бағыты бойынша жазылу жүргізілуде. Орын саны шектеулі. Өтінімді қазір беріңіз және оқудың бірінші айына жеңілдік алыңыз!",
    },
    "Наши ученики показали отличные результаты на ЕНТ": {
      titleKz: "Оқушыларымыз ҰБТ-да тамаша нәтиже көрсетті",
      contentKz: "Биыл түлектерімізің 92%-ы ҰБТ-ны сәтті тапсырып, арман университеттеріне түсті. Орташа балл 140-тан 118 болды. Назарбаев Университетіне 137 балл жинаған Айдан Сейткалиге ерекше құттықтау!",
    },
    "Бесплатный пробный урок для новых учеников": {
      titleKz: "Жаңа оқушыларға тегін сынақ сабақ",
      contentKz: "Жаңа қабылдауды ашу аясында Абырой мектебі математика, физика және биологиядан тегін сынақ сабақтар өткізеді. Бүгін жазылып, оқытуымыздың сапасына өзіңіз көз жеткізіңіз! Орын саны шектеулі.",
    },
    "Новый преподаватель по информатике присоединился к команде": {
      titleKz: "Информатика мұғалімі командаға қосылды",
      contentKz: "Жаңа информатика мұғалімімізді таныстырамыз — Данияр Қасымов. IT және педагогикада 7 жылдық тәжірибесі бар практикалық әзірлеуші. Данияр екі тілде де ҰБТ-ға информатика дайындық сабақтарын жүргізеді.",
    },
  };

  const posts = await prisma.newsPost.findMany();
  for (const post of posts) {
    const kz = newsTranslations[post.title];
    if (kz) {
      await prisma.newsPost.update({ where: { id: post.id }, data: kz });
      console.log(`Updated news: ${post.title}`);
    }
  }

  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
