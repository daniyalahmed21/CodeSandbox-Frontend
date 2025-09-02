import React, { useEffect } from "react";
import EditorComponent from "Components/molecules/EditorComponent";
import TreeStructure from "Components/molecules/TreeStructure";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { useEditorSocketStore } from "Store/EditorSocketStore";

const ProjectPlayground = () => {
  const { id: projectId } = useParams();
  const setSocketEditor = useEditorSocketStore((state) => state.setSocketEditor);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!projectId) return;
  
    const socket = io(`${VITE_BACKEND_URL}/editor`, {
      query: { projectId },
    });
  
    setSocketEditor(socket);
  
    return () => socket.disconnect();
  }, [projectId, setSocketEditor, VITE_BACKEND_URL]);

  return (
    <div className="flex">
      <TreeStructure />
      <EditorComponent />
    </div>
  );
};

export default ProjectPlayground;
