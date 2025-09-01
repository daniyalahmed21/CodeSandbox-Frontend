import React, { useState } from "react";
import { FileIcon } from "Components/atoms/FileIcon";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useContextMenuStore } from "Store/ContextMenuStore";
import { useEditorSocketStore } from "Store/EditorSocketStore";
import ContextMenu from "./ContextMenu";

const TreeNode = ({ fileDataStructure }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { socketEditor } = useEditorSocketStore();
  const { openMenu } = useContextMenuStore();

  const handleFileClick = (filePath) => {
    if (socketEditor) {
      socketEditor.emit("readFile", { pathOfFileOrFolder: filePath });
    }
  };

  const handleContextMenu = (e, filePath) => {
    e.preventDefault();
    
    openMenu(e.clientX, e.clientY, filePath);
  };

  if (!fileDataStructure) return null;

  const isFolder = !!fileDataStructure.children;

  return (
    <div className="ml-2 select-none">
      {isFolder ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium py-1 w-full text-left"
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
            <FileIcon name={fileDataStructure.name} />
            <span>{fileDataStructure.name}</span>
          </button>

          {isOpen && (
            <div className="ml-6 border-l border-gray-700 pl-3">
              {fileDataStructure.children.map((child) => (
                <TreeNode key={child.path} fileDataStructure={child} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex items-center gap-2 py-1 text-gray-300 hover:text-white cursor-pointer"
          onContextMenu={(e) => handleContextMenu(e, fileDataStructure.path)}
          onDoubleClick={() => handleFileClick(fileDataStructure.path)}
        >
          <FileIcon name={fileDataStructure.name} />
          <span>{fileDataStructure.name}</span>
          <ContextMenu/>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
