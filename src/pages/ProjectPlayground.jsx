import React, { useEffect } from "react";
import EditorComponent from "Components/molecules/EditorComponent";
import TreeStructure from "Components/molecules/TreeStructure";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { useEditorSocketStore } from "Store/EditorSocketStore";

const ProjectPlayground = () => {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { setSocketEditor } = useEditorSocketStore();
  const { id: projectId } = useParams(); 

  useEffect(() => {
    if (!projectId) return;

    const editorSocketConn = io(`${VITE_BACKEND_URL}/editor`, {
      query: { projectId },
    });

    setSocketEditor(editorSocketConn);

    return () => {
      editorSocketConn.disconnect();
    };
  }, [setSocketEditor, projectId, VITE_BACKEND_URL]);

  return (
    <div>
      ProjectPlayground: {projectId}
      <TreeStructure />
      <EditorComponent />
    </div>
  );
};

export default ProjectPlayground;
