import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { createBundle } from "../redux/slices/bundle";
import cellSlice from "../redux/slices/cell";
import { useAppDispatch } from "./useAppDispatch";

export const useAppActions = () => {
  const dispatch = useAppDispatch();

  const actions = useMemo(
    () => ({
      ...cellSlice.actions,
      createBundle,
    }),
    []
  );

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};
