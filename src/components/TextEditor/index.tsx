import "./style.scss";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";

const TextEditor: React.FC = () => {
  const [value, setValue] = useState<string | undefined>("Hello World");
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
          value={value}
          onChange={(e) => {
            setValue(e);
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
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
