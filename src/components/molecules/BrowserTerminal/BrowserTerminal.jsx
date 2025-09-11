import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef, useState } from 'react';
import { AttachAddon } from '@xterm/addon-attach';
import { useTerminalSocketStore } from '../../../store/terminalSocketStore';

export const BrowserTerminal = () => {
    const terminalRef = useRef(null);
    const containerRef = useRef(null);
    const { terminalSocket } = useTerminalSocketStore();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const term = new Terminal({
            cursorBlink: true,
            cursorStyle: 'block',
            bellStyle: 'none',
            theme: {
                // VS Code Dark+ theme colors
                background: '#1e1e1e',
                foreground: '#cccccc',
                cursor: '#ffffff',
                cursorAccent: '#1e1e1e',
                selectionBackground: '#264f78',
                
                // ANSI colors matching VS Code
                black: '#000000',
                red: '#f44747',
                green: '#608b4e',
                yellow: '#dcdcaa',
                blue: '#569cd6',
                magenta: '#c586c0',
                cyan: '#4ec9b0',
                white: '#cccccc',
                
                // Bright colors
                brightBlack: '#666666',
                brightRed: '#f44747',
                brightGreen: '#608b4e',
                brightYellow: '#dcdcaa',
                brightBlue: '#569cd6',
                brightMagenta: '#c586c0',
                brightCyan: '#4ec9b0',
                brightWhite: '#ffffff',
            },
            fontSize: 14,
            fontFamily: '"Cascadia Code", "Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", monospace',
            fontWeight: 400,
            fontWeightBold: 700,
            lineHeight: 1.2,
            letterSpacing: 0,
            convertEol: true,
            allowTransparency: false,
            minimumContrastRatio: 4.5,
            scrollback: 10000,
            tabStopWidth: 4,
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        if (terminalRef.current) {
            term.open(terminalRef.current);
            
            // Initial fit
            setTimeout(() => {
                fitAddon.fit();
            }, 0);
        }

        // Create a ResizeObserver to automatically fit the terminal
        const observer = new ResizeObserver(() => {
            if (term && terminalRef.current) {
                fitAddon.fit();
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        // Handle socket connection
        if (terminalSocket) {
            terminalSocket.onopen = () => {
                setIsConnected(true);
                const attachAddon = new AttachAddon(terminalSocket);
                term.loadAddon(attachAddon);
            };

            terminalSocket.onclose = () => {
                setIsConnected(false);
            };

            terminalSocket.onerror = () => {
                setIsConnected(false);
            };
        }

        // Focus terminal when clicked
        const handleClick = () => {
            term.focus();
        };

        if (terminalRef.current) {
            terminalRef.current.addEventListener('click', handleClick);
        }

        // Cleanup function
        return () => {
            observer.disconnect();
            if (terminalRef.current) {
                terminalRef.current.removeEventListener('click', handleClick);
            }
            term.dispose();
            terminalSocket?.close();
        };
    }, [terminalSocket]);

    return (
        <div 
            ref={containerRef}
            className="flex flex-col bg-[#1e1e1e] shadow-lg border border-[#3c3c3c] rounded-md h-full overflow-hidden"
        >
            {/* Terminal header bar - VS Code style */}
            <div className="flex justify-between items-center bg-[#2d2d30] px-4 py-2 border-[#3c3c3c] border-b">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                        {/* Terminal icon */}
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            className="text-[#cccccc]"
                            fill="currentColor"
                        >
                            <path d="M0 2v12h16V2H0zm15 11H1V5h14v8zm0-9H1V3h14v1z"/>
                            <path d="M2 6h1v1H2V6zm2 0h1v1H4V6zm2 0h1v1H6V6z"/>
                        </svg>
                        <span className="font-medium text-[#cccccc] text-sm">Terminal</span>
                    </div>
                    
                    {/* Connection status indicator */}
                    <div className="flex items-center space-x-1">
                        <div 
                            className={`w-2 h-2 rounded-full ${
                                isConnected ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        />
                        <span className="text-[#8c8c8c] text-xs">
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>
                </div>

                {/* Terminal controls */}
                <div className="flex items-center space-x-2">
                    <button
                        className="hover:bg-[#3c3c3c] p-1 rounded text-[#8c8c8c] hover:text-[#cccccc] transition-colors"
                        title="Split terminal"
                    >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 1V0H7v1H2v14h5V8h2v7h5V1H8zM7 14H3V2h4v5H6v1h1v6zm1-6V2h4v12h-4V8z"/>
                        </svg>
                    </button>
                    <button
                        className="hover:bg-[#3c3c3c] p-1 rounded text-[#8c8c8c] hover:text-[#cccccc] transition-colors"
                        title="Kill terminal"
                    >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="m8.746 8 3.1-3.1a.527.527 0 1 0-.746-.746L8 7.254l-3.1-3.1a.527.527 0 1 0-.746.746L7.254 8l-3.1 3.1a.527.527 0 1 0 .746.746L8 8.746l3.1 3.1a.527.527 0 1 0 .746-.746L8.746 8z"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Terminal content area */}
            <div className="relative flex-1 bg-[#1e1e1e] overflow-hidden">
                <div
                    ref={terminalRef}
                    className="absolute inset-0 p-2"
                    style={{
                        // Ensure proper font rendering
                        fontFeatureSettings: '"liga" 0, "calt" 0',
                        textRendering: 'optimizeSpeed',
                    }}
                />
                
                {/* Loading overlay when not connected */}
                {!isConnected && (
                    <div className="absolute inset-0 flex justify-center items-center bg-[#1e1e1e] bg-opacity-90">
                        <div className="flex flex-col items-center space-y-3 text-[#8c8c8c]">
                            <div className="border-[#569cd6] border-2 border-t-transparent rounded-full w-6 h-6 animate-spin" />
                            <span className="text-sm">Connecting to terminal...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Status bar */}
            <div className="bg-[#007acc] px-4 py-1">
                <div className="flex justify-between items-center text-white text-xs">
                    <div className="flex items-center space-x-4">
                        <span>Terminal</span>
                        {terminalSocket && (
                            <span className="opacity-80">
                                {terminalSocket.url || 'WebSocket'}
                            </span>
                        )}
                    </div>
                    <div className="opacity-80">
                        Ready
                    </div>
                </div>
            </div>
        </div>
    );
};