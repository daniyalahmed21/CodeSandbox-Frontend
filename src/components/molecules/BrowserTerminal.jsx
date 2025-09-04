import "@xterm/xterm/css/xterm.css";

import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import { useParams } from "react-router";
import { AttachAddon } from "@xterm/addon-attach";
export const BrowserTerminal = () => {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);
  const { id: projectId } = useParams();

  useEffect(() => {
    let isMounted = true;

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#282a37",
        foreground: "#f8f8f3",
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

    socketRef.current = new WebSocket(
      `ws://localhost:3000/Terminal?projectId=${projectId}`
    );
    socketRef.current.onopen = () => {
      const attachAddon = new AttachAddon(socketRef.current);
      term.loadAddon(attachAddon);
    };

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      term.dispose();
      socketRef.current?.close();
    };
  }, [projectId]);

  return (
    <div
      ref={terminalRef}
      style={{ width: "100vw" }}
      className="border-gray-700 border-t h-1/4"
    />
  );
};

export default BrowserTerminal;
