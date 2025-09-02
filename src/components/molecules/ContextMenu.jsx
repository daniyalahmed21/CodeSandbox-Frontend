import React from "react";
import { useContextMenuStore } from "Store/ContextMenuStore";
import { useEditorSocketStore } from "Store/EditorSocketStore";

const ContextMenu = () => {
  const { isOpen, x, y, targetPath, closeMenu } = useContextMenuStore();
  const { socketEditor } = useEditorSocketStore();

  const handleDeleteFile = () => {
    console.log("Deleting file:", targetPath);

    socketEditor.emit("deleteFile", { pathOfFileOrFolder: targetPath });

    socketEditor.once("deleteFileSuccess", ({ data }) => {
      console.log("Delete success:", data);
      closeMenu();
    });
  };

  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={closeMenu}
      className="absolute bg-gray-800 text-white rounded shadow-lg p-2 max-w-xs "
      style={{ top: y, left: x }}
    >
      <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Open</div>
      <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Rename</div>
      <div
        onClick={handleDeleteFile}
        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
      >
        Delete
      </div>
      <div className="text-xs text-gray-400 mt-1 px-2">{targetPath}</div>
    </div>
  );
};

export default ContextMenu;
