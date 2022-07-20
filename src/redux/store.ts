import { configureStore } from "@reduxjs/toolkit";
import cellReducer from "./slices/cellSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: { cell: cellReducer },
  middleware: (getDefualtMiddleWare) => getDefualtMiddleWare().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
