import { ICell } from "../../redux/slices/cellSlice/types";
import CodeCell from "../CodeCell";
import TextEditor from "../TextEditor";

interface CellItemProps {
  cell: ICell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  return <div>{cell.type === "code" ? <CodeCell cell={cell} /> : <TextEditor />}</div>;
};

export default CellItem;
