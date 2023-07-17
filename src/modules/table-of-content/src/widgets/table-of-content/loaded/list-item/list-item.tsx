import React, { useCallback } from "react";

import { Expander } from "../../../../../../ui-kit";
import { selectNodeData } from "../../../../entities";
import { useExpandableItem, useSelectableItems } from "../../../../features";
import { getNodeId, InteractiveTableOfContentNode, useAppSelector } from "../../../../shared";

interface ListItemProps {
  innerRef: React.RefObject<HTMLDivElement> | null,
  itemPath: string,
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, nodePath: string) => void,
}

export const ListItem = React.memo(({ innerRef, itemPath, handleKeyDown }: ListItemProps) => {
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

  const handleKeyDownInternal = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    e.key === 'Enter' ? handleInteraction() : handleKeyDown(e, itemPath);
  }, [handleInteraction, handleKeyDown, itemPath]);

  return (
    <InteractiveTableOfContentNode
      ref={innerRef}

      tabIndex={2}
      onKeyDown={handleKeyDownInternal}
      onClick={handleInteraction}
      $level={level + 1}
      $highlightType={highlightType}
      data-testid={`div-item-${itemId}`}
    >
      {isExpandable && <Expander isExpanded={isExpanded} />}
      {title}
    </InteractiveTableOfContentNode>
  );
});
