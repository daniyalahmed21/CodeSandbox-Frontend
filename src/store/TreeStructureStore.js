import { QueryClient } from "@tanstack/react-query";
import { getProjectTree } from "Apis/project";
import { create } from "zustand";

export const useTreeStructureStore = create((set) => {
  const queryClient = new QueryClient();

  return {
    treeStructure: null,

    setTreeStructure: async (projectId) => {
      const response = await queryClient.fetchQuery({
        queryKey: ["projectTree", projectId],
        queryFn: () => getProjectTree(projectId),
      });

      console.log("response", response.data);

      set({
        treeStructure: response.data,
      });
    },
  };
});
