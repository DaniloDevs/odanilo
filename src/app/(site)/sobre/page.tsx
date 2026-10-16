import type { Metadata } from "next";
import Image from "next/image";
import { getAcademy, getExperience, getProfile } from "@/content";
import type { Experience } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Sobre",
  description:
    "Desenvolvedor fullstack e professor técnico de TI: método, experiência e stack.",
  path: "/sobre",
});

const tracks: { key: Experience["track"]; label: string }[] = [
  { key: "dev", label: "Desenvolvimento" },
  { key: "teaching", label: "Docência" },
];

function Chip({ children }: { children: string }) {
  return (
    <li className="rounded bg-brand-soft px-2 py-0.5 font-mono text-[11px] text-brand-strong">
      {children}
    </li>
  );
}

export default async function AboutPage() {
  const [profile, experience, academy] = await Promise.all([
    getProfile(),
    getExperience(),
    getAcademy(),
  ]);

  const school = experience.find((e) => e.track === "teaching")?.company;

  return (
    <>
      <header className="px-6 pt-14 pb-16 md:pt-20">
        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand">
              Sobre
            </p>
            <h1 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-4xl">
              {profile.headline}
            </h1>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-gray-700">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="relative mx-auto aspect-[2/3] w-full max-w-48 overflow-hidden rounded-3xl bg-brand-soft md:max-w-xs">
              <Image
                src={profile.photo}
                alt={`Foto de ${profile.shortName}`}
                fill
                priority
                sizes="(min-width: 768px) 320px, 192px"
                className="object-contain object-bottom"
              />
            </div>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-xl border border-white/10 bg-graphite p-5 font-mono text-sm leading-relaxed">
              <dt className="text-blue-400">nome</dt>
              <dd className="min-w-0 text-gray-300">{profile.name}</dd>
              <dt className="text-blue-400">papel</dt>
              <dd className="min-w-0 text-gray-300">
                desenvolvedor fullstack · professor técnico de TI
              </dd>
              <dt className="text-blue-400">foco</dt>
              <dd className="min-w-0 text-gray-300">
                Node.js · TypeScript · Next.js
              </dd>
              <dt className="text-blue-400">ensino</dt>
              <dd className="min-w-0 text-gray-300">
                {school} · {academy.name}
              </dd>
              <dt className="text-blue-400">vagas</dt>
              <dd className="min-w-0 text-gray-300">
                meio período ou contrato
              </dd>
              <dt className="text-blue-400">contato</dt>
              <dd className="min-w-0 break-words text-gray-300">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {profile.contact.email}
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </header>

      <section className="border-t border-gray-100 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Experiência
          </h2>
          <div className="mt-10 space-y-12">
            {tracks.map((t) => {
              const items = experience.filter((e) => e.track === t.key);
              if (items.length === 0) return null;
              return (
                <div key={t.key}>
                  <p className="font-mono text-xs uppercase tracking-widest text-brand">
                    {t.label}
                  </p>
                  <ol className="mt-4 divide-y divide-gray-200 border-y border-gray-200">
                    {items.map((e, i) => (
                      <li
                        key={`${e.company}-${e.role}`}
                        className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[11rem_1fr]"
                      >
                        <div className="font-mono text-xs leading-relaxed text-gray-500">
                          <span className="text-brand">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="mt-1">{e.period}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {e.company}
                          </h3>
                          <p className="text-sm text-brand">{e.role}</p>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
                            {e.description}
                          </p>
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {e.tech.map((x) => (
                              <Chip key={x}>{x}</Chip>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Stack
          </h2>
          <dl className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
            {profile.skills.map((g) => (
              <div
                key={g.category}
                className="grid gap-x-8 gap-y-2 py-4 md:grid-cols-[11rem_1fr]"
              >
                <dt className="font-mono text-xs uppercase tracking-widest text-brand">
                  {g.category}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {g.items.map((x) => (
                      <Chip key={x}>{x}</Chip>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
