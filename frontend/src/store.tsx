import { configureStore } from "@reduxjs/toolkit";
import AddVarietySlice from "./features/AddVarietySlice";

export const Store = configureStore({
  reducer: {
    variety: AddVarietySlice,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
