import { ContactCta } from "@/components/site/contact-cta";
import Footer from "@/components/site/footer";
import NavBar from "@/components/site/navbar";
import { getProfile } from "@/content";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const profile = await getProfile();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-900 focus:shadow-md"
      >
        Pular para o conteúdo
      </a>
      <NavBar />
      <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <ContactCta profile={profile} />
      <Footer />
    </div>
  );
}
