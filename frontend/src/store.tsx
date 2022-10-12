import { configureStore } from "@reduxjs/toolkit";
import AddVarietySlice from "./features/AddVarietySlice";
import { apiSlice } from "./features/VarietyApis";
import CreateVarietySlice from "./features/CreateVarietySlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const Store = configureStore({
  reducer: {
    addVariety: AddVarietySlice,
    createVariety: CreateVarietySlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
// setupListeners(Store.dispatch);
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
