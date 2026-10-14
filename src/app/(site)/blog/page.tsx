import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { getPosts } from "@/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notas técnicas sobre arquitetura, diagnóstico e ensino.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notas técnicas"
        description="Textos curtos sobre arquitetura, diagnóstico de sistemas e ensino."
      />
      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          {posts.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-300 p-8 text-sm text-gray-600">
              Os primeiros textos saem em breve. Enquanto isso, veja os{" "}
              <Link href="/projetos" className="text-brand underline">
                cases
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-6">
              {posts.map((p) => (
                <li key={p.slug}>
                  <h2 className="font-semibold text-gray-900">{p.title}</h2>
                  <p className="mt-1 text-sm text-gray-600">{p.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
