"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { CheckCircle, Clock, Phone, Mail, User, LogOut } from "lucide-react";

type ApplicationData = {
  id: string;
  applicantType: string;
  status: string;
  examDate: string | null;
  combo: { name: string };
  language: string;
};

type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
};

const STATUS_STEPS = ["PENDING", "CONTACTED", "EXAM_SCHEDULED", "ACCEPTED"];

function StatusBadge({ status, t }: { status: string; t: (key: string) => string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    CONTACTED: "bg-blue-100 text-blue-700",
    EXAM_SCHEDULED: "bg-green-100 text-green-700",
    ACCEPTED: "bg-[#1b6b3a] text-white",
    REJECTED: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    PENDING: t("badge_pending"),
    CONTACTED: t("badge_contacted"),
    EXAM_SCHEDULED: t("badge_exam"),
    ACCEPTED: t("badge_accepted"),
    REJECTED: t("badge_rejected"),
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors[status] || ""}`}>
      {labels[status] || status}
    </span>
  );
}

function DashboardContent() {
  const t = useTranslations("dashboard");
  const { locale } = useParams() as { locale: string };
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get("success") === "1";

  const [data, setData] = useState<{ application: ApplicationData | null; user: UserData | null }>({
    application: null,
    user: null,
  });
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setEditForm({ name: d.user?.name || "", phone: d.user?.phone || "" });
      });
  }, []);

  async function handleSaveProfile() {
    setSaving(true);
    const res = await fetch("/api/dashboard", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      const user = await res.json();
      setData((prev) => ({ ...prev, user }));
      setEditOpen(false);
    }
    setSaving(false);
  }

  const { application, user } = data;
  const status = application?.status || "PENDING";
  const currentStep = STATUS_STEPS.indexOf(status);

  const stepLabels = [t("step1"), t("step2"), t("step3"), t("step4"), t("step5")];

  return (
    <div className="min-h-screen bg-[#f0f7f2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#1b6b3a] mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#1b6b3a]">{t("success_title")}</p>
              <p className="text-sm text-green-700">{t("success_desc")}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1b6b3a]">
              {t("welcome")}, {user?.name?.split(" ")[0]}!
            </h1>
            <p className="text-gray-500 text-sm mt-1">{t("applicant_cabinet")}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: `/${locale}` })}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 rounded-xl hover:border-red-300 hover:text-red-600 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            {t("logout")}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-lg font-bold text-[#1b6b3a]">{t("status_title")}</h2>
                {application && <StatusBadge status={status} t={t} />}
              </div>

              <div className="flex items-center mb-8 overflow-x-auto pb-2">
                {stepLabels.map((step, i) => (
                  <div key={i} className="flex items-center shrink-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          i <= currentStep ? "bg-[#1b6b3a] text-white" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {i <= currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={`text-xs mt-1 text-center w-16 ${i <= currentStep ? "text-[#1b6b3a] font-medium" : "text-gray-400"}`}>
                        {step}
                      </span>
                    </div>
                    {i < 4 && (
                      <div className={`h-0.5 w-8 mx-1 ${i < currentStep ? "bg-[#28a745]" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>

              {status === "PENDING" && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="font-semibold text-amber-700">{t("pending")}</span>
                  </div>
                  <p className="text-sm text-amber-600">{t("pending_desc")}</p>
                </div>
              )}
              {status === "CONTACTED" && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <span className="font-semibold text-blue-700 block mb-1">{t("contacted")}</span>
                  <p className="text-sm text-blue-600">{t("contacted_desc")}</p>
                </div>
              )}
              {status === "EXAM_SCHEDULED" && (
                <div className="p-4 bg-green-50 border border-[#28a745] rounded-xl">
                  <span className="font-semibold text-[#1b6b3a] block mb-3">{t("exam_scheduled")}</span>
                  {application?.examDate && (
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>📅 <strong>{t("exam_date")}:</strong> {new Date(application.examDate).toLocaleString("ru-RU", { dateStyle: "long", timeStyle: "short" })}</p>
                      <p>📍 {t("exam_address")}</p>
                      <p>📝 {t("exam_bring")}</p>
                      <p className="text-[#1b6b3a] font-medium">⏰ {t("exam_arrive")}</p>
                    </div>
                  )}
                </div>
              )}
              {status === "ACCEPTED" && (
                <div className="p-6 bg-[#1b6b3a] text-white rounded-xl text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="font-bold text-xl mb-2">{t("accepted")}</p>
                  <p className="text-green-200 text-sm">{t("accepted_desc")}</p>
                  <div className="mt-4 p-3 bg-white/10 rounded-xl text-sm">
                    <p className="font-medium">{t("accepted_next_title")}</p>
                    <p className="text-green-200 mt-1">{t("accepted_next_desc")}</p>
                  </div>
                </div>
              )}
              {status === "REJECTED" && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <p className="font-semibold text-gray-700 mb-2">{t("rejected")}</p>
                  <p className="text-sm text-gray-600 mb-3">{t("rejected_desc")}</p>
                  <Link href={`/${locale}/contact`} className="text-[#1b6b3a] text-sm font-medium hover:underline">
                    {t("contact_us")} →
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-[#1b6b3a]">{t("profile_title")}</h2>
                <button onClick={() => setEditOpen(true)} className="text-sm text-[#28a745] hover:underline">
                  {t("edit_profile")}
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4 text-[#1b6b3a]" />
                  {user?.name}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-[#1b6b3a]" />
                  {user?.email}
                </div>
                {user?.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-[#1b6b3a]" />
                    {user.phone}
                  </div>
                )}
              </div>
              {application && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">{t("combo")}:</span>
                    <p className="text-gray-700 font-medium mt-0.5">{application.combo.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">{t("type_label")}:</span>
                    <p className="text-gray-700 mt-0.5">
                      {application.applicantType === "student" ? t("type_student") : t("type_parent")}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">{t("lang_label")}:</span>
                    <p className="text-gray-700 mt-0.5">{application.language === "kz" ? t("lang_kz") : t("lang_ru")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-[#1b6b3a] mb-4">{t("edit_profile")}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("name_label")}</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone_label")}</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b6b3a]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex-1 py-3 bg-[#1b6b3a] text-white font-semibold rounded-xl hover:bg-[#155730] transition-colors disabled:opacity-60"
              >
                {saving ? t("saving") : t("save")}
              </button>
              <button
                onClick={() => setEditOpen(false)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
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

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">{t("loading")}</div>}>
      <DashboardContent />
    </Suspense>
  );
}
