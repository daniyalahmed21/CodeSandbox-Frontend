import "@xterm/xterm/css/xterm.css";

import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import { useParams } from "react-router";
import { io } from "socket.io-client";

export const BrowserTerminal = () => {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { id: projectId } = useParams();

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
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();
  
    const handleResize = () => fitAddon.fit();
    window.addEventListener("resize", handleResize);
  
    socketRef.current = io(`${VITE_BACKEND_URL}/Terminal`, {
      query: { projectId },
    });
  
    socketRef.current.on("shell-output", (data) => {
      term.write(data);
    });
  
    term.onData((data) => {
        console.log("Terminal input:", data);
      socketRef.current.emit("shell-input", data);
    });
  
    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
      socketRef.current.disconnect();
    };
  }, []);
  

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100vw",
      }}
      className="border-gray-700 border-t h-1/4"
    ></div>
  );
};

export default BrowserTerminal;
