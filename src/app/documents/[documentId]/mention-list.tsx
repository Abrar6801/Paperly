"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Image from "next/image";

export interface MentionUser {
  id: string;
  name: string;
  avatar: string;
}

export interface MentionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

interface Props {
  items: MentionUser[];
  command: (item: { id: string; label: string }) => void;
}

export const MentionList = forwardRef<MentionListRef, Props>(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => setSelectedIndex(0), [items]);

  const select = (index: number) => {
    const item = items[index];
    if (item) command({ id: item.id, label: item.name });
  };

  useImperativeHandle(ref, () => ({
    onKeyDown({ event }) {
      if (event.key === "ArrowUp") {
        setSelectedIndex((i) => (i + items.length - 1) % items.length);
        return true;
      }
      if (event.key === "ArrowDown") {
        setSelectedIndex((i) => (i + 1) % items.length);
        return true;
      }
      if (event.key === "Enter") {
        select(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  if (!items.length) {
    return (
      <div className="bg-white border border-neutral-200 rounded-lg shadow-lg p-3 text-sm text-neutral-500 min-w-[180px]">
        No users found
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-xl py-1 min-w-[200px] max-h-60 overflow-y-auto">
      <p className="px-3 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
        Mention a user
      </p>
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => select(index)}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-900 text-left transition-colors ${
            index === selectedIndex
              ? "bg-blue-50 text-blue-700"
              : "hover:bg-neutral-50"
          }`}
        >
          {item.avatar ? (
            <Image src={item.avatar} alt="" width={28} height={28} className="size-7 rounded-full object-cover flex-shrink-0 ring-1 ring-neutral-200" unoptimized />
          ) : (
            <div className="size-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {item.name[0]?.toUpperCase()}
            </div>
          )}
          <span className="truncate font-medium">{item.name}</span>
        </button>
      ))}
    </div>
  );
});

MentionList.displayName = "MentionList";
