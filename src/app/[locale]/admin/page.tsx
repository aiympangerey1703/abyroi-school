import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, Users, Newspaper } from "lucide-react";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role: string }).role !== "ADMIN") {
    redirect(`/${locale}/login`);
  }

  const [total, pending, examScheduled, accepted, rejected] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { status: "PENDING" } }),
    prisma.application.count({ where: { status: "EXAM_SCHEDULED" } }),
    prisma.application.count({ where: { status: "ACCEPTED" } }),
    prisma.application.count({ where: { status: "REJECTED" } }),
  ]);

  const stats = [
    { label: "Всего заявок", value: total, color: "bg-gray-50 border-gray-200" },
    { label: "Ожидают", value: pending, color: "bg-amber-50 border-amber-200" },
    { label: "Экзамен", value: examScheduled, color: "bg-blue-50 border-blue-200" },
    { label: "Принято", value: accepted, color: "bg-green-50 border-green-200" },
    { label: "Отказано", value: rejected, color: "bg-red-50 border-red-200" },
  ];

  return (
    <div className="min-h-screen bg-[#f0f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-[#1b6b3a] mb-8">Панель администратора</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className={`bg-white border-2 rounded-2xl p-4 text-center ${s.color}`}>
              <div className="text-3xl font-bold text-[#1b6b3a]">{s.value}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href={`/${locale}/admin/applications`} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f0f7f2] rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#1b6b3a]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1b6b3a]">Заявки</h3>
              <p className="text-sm text-gray-500">{total} заявок всего</p>
            </div>
          </Link>
          <Link href={`/${locale}/admin/teachers`} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f0f7f2] rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-[#1b6b3a]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1b6b3a]">Учителя</h3>
              <p className="text-sm text-gray-500">Управление профилями</p>
            </div>
          </Link>
          <Link href={`/${locale}/admin/news`} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f0f7f2] rounded-xl flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-[#1b6b3a]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1b6b3a]">Новости</h3>
              <p className="text-sm text-gray-500">Управление постами</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
