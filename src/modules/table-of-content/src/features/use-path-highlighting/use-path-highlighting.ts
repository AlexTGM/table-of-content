import { useMemo } from "react";
import { HighlightType, getPathNodes } from "../../shared";

export const usePathHighlighting = (
  selectedPath: string | null,
  nodePath: string
): HighlightType => {
  const nodes = getPathNodes(selectedPath ?? "");

  const ancestorId = nodes[0];
  const parentId = nodes[nodes.length - 2];
  const activeId = nodes[nodes.length - 1];

  return useMemo<HighlightType>(() => {
    if (activeId && nodePath.includes(activeId)) return "active";
    if (ancestorId !== parentId && nodePath.includes(parentId)) return "parent";
    if (ancestorId && nodePath.includes(ancestorId)) return "ancestor";

    return "none";
  }, [activeId, ancestorId, nodePath, parentId]);
};
