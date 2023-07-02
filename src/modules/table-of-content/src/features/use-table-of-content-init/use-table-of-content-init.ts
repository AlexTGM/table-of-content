import { useEffect } from "react";
import { InputData } from ".";
import { useAppDispatch } from "../../shared";
import { TreeSlice, buildTree } from "../../entities";

export const useTableOfContentInit = (inputData: InputData) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(TreeSlice.actions.setRawData(inputData.entities.pages));

    const rootNodes = buildTree({
      getChildren: (nodeId) => inputData.entities.pages[nodeId].pages,
      topLevelIds: inputData.topLevelIds,
    });

    dispatch(TreeSlice.actions.setRootNodes(rootNodes));
  }, [dispatch, inputData]);
};
