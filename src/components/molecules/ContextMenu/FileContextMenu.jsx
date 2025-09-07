import './FileContextMenu.css';

import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useEditorSocketStore } from '../../../store/editorSocketStore';

export const FileContextMenu = ({
    x,
    y,
    path
}) => {
    const { setIsOpen } = useFileContextMenuStore();

    const { editorSocket } = useEditorSocketStore();

    function handleOpenFile(e) {
        e.preventDefault();
        editorSocket?.emit("readFile", {
            pathToFileOrFolder: path
        });
        setIsOpen(false);
    }

    function handleFileDelete(e) {
        e.preventDefault();
        console.log("Deleting file at", path);
        editorSocket?.emit("deleteFile", {
            pathToFileOrFolder: path
        });
        setIsOpen(false);
    }

    return (
        <div
            onMouseLeave={() => {
                console.log("Mouse left");
                setIsOpen(false);
            }}
            className='fileContextOptionsWrapper'
            style={{
                left: x,
                top: y,
            }}
        >
            <button
                className='fileContextButton'
                onClick={handleOpenFile}
            >
                Open File
            </button>
            <button
                className='fileContextButton'
                onClick={handleFileDelete}
            >
                Delete File
            </button>
            <button
                className='fileContextButton'
            >
                Rename File
            </button>

        </div>
    )
}