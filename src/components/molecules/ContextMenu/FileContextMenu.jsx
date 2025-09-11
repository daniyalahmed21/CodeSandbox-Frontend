import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export const FileContextMenu = ({ x, y, path }) => {
  const { setIsOpen } = useFileContextMenuStore();
  const { editorSocket } = useEditorSocketStore();

  function handleFileDelete(e) {
    e.preventDefault();
    console.log("Deleting file at", path);
    editorSocket.emit("deleteFile", {
      pathToFileOrFolder: path,
    });
  }

  return (
    // Replaced fileContextOptionsWrapper with Tailwind classes
    <div
      onMouseLeave={() => {
        console.log("Mouse left");
        setIsOpen(false);
      }}
      className="z-50 absolute flex flex-col bg-[#333254] shadow-xl py-2 rounded-lg w-48 text-white"
      style={{
        left: x,
        top: y,
      }}
    >
      {/* Replaced fileContextButton with Tailwind classes */}
      <button
        className="hover:bg-[#4a4a6e] px-4 py-2 focus:outline-none w-full text-left transition-colors duration-150"
        onClick={handleFileDelete}
      >
        Delete File
      </button>
      {/* Replaced fileContextButton with Tailwind classes */}
      <button className="hover:bg-[#4a4a6e] px-4 py-2 focus:outline-none w-full text-left transition-colors duration-150">
        Rename File
      </button>
    </div>
  );
};
