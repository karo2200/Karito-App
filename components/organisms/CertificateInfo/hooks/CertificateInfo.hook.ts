import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import { useSpecialist_UpdateSpecializedDocumentsMutation } from "@/generated/graphql";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useGetSpecialistProfile } from "../../PersonalInfo/hooks/personalInfo.query";

export default function useCertificateInfoHook() {
  const router = useRouter();

  const { showToast } = useToast();

  const queryClient = useQueryClient();

  const { mutate: documentsMutate, isPending: documentPending } =
    useSpecialist_UpdateSpecializedDocumentsMutation();

  const { data: expertData } = useGetSpecialistProfile();

  const profileData = expertData?.specialist_getMyProfile?.result;

  const onRegistrationPress = (formData: any) => {
    const arr = [formData?.doc1, formData?.doc2, formData?.doc3].filter(
      (item): item is string => item !== undefined
    );

    documentsMutate(
      {
        input: {
          newDocumentUrls: arr,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.specialist_updateSpecializedDocuments?.status?.code === 1) {
            showToast({
              message: "اطلاعات با موفقیت ثبت شد.",
              type: "success",
            });
            queryClient.invalidateQueries({
              queryKey: [queryKeys.specialist_getMyProfile],
            });
            router.back();
          } else {
            showToast({
              message:
                data?.specialist_updateSpecializedDocuments?.status?.message,
              type: "error",
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
    profileData,
  };
}
