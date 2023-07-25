import { useEffect } from "react";
import { selectSelectedItemPath } from ".";
import { useAppSelector, getNodeId } from "../../shared";

export const useSelectedPathUpdate = (
  onSelect: (selectedPageId: string) => void
) => {
  const selectedPath = useAppSelector(selectSelectedItemPath);

  useEffect(() => {
    selectedPath && onSelect(getNodeId(selectedPath));
  }, [onSelect, selectedPath]);
};
