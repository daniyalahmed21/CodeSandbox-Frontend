import { QueryClient } from "@tanstack/react-query";
import { getProjectTree } from "Apis/project";
import { create } from "zustand";


const queryClient = new QueryClient();

export const useTreeStructureStore = create((set) => ({
  projectId: null,
  treeStructure: null,

  setProjectId: (projectId) => set({ projectId }),

  loadTreeStructure: async (projectId) => {
    if (!projectId) return;

    const response = await queryClient.fetchQuery({
      queryKey: ["projectTree", projectId],
      queryFn: () => getProjectTree({ projectId }),
    });

    set({ treeStructure: response.data });
  },

  clearTreeStructure: () => set({ treeStructure: null }),
}));
