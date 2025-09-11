import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/Fileicon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";

export const TreeNode = ({ fileFolderData }) => {
  const [visibility, setVisibility] = useState({});
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

  function handleDoubleClick(fileFolderData) {
    console.log("Double clicked on", fileFolderData);
    editorSocket.emit("readFile", {
      pathToFileOrFolder: fileFolderData.path,
    });
  }

  function handleContextMenuForFiles(e, path) {
    e.preventDefault();
    console.log("Right clicked on", path, e);
    setFile(path);
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsOpen(true);
  }

  useEffect(() => {
    console.log("Visibility changed", visibility);
  }, [visibility]);

  return (
    fileFolderData && (
      // Replaced inline style with Tailwind classes for padding and text color
      <div className="pl-4 text-white">
        {fileFolderData.children /** If the current node is a folder ? */ ? (
    
          <button
            onClick={() => toggleVisibility(fileFolderData.name)}
            className="flex items-center space-x-2 bg-transparent hover:bg-[#4a4a6e] mt-2 p-2 border-none rounded outline-none w-full text-white text-base text-left cursor-pointer"
          >
            {visibility[fileFolderData.name] ? (
              <IoIosArrowDown />
            ) : (
              <IoIosArrowForward />
            )}
            <span>{fileFolderData.name}</span>
          </button>
        ) : (
          <div
            className="flex justify-start items-center space-x-2 hover:bg-[#4a4a6e] p-2 rounded transition-colors duration-150 cursor-pointer"
            onContextMenu={(e) =>
              handleContextMenuForFiles(e, fileFolderData.path)
            }
            onDoubleClick={() => handleDoubleClick(fileFolderData)}
          >
            <FileIcon extension={computeExtension(fileFolderData)} />
            <span className="text-white text-base">{fileFolderData.name}</span>
          </div>
        )}
        {visibility[fileFolderData.name] && fileFolderData.children && (
          <div className="pl-4">
            {fileFolderData.children.map((child) => (
              <TreeNode fileFolderData={child} key={child.name} />
            ))}
          </div>
        )}
      </div>
    )
  );
};
