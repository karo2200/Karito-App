import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import { useSpecialist_UpdateSpecializedDocumentsMutation } from "@/generated/graphql";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function useCertificateInfoHook() {
  const router = useRouter();

  const { params } = useRoute();

  const { showToast } = useToast();

  const queryClient = useQueryClient();

  const { mutate: documentsMutate, isPending: documentPending } =
    useSpecialist_UpdateSpecializedDocumentsMutation();

  const onRegistrationPress = (formData: any) => {
    console.log("fffffff", formData);
    documentsMutate(
      {
        input: {
          newDocumentUrls: [formData?.doc1, formData?.doc2, formData?.doc3],
        },
      },
      {
        onSuccess: (data) => {
          if (data?.specialist_updateSpecializedDocuments?.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.specialist_getMyProfile],
            });
            router.back();
          } else {
            showToast({
              message:
                data?.specialist_updateSpecializedDocuments?.status?.message,
            });
          }
        },
      }
    );
  };

  return {
    router,
    onRegistrationPress,
    documentPending,
  };
}
