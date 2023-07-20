import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

interface ChildProps {
  itemIndex: number;
  innerRef: React.RefObject<HTMLDivElement> | null;
}

interface VirtualListProps {
  itemsCount: number;
  configuration: Record<string, (index: number) => number | undefined>
  children: (props: ChildProps) => ReactNode;
}

const useKeyboardNavigation = (configuration: Record<string, (index: number) => number | void>) => {
  const [currentItemIndex, setCurrentIndex] = useState(0);

  return useMemo(() => ({
    handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown') {
        setCurrentIndex(currentItemIndex + 1);
      } else if (e.key === 'ArrowUp') {
        setCurrentIndex(currentItemIndex - 1);
      }

      const newIndex = configuration[e.key]?.(currentItemIndex);

      newIndex && setCurrentIndex(newIndex);
    }, currentItemIndex
  }), [configuration, currentItemIndex])
}

export const VirtualList = React.memo(({ itemsCount, configuration, children }: VirtualListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const currentItemRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: itemsCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const items = virtualizer.getVirtualItems();

  const { currentItemIndex, handleKeyDown } = useKeyboardNavigation(configuration);

  useEffect(() => {
    virtualizer.scrollToIndex(currentItemIndex, { align: 'center', behavior: 'smooth' });
    currentItemRef.current?.focus();
  }, [currentItemIndex, virtualizer])

  return (
    <ParentContainer ref={parentRef} tabIndex={1} onKeyDown={handleKeyDown}>
      <ListWrapper style={{ height: `${virtualizer.getTotalSize()}px`}}>
        <List style={{ transform: `translateY(${items[0].start}px)` }}>
          {items.map((virtualRow) => (
            <li
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
            >
              {children({
                itemIndex: virtualRow.index,
                innerRef: currentItemIndex === virtualRow.index ? currentItemRef : null
              })}
            </li>
          ))}
        </List>
      </ListWrapper>
    </ParentContainer>
  );
});

const ParentContainer = styled.div`
  overflow-y: auto;
`;

const ListWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const List = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;
