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
};

export default nextConfig;
