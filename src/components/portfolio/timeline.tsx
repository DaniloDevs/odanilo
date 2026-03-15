import React, { ReactNode } from "react";

interface TimelineProps<T> {
  items: T[];
  theme?: "dev" | "teacher";
  renderItem: (item: T, index: number) => ReactNode;
}

export default function Timeline<T>({ items, theme = "dev", renderItem }: TimelineProps<T>) {
  const accentBorder = theme === "dev" ? "border-blue-600" : "border-emerald-600";
  const dotBg = theme === "dev" ? "bg-blue-600" : "bg-emerald-600";

  return (
    <div className="relative">
      <div className={`absolute left-[7px] top-2 bottom-2 w-px bg-gray-200`} />
      <div className="space-y-10">
        {items.map((item, i) => (
          <div key={i} className="relative pl-8">
            <div
              className={`absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 ${accentBorder} bg-white`}
            />
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}