import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const teachers = [
  {
    name: "Ержан Берікұлы",
    subject: "Дүние жүзі тарихы",
    experience: 15,
    bio: "ҰБТ саласында 15 жыл тәжірибесі бар мұғалім. 1000+ оқушы дайындаған.",
    photoUrl: "/teachers/teacher1.jpg",
  },
  {
    name: "Эльвира Вахитовна",
    subject: "Математика",
    experience: 10,
    bio: "ҰБТ саласында 10 жыл тәжірибесі бар математика мұғалімі. 1000+ оқушы.",
    photoUrl: "/teachers/teacher2.jpg",
  },
  {
    name: "Есболат Тілеккабылұлы",
    subject: "География",
    experience: 6,
    bio: "ҰБТ саласында 6 жыл тәжірибесі бар география мұғалімі. 500+ оқушы.",
    photoUrl: "/teachers/teacher3.jpg",
  },
  {
    name: "Жанерке Ерболатқызы",
    subject: "Биология",
    experience: 5,
    bio: "ҰБТ саласында 5 жыл тәжірибесі бар биология мұғалімі. 400+ оқушы.",
    photoUrl: "/teachers/teacher4.jpg",
  },
  {
    name: "Айнагүл Мауленбайқызы",
    subject: "Оқу сауаттылығы",
    experience: 34,
    bio: "Жалпы педагогикалық тәжірибесі 34 жыл, ҰБТ саласында 5 жыл. Педагогика магистрі.",
    photoUrl: "/teachers/teacher5.jpg",
  },
  {
    name: "Ақжүніс Сержанқызы",
    subject: "Математика",
    experience: 5,
    bio: "ҰБТ саласында 5 жыл тәжірибесі бар математика мұғалімі. 500+ оқушы.",
    photoUrl: "/teachers/teacher6.jpg",
  },
  {
    name: "Нұрболат Берікұлы",
    subject: "Қазақстан тарихы",
    experience: 5,
    bio: "ҰБТ саласында 5 жыл тәжірибесі бар тарих мұғалімі. 500+ оқушы.",
    photoUrl: "/teachers/teacher7.jpg",
  },
  {
    name: "Инабат Шынболатовна",
    subject: "Биология",
    experience: 5,
    bio: "ҰБТ саласында 5 жыл тәжірибесі бар биология мұғалімі. 400+ оқушы.",
    photoUrl: "/teachers/teacher8.jpg",
  },
  {
    name: "Асланбек Асқарұлы",
    subject: "Математика",
    experience: 5,
    bio: "ҰБТ саласында 5 жыл тәжірибесі бар математика мұғалімі. 500+ оқушы.",
    photoUrl: "/teachers/teacher9.jpg",
  },
  {
    name: "Асель Болатқызы",
    subject: "Қазақ тілі және әдебиеті",
    experience: 4,
    bio: "ҰБТ саласында 4 жыл тәжірибесі бар қазақ тілі мұғалімі. 300+ оқушы.",
    photoUrl: "/teachers/teacher10.jpg",
  },
  {
    name: "Аяжан Талғатқызы",
    subject: "Ағылшын тілі",
    experience: 3,
    bio: "ҰБТ саласында 3 жыл тәжірибесі бар ағылшын тілі мұғалімі. 500+ оқушы. Педагогика ғылымдарының магистрі.",
    photoUrl: "/teachers/teacher11.jpg",
  },
  {
    name: "Гүлзат Талапқызы",
    subject: "Математика және математикалық сауаттылық",
    experience: 6,
    bio: "ҰБТ саласында 6 жыл тәжірибесі бар математика мұғалімі. 700+ оқушы. Физ-мат, инфо-мат сыныптары 100% грант.",
    photoUrl: "/teachers/teacher12.jpg",
  },
  {
    name: "Айжан Ергенқызы",
    subject: "Ағылшын тілі",
    experience: 3,
    bio: "ҰБТ саласында 3 жыл тәжірибесі бар ағылшын тілі мұғалімі. Оңтүстік Корея, Сеул қаласы, Донгук университеті түлегі. Педагогика магистрі.",
    photoUrl: "/teachers/teacher13.jpg",
  },
  {
    name: "Мадина Наурызғалиқызы",
    subject: "Химия",
    experience: 4,
    bio: "ҰБТ саласында 4 жыл тәжірибесі бар химия мұғалімі. 500+ оқушы. Педагог-модератор, педагогика ғылымдарының магистрі.",
    photoUrl: "/teachers/teacher14.jpg",
  },
  {
    name: "Әлібек Сансызбайұлы",
    subject: "Қазақстан тарихы",
    experience: 2,
    bio: "ҰБТ саласында 2 жыл тәжірибесі бар тарих мұғалімі. 200+ оқушы. Педагог-модератор.",
    photoUrl: "/teachers/teacher15.jpg",
  },
];

async function main() {
  console.log("Deleting existing teachers...");
  await prisma.teacher.deleteMany();

  console.log("Inserting real teachers...");
  for (const teacher of teachers) {
    await prisma.teacher.create({ data: teacher });
  }
  console.log(`Done — inserted ${teachers.length} teachers.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
