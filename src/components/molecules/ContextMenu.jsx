// Components/molecules/ContextMenu.jsx
import React from "react";
import { useContextMenuStore } from "Store/ContextMenuStore";

const ContextMenu = () => {
  const { isOpen, x, y, targetPath, closeMenu } = useContextMenuStore();

  if (!isOpen) return null;

  return (
    <div 
    onBlur={()=>closeMenu}
      className="absolute bg-gray-800 text-white rounded shadow-lg p-2"
      style={{ top: y, left: x }}
      // onClick={closeMenu}
    >
      <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
        Open
      </div>
      <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
        Rename
      </div>
      <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
        Delete
      </div>
      <div className="text-xs text-gray-400 mt-1 px-2">{targetPath}</div>
    </div>
  );
};

export default ContextMenu;
