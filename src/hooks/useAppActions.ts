import { bindActionCreators } from "redux";
import cellSlice from "../redux/slices/cellSlice";
import { useAppDispatch } from "./useAppDispatch";

export const useAppActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(cellSlice.actions, dispatch);
};
