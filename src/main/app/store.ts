import {
  configureStore,
  combineReducers,
  PreloadedState,
} from "@reduxjs/toolkit";

import { PageApi } from "../entities";

const rootReducer = combineReducers({
  [PageApi.reducerPath]: PageApi.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(PageApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
