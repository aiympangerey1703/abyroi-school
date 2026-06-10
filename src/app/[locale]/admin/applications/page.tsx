"use client";

import { useState, useEffect } from "react";

type App = {
  id: string;
  applicantType: string;
  status: string;
  examDate: string | null;
  adminNotes: string | null;
  createdAt: string;
  user: { name: string; email: string; phone: string | null };
  combo: { name: string };
};

const STATUSES = ["ALL", "PENDING", "CONTACTED", "EXAM_SCHEDULED", "ACCEPTED", "REJECTED"];
const STATUS_LABELS: Record<string, string> = {
  PENDING: "Ожидает",
  CONTACTED: "Связались",
  EXAM_SCHEDULED: "Экзамен",
  ACCEPTED: "Принят",
  REJECTED: "Отказ",
};
const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  EXAM_SCHEDULED: "bg-purple-100 text-purple-700",
  ACCEPTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [examModal, setExamModal] = useState<{ id: string; date: string } | null>(null);

  async function load(status: string) {
    setLoading(true);
    const res = await fetch(`/api/admin/applications?status=${status}`);
    const data = await res.json();
    setApps(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(filter); }, [filter]);

  async function updateStatus(id: string, status: string, examDate?: string, adminNotes?: string) {
    const body: Record<string, unknown> = { status };
    if (examDate !== undefined) body.examDate = examDate;
    if (adminNotes !== undefined) body.adminNotes = adminNotes;

    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const updated = await res.json();
      setApps((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    if (newStatus === "EXAM_SCHEDULED") {
      setExamModal({ id, date: "" });
    } else {
      await updateStatus(id, newStatus);
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-[#1b6b3a] mb-6">Заявки на зачисление</h1>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === s ? "bg-[#1b6b3a] text-white" : "bg-white text-gray-600 hover:bg-[#f0f7f2]"
              }`}
            >
              {s === "ALL" ? "Все" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-400">Загрузка...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f0f7f2] text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    <th className="px-4 py-3">ФИО</th>
                    <th className="px-4 py-3">Тип</th>
                    <th className="px-4 py-3">Телефон</th>
                    <th className="px-4 py-3">Направление</th>
                    <th className="px-4 py-3">Дата</th>
                    <th className="px-4 py-3">Статус</th>
                    <th className="px-4 py-3">Заметки</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {apps.map((app) => (
                    <tr key={app.id} className="hover:bg-[#f0f7f2]/50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-800">{app.user.name}</div>
                        <div className="text-xs text-gray-400">{app.user.email}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {app.applicantType === "student" ? "Ученик" : "Родитель"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{app.user.phone || "—"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-32 truncate">{app.combo.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(app.createdAt).toLocaleDateString("ru-RU")}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer ${STATUS_COLORS[app.status]}`}
                        >
                          {Object.entries(STATUS_LABELS).map(([v, l]) => (
                            <option key={v} value={v}>{l}</option>
                          ))}
                        </select>
                        {app.examDate && (
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(app.examDate).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" })}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          defaultValue={app.adminNotes || ""}
                          onBlur={(e) => updateStatus(app.id, app.status, undefined, e.target.value)}
                          placeholder="Заметка..."
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 w-32 focus:outline-none focus:border-[#1b6b3a]"
                        />
                      </td>
                    </tr>
                  ))}
                  {apps.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-400">Заявки не найдены</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Exam date modal */}
      {examModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-[#1b6b3a] mb-4">Назначить дату экзамена</h3>
            <input
              type="datetime-local"
              value={examModal.date}
              onChange={(e) => setExamModal({ ...examModal, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={async () => {
                  await updateStatus(examModal.id, "EXAM_SCHEDULED", examModal.date);
                  setExamModal(null);
                }}
                disabled={!examModal.date}
                className="flex-1 py-3 bg-[#1b6b3a] text-white font-semibold rounded-xl hover:bg-[#155730] transition-colors disabled:opacity-60"
              >
                Сохранить
              </button>
              <button
                onClick={() => setExamModal(null)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
