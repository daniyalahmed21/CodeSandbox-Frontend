import React, { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import ThemeSelector from "Components/atoms/ThemeSelector";

import {customThemes} from "../../../themes/index"

const EditorComponent = () => {
  const monaco = useMonaco();
  const [theme, setTheme] = useState("vs-dark");

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
          defaultLanguage="javascript"
          defaultValue={`function greet(name) {\n  return "Hello " + name;\n}`}
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
