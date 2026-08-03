import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, Kumbh_Sans } from "next/font/google";
import "../globals.css";
import { LOCALES, isLocale } from "@/lib/locales";
import { SmoothScroll } from "@/components/smooth-scroll";
import { MotionProvider } from "@/components/motion-provider";

/* Cuerpo: la misma tipografía que usa cactustours.com, en su mismo rango de
   pesos. Titulares: Archivo con su eje de ancho — la variante expandida es
   la letra de livery de las carreras off-road del desierto de Baja. */
const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kumbh",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
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
      className={`${kumbh.variable} ${archivo.variable}`}
    >
      <body className="antialiased">
        <MotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
