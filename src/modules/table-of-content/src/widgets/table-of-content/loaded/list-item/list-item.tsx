import { useCallback } from "react";
import { Expander } from "../../../../../../ui-kit";
import { selectNodeData } from "../../../../entities";
import {
  useExpandableItem,
  useSelectableItems,
  usePathHighlighting,
} from "../../../../features";
import {
  getNodeId,
  useAppSelector,
  InteractiveTableOfContentNode,
} from "../../../../shared";
import React from "react";

const useKeyboardNavigation = (actions: Record<string, () => void>) => {
  return useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => actions[e.code]?.(),
    [actions]
  );
};

export const ListItem = React.memo(({ itemPath }: { itemPath: string }) => {
  const itemId = getNodeId(itemPath);

  const { title, level } = useAppSelector((state: RootState) =>
    selectNodeData(state, itemId)
  );

  const highlightType = usePathHighlighting(itemPath);
  const { isExpanded, isExpandable, handleExpand } = useExpandableItem(itemId);
  const { handleSelect } = useSelectableItems(itemPath);

  const handleInteraction = useCallback(() => {
    return isExpandable ? handleExpand() : handleSelect();
  }, [handleExpand, handleSelect, isExpandable]);

  const handleKeyDown = useKeyboardNavigation({ Enter: handleInteraction });

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
