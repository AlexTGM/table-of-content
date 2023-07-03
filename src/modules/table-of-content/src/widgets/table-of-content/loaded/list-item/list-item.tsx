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

export const ListItem = React.memo(({ itemPath }: { itemPath: string }) => {
  const itemId = getNodeId(itemPath);

  const { title, level } = useAppSelector((state: RootState) =>
    selectNodeData(state, itemId)
  );

  const { isExpanded, isExpandable, handleExpand } = useExpandableItem(itemId);
  const { selectedItemPath, handleSelect } = useSelectableItems(itemPath);

  const highlightType = usePathHighlighting(selectedItemPath, itemPath);

  const handleInteraction = useCallback(() => {
    return isExpandable ? handleExpand() : handleSelect();
  }, [handleExpand, handleSelect, isExpandable]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.code === "Enter") handleInteraction();
    },
    [handleInteraction]
  );

  return (
    <li
      key={itemId}
      data-testid={`list-item-${itemId}`}
      onClick={handleInteraction}
    >
      <InteractiveTableOfContentNode
        tabIndex={2}
        onKeyDown={handleKeyDown}
        $level={level + 1}
        $highlightType={highlightType}
        data-testid={`div-item-${itemId}`}
      >
        {isExpandable && <Expander isExpanded={isExpanded} />}
        {title}
      </InteractiveTableOfContentNode>
    </li>
  );
});
