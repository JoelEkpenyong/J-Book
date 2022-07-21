import { useAppActions } from "../../hooks/useAppActions";
import "./style.scss";

interface AddCellProps {
  currentCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ currentCellId, forceVisible }) => {
  const { insertCellAfter } = useAppActions();

  return (
    <div className={`add-cell-wrapper ${forceVisible ? "force-visible" : ""}`}>
      <div className="add-buttons">
        <button
          className="button is-primary is-rounded is-small"
          onClick={() => {
            insertCellAfter({ id: currentCellId, type: "code" });
          }}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-primary is-rounded is-small"
          onClick={() => {
            insertCellAfter({ id: currentCellId, type: "text" });
          }}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
