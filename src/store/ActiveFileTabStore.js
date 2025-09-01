import { create } from "zustand";

export const useActiveFileTabStore = create((set) => ({
  activeFileTab: null,
  setActiveFileTab: (path, value, extension) =>
    // console.log("File content:", path, value),

    set({ activeFileTab: { path, value, extension } }),
}));
