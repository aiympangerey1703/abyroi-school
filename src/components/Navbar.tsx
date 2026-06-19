"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown } from "lucide-react";

const localeLabels: Record<string, string> = {
  ru: "🇷🇺 RU",
  kz: "🇰🇿 KZ",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const { locale } = useParams() as { locale: string };
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const role = (session?.user as { role?: string })?.role;

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/");
  }

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/programs`, label: t("programs") },
    { href: `/${locale}/combos`, label: t("combos") },
    { href: `/${locale}/teachers`, label: t("teachers") },
    { href: `/${locale}/admissions`, label: t("admissions") },
    { href: `/${locale}/news`, label: t("news") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="Абырой" width={36} height={36} className="rounded-lg" />
            <span className="font-bold text-xl" style={{ color: "#1b6b3a" }}>
              Абырой
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#1b6b3a] rounded-lg hover:bg-[#f0f7f2] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:border-[#1b6b3a] transition-colors"
              >
                {localeLabels[locale] || locale.toUpperCase()}
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                  {["ru", "kz"].map((l) => (
                    <button
                      key={l}
                      onClick={() => { switchLocale(l); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#f0f7f2] ${l === locale ? "text-[#1b6b3a] font-medium" : "text-gray-700"}`}
                    >
                      {localeLabels[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {session ? (
              <>
                {role === "ADMIN" ? (
                  <Link href={`/${locale}/admin`} className="px-4 py-2 text-sm font-medium text-[#1b6b3a] border border-[#1b6b3a] rounded-lg hover:bg-[#f0f7f2] transition-colors">
                    Админ
                  </Link>
                ) : (
                  <Link href={`/${locale}/dashboard`} className="px-4 py-2 text-sm font-medium text-[#1b6b3a] border border-[#1b6b3a] rounded-lg hover:bg-[#f0f7f2] transition-colors">
                    Кабинет
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: `/${locale}` })}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#1b6b3a] transition-colors"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link href={`/${locale}/login`} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1b6b3a] transition-colors">
                  {t("login")}
                </Link>
                <Link
                  href={`/${locale}/apply`}
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors"
                  style={{ background: "#1b6b3a" }}
                >
                  {t("apply")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-[#1b6b3a]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1b6b3a] rounded-lg hover:bg-[#f0f7f2]"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2 pt-2 border-t border-gray-100">
              {["ru", "kz"].map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  className={`px-3 py-1.5 text-xs border rounded-lg ${l === locale ? "border-[#1b6b3a] text-[#1b6b3a]" : "border-gray-200 text-gray-600"}`}
                >
                  {localeLabels[l]}
                </button>
              ))}
            </div>
            {session ? (
              <div className="flex gap-2 mt-2">
                <Link href={`/${locale}/dashboard`} onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2 text-sm font-medium text-white rounded-lg" style={{ background: "#1b6b3a" }}>
                  Кабинет
                </Link>
                <button onClick={() => signOut({ callbackUrl: `/${locale}` })} className="flex-1 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg">
                  Выйти
                </button>
              </div>
            ) : (
              <div className="flex gap-2 mt-2">
                <Link href={`/${locale}/login`} onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg">
                  {t("login")}
                </Link>
                <Link href={`/${locale}/apply`} onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2 text-sm font-semibold text-white rounded-lg" style={{ background: "#1b6b3a" }}>
                  {t("apply")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
