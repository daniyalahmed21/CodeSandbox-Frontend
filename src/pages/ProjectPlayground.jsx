import React from "react";
import EditorComponent from "Components/molecules/EditorComponent";
import { useParams } from "react-router";
const ProjectPlayground = () => {
  const { id } = useParams;
  return (
    <div>
      ProjectPlayground: {id}
      <EditorComponent />
    </div>
  );
};

export default ProjectPlayground;
