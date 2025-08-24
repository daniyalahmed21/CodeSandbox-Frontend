import React from "react";
import { useCreateProject } from "Hooks/apis/mutations/useCreateProject";
import { useNavigate } from "react-router";

const CreateProject = () => {
  const { createProjectAsync, isPending, isError, error } = useCreateProject();
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    try {
      const response = await createProjectAsync();
      navigate(`/projects/${response.projectId}`);
    } catch (err) {
      console.error("Create project failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold underline mb-4">Hello world!</h1>

      <button
        onClick={handleCreateProject}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create Project"}
      </button>

      {isError && (
        <p className="text-red-500 mt-2">
          Error: {error?.message || "Something went wrong"}
        </p>
      )}
    </div>
  );
};

export default CreateProject;
