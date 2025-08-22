import instance from "Configs/axiosInstance";

export const createProjectApi = async () => {
  try {
    const response = await instance.post("/api/v1/projects");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
