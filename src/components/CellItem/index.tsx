import "./style.scss";
import { ICell } from "../../redux/slices/cell/types";
import ActionBar from "../ActionBar";
import CodeCell from "../CodeCell";
import TextEditor from "../TextEditor";

interface CellItemProps {
  cell: ICell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  return (
    <div className="cell-item">
      {cell.type === "code" ? (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>
      )}
    </div>
  );
};

export default CellItem;
