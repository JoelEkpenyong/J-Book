import { configureStore } from "@reduxjs/toolkit";
import cellSlice from "./slices/cellSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: { cell: cellSlice.reducer },
  middleware: (getDefualtMiddleWare) => getDefualtMiddleWare().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
