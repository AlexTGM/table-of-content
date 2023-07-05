import { useRef } from "react";
import { useFilterItems } from "../../../../features";
import { List, TableOfContentNode } from "../../../../shared";
import { ListItem, useListItems } from "../list-item";
import { useVirtualizer } from '@tanstack/react-virtual'

export const TableOfContentsList = () => {
  const parentRef = useRef<HTMLDivElement>(null)

  const rootNodes = useFilterItems();
  const listItems = useListItems(rootNodes);

  const virtualizer = useVirtualizer({
    count: listItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <List
      ref={parentRef}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}>
        {rootNodes.length === 0 ? (
          <TableOfContentNode>Please adjust filters</TableOfContentNode>
        ) : (
          <ul
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${items[0].start}px)`,
            }}
          >{items.map((virtualRow) => (
            <li
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
            >
              <ListItem itemPath={listItems[virtualRow.index]} />
            </li>
          ))}
          </ul>
        )}
      </div>
    </List>
  );
};
