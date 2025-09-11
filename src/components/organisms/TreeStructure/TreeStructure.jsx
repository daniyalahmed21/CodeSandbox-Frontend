import { useTreeStructureStore } from "../../../store/treeStructureStore";
import { useEffect } from "react";
import { TreeNode } from "../../molecules/TreeNode/TreeNode";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu";
import { VscFiles, VscChevronDown } from "react-icons/vsc";

export const TreeStructure = () => {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();
  const {
    file,
    isOpen: isFileContextOpen,
    x: fileContextX,
    y: fileContextY,
  } = useFileContextMenuStore();

  useEffect(() => {
    if (treeStructure) {
      console.log("tree:", treeStructure);
    } else {
      setTreeStructure();
    }
  }, [setTreeStructure, treeStructure]);

  return (
    <div className="bg-[#252526] h-full overflow-hidden text-[#cccccc]">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#2d2d30] px-3 py-2 border-[#3c3c3c] border-b font-medium text-[#cccccc] text-xs">
        <div className="flex items-center space-x-2">
          <VscFiles className="w-4 h-4" />
          <span>EXPLORER</span>
        </div>
        <button className="hover:bg-[#3c3c3c] p-1 rounded transition-colors">
          <VscChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Project title */}
      <div className="bg-[#252526] px-3 py-2 border-[#3c3c3c] border-b font-medium text-[#cccccc] text-sm">
        <div className="flex items-center space-x-2">
          <VscChevronDown className="w-3 h-3" />
          <span className="truncate">PROJECT</span>
        </div>
      </div>

      {/* File tree */}
      <div className="pb-20 h-full overflow-auto">
        {treeStructure && <TreeNode fileFolderData={treeStructure} />}
      </div>

      {/* Context menu */}
      {isFileContextOpen && fileContextX && fileContextY && (
        <FileContextMenu
          x={fileContextX}
          y={fileContextY}
          path={file}
        />
      )}
    </div>
  );
};