import "./style.scss";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { ICell } from "../../redux/slices/cellSlice/types";
import { useAppActions } from "../../hooks/useAppActions";

interface TextEditorProps {
  cell: ICell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { updateCell } = useAppActions();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current) return;

      if (!ref.current.contains(e.target as Node)) {
        setEditing(false);
      }
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor
          value={cell.content}
          onChange={(e) => {
            updateCell({ id: cell.id, content: e || "" });
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="text-editor card"
      onClick={() => {
        setEditing(true);
      }}
    >
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
