import { create } from "zustand";

import { useActiveFileTabStore } from "./ActiveFileTabStore";

export const useEditorSocketStore = create((set) => ({
  socketEditor: null,
  setSocketEditor: (incomingSocket) => {
    const { setActiveFileTab } = useActiveFileTabStore.getState();

    incomingSocket.on("readFileSuccess", ({ path, data, extension }) => {
      setActiveFileTab(path, data, extension);
    });

    incomingSocket.on("writeFileSuccess", ({ data, path }) => {
      incomingSocket.emit("readFile", {
        pathOfFileOrFolder: path,
      });
      console.log("File written successfully:", data);
    });
    set({ socketEditor: incomingSocket });
  },
}));
