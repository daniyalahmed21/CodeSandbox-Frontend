import React, { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import ThemeSelector from "Components/atoms/ThemeSelector";
import { useActiveFileTabStore } from "Store/ActiveFileTabStore";
import { useEditorSocketStore } from "Store/editorSocketStore";
import { getLanguageFromExtension } from "Utils/EditorUtils";

import { customThemes } from "../../../themes/index";


let timerId;

const EditorComponent = () => {
  const monaco = useMonaco();
  const [theme, setTheme] = useState("vs-dark");
  const { activeFileTab } = useActiveFileTabStore();
  const { socketEditor } = useEditorSocketStore();

  useEffect(() => {
    if (!monaco) return;
    Object.entries(customThemes).forEach(([name, data]) => {
      monaco.editor.defineTheme(name, data);
    });
    monaco.editor.setTheme(theme);
  }, [monaco, theme]);

  const handleOnChange = (value) => {
    if (!activeFileTab?.path) return;

    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      socketEditor.emit("writeFile", {
        data: value,
        pathOfFileOrFolder: activeFileTab.path,
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col bg-slate-800 w-full h-screen">
      <ThemeSelector onThemeChange={setTheme} currentTheme={theme} />
      <div className="flex-grow">
        <Editor
          height="100%"
          value={activeFileTab?.value ?? "// Your code goes here"}
          language={getLanguageFromExtension(activeFileTab?.extension)}
          theme={theme}
          onChange={handleOnChange}
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
