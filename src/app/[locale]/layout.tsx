import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kumbh_Sans } from "next/font/google";
import "../globals.css";
import { LOCALES, isLocale } from "@/lib/locales";

/* La misma tipografía que usa cactustours.com, en su mismo rango de pesos. */
const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kumbh",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === "es";

  return {
    metadataBase: new URL("https://adrenalinacabo.com"),
    title: {
      default: es
        ? "Adrenalina Cabo — Tours en ATV, UTV y camello en Playa Migriño"
        : "Adrenalina Cabo — ATV, UTV & Camel Tours at Playa Migriño",
      template: "%s · Adrenalina Cabo",
    },
    description: es
      ? "Tours de aventura en Playa Migriño, Los Cabos. Grupos chicos y precio todo incluido: entrada al parque y seguro ya vienen en el precio que ves."
      : "Adventure tours at Playa Migriño, Los Cabos. Small groups and all-in pricing: park entrance and insurance are already in the price you see.",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "es-MX": "/es",
        "en-US": "/en",
        "x-default": "/es",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale === "es" ? "es-MX" : "en-US"}
      className={kumbh.variable}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
