import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  Gender,
  SpecialistProfileDto,
  useSpecialist_SetPersonalInformationMutation,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useGetSpecialistProfile } from "./personalInfo.query";

export default function usePersonalInfoHook() {
  const router = useRouter();

  const { params } = useRoute();

  const { showToast } = useToast();

  const { nationalCode, setIsLoggedIn } = authCacheStore();

  const queryClient = useQueryClient();

  const { mutate: infoMutate, isPending: personalInfoPending } =
    useSpecialist_SetPersonalInformationMutation();

  const { data: expertData } = useGetSpecialistProfile();

  const profileData: SpecialistProfileDto =
    expertData?.specialist_getMyProfile?.result;

  const onRegistrationPress = (formData: any) => {
    const date = new Date(
      Number(formData?.year),
      Number(formData?.month) - 1,
      Number(formData?.day)
    );
    infoMutate(
      {
        input: {
          lastName: formData?.family,
          firstName: formData?.name,
          gender: Gender.NotSet,
          profileImageUrl: formData?.profilePhoto,
          idCardImageUrl: formData?.codeImage,
          nationalCode: nationalCode,
          birthDate: date?.toISOString(),
        },
      },
      {
        onSuccess: (data) => {
          if (data?.specialist_setPersonalInformation?.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.specialist_getMyProfile],
            });
            showToast({
              message: "اطلاعات با موفقیت ثبت شد.",
              type: "success",
            });
            setIsLoggedIn(true);
            router.back();
          } else {
            showToast({
              message: data?.specialist_setPersonalInformation?.status?.message,
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
    personalInfoPending,
    nationalCode,
    profileData,
  };
}
