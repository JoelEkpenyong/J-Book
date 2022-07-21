import { useAppActions } from "../../hooks/useAppActions";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useAppActions();

  return (
    <div>
      <button
        onClick={() => {
          moveCell({ id, direction: "up" });
        }}
      >
        Up
      </button>
      <button
        onClick={() => {
          moveCell({ id, direction: "down" });
        }}
      >
        Down
      </button>
      <button
        onClick={() => {
          deleteCell({ id });
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ActionBar;
