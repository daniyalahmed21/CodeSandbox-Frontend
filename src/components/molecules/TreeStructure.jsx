import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useTreeStructureStore } from "Store/TreeStructureStore";

const TreeStructure = () => {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();
  const { id } = useParams();

  useEffect(() => {
    if (treeStructure) {
      console.log("Tree", treeStructure);
    } else {
      setTreeStructure(id);
    }
  }, [id, setTreeStructure, treeStructure]);

  return (
    <div className="p-4 text-white">
      {treeStructure ? (
        <pre className="bg-gray-900 p-3 rounded">
          {JSON.stringify(treeStructure, null, 2)}
        </pre>
      ) : (
        <p>Loading tree...</p>
      )}
    </div>
  );
};

export default TreeStructure;
