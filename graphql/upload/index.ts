import { fileUploader } from "@/services/fileUploader";
import { useMutation } from "@tanstack/react-query";

type UploadFile = {
  uri: string;
  name: string;
  type: string;
};

export function useUploadFile() {
  return useMutation({
    mutationFn: async (file: UploadFile) => {
      console.log("fffff", file);

      return await fileUploader(file);
    },
  });
}
