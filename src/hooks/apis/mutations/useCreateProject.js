import { useMutation } from "@tanstack/react-query";
import { createProjectApi } from "Apis/project";

export function useCreateProject() {
  const { mutateAsync, isError, isPending, error } = useMutation({
    mutationFn: createProjectApi,
    onSuccess: (data) => {
      console.log("✅ Project created:", data);
    },
    onError: (err) => {
      console.error("❌ Error while creating project:", err);
    },
  });

  return {
    createProjectAsync: mutateAsync,
    isError,
    isPending,
    error,
  };
}
