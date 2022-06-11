import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  theme?: "dark" | "light";
  height?: string | number;
  language?: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  height = "500px",
  theme = "dark",
  language = "javascript",
  onChange,
}) => {
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
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
  );
};

export default CodeEditor;
