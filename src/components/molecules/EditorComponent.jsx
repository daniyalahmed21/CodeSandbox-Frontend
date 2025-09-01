import React, { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import ThemeSelector from "Components/atoms/ThemeSelector";
import { useActiveFileTabStore } from "Store/ActiveFileTabStore";
import { useEditorSocketStore } from "Store/EditorSocketStore";

import { customThemes } from "../../../themes/index";

const EditorComponent = () => {
  const monaco = useMonaco();
  const [theme, setTheme] = useState("vs-dark");
  const { socketEditor } = useEditorSocketStore();
  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

  useEffect(() => {
    if (!socketEditor) return;
  
    const handleReadFile = ({ path, value }) => {
      setActiveFileTab(path, value);
    };
  
    socketEditor.on("readFileSuccess", handleReadFile);
  
    return () => {
      socketEditor.off("readFileSuccess", handleReadFile);
    };
  }, [socketEditor, setActiveFileTab]);
  
  useEffect(() => {
    if (!monaco) return;

    Object.entries(customThemes).forEach(([name, data]) => {
      monaco.editor.defineTheme(name, data);
    });

    monaco.editor.setTheme(theme);
  }, [monaco, theme]);

  return (
    <div className="w-full h-screen flex flex-col bg-slate-800">
      <ThemeSelector onThemeChange={setTheme} currentTheme={theme} />
      <div className="flex-grow">
        <Editor
          height="100%"
          // defaultLanguage="javascript"
          value={
            activeFileTab?.value ? activeFileTab?.value : "// Your code goes here"
          }
          // defaultValue={`function greet(name) {\n  return "Hello " + name;\n}`}
          theme={theme}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 16 },
            automaticLayout: true,
            cursorBlinking: "smooth",
            smoothScrolling: true,
            renderLineHighlight: "all",
          }}
        />
      </div>
    </div>
  );
};

export default EditorComponent;
