import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check protected routes
  const isProtected = routing.locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/dashboard`) ||
      pathname.startsWith(`/${locale}/admin`)
  );

  if (isProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const locale =
      routing.locales.find((l) => pathname.startsWith(`/${l}/`)) ||
      routing.defaultLocale;

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    if (
      routing.locales.some((locale) =>
        pathname.startsWith(`/${locale}/admin`)
      ) &&
      token.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
