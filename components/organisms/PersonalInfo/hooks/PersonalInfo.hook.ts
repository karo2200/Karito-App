import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  Gender,
  SpecialistProfileDto,
  useSpecialist_SetPersonalInformationMutation,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import moment from "jalali-moment";
import { useGetSpecialistProfile } from "./personalInfo.query";

export default function usePersonalInfoHook() {
  const router = useRouter();

  const { showToast } = useToast();

  const { nationalCode, isLoggedIn } = authCacheStore();

  const queryClient = useQueryClient();

  const { mutate: infoMutate, isPending: personalInfoPending } =
    useSpecialist_SetPersonalInformationMutation();

  const { data: expertData } = useGetSpecialistProfile();

  const profileData: SpecialistProfileDto =
    expertData?.specialist_getMyProfile?.result;

  const onRegistrationPress = (formData: any) => {
    const gregorian = moment(
      `${Number(formData?.year)}/${Number(formData?.month)}/${Number(formData?.day)}`,
      "jYYYY/jM/jD"
    );

    const date = gregorian.toISOString();

    infoMutate(
      {
        input: {
          lastName: formData?.family,
          firstName: formData?.name,
          gender: Gender.NotSet,
          profileImageUrl: formData?.profilePhoto,
          idCardImageUrl: formData?.codeImage,
          nationalCode: formData?.code,
          birthDate: date,
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
            if (isLoggedIn) {
              router.push("/profile");
            } else {
              router.back();
            }
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
    nationalCode: nationalCode ?? profileData?.nationalCode,
    profileData,
  };
}
