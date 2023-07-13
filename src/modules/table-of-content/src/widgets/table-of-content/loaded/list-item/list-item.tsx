import React, { useCallback } from "react";

import { Expander } from "../../../../../../ui-kit";
import { selectNodeData } from "../../../../entities";
import { useExpandableItem, useSelectableItems } from "../../../../features";
import { getNodeId, InteractiveTableOfContentNode, useAppSelector } from "../../../../shared";

const useKeyboardNavigation = (actions: Record<string, () => void>) => {
  return useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => actions[e.code]?.(),
    [actions]
  );
};

export const ListItem = React.memo(({ itemPath }: { itemPath: string }) => {
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

  const handleKeyDown = useKeyboardNavigation({
    Enter: handleInteraction,
  });

  return (
    <InteractiveTableOfContentNode
      tabIndex={2}
      onKeyDown={handleKeyDown}
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
