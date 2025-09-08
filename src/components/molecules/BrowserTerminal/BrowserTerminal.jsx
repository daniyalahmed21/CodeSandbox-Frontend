import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import "@xterm/xterm/css/xterm.css"; // required styles
import { useEffect, useRef, useState } from 'react';
import { AttachAddon } from '@xterm/addon-attach';
import { useTerminalSocketStore } from '../../../store/terminalSocketStore';

export const BrowserTerminal = () => {

    const terminalRef = useRef(null);
    const [fontSize, setFontSize] = useState(14);
    // const socket = useRef(null);
    // const {projectId: projectIdFromUrl } = useParams();

    const { terminalSocket } = useTerminalSocketStore();
    

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
            fontSize,
            fontFamily: "Fira Code",
            convertEol: true, // convert CRLF to LF
        });

        term.open(terminalRef.current);
        let fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        fitAddon.fit();

        const handleResize = () => {
            try { fitAddon.fit(); } catch {}
        };
        window.addEventListener('resize', handleResize);

        if(terminalSocket) {
            const attach = () => {
                const attachAddon = new AttachAddon(terminalSocket);
                term.loadAddon(attachAddon);
            };

            if (terminalSocket.readyState === WebSocket.OPEN) {
                attach();
            } else {
                terminalSocket.onopen = attach;
            }
        }


        return () => {
            term.dispose();
            terminalSocket?.close();
            window.removeEventListener('resize', handleResize);
        }
    }, [terminalSocket, fontSize])

    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "flex", gap: 8, padding: "4px 8px", background: "#1f2937", borderTop: "1px solid #374151" }}>
                <button onClick={() => { const el = terminalRef.current?.querySelector('.xterm'); if(el){ const sel = window.getSelection(); const range = document.createRange(); range.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(range); document.execCommand('copy'); sel.removeAllRanges(); } }} style={{ color: "#e5e7eb", fontFamily: "Fira Code", fontSize: 12 }}>Copy</button>
                <button onClick={() => setFontSize((s) => Math.max(10, s - 1))} style={{ color: "#e5e7eb", fontFamily: "Fira Code", fontSize: 12 }}>A-</button>
                <button onClick={() => setFontSize((s) => Math.min(24, s + 1))} style={{ color: "#e5e7eb", fontFamily: "Fira Code", fontSize: 12 }}>A+</button>
                <button onClick={() => { const el = terminalRef.current; el && (el.querySelector('.xterm-rows').textContent = ''); }} style={{ color: "#e5e7eb", fontFamily: "Fira Code", fontSize: 12 }}>Clear</button>
            </div>
            <div
                ref={terminalRef}
                style={{ width: "100%", height: "28vh" }}
                className='terminal'
                id="terminal-container"
            />
        </div>
    )
}