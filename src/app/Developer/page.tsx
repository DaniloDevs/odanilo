import DevHero from "@/components/portfolio/dev/hero";
import DevProjects from "@/components/portfolio/dev/project";
import DevStack from "@/components/portfolio/dev/stack";
import DevExperience from "@/components/portfolio/dev/experience";
import DevCTA from "@/components/portfolio/dev/cta";
import NavBar from "@/components/portfolio/navbar";
import Footer from "@/components/portfolio/footer";

export default function Developer() {
    return (
        <div className="min-h-screen bg-white">
            <NavBar theme="dev" />
            <DevHero />
            <DevProjects />
            <DevStack />
            <DevExperience />
            <DevCTA />
            <Footer />
        </div>
    );
}