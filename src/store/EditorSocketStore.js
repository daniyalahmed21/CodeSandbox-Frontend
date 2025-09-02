import { create } from "zustand";

import { useActiveFileTabStore } from "./ActiveFileTabStore";
import { useTreeStructureStore } from "./TreeStructureStore";

export const useEditorSocketStore = create((set) => ({
  socketEditor: null,

  setSocketEditor: (socket) => {
    const { setActiveFileTab } = useActiveFileTabStore.getState();
    const { loadTreeStructure } = useTreeStructureStore.getState();

    socket.on("readFileSuccess", ({ path, data, extension }) => {
      setActiveFileTab(path, data, extension);
    });

    socket.on("writeFileSuccess", ({ path }) => {
      socket.emit("readFile", { pathOfFileOrFolder: path });
    });

    socket.on("deleteFileSuccess", () => {
      loadTreeStructure(); 
    });

    set({ socketEditor: socket });
  },
}));
