export const siteConfig = {
  name: "Danilo Romão",
  shortName: "Danilo Romão",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production"
      ? "https://odanilo.vercel.app"
      : "http://localhost:3000"),
  description:
    "Desenvolvedor fullstack que diagnostica, estrutura e documenta sistemas. Também professor de TI e criador do Techs Academy.",
};
