import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useEffect, useState } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal";
import { useTerminalSocketStore } from "../store/terminalSocketStore";
import { Browser } from "../components/organisms/Browser/Browser";
// import { Button } from "antd"; // Removed Ant Design Button
import { Allotment } from "allotment";
import "allotment/dist/style.css";

export const ProjectPlayground = () => {
  const { projectId: projectIdFromUrl } = useParams();
  const { setProjectId, projectId } = useTreeStructureStore();
  const { setEditorSocket } = useEditorSocketStore();
  const { terminalSocket, setTerminalSocket } = useTerminalSocketStore();
  const [loadBrowser, setLoadBrowser] = useState(false);

  useEffect(() => {
    if (projectIdFromUrl) {
      setProjectId(projectIdFromUrl);

      const editorSocketConn = io(
        `${import.meta.env.VITE_BACKEND_URL}/editor`,
        {
          query: {
            projectId: projectIdFromUrl,
          },
        }
      );

      try {
        const ws = new WebSocket(
          "ws://localhost:4000/terminal?projectId=" + projectIdFromUrl
        );
        setTerminalSocket(ws);
      } catch (error) {
        console.log("error in ws", error);
      }
      setEditorSocket(editorSocketConn);
    }
  }, [setProjectId, projectIdFromUrl, setEditorSocket, setTerminalSocket]);

  return (
    <>
      {/* Replaced 'style={{ display: "flex" }}' with 'className="flex h-screen"' */}
      <div className="flex h-screen">
        {projectId && (
          // Converted inline styles to Tailwind classes
          <div className="bg-[#333254] pt-1 pr-2 min-w-[250px] max-w-[25%] h-full overflow-auto">
            <TreeStructure />
          </div>
        )}
        {/* Converted inline styles to Tailwind classes */}
        <div className="w-full h-full">
          <Allotment>
            {/* Converted inline styles to Tailwind classes */}
            <div className="flex flex-col bg-[#282a36] w-full h-full">
              <Allotment vertical={true}>
                <EditorComponent />
                <BrowserTerminal />
              </Allotment>
            </div>
            {/* The container for the browser button and component */}
            <div className="flex flex-col justify-center items-center bg-gray-800 p-4">
              {/* Replaced Ant Design Button with a styled HTML button */}
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white transition duration-200 ease-in-out"
                onClick={() => setLoadBrowser(true)}
              >
                Load my browser
              </button>
              {loadBrowser && projectIdFromUrl && terminalSocket && (
                <Browser projectId={projectIdFromUrl} />
              )}
            </div>
          </Allotment>
        </div>
      </div>
    </>
  );
};
