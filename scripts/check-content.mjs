import assert from "node:assert/strict";
import { academy } from "../src/content/data/academy.ts";
import { experience } from "../src/content/data/experience.ts";
import { profile } from "../src/content/data/profile.ts";
import { projects } from "../src/content/data/projects.ts";
import { teaching } from "../src/content/data/teaching.ts";

const slugs = projects.map((p) => p.slug);
assert.equal(new Set(slugs).size, slugs.length, "slugs duplicados");

for (const p of projects) {
  if (p.visibility === "private") {
    assert.equal(
      p.repoUrl,
      undefined,
      `${p.slug}: projeto privado com repoUrl`,
    );
  }
}

const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order)
  .map((p) => p.slug);
assert.deepEqual(
  featured,
  ["bluedraft", "xcupons", "fichas-avaliativas"],
  "destaques",
);

const coordenadores = projects.find((p) => p.slug === "fichas-avaliativas");
assert.ok(coordenadores, "projeto fichas-avaliativas ausente");
assert.equal(coordenadores.demoUrl, undefined, "não deve ter demoUrl");
assert.ok(
  !JSON.stringify(coordenadores).toLowerCase().includes("loide"),
  "o projeto de fichas avaliativas não pode citar o nome da instituição",
);

const everything = JSON.stringify({
  academy,
  experience,
  profile,
  projects,
  teaching,
});
for (const banned of [
  "19 anos",
  "Universidade",
  "Bacharelado",
  "Licenciatura",
  "build-amazing-things",
]) {
  assert.ok(
    !everything.includes(banned),
    `texto proibido encontrado: ${banned}`,
  );
}

assert.equal(
  academy.courseUrl,
  "https://hotmart.com/pt-br/club/techs-academy/products/8488982",
);
assert.equal(academy.hubUrl, "https://hotmart.com/pt-br/club/techs-academy");

console.log("check-content: ok");
