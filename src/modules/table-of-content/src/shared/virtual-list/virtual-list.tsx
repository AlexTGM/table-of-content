import { ReactNode, memo, useEffect, useRef } from "react";
import styled from "styled-components";
import { useFocusRing } from "./use-focus-ring";
import { useVirtualList } from "./use-virtual-list";

interface ChildProps {
  itemIndex: number;
  innerRef: React.RefObject<HTMLDivElement> | null;
  updateCurrentItemIndex: (index: number) => void;
}

interface VirtualListProps {
  itemsCount: number;
  configuration: Record<string, (index: number) => number | undefined>
  children: (props: ChildProps) => ReactNode;
}

export const VirtualList = ({ itemsCount, configuration, children }: VirtualListProps) => {
  const currentItemRef = useRef<HTMLDivElement>(null);

  const { currentItemIndex, updateCurrentItemIndex, handleKeyDown } = useFocusRing(itemsCount, configuration);
  const { virtualizer, parentRef, items } = useVirtualList(itemsCount, currentItemIndex);

  useEffect(() => {
    currentItemRef.current?.focus();
  }, [currentItemIndex])

  return (
    <ParentContainer ref={parentRef} tabIndex={1} onKeyDown={handleKeyDown}>
      <ListWrapper style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <List style={{ transform: `translateY(${items[0].start}px)` }}>
          {items.map((virtualRow) => (
            <li
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
            >
              {children({
                updateCurrentItemIndex,
                itemIndex: virtualRow.index,
                innerRef: currentItemIndex === virtualRow.index ? currentItemRef : null,
              })}
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
