import { useVirtualizer } from "@tanstack/react-virtual";
import { ReactNode, useRef } from "react";
import styled from "styled-components";

interface ChildProps {
  itemIndex: number;
}

interface VirtualListProps {
  itemsCount: number;
  children: (props: ChildProps) => ReactNode;
}

export const VirtualList = ({ itemsCount, children }: VirtualListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: itemsCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <ParentContainer ref={parentRef}>
      <ListWrapper style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <List style={{ transform: `translateY(${items[0].start}px)` }}>
          {items.map((virtualRow) => (
            <li
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
            >
              {children({ itemIndex: virtualRow.index })}
            </li>
          ))}
        </List>
      </ListWrapper>
    </ParentContainer>
  );
};

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
