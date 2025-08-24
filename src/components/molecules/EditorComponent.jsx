import React, { useEffect,useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import ThemeSelector from "Components/atoms/ThemeSelector";


const EditorComponent = () => {
  const monaco = useMonaco();
  const [theme, setTheme] = useState("vs-dark"); 

  useEffect(() => {
    if (!monaco) return;

    const isMonacoBuiltInTheme = ['vs', 'vs-dark', 'hc-black'].includes(theme);

    if (isMonacoBuiltInTheme) {
      monaco.editor.setTheme(theme);
      return;
    }

    // Load custom themes from a JSON file
    const defineAndSetCustomTheme = async () => {
      try {
        // Capitalize the first letter and replace hyphens with spaces for the file path
        // e.g., 'github-dark' becomes 'GitHub-Dark.json'
        const themeFileName = theme.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('-');
        const response = await fetch(`/themes/${themeFileName}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to load theme file: ${themeFileName}.json`);
        }

        const themeData = await response.json();

        // Define the custom theme in Monaco, using the lowercase name as the ID
        monaco.editor.defineTheme(theme, themeData);
        // Set the active theme
        monaco.editor.setTheme(theme);

      } catch (error) {
        console.error(`Failed to load and set theme "${theme}":`, error);
        // Fallback to a default theme if a custom one fails to load
        monaco.editor.setTheme('vs-dark'); 
      }
    };

    defineAndSetCustomTheme();

  }, [monaco, theme]); // Re-run effect whenever the monaco instance or theme state changes

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-slate-800">
      <ThemeSelector
        onThemeChange={handleThemeChange}
        currentTheme={theme}
      />
      <div className="flex-grow">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={`// Current Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}\nfunction greet(name) {\n  return "Hello " + name;\n}`}
          theme={theme} // Set theme dynamically based on state
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