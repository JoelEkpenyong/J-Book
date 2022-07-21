import { useAppSelector } from "../../hooks/useAppSelector";
import CellItem from "../CellItem";

const CellList: React.FC = () => {
  const cells = useAppSelector(({ cell: { order, data } }) => order.map((id) => data[id]));

  return (
    <>
      {cells.map((cell) => (
        <CellItem key={cell.id} cell={cell} />
      ))}
    </>
  );
};

export default CellList;
