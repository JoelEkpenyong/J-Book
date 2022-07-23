import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bundler from "../../../helpers/bundler";
import { IBundleState } from "./types";

const initialState: IBundleState = {};

export const createBundle = createAsyncThunk(
  "create_bundle",
  async ({ cellId, input }: { cellId: string; input: string }) => {
    return await bundler(input);
  }
);

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBundle.pending, (state, action) => {
      state[action.meta.arg.cellId] = {
        loading: true,
        code: "",
        err: "",
      };
    });
    builder.addCase(createBundle.fulfilled, (state, action) => {
      state[action.meta.arg.cellId] = {
        ...action.payload,
        loading: false,
      };
    });
    builder.addCase(createBundle.rejected, (state, action) => {
      state[action.meta.arg.cellId] = {
        loading: false,
        code: "",
        err: action.error.message as string,
      };
    });
  },
});

export default bundleSlice;
