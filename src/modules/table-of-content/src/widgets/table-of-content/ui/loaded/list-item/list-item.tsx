import { useState, useCallback } from "react";
import { Expander } from "../../../../../../../ui-kit";
import { selectNodeData } from "../../../../../entities";
import { useExpandableItem } from "../../../../../features";
import {
  getNodeId,
  useAppSelector,
  InteractiveTableOfContentNode,
} from "../../../../../shared";

export const ListItem = ({ itemPath }: { itemPath: string }) => {
  const [itemId] = useState(getNodeId(itemPath));

  const { title, level } = useAppSelector((state: RootState) =>
    selectNodeData(state, itemId)
  );

  const { isExpanded, isExpandable, handleExpand } = useExpandableItem(itemId);

  const handleInteraction = useCallback(() => {
    return isExpandable && handleExpand();
  }, [handleExpand, isExpandable]);

  return (
    <li
      key={itemId}
      data-testid={`list-item-${itemId}`}
      onClick={handleInteraction}
    >
      <InteractiveTableOfContentNode
        data-testid={`div-item-${itemId}`}
        style={{ paddingLeft: (level + 1) * 16 }}
      >
        {isExpandable && <Expander isExpanded={isExpanded} />}
        {title}
      </InteractiveTableOfContentNode>
    </li>
  );
};
