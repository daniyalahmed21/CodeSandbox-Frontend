import "@xterm/xterm/css/xterm.css";

import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";

export const BrowserTerminal = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#282a37",
        foreground: "#f8f8f3",
        cursor: "#f8f8f3",
        cursorAccent: "#282a37",
        red: "#ff5544",
        green: "#50fa7c",
        yellow: "#f1fa8c",
        cyan: "#8be9fd",
      },
      fontSize: 16,
      fontFamily: "Fira Code",
      convertEol: true,
    });

    term.open(terminalRef.current);
    let fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();
  });

  return (
    <div
        ref={terminalRef}
        style={{
            width: "100vw",
        }}
        className="h-1/4 border-t border-gray-700"
    >

    </div>
)
};

export default BrowserTerminal;
