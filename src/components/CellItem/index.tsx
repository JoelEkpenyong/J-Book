import { ICell } from "../../redux/slices/cellSlice/types";
import ActionBar from "../ActionBar";
import CodeCell from "../CodeCell";
import TextEditor from "../TextEditor";

interface CellItemProps {
  cell: ICell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  return (
    <div>
      <ActionBar id={cell.id} />
      {cell.type === "code" ? <CodeCell cell={cell} /> : <TextEditor cell={cell} />}
    </div>
  );
};

export default CellItem;
