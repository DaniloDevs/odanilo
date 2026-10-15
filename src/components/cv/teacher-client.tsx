"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type CvTeacherViewType from "./teacher-view";

const CvTeacherView = dynamic(() => import("./teacher-view"), {
  ssr: false,
});

export default function CvTeacherClient(
  props: ComponentProps<typeof CvTeacherViewType>,
) {
  return <CvTeacherView {...props} />;
}
