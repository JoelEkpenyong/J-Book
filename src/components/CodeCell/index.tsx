import "./style.scss";
import { useEffect } from "react";
import CodeEditor from "./codeEditor";
import Preview from "./Preview";
import Resizable from "../Resizable";
import { ICell } from "../../redux/slices/cell/types";
import { useAppActions } from "../../hooks/useAppActions";
import { useAppSelector } from "../../hooks/useAppSelector";

interface CodeCellProps {
  cell: ICell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useAppActions();
  const bundle = useAppSelector((state) => state.bundle[cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle({ cellId: cell.id, input: cell.content });
      return;
    }

    const timer = setTimeout(async () => {
      createBundle({ cellId: cell.id, input: cell.content });
    }, 800);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell({ id: cell.id, content: value })}
          />
        </Resizable>
        <div className="progress-cover-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
