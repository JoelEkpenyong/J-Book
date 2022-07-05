import "./style.scss";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";
interface CodeEditorProps {
  initialValue: string;
  theme?: "vs-dark" | "light";
  height?: string | number;
  language?: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  height = "500px",
  theme = "vs-dark",
  language = "javascript",
  onChange,
}) => {
  const monacoEditorRef = useRef<editor.IStandaloneCodeEditor>();

  const formatCode = () => {
    const unformatted = monacoEditorRef.current?.getModel()?.getValue();
    if (!unformatted) return;

    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    monacoEditorRef.current?.setValue(formatted);
  };

  const onEditorDidMount: OnMount = (editor, monaco) => {
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
      monacoEditorRef.current = editor;
    });
    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={formatCode}>
        Format
      </button>
      <MonacoEditor
        onMount={onEditorDidMount}
        value={initialValue}
        height={height}
        language={language}
        theme={theme}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
