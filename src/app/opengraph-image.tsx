import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getProfile } from "@/content";

export const alt = "Danilo Romão — Desenvolvedor fullstack e educador";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const profile = await getProfile();
  const photo = await readFile(
    path.join(process.cwd(), "public", "danilo.png"),
  );
  const src = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#2563eb",
        color: "white",
        padding: 64,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
        <div style={{ fontSize: 30, opacity: 0.85 }}>{profile.shortName}</div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.1,
            marginTop: 24,
          }}
        >
          {profile.headline}
        </div>
      </div>
      {/* biome-ignore lint/performance/noImgElement: ImageResponse (satori) não suporta next/image */}
      <img
        src={src}
        width={320}
        height={480}
        alt=""
        style={{ objectFit: "contain" }}
      />
    </div>,
    size,
  );
}
