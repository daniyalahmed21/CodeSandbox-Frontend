import { useEffect, useRef } from "react";
// import { Input, Row } from "antd"; // Removed Ant Design components
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { usePortStore } from "../../../store/portStore";
import { ReloadOutlined } from "@ant-design/icons";

export const Browser = ({ projectId }) => {
  const browserRef = useRef(null);
  const { port } = usePortStore();
  const { editorSocket } = useEditorSocketStore();

  useEffect(() => {
    if (!port) {
      editorSocket?.emit("getPort", {
        containerName: projectId,
      });
    }
  }, [port, editorSocket]);

  if (!port) {
    return (
      <div className="flex justify-center items-center bg-[#282a36] h-full text-white">
        Loading....
      </div>
    );
  }

  function handleRefresh() {
    if (browserRef.current) {
      const oldAddr = browserRef.current.src;
      browserRef.current.src = oldAddr;
    }
  }

  return (
    // Replaced Ant Design Row with a div and Tailwind classes
    <div className="flex flex-col bg-[#22212b] w-full h-full">
      {/* Replaced Ant Design Input with a div and an input element */}
      <div className="flex items-center bg-[#282a35] px-2 h-10">
        <button onClick={handleRefresh} className="mr-2">
          {/* Ant Design icon can be used directly */}
          <ReloadOutlined className="text-[#959eba] hover:text-white transition-colors duration-200" />
        </button>
        <input
          type="text"
          readOnly
          defaultValue={`http://localhost:${port}`}
          className="flex-1 bg-[#282a35] px-2 border-none outline-none h-full font-mono text-white"
        />
      </div>
      <iframe
        ref={browserRef}
        src={`http://localhost:${port}`}
        className="border-none w-full h-[calc(100vh-2.5rem)]" // Use calc to account for the address bar height (h-10 = 2.5rem)
      />
    </div>
  );
};