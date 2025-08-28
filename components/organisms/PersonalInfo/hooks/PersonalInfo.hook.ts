import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  Gender,
  useSpecialist_UpdateIdCardMutation,
  useUser_UpdateProfileMutation,
} from "@/generated/graphql";
import useUserStore from "@/stores/loginStore";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function usePersonalInfoHook() {
  const router = useRouter();

  const { params } = useRoute();

  const { showToast } = useToast();

  const { setIsLoggedIn } = useUserStore();

  const queryClient = useQueryClient();

  const { mutate: uploadcardMutate, isPending: uploadCardPending } =
    useSpecialist_UpdateIdCardMutation();
  const { mutate, isPending: profilePending } = useUser_UpdateProfileMutation();

  const onRegistrationPress = (formData: any) => {
    mutate(
      {
        input: {
          lastName: formData?.family,
          firstName: formData?.name,
          gender: Gender.Female,
          profileImageUrl: formData?.profilePhoto,
          userId: 1,
        },
      },
      {
        onSuccess: (d) => {
          console.log(",,", d);

          uploadcardMutate(
            { input: { newIDCardUrl: formData?.codeImage } },
            {
              onSuccess: (data) => {
                console.log("f", data);

                if (data?.specialist_updateIDCard?.status?.code === 1) {
                  queryClient.invalidateQueries({
                    queryKey: [queryKeys.specialist_getMyProfile],
                  });
                  router.back();
                } else {
                  showToast({
                    message: data?.specialist_updateIDCard?.status?.message,
                  });
                }
              },
            }
          );
        },
      }
    );
    // setIsLoggedIn(true);
  };

  return {
    router,
    onRegistrationPress,
    uploadCardPending,
    profilePending,
  };
}
