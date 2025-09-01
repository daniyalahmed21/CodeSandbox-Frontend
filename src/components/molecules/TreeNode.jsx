import React, { useState } from "react";
import { FileIcon } from "Components/atoms/FileIcon";
import { ChevronDown, ChevronRight } from "lucide-react"; 
import { useEditorSocketStore } from "Store/EditorSocketStore";

const TreeNode = ({ fileDataStructure }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { socketEditor } = useEditorSocketStore();

  const handleFileClick = (filePath) => {
    if (socketEditor) {
      socketEditor.emit("readFile", { pathOfFileOrFolder: filePath });
    }
    socketEditor.on("readFileSuccess", ({ value }) => {
      // console.log("File content:", data);
    });
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
        // File
        <div className="flex items-center gap-2 py-1 text-gray-300 hover:text-white cursor-pointer">
          <FileIcon name={fileDataStructure.name} />
          <span onDoubleClick={() => handleFileClick(fileDataStructure.path)}>
            {fileDataStructure.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
