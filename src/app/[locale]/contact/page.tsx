"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <section className="bg-[#f0f7f2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1b6b3a] mb-4">{t("title")}</h1>
          <p className="text-gray-600 text-lg">Мы на связи и готовы ответить на любые вопросы</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-[#1b6b3a] mb-6">Наши контакты</h2>
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f0f7f2] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#1b6b3a]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Адрес</p>
                  <p className="text-gray-600 text-sm">г. Уральск, Казахстан</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f0f7f2] rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#1b6b3a]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Телефон</p>
                  <a href="tel:+77479001125" className="text-[#1b6b3a] text-sm hover:underline">+7 (747) 900-11-25</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f0f7f2] rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#1b6b3a]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <a href="mailto:info@abyroi.kz" className="text-[#1b6b3a] text-sm hover:underline">info@abyroi.kz</a>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <a
                href="https://wa.me/77479001125"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-5 h-5" />
                {t("whatsapp")}
              </a>
              <a
                href="https://www.instagram.com/abyroischool_oral"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
              >
                📸 Instagram
              </a>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-48 bg-[#f0f7f2] flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-[#1b6b3a] mx-auto mb-2" />
                <p className="text-gray-600 font-medium">г. Уральск, Казахстан</p>
                <a
                  href="https://2gis.kz/uralsk/search/Абырой"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#28a745] text-sm hover:underline mt-1 block"
                >
                  Открыть в 2GIS →
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-[#1b6b3a] mb-6">Написать нам</h2>
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-[#1b6b3a] font-semibold text-lg">{t("success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("name")}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] focus:ring-2 focus:ring-[#1b6b3a]/20"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone")}</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] focus:ring-2 focus:ring-[#1b6b3a]/20"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("message")}</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] focus:ring-2 focus:ring-[#1b6b3a]/20 resize-none"
                    placeholder="Ваш вопрос или сообщение..."
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm">Произошла ошибка. Попробуйте снова.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 bg-[#1b6b3a] text-white font-semibold rounded-xl hover:bg-[#155730] transition-colors disabled:opacity-60"
                >
                  {status === "loading" ? "Отправка..." : t("submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
