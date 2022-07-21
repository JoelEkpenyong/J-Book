import { configureStore } from "@reduxjs/toolkit";
import cellSlice, { insertCellBefore } from "./slices/cellSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: { cell: cellSlice.reducer },
  middleware: (getDefualtMiddleWare) => getDefualtMiddleWare().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

store.dispatch(insertCellBefore({ id: null, type: "code" }));
store.dispatch(insertCellBefore({ id: null, type: "text" }));

console.log(store.getState());
