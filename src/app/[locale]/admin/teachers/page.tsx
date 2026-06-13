"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useTranslations } from "next-intl";

type Teacher = {
  id: string;
  name: string;
  subject: string;
  experience: number;
  bio: string;
  photoUrl: string | null;
};

type FormData = Omit<Teacher, "id">;

const emptyForm: FormData = { name: "", subject: "", experience: 0, bio: "", photoUrl: "" };

export default function AdminTeachersPage() {
  const t = useTranslations("admin");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [modal, setModal] = useState<{ open: boolean; editing: Teacher | null }>({ open: false, editing: null });
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/teachers");
    const data = await res.json();
    setTeachers(Array.isArray(data) ? data : []);
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm(emptyForm);
    setModal({ open: true, editing: null });
  }

  function openEdit(teacher: Teacher) {
    setForm({ name: teacher.name, subject: teacher.subject, experience: teacher.experience, bio: teacher.bio, photoUrl: teacher.photoUrl || "" });
    setModal({ open: true, editing: teacher });
  }

  async function handleSave() {
    setSaving(true);
    const url = modal.editing ? `/api/admin/teachers/${modal.editing.id}` : "/api/admin/teachers";
    const method = modal.editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      await load();
      setModal({ open: false, editing: null });
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm(t("delete_teacher_confirm"))) return;
    await fetch(`/api/admin/teachers/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="min-h-screen bg-[#f0f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#1b6b3a]">{t("manage_teachers")}</h1>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#1b6b3a] text-white font-semibold rounded-xl hover:bg-[#155730] transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t("add")}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher, idx) => (
            <div key={teacher.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={teacher.photoUrl || `https://picsum.photos/seed/${idx + 40}/400/300`}
                alt={teacher.name}
                width={400}
                height={300}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-[#1b6b3a]">{teacher.name}</h3>
                <p className="text-sm text-gray-500">{teacher.subject} · {teacher.experience} {t("years_short")}</p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{teacher.bio}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(teacher)} className="flex-1 flex items-center justify-center gap-1 py-2 border border-gray-200 text-gray-600 rounded-xl hover:border-[#1b6b3a] hover:text-[#1b6b3a] text-sm transition-colors">
                    <Pencil className="w-3.5 h-3.5" /> {t("btn_edit")}
                  </button>
                  <button onClick={() => handleDelete(teacher.id)} className="flex items-center justify-center p-2 border border-gray-200 text-red-400 rounded-xl hover:border-red-300 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#1b6b3a]">
                {modal.editing ? t("edit_teacher_modal") : t("add_teacher_modal")}
              </h3>
              <button onClick={() => setModal({ open: false, editing: null })} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {([
                { label: t("label_name"), key: "name", type: "text" },
                { label: t("label_subject"), key: "subject", type: "text" },
                { label: t("label_exp"), key: "experience", type: "number" },
                { label: t("label_photo"), key: "photoUrl", type: "text" },
              ] as { label: string; key: keyof FormData; type: string }[]).map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    value={String(form[key])}
                    onChange={(e) => setForm({ ...form, [key]: type === "number" ? parseInt(e.target.value) : e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("label_bio")}</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 bg-[#1b6b3a] text-white font-semibold rounded-xl hover:bg-[#155730] transition-colors disabled:opacity-60"
              >
                {saving ? t("saving") : t("save")}
              </button>
              <button
                onClick={() => setModal({ open: false, editing: null })}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
