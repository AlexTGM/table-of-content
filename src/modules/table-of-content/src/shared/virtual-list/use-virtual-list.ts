import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useEffect } from "react";

export const useVirtualList = (itemsCount: number, currentItemIndex: number) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: itemsCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    virtualizer.scrollToIndex(currentItemIndex);
  }, [currentItemIndex, virtualizer]);

  return { parentRef, items, virtualizer };
}