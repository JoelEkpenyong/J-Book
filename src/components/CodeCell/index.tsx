import { useState } from "react";
import CodeEditor from "../codeEditor";
import Preview from "../Preview";
import bundler from "../../helpers/bundler";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <>
      <CodeEditor initialValue="const a = 1" onChange={(value) => setInput(value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <Preview code={code} />
    </>
  );
};

export default CodeCell;
