import instance from "Configs/axiosInstance";

export const createProjectApi = async () => {
  try {
    const response = await instance.post("/api/v1/projects");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProjectTree = async (projectId) => {
  try {
    const response = await instance.get(`/api/v1/projects/${projectId}/tree`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
