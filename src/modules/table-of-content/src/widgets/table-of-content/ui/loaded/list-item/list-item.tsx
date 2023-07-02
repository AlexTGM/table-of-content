import { useState } from "react";
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

  const { title } = useAppSelector((state: RootState) => selectNodeData(state, itemId));

  const { isExpandable } = useExpandableItem(itemId);

  return (
    <li key={itemId}>
      <InteractiveTableOfContentNode>
        {isExpandable && <Expander isExpanded={false} />}
        {title}
      </InteractiveTableOfContentNode>
    </li>
  );
};
