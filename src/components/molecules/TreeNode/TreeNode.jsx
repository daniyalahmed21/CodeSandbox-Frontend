// TreeNode.jsx - Fixed version with better click handling
import { useEffect, useState } from "react";
import { FileIcon } from "../../atoms/FileIcon/Fileicon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";

export const TreeNode = ({ fileFolderData, level = 0 }) => {
  const [visibility, setVisibility] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { editorSocket } = useEditorSocketStore();
  const {
    setFile,
    setIsOpen: setFileContextMenuIsOpen,
    setX: setFileContextMenuX,
    setY: setFileContextMenuY,
  } = useFileContextMenuStore();

  function toggleVisibility(name) {
    setVisibility({
      ...visibility,
      [name]: !visibility[name],
    });
  }

  function computeExtension(fileFolderData) {
    const names = fileFolderData.name.split(".");
    return names[names.length - 1];
  }

  // Single click handler for files
  function handleFileClick(fileFolderData) {
    if (!fileFolderData.children) { // Only for files, not folders
      console.log("Single clicked on file", fileFolderData);
      setSelectedFile(fileFolderData.path);
      
      // Emit readFile event
      if (editorSocket && editorSocket.connected) {
        editorSocket.emit("readFile", {
          pathToFileOrFolder: fileFolderData.path,
        });
        console.log("Sent readFile request for:", fileFolderData.path);
      } else {
        console.error("Editor socket not connected");
      }
    }
  }

  // Double click handler for files (alternative trigger)
  function handleDoubleClick(fileFolderData) {
    console.log("Double clicked on", fileFolderData);
    if (!fileFolderData.children) {
      handleFileClick(fileFolderData);
    }
  }

  function handleContextMenuForFiles(e, path) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Right clicked on", path, e);
    setFile(path);
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsOpen(true);
  }

  // Debug socket connection
  useEffect(() => {
    if (editorSocket) {
      console.log("Editor socket status:", {
        connected: editorSocket.connected,
        id: editorSocket.id
      });

      // Listen for file content response
      const handleFileContent = (data) => {
        console.log("Received file content:", data);
      };

      const handleFileError = (error) => {
        console.error("File read error:", error);
      };

      editorSocket.on("fileContent", handleFileContent);
      editorSocket.on("fileError", handleFileError);

      return () => {
        editorSocket.off("fileContent", handleFileContent);
        editorSocket.off("fileError", handleFileError);
      };
    }
  }, [editorSocket]);

  const isFolder = fileFolderData?.children;
  const isOpen = visibility[fileFolderData?.name];
  const indentLevel = level * 12;
  const isSelected = selectedFile === fileFolderData?.path;

  return (
    fileFolderData && (
      <div className="select-none">
        {isFolder ? (
          // Folder rendering
          <button
            onClick={() => toggleVisibility(fileFolderData.name)}
            onMouseEnter={() => setHoveredItem(fileFolderData.name)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`flex items-center w-full text-left px-2 py-1 text-[#cccccc] text-sm hover:bg-[#2a2d2e] focus:outline-none transition-colors duration-150 cursor-pointer ${
              hoveredItem === fileFolderData.name ? 'bg-[#2a2d2e]' : ''
            }`}
            style={{ paddingLeft: `${8 + indentLevel}px` }}
          >
            <FileIcon 
              isFolder={true} 
              isOpen={isOpen}
            />
            <span className="ml-2 truncate">{fileFolderData.name}</span>
          </button>
        ) : (
          // File rendering - FIXED: Added proper click handlers
          <div
            className={`flex items-center px-2 py-1 text-[#cccccc] text-sm cursor-pointer transition-colors duration-150 ${
              isSelected 
                ? 'bg-[#094771] text-white' 
                : hoveredItem === fileFolderData.name 
                ? 'bg-[#2a2d2e]' 
                : ''
            }`}
            style={{ paddingLeft: `${8 + indentLevel}px` }}
            onClick={() => handleFileClick(fileFolderData)}
            onDoubleClick={() => handleDoubleClick(fileFolderData)}
            onContextMenu={(e) => handleContextMenuForFiles(e, fileFolderData.path)}
            onMouseEnter={() => setHoveredItem(fileFolderData.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <FileIcon 
              extension={computeExtension(fileFolderData)} 
              isFolder={false}
            />
            <span className="ml-2 truncate">{fileFolderData.name}</span>
          </div>
        )}

        {/* Render children */}
        {isOpen && fileFolderData.children && (
          <div>
            {fileFolderData.children.map((child) => (
              <TreeNode 
                fileFolderData={child} 
                key={child.path || child.name} // Better key using path
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    )
  );
};