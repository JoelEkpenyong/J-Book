import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICellState, IUpdateCellPayload } from "./types";

const initialState: ICellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    updateCell: (state: ICellState, action: PayloadAction<IUpdateCellPayload>) => {
      state = {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: {
            ...state.data[action.payload.id],
            content: action.payload.content,
          },
        },
      };
    },
  },
});

export const { updateCell } = cellSlice.actions;

export default cellSlice.reducer;
