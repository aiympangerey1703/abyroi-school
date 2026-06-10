import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.application.deleteMany();
  await prisma.user.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.uNTCombo.deleteMany();
  await prisma.newsPost.deleteMany();
  await prisma.contactMessage.deleteMany();

  // Admin
  const adminHash = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      name: "Администратор",
      email: "admin@abyroi.kz",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin created: admin@abyroi.kz / admin123");

  // UNT Combos
  const combos = await Promise.all([
    prisma.uNTCombo.create({
      data: {
        name: "Математика + Физика",
        subjects: "Математика, Физика",
        professions: "Инженерия, IT, Архитектура, Строительство",
        description: "Одна из самых востребованных комбинаций. Открывает двери в технические университеты и позволяет поступить на специальности IT, инженерия и архитектура.",
        difficulty: "Сложно",
        spotsTotal: 20,
        spotsFilled: 12,
      },
    }),
    prisma.uNTCombo.create({
      data: {
        name: "Биология + Химия",
        subjects: "Биология, Химия",
        professions: "Медицина, Фармацевтика, Ветеринария, Биотехнологии",
        description: "Необходима для поступления в медицинские вузы. Подготовка включает углублённое изучение органической химии и биологии человека.",
        difficulty: "Сложно",
        spotsTotal: 20,
        spotsFilled: 15,
      },
    }),
    prisma.uNTCombo.create({
      data: {
        name: "История + География",
        subjects: "История Казахстана, Всемирная история, География",
        professions: "Право, Международные отношения, Педагогика, Государственная служба",
        description: "Гуманитарная комбинация для поступления на юридические и педагогические специальности. Развивает аналитическое мышление и навыки работы с текстом.",
        difficulty: "Средне",
        spotsTotal: 15,
        spotsFilled: 7,
      },
    }),
    prisma.uNTCombo.create({
      data: {
        name: "Казахский язык + География",
        subjects: "Казахский язык, Казахская литература, География",
        professions: "Государственная служба, Педагогика, Журналистика",
        description: "Комбинация для поступления на казахоязычные специальности государственной службы и педагогики. Доступна и для русскоязычных учеников.",
        difficulty: "Легко",
        spotsTotal: 15,
        spotsFilled: 5,
      },
    }),
    prisma.uNTCombo.create({
      data: {
        name: "Математика + Информатика",
        subjects: "Математика, Информатика",
        professions: "IT, Data Science, Программирование, Кибербезопасность",
        description: "Самая перспективная комбинация для будущего IT-специалиста. Позволяет поступить в ведущие технические университеты на специальности разработки и анализа данных.",
        difficulty: "Средне",
        spotsTotal: 20,
        spotsFilled: 14,
      },
    }),
  ]);
  console.log("✅ 5 UNT combos created");

  // Teachers
  const teachers = [
    {
      name: "Айгерим Бекова",
      subject: "Математика",
      experience: 12,
      bio: "Кандидат физико-математических наук. Специализируется на подготовке к ЕНТ по математике. Её ученики стабильно набирают 90+ баллов.",
      photoUrl: `https://picsum.photos/seed/t1/400/400`,
    },
    {
      name: "Нурлан Сейткалиев",
      subject: "Физика",
      experience: 10,
      bio: "Победитель республиканского конкурса учителей физики. Умеет объяснить сложные концепции простым языком. Подготовил более 50 призёров олимпиад.",
      photoUrl: `https://picsum.photos/seed/t2/400/400`,
    },
    {
      name: "Зарина Мухамедова",
      subject: "Биология",
      experience: 8,
      bio: "Магистр биологических наук. Специализируется на подготовке к поступлению в медицинские университеты. Авторская методика подготовки к ЕНТ.",
      photoUrl: `https://picsum.photos/seed/t3/400/400`,
    },
    {
      name: "Серик Джаксыбеков",
      subject: "Химия",
      experience: 15,
      bio: "Заслуженный учитель Казахстана. Более 15 лет преподаёт химию. Его ученики побеждают на олимпиадах и поступают в медицинские вузы.",
      photoUrl: `https://picsum.photos/seed/t4/400/400`,
    },
    {
      name: "Гульнара Асылова",
      subject: "История",
      experience: 9,
      bio: "Историк с глубоким знанием истории Казахстана и всемирной истории. Разработала уникальные шпаргалки и карты памяти для быстрого запоминания дат и событий.",
      photoUrl: `https://picsum.photos/seed/t5/400/400`,
    },
    {
      name: "Данияр Касымов",
      subject: "Информатика",
      experience: 7,
      bio: "Практикующий программист и педагог. Преподаёт информатику на казахском и русском языках. Специализируется на алгоритмике и подготовке к ЕНТ по информатике.",
      photoUrl: `https://picsum.photos/seed/t6/400/400`,
    },
    {
      name: "Асель Нурмаганбетова",
      subject: "Казахский язык",
      experience: 11,
      bio: "Филолог-казаховед. Помогает ученикам как казахоязычных, так и русскоязычных школ освоить казахский язык на высоком уровне для сдачи ЕНТ.",
      photoUrl: `https://picsum.photos/seed/t7/400/400`,
    },
    {
      name: "Болат Сарсенов",
      subject: "География",
      experience: 6,
      bio: "Молодой и энергичный педагог. Использует современные технологии в обучении: интерактивные карты, видеоуроки и практические задания.",
      photoUrl: `https://picsum.photos/seed/t8/400/400`,
    },
  ];

  for (const teacher of teachers) {
    await prisma.teacher.create({ data: teacher });
  }
  console.log("✅ 8 teachers created");

  // News
  const newsPosts = [
    {
      title: "Открыт набор на 2024-2025 учебный год",
      content: "Школа Абырой рада объявить об открытии набора на новый учебный год. Запись ведётся по всем 5 направлениям подготовки к ЕНТ. Количество мест ограничено. Подайте заявку прямо сейчас и получите скидку на первый месяц обучения!",
      imageUrl: "https://picsum.photos/seed/n1/600/400",
      publishedAt: new Date("2024-09-01"),
    },
    {
      title: "Наши ученики показали отличные результаты на ЕНТ",
      content: "В этом году 92% наших выпускников успешно сдали ЕНТ и поступили в вузы мечты. Средний балл составил 118 из 140. Особые поздравления Айдану Сейткали, набравшему 137 баллов и поступившему в Назарбаев Университет!",
      imageUrl: "https://picsum.photos/seed/n2/600/400",
      publishedAt: new Date("2024-08-15"),
    },
    {
      title: "Бесплатный пробный урок для новых учеников",
      content: "В рамках открытия нового набора школа Абырой проводит бесплатные пробные уроки по математике, физике и биологии. Запишитесь сегодня и убедитесь в качестве нашего обучения лично! Количество мест ограничено.",
      imageUrl: "https://picsum.photos/seed/n3/600/400",
      publishedAt: new Date("2024-10-10"),
    },
    {
      title: "Новый преподаватель по информатике присоединился к команде",
      content: "Рады представить нашего нового учителя по информатике — Данияра Касымова. Практикующий разработчик с 7-летним опытом в IT и педагогике. Данияр будет вести занятия по подготовке к ЕНТ по информатике на обоих языках.",
      imageUrl: "https://picsum.photos/seed/n4/600/400",
      publishedAt: new Date("2024-11-01"),
    },
  ];

  for (const post of newsPosts) {
    await prisma.newsPost.create({ data: post });
  }
  console.log("✅ 4 news posts created");

  // Sample applicants
  const pass1 = await bcrypt.hash("student123", 12);
  await prisma.user.create({
    data: {
      name: "Айдана Жаксыбекова",
      email: "aidana@test.kz",
      phone: "+77012345678",
      passwordHash: pass1,
      role: "APPLICANT",
      application: {
        create: {
          applicantType: "student",
          studentGrade: "11",
          comboId: combos[0].id,
          language: "kz",
          hearAboutUs: "instagram",
          agreedToExam: true,
          status: "PENDING",
        },
      },
    },
  });

  const pass2 = await bcrypt.hash("parent123", 12);
  await prisma.user.create({
    data: {
      name: "Болат Сейтов",
      email: "bolat@test.kz",
      phone: "+77098765432",
      passwordHash: pass2,
      role: "APPLICANT",
      application: {
        create: {
          applicantType: "parent",
          childName: "Сейтов Арман",
          childGrade: "10",
          comboId: combos[4].id,
          language: "ru",
          hearAboutUs: "friends",
          agreedToExam: true,
          status: "EXAM_SCHEDULED",
          examDate: new Date("2024-12-15T10:00:00"),
        },
      },
    },
  });

  console.log("✅ 2 sample applicants created");
  console.log("✅ aidana@test.kz / student123 (PENDING)");
  console.log("✅ bolat@test.kz / parent123 (EXAM_SCHEDULED - Dec 15, 2024 at 10:00)");
  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
