import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { useNavigate } from "react-router-dom";

export const CreateProject = () => {
  const { createProjectMutation } = useCreateProject();
  const navigate = useNavigate();

  async function handleCreateProject() {
    try {
      const response = await createProjectMutation();
      navigate(`/project/${response.data}`);
    } catch (error) {
      console.log("Error creating project", error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-screen">
      <button
        className="bg-blue-600 hover:bg-blue-700 focus:ring-opacity-75 shadow-lg px-6 py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold text-white transition duration-300 ease-in-out"
        onClick={handleCreateProject}
      >
        Create Playground
      </button>
    </div>
  );
};
