import type { ReactNode } from "react";

interface TimelineProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}

export default function Timeline<T>({ items, renderItem }: TimelineProps<T>) {
  return (
    <div className="relative">
      <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gray-200" />
      <div className="space-y-10">
        {items.map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: generic items have no stable id; list is static
          <div key={`item-${i}`} className="relative pl-8">
            <div className="absolute top-[6px] left-0 h-[15px] w-[15px] rounded-full border-2 border-brand bg-white" />
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
