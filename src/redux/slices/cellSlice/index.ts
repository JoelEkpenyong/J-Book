import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randomId } from "../../../helpers/utils";
import {
  ICell,
  ICellState,
  IDeleteCellPayload,
  IInsertCellAfterPayload,
  IMoveCellPayload,
  IUpdateCellPayload,
} from "./types";

const initialState: ICellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

export const cellSlice = createSlice({
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
      const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

      state.order[currentIndex] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },

    insertCellAfter: (state: ICellState, action: PayloadAction<IInsertCellAfterPayload>) => {
      const cell: ICell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;
      if (!action.payload.id) {
        state.order.unshift(cell.id);
      } else {
        const index = state.order.findIndex((id) => id === action.payload.id);
        state.order.splice(index + 1, 0, cell.id);
      }
    },
  },
});

export default cellSlice;
