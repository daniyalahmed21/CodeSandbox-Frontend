import React, { useEffect } from "react";
import BrowserTerminal from "Components/molecules/BrowserTerminal";
import EditorComponent from "Components/molecules/EditorComponent";
import TreeStructure from "Components/molecules/TreeStructure";
import { Browser } from "Components/organisms/Browser/Browser";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { useEditorSocketStore } from "Store/editorSocketStore";
import { useTerminalSocketStore } from "Store/terminalSocketStore";

const ProjectPlayground = () => {
  const { id: projectId } = useParams();
  const setSocketEditor = useEditorSocketStore(
    (state) => state.setSocketEditor
  );
  const setTerminalSocket = useTerminalSocketStore(
    (state) => state.setTerminalSocket
  );
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const backendBase = VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    if (!projectId) return;

    // Initialize editor socket
    const editorSocket = io(`${backendBase}/editor`, {
      query: { projectId },
    });
    setSocketEditor(editorSocket);

    // Initialize terminal WebSocket
    const terminalWs = new WebSocket(`ws://localhost:3000/Terminal?projectId=${projectId}`);
    setTerminalSocket(terminalWs);

    return () => {
      editorSocket.disconnect();
      terminalWs.close();
    };
  }, [projectId, setSocketEditor, setTerminalSocket, backendBase]);

  return (
    <div className="flex h-full">
      <TreeStructure />
      <div className="flex flex-col flex-1 overflow-hidden">
        <EditorComponent />
        <Browser projectId={projectId} />
        <BrowserTerminal />
      </div>
    </div>
  );
};

export default ProjectPlayground;
