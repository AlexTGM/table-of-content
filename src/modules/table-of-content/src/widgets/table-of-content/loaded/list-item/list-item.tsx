import React, { useCallback, RefObject } from "react";

import { Expander } from "../../../../../../ui-kit";
import { selectNodeData } from "../../../../entities";
import { useExpandableItem, useSelectableItems } from "../../../../features";
import { getNodeId, InteractiveTableOfContentNode, useAppSelector } from "../../../../shared";

interface ListItemProps {
  itemPath: string;
  innerRef: RefObject<HTMLDivElement> | null;
}

export const ListItem = React.memo(({ innerRef, itemPath }: ListItemProps) => {
  const itemId = getNodeId(itemPath);

  const { title, level } = useAppSelector((state) => selectNodeData(state, itemId));

  const {
    isExpanded,
    isExpandable,
    handleToggle,
  } = useExpandableItem(itemId);

  const { highlightType, handleSelect } = useSelectableItems(itemPath);

  const handleInteraction = useCallback(() => {
    return isExpandable ? handleToggle() : handleSelect();
  }, [handleSelect, handleToggle, isExpandable]);

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
