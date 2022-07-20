import { configureStore } from "@reduxjs/toolkit";
import cellReducer from "./slices/cellSlice";

export const store = configureStore({
  reducer: { cell: cellReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
