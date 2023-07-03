import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { TreeSlice } from "../../entities/tree/tree.slice";
import { ExpandableItemsSlice } from "../../features/use-expandable-items";
import { SelectableItemsSlice } from "../../features/use-selectable-items";
import { FilterItemsSlice } from "../../features/use-filter-items/filter-items.slice";

const rootReducer = combineReducers({
  [TreeSlice.name]: TreeSlice.reducer,
  [ExpandableItemsSlice.name]: ExpandableItemsSlice.reducer,
  [SelectableItemsSlice.name]: SelectableItemsSlice.reducer,
  [FilterItemsSlice.name]: FilterItemsSlice.reducer,
  [SelectableItemsSlice.name]: SelectableItemsSlice.reducer,
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
