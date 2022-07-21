import { useEffect, useState } from "react";
import CodeEditor from "./codeEditor";
import Preview from "./Preview";
import bundler from "../../helpers/bundler";
import Resizable from "../Resizable";
import { ICell } from "../../redux/slices/cellSlice/types";
import { useAppActions } from "../../hooks/useAppActions";

interface CodeCellProps {
  cell: ICell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { updateCell } = useAppActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setCode(output.code);
      setError(output.err);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell({ id: cell.id, content: value })}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
