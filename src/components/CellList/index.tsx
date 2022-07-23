import "./style.scss";
import { Fragment } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import AddCell from "../Addcell";
import CellItem from "../CellItem";

const CellList: React.FC = () => {
  const cells = useAppSelector(({ cell: { order, data } }) => order.map((id) => data[id]));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} currentCellId={null} />

      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellItem cell={cell} />
          <AddCell currentCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
