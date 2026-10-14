"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type CvDeveloperViewType from "./developer-view";

const CvDeveloperView = dynamic(() => import("./developer-view"), {
  ssr: false,
});

export default function CvDeveloperClient(
  props: ComponentProps<typeof CvDeveloperViewType>,
) {
  return <CvDeveloperView {...props} />;
}
