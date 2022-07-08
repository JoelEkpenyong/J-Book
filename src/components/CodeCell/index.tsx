import { useEffect, useState } from "react";
import CodeEditor from "./codeEditor";
import Preview from "./Preview";
import bundler from "../../helpers/bundler";
import Resizable from "../Resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue="const a = 1" onChange={(value) => setInput(value)} />
        </Resizable>
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}

        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
