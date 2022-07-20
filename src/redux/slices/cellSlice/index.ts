import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICell,
  ICellState,
  IDeleteCellPayload,
  IInsertCellBeforePayload,
  IMoveCellPayload,
  IUpdateCellPayload,
} from "./types";

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
      const { id, content } = action.payload;
      state.data[id].content = content;
    },

    deleteCell: (state: ICellState, action: PayloadAction<IDeleteCellPayload>) => {
      delete state.data[action.payload.id];
      state.order = state.order.filter((id) => id !== action.payload.id);
    },

    moveCell: (state: ICellState, action: PayloadAction<IMoveCellPayload>) => {
      const { direction, id } = action.payload;
      const currentIndex = state.order.findIndex((c) => c === id);
      if (currentIndex === 0 || currentIndex === state.order.length - 1) return;
      const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

      state.order[currentIndex] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },

    insertCellBefore: (state: ICellState, action: PayloadAction<IInsertCellBeforePayload>) => {
      const cell: ICell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;
      if (!action.payload.id) {
        state.order.push(cell.id);
      } else {
        const index = state.order.findIndex((id) => id === action.payload.id);
        state.order.splice(index, 0, cell.id);
      }
    },
  },
});

export const { updateCell, insertCellBefore, deleteCell, moveCell } = cellSlice.actions;

export default cellSlice.reducer;

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};
