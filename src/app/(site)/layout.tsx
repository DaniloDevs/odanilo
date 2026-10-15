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
      <NavBar />
      <main className="flex-1">{children}</main>
      <ContactCta profile={profile} />
      <Footer />
    </div>
  );
}
