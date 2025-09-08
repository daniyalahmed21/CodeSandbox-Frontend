import { create } from "zustand";

import { useActiveFileTabStore } from "./ActiveFileTabStore";
import { useTreeStructureStore } from "./TreeStructureStore";
import { usePortStore } from "./portStore";

export const useEditorSocketStore = create((set) => ({
  socketEditor: null,
  // mirror key used by some components
  editorSocket: null,

  setSocketEditor: (socket) => {
    const { setActiveFileTab } = useActiveFileTabStore.getState();
    const { loadTreeStructure } = useTreeStructureStore.getState();
    const { setPort } = usePortStore.getState();

    socket.on("readFileSuccess", ({ path, data, extension }) => {
      setActiveFileTab(path, data, extension);
    });

    socket.on("writeFileSuccess", ({ path }) => {
      socket.emit("readFile", { pathOfFileOrFolder: path });
    });

    socket.on("deleteFileSuccess", () => {
      loadTreeStructure();
    });

    // receive container port from backend to power live preview
    socket.on("getPortSuccess", ({ port }) => {
      setPort(port);
    });

    set({ socketEditor: socket, editorSocket: socket });
  },
}));
