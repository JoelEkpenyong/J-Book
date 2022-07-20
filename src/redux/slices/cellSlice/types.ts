export type CellTypes = "code" | "text";

export type direction = "up" | "down";

export interface ICell {
  id: string;
  type: CellTypes;
  content: string;
}

export interface ICellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: ICell;
  };
}

export interface IUpdateCellPayload {
  id: string;
  content: string;
}

export interface IMoveCellPayload {
  id: string;
  direction: direction;
}

export interface IDeleteCellPayload {
  id: string;
}

export interface IInsertCellBeforePayload {
  id: string | null;
  type: CellTypes;
}
