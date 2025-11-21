import { fileUploader } from "@/services/fileUploader";
import { useMutation } from "@tanstack/react-query";

export type UploadFile = {
  uri: string;
  name: string;
  type: string | undefined;
  size: number | undefined;
};

export function useUploadFile() {
  return useMutation({
    mutationFn: async (file: UploadFile) => {
      console.log(JSON.stringify({ uploader: file }));
      return await fileUploader(file);
    },
  });
}
