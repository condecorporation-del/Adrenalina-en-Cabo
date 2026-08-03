import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Para poder mandarle a un cliente un link de vista previa por túnel
   * (ngrok, Cloudflare Tunnel) mientras el sitio sigue en `next dev`, hay que
   * permitir esos hosts explícitamente: Next.js bloquea por defecto cualquier
   * origen que no sea localhost para los recursos de desarrollo (HMR, etc.),
   * y sin esto la página carga pero el JavaScript nunca hidrata — las
   * tarjetas quedan invisibles aunque estén en el HTML.
   */
  allowedDevOrigins: ["*.trycloudflare.com", "*.ngrok-free.dev", "*.ngrok-free.app"],

  experimental: {
    /**
     * Transiciones entre páginas: la foto de la tarjeta de un tour se
     * transforma en la foto grande de su página de detalle, en vez de que una
     * desaparezca y la otra aparezca sin relación. Donde el navegador no lo
     * soporte, la navegación funciona igual, solo que sin animar.
     */
    viewTransition: true,
  },
};

export default nextConfig;
