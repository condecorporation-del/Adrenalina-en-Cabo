import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/locales";

/**
 * En Next 16 esto se llama `proxy` (antes `middleware`).
 *
 * Único trabajo: si la URL no trae locale, mandarla al que corresponda.
 * El grueso del tráfico que compra es de EUA/Canadá, así que respetamos
 * Accept-Language en vez de forzar español.
 */
function pickLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());

  for (const tag of preferred) {
    const base = tag.split("-")[0];
    const match = LOCALES.find((locale) => locale === base);
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Sin matcher, el proxy corre en TODO — incluido CSS, JS e imágenes.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|mp4|webm)$).*)",
  ],
};
