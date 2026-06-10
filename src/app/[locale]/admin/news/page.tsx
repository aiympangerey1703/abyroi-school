"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import Image from "next/image";

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  publishedAt: string;
};

type FormData = { title: string; content: string; imageUrl: string };
const emptyForm: FormData = { title: "", content: "", imageUrl: "" };

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modal, setModal] = useState<{ open: boolean; editing: Post | null }>({ open: false, editing: null });
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/news");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(emptyForm); setModal({ open: true, editing: null }); }
  function openEdit(p: Post) {
    setForm({ title: p.title, content: p.content, imageUrl: p.imageUrl || "" });
    setModal({ open: true, editing: p });
  }

  async function handleSave() {
    setSaving(true);
    const url = modal.editing ? `/api/admin/news/${modal.editing.id}` : "/api/admin/news";
    const method = modal.editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    await load();
    setModal({ open: false, editing: null });
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Удалить новость?")) return;
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="min-h-screen bg-[#f0f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#1b6b3a]">Управление новостями</h1>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[#1b6b3a] text-white font-semibold rounded-xl hover:bg-[#155730] transition-colors">
            <Plus className="w-4 h-4" /> Добавить
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={post.imageUrl || `https://picsum.photos/seed/${idx + 50}/600/300`}
                alt={post.title}
                width={600}
                height={300}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1">{new Date(post.publishedAt).toLocaleDateString("ru-RU")}</p>
                <h3 className="font-bold text-[#1b6b3a] mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(post)} className="flex-1 flex items-center justify-center gap-1 py-2 border border-gray-200 text-gray-600 rounded-xl hover:border-[#1b6b3a] hover:text-[#1b6b3a] text-sm transition-colors">
                    <Pencil className="w-3.5 h-3.5" /> Изменить
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="flex items-center justify-center p-2 border border-gray-200 text-red-400 rounded-xl hover:border-red-300 hover:bg-red-50 transition-colors">
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
              <h3 className="text-lg font-bold text-[#1b6b3a]">{modal.editing ? "Редактировать" : "Добавить"} новость</h3>
              <button onClick={() => setModal({ open: false, editing: null })}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Содержание</label>
                <textarea rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL изображения</label>
                <input type="text" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-[#1b6b3a] text-white font-semibold rounded-xl hover:bg-[#155730] transition-colors disabled:opacity-60">
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
              <button onClick={() => setModal({ open: false, editing: null })} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
