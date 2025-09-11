// FileContextMenu.jsx
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useState } from "react";

export const FileContextMenu = ({ x, y, path }) => {
  const { setIsOpen } = useFileContextMenuStore();
  const { editorSocket } = useEditorSocketStore();
  const [hoveredItem, setHoveredItem] = useState(null);

  function handleFileDelete(e) {
    e.preventDefault();
    console.log("Deleting file at", path);
    editorSocket.emit("deleteFile", {
      pathToFileOrFolder: path,
    });
    setIsOpen(false);
  }

  function handleRename(e) {
    e.preventDefault();
    console.log("Renaming file at", path);
    // Add rename functionality here
    setIsOpen(false);
  }

  function handleCopy(e) {
    e.preventDefault();
    console.log("Copying file at", path);
    // Add copy functionality here
    setIsOpen(false);
  }

  return (
    <div
      onMouseLeave={() => {
        setIsOpen(false);
      }}
      className="z-50 fixed bg-[#2d2d30] shadow-2xl border border-[#454545] rounded-md min-w-[200px] overflow-hidden font-normal text-[#cccccc] text-sm"
      style={{
        left: Math.min(x, window.innerWidth - 220),
        top: Math.min(y, window.innerHeight - 200),
      }}
    >
      {/* Context menu items */}
      <div className="py-1">
        <button
          className={`w-full px-4 py-2 text-left hover:bg-[#094771] focus:outline-none flex items-center space-x-3 transition-colors duration-100 ${
            hoveredItem === 'rename' ? 'bg-[#094771]' : ''
          }`}
          onClick={handleRename}
          onMouseEnter={() => setHoveredItem('rename')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.23 1h-1.46L3.52 9.25l-.16.22L1 13.59 2.41 15l4.12-2.36.22-.16L15 4.23V2.77L13.23 1zM2.41 13.59l1.51-3 1.45 1.45-2.96 1.55zm2.69-2.31L4.92 11.1 13.23 2.8l.28.28-8.41 8.2zm9.5-9.5l-.28-.28L13.23 2.19l.28.28L14.19 1.5z"/>
          </svg>
          <span>Rename</span>
          <span className="ml-auto text-[#8c8c8c] text-xs">F2</span>
        </button>

        <button
          className={`w-full px-4 py-2 text-left hover:bg-[#094771] focus:outline-none flex items-center space-x-3 transition-colors duration-100 ${
            hoveredItem === 'copy' ? 'bg-[#094771]' : ''
          }`}
          onClick={handleCopy}
          onMouseEnter={() => setHoveredItem('copy')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"/>
            <path d="M6 0h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z"/>
          </svg>
          <span>Copy</span>
          <span className="ml-auto text-[#8c8c8c] text-xs">Ctrl+C</span>
        </button>

        {/* Separator */}
        <div className="my-1 border-[#454545] border-t"></div>

        <button
          className={`w-full px-4 py-2 text-left hover:bg-[#4d1f1f] focus:outline-none flex items-center space-x-3 transition-colors duration-100 text-[#f48771] ${
            hoveredItem === 'delete' ? 'bg-[#4d1f1f]' : ''
          }`}
          onClick={handleFileDelete}
          onMouseEnter={() => setHoveredItem('delete')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 1.152L3 13.5a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5l.504-10.848A.58.58 0 0 0 13.494 2.5H11ZM4.5 13.5a.5.5 0 0 1-.5-.5L3.5 3.5h9L12 13a.5.5 0 0 1-.5.5h-7Z"/>
          </svg>
          <span>Delete</span>
          <span className="ml-auto text-[#8c8c8c] text-xs">Del</span>
        </button>
      </div>
    </div>
  );
};