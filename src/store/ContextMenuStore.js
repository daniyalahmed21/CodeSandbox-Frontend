import { create } from "zustand";

export const useContextMenuStore = create((set) => ({
    
  isOpen: false,
  x: 0,
  y: 0,
  targetPath: null,

  openMenu: (x, y, targetPath) =>
    
    set({ isOpen: true, x, y, targetPath }),

  closeMenu: () => set({ isOpen: false, targetPath: null }),
}));
