"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const { locale } = useParams() as { locale: string };

  return (
    <footer style={{ background: "#1b6b3a" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#1b6b3a] font-bold text-sm">А</span>
              </div>
              <span className="font-bold text-xl text-white">Абырой</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Частная подготовительная школа к ЕНТ в Уральске, Казахстан
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                📸
              </a>
              <a href="https://wa.me/77110000000" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("quick_links")}</h3>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/about`, label: "О школе" },
                { href: `/${locale}/programs`, label: "Программы" },
                { href: `/${locale}/combos`, label: "Направления ЕНТ" },
                { href: `/${locale}/teachers`, label: "Учителя" },
                { href: `/${locale}/admissions`, label: "Поступление" },
                { href: `/${locale}/news`, label: "Новости" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-green-200 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-white mb-4">Направления</h3>
            <ul className="space-y-2">
              {[
                "Математика + Физика",
                "Биология + Химия",
                "История + География",
                "Математика + Информатика",
                "Казахский + География",
              ].map((p) => (
                <li key={p}>
                  <Link href={`/${locale}/combos`} className="text-green-200 hover:text-white text-sm transition-colors">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("contacts")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-green-200">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                {t("address")}
              </li>
              <li className="flex items-center gap-2 text-sm text-green-200">
                <Phone className="w-4 h-4 shrink-0" />
                {t("phone")}
              </li>
              <li className="flex items-center gap-2 text-sm text-green-200">
                <Mail className="w-4 h-4 shrink-0" />
                {t("email")}
              </li>
            </ul>
            <Link
              href={`/${locale}/apply`}
              className="mt-4 inline-block bg-white text-[#1b6b3a] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors"
            >
              Подать заявку
            </Link>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-green-200 text-sm">
            © {new Date().getFullYear()} Абырой. {t("rights")}.
          </p>
          <p className="text-green-200 text-sm">г. Уральск, Казахстан</p>
        </div>
      </div>
    </footer>
  );
}
