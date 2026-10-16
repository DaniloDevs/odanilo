import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: "/Developer", destination: "/", permanent: true },
      { source: "/developer", destination: "/", permanent: true },
      { source: "/Teacher", destination: "/academy", permanent: true },
      { source: "/teacher", destination: "/academy", permanent: true },
      {
        source: "/projetos/avaliacao-coordenadores",
        destination: "/projetos/fichas-avaliativas",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
