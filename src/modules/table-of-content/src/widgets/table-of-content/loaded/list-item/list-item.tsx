import React, { useCallback, RefObject } from "react";

import { Expander } from "../../../../../../ui-kit";
import { selectNodeData } from "../../../../entities";
import { useExpandableItem, useSelectableItems } from "../../../../features";
import { getNodeId, InteractiveTableOfContentNode, useAppSelector } from "../../../../shared";

interface ListItemProps {
  index: number,
  itemPath: string;
  innerRef: RefObject<HTMLDivElement> | null;
  updateCurrentItemIndex: (index: number) => void;
}

export const ListItem = React.memo(({ index, innerRef, itemPath, updateCurrentItemIndex }: ListItemProps) => {
  const itemId = getNodeId(itemPath);

  const { title, level } = useAppSelector((state) => selectNodeData(state, itemId));

  const {
    isExpanded,
    isExpandable,
    handleToggle,
  } = useExpandableItem(itemId);

  const { highlightType, handleSelect } = useSelectableItems(itemPath);

  const handleInteraction = useCallback(() => {
    updateCurrentItemIndex(index);

    return isExpandable ? handleToggle() : handleSelect();
  }, [handleSelect, handleToggle, index, isExpandable, updateCurrentItemIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInteraction();
    }
  }, [handleInteraction]);

  return (
    <InteractiveTableOfContentNode
      ref={innerRef}
      tabIndex={innerRef ? 0 : undefined}
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
      $level={level + 1}
      $highlightType={highlightType}
      data-testid={`div-item-${itemId}`}
    >
      {isExpandable && <Expander isExpanded={isExpanded} />}
      {title}
    </InteractiveTableOfContentNode>
  );
});
