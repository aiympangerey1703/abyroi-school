"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { CheckCircle } from "lucide-react";

type Combo = { id: string; name: string; subjects: string };

const STEPS = ["Заявка", "Звонок от нас", "Вступительный экзамен", "Результат", "Зачисление"];

function ApplyForm() {
  const t = useTranslations("apply");
  const { locale } = useParams() as { locale: string };
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedCombo = searchParams.get("combo");

  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    applicantType: "student" as "student" | "parent",
    childName: "",
    childGrade: "",
    studentGrade: "",
    contactName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    comboId: preSelectedCombo || "",
    language: "ru",
    hearAboutUs: "",
    message: "",
    agreedToExam: false,
  });

  useEffect(() => {
    fetch("/api/combos").then((r) => r.json()).then(setCombos);
  }, []);

  useEffect(() => {
    if (preSelectedCombo) {
      setForm((f) => ({ ...f, comboId: preSelectedCombo }));
    }
  }, [preSelectedCombo]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    if (!form.agreedToExam) {
      setError("Необходимо согласиться на вступительное испытание");
      return;
    }
    if (!form.comboId) {
      setError("Выберите направление ЕНТ");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Ошибка при подаче заявки");
        setLoading(false);
        return;
      }

      // Auto-login
      const signInResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push(`/${locale}/dashboard?success=1`);
      } else {
        router.push(`/${locale}/login`);
      }
    } catch {
      setError("Произошла ошибка. Попробуйте снова.");
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-[#f0f7f2] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-[#1b6b3a] mb-3">{t("title")}</h1>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>
      </section>

      {/* Steps indicator */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      i === 0
                        ? "bg-[#1b6b3a] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {i === 0 ? <CheckCircle className="w-5 h-5" /> : i + 1}
                  </div>
                  <span className={`text-xs mt-1 text-center max-w-[70px] ${i === 0 ? "text-[#1b6b3a] font-medium" : "text-gray-400"}`}>
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 w-8 sm:w-12 mx-2 ${i === 0 ? "bg-[#28a745]" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Who is applying */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">{t("who")}</label>
              <div className="flex gap-4">
                {(["student", "parent"] as const).map((type) => (
                  <label key={type} className={`flex-1 flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${form.applicantType === type ? "border-[#1b6b3a] bg-[#f0f7f2]" : "border-gray-200"}`}>
                    <input
                      type="radio"
                      name="applicantType"
                      value={type}
                      checked={form.applicantType === type}
                      onChange={() => setForm({ ...form, applicantType: type })}
                      className="accent-[#1b6b3a]"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {type === "student" ? t("student") : t("parent")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Conditional fields */}
            {form.applicantType === "parent" ? (
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("child_name")}</label>
                  <input
                    type="text"
                    required
                    value={form.childName}
                    onChange={(e) => setForm({ ...form, childName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]"
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("child_grade")}</label>
                  <select
                    required
                    value={form.childGrade}
                    onChange={(e) => setForm({ ...form, childGrade: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] bg-white"
                  >
                    <option value="">Выберите класс</option>
                    <option value="9">{t("grade_9")}</option>
                    <option value="10">{t("grade_10")}</option>
                    <option value="11">{t("grade_11")}</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("your_name")}</label>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]"
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("your_grade")}</label>
                  <select
                    required
                    value={form.studentGrade}
                    onChange={(e) => setForm({ ...form, studentGrade: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] bg-white"
                  >
                    <option value="">Выберите класс</option>
                    <option value="9">{t("grade_9")}</option>
                    <option value="10">{t("grade_10")}</option>
                    <option value="11">{t("grade_11")}</option>
                  </select>
                </div>
              </div>
            )}

            {/* Contact name (for parent) */}
            {form.applicantType === "parent" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact_name")}</label>
                <input
                  type="text"
                  required
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]"
                  placeholder="ФИО родителя"
                />
              </div>
            )}

            {/* Email & Phone */}
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("email")}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone")}</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("password")}</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]"
                  placeholder="Минимум 6 символов"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("confirm_password")}</label>
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]"
                  placeholder="Повторите пароль"
                />
              </div>
            </div>

            {/* Combo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("combo")}</label>
              <select
                required
                value={form.comboId}
                onChange={(e) => setForm({ ...form, comboId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] bg-white"
              >
                <option value="">Выберите направление</option>
                {combos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("language")}</label>
              <div className="flex gap-4">
                {(["kz", "ru"] as const).map((lang) => (
                  <label key={lang} className={`flex-1 flex items-center justify-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors ${form.language === lang ? "border-[#1b6b3a] bg-[#f0f7f2]" : "border-gray-200"}`}>
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      checked={form.language === lang}
                      onChange={() => setForm({ ...form, language: lang })}
                      className="accent-[#1b6b3a]"
                    />
                    <span className="text-sm font-medium">{lang === "kz" ? "🇰🇿 " + t("kz") : "🇷🇺 " + t("ru")}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* How did you hear */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("hear")}</label>
              <select
                value={form.hearAboutUs}
                onChange={(e) => setForm({ ...form, hearAboutUs: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] bg-white"
              >
                <option value="">Выберите вариант</option>
                <option value="instagram">{t("hear_ig")}</option>
                <option value="friends">{t("hear_friends")}</option>
                <option value="google">{t("hear_google")}</option>
                <option value="other">{t("hear_other")}</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("message")}</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a] resize-none"
                placeholder="Необязательно..."
              />
            </div>

            {/* Agree to exam */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agreedToExam}
                onChange={(e) => setForm({ ...form, agreedToExam: e.target.checked })}
                className="mt-1 accent-[#1b6b3a] w-4 h-4"
              />
              <span className="text-sm text-gray-700">{t("agree_exam")}</span>
            </label>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#1b6b3a] text-white font-bold text-lg rounded-xl hover:bg-[#155730] transition-colors disabled:opacity-60"
            >
              {loading ? "Отправка..." : t("submit")}
            </button>

            <p className="text-center text-sm text-gray-500">
              Уже есть аккаунт?{" "}
              <a href={`/${locale}/login`} className="text-[#1b6b3a] font-medium hover:underline">
                Войти
              </a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Загрузка...</div>}>
      <ApplyForm />
    </Suspense>
  );
}
