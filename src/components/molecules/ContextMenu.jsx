import React from "react";
import { useContextMenuStore } from "Store/ContextMenuStore";
import { useEditorSocketStore } from "Store/editorSocketStore";

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
      className="absolute bg-gray-800 shadow-lg p-2 rounded max-w-xs text-white"
      style={{ top: y, left: x }}
    >
      <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">Open</div>
      <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">Rename</div>
      <div
        onClick={handleDeleteFile}
        className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
      >
        Delete
      </div>
      <div className="mt-1 px-2 text-gray-400 text-xs">{targetPath}</div>
    </div>
  );
};

export default ContextMenu;
