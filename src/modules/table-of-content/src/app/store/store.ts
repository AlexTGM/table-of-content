import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { TreeSlice } from "../../entities/tree/tree.slice";
import { ExpandableItemsSlice } from "../../features/use-expandable-items";
import { SelectableItemSlice } from "../../features/use-selectable-items";

const rootReducer = combineReducers({
  [TreeSlice.name]: TreeSlice.reducer,
  [ExpandableItemsSlice.name]: ExpandableItemsSlice.reducer,
  [SelectableItemSlice.name]: SelectableItemSlice.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
