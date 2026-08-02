import Link from "next/link";
import Image from "next/image";
import { EMAIL, INSTAGRAM, MAPS_URL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP } from "@/lib/activities";
import { SiteHeader } from "@/components/site-header";
import { WhatsappFloat } from "@/components/whatsapp-float";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

/** Submenú de Actividades: cada categoría tiene su propia página. */
export function categoryLinks(locale: Locale, t: Dictionary) {
  return [
    { href: `/${locale}/actividades/atv`, label: t.tours.catAtv },
    { href: `/${locale}/actividades/utv`, label: t.tours.catUtv },
    { href: `/${locale}/actividades/skybike`, label: t.tours.catSkybike },
    { href: `/${locale}/actividades/camel`, label: t.tours.catCamel },
    { href: `/${locale}/actividades/horse`, label: t.tours.catHorse },
    { href: `/${locale}/actividades/bike`, label: t.tours.catBike },
    { href: `/${locale}/actividades/combo`, label: t.tours.catCombo },
  ];
}

export function PageShell({
  locale,
  t,
  children,
  overHero = false,
}: {
  locale: Locale;
  t: Dictionary;
  children: React.ReactNode;
  /** La página abre con un hero a pantalla completa (foto o video): el
   *  header flota transparente encima en vez de ocupar su propia franja. */
  overHero?: boolean;
}) {
  return (
    <>
      <SiteHeader
        locale={locale}
        nav={t.nav}
        categories={categoryLinks(locale, t)}
        overHero={overHero}
      />

      <main>{children}</main>

      <footer className="bg-noche text-claro/65">
        <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="relative h-28 w-28">
              <Image
                src="/logo-adrenalina-cabo.png"
                alt="Adrenalina Cabo"
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm hover:text-marca"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.4.5.7.2 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.3.6.4 1.3.5 2.4 0 1.1.1 1.4.1 4.2s0 3-.1 4.1c0 1.1-.2 1.8-.5 2.4-.2.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.6.3-1.3.4-2.4.5-1.1 0-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.4-.5-.7-.2-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.3-.6-.4-1.3-.5-2.4 0-1.1-.1-1.4-.1-4.1s0-3 .1-4.2c0-1.1.2-1.8.5-2.4.2-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.6-.3 1.3-.4 2.4-.5C9 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zM17.8 6.9a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
              </svg>
              Instagram
            </a>
          </div>

          <div>
            <h3 className="eyebrow text-claro">{t.footer.explore}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href={`/${locale}/tours`} className="hover:text-marca">
                  {t.nav.tours}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/pase-de-dia`} className="hover:text-marca">
                  {t.nav.pass}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ninos`} className="hover:text-marca">
                  {t.nav.kids}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/grupos`} className="hover:text-marca">
                  {t.nav.groups}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/nosotros`} className="hover:text-marca">
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-claro">{t.footer.help}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href={`/${locale}#faq`} className="hover:text-marca">
                  {t.nav.faq}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tarifa-local`} className="hover:text-marca">
                  {t.nav.local}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/socios`} className="hover:text-marca">
                  {t.nav.partners}
                </Link>
              </li>
              <li>{t.footer.terms}</li>
              <li>{t.footer.cancellation}</li>
              <li>{t.footer.privacy}</li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-claro">{t.footer.contact}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-marca">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_HREF}`} className="hover:text-marca">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-marca">
                  {EMAIL}
                </a>
              </li>
              <li className="leading-relaxed">{t.footer.address}</li>
              <li>{t.footer.hours}</li>
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-marca"
                >
                  {t.footer.maps}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-claro/15">
          <div className="container-x flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} Adrenalina Cabo. {t.footer.rights}
            </span>
            <span className="flex items-center gap-2">
              {t.payment.body}
            </span>
          </div>
        </div>
      </footer>

      <WhatsappFloat label={t.cta.secondary} />
    </>
  );
}

/** Encabezado estándar de página interior. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-linea bg-fondo-2">
      {/* Halo de marca detrás del titular: da el aire futurista sin ruido. */}
      <div
        aria-hidden
        className="absolute -left-32 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-marca/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -right-24 top-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-aqua/15 blur-[120px]"
      />

      <div className="container-x py-16 sm:py-24">
        <span className="eyebrow text-marca">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl leading-relaxed text-texto">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
