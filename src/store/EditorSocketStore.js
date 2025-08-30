import { create } from "zustand";

export const useEditorSocketStore = create((set) => ({
  socketEditor: null,
  setSocketEditor: (incomingSocket) => set({ socketEditor: incomingSocket }),
}));
