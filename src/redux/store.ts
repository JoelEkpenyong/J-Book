import { configureStore } from "@reduxjs/toolkit";
import cellSlice from "./slices/cell";
import thunk from "redux-thunk";
import bundleSlice from "./slices/bundle";

export const store = configureStore({
  reducer: { cell: cellSlice.reducer, bundle: bundleSlice.reducer },
  middleware: (getDefualtMiddleWare) => getDefualtMiddleWare().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
