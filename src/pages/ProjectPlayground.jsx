import React from "react";
import EditorComponent from "Components/molecules/EditorComponent";
import TreeStructure from "Components/molecules/TreeStructure";
import { useParams } from "react-router";
const ProjectPlayground = () => {
  const { id } = useParams;
  return (
    <div>
      ProjectPlayground: {id}
      <TreeStructure />
      <EditorComponent />
    </div>
  );
};

export default ProjectPlayground;
