import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useTreeStructureStore } from "Store/TreeStructureStore";

import TreeNode from "./TreeNode";

const TreeStructure = () => {
  const { id: projectId } = useParams();

  const treeStructure = useTreeStructureStore((state) => state.treeStructure);
  const loadTreeStructure = useTreeStructureStore((state) => state.loadTreeStructure);
  const clearTreeStructure = useTreeStructureStore((state) => state.clearTreeStructure);

  useEffect(() => {
    clearTreeStructure();
    loadTreeStructure(projectId);
  }, [projectId]);

  if (!treeStructure) return <p>Loading tree...</p>;

  return <TreeNode fileDataStructure={treeStructure} />;
};

export default TreeStructure;
