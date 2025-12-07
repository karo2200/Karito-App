import { useToast } from "@/components/atoms/Toast";
import {
  useAuth_SwitchRoleMutation,
  UserType,
  useSpecialist_GetMyProfileQuery,
  useUser_GetMyProfileQuery,
  useUser_UpdateProfileMutation,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import createOrderStore from "@/stores/createOrder";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Platform } from "react-native";

export default function useProfileHook() {
  const router = useRouter();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [exitVisible, setExitVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const {
    isExpert,
    setIsExpert,
    isLoggedIn,
    setIsLoggedIn,
    setAccessToken,
    setRefreshToken,
    refreshToken,
    clearAuth,
  } = authCacheStore();

  const { clearAll } = createOrderStore();

  const { data } = useUser_GetMyProfileQuery();

  const { data: specialist } = useSpecialist_GetMyProfileQuery();

  const specialistData = specialist?.specialist_getMyProfile?.result;

  const { mutate: updateMutate, isPending: updatePending } =
    useUser_UpdateProfileMutation();

  const { mutate: switchMutate, isPending: switchPending } =
    useAuth_SwitchRoleMutation();

  const onCallPress = () => {
    if (Platform.OS === "web") {
      window.location.href = `tel:${"0214443300"}`;
    } else {
      Linking.openURL(`tel:${"0214443300"}`);
    }
  };

  const onSwitchRole = () => {
    switchMutate(
      {
        input: {
          currentRefreshToken: refreshToken,
          targetUserType: isExpert ? UserType.Customer : UserType.Specialist,
        },
      },
      {
        onSuccess: (data) => {
          console.log("11", data, refreshToken);
          if (data?.auth_switchRole?.status?.code === 1) {
            setAccessToken(data?.auth_switchRole?.result?.accessToken);
            setRefreshToken(data?.auth_switchRole?.result?.refreshToken);
            queryClient.invalidateQueries();
            if (isExpert) {
              setIsExpert(false);
            } else {
              setIsExpert(true);
            }
            showToast({
              type: "success",
              message: "اطلاعات با موفقیت بروز شد.",
            });
          } else {
            if (data?.auth_switchRole?.status?.value === "UserNotFound") {
              if (isExpert) {
                setIsExpert(false);
              } else {
                setIsExpert(true);
              }
              clearAuth();
              clearAll();
              setIsLoggedIn(false);
              setAccessToken("");
              setRefreshToken("");
            }
          }
        },
        onError: (edata) => {
          console.log(JSON.stringify({ edata }));
        },
      }
    );
  };

  return {
    exitVisible,
    setExitVisible,
    router,
    isExpert,
    onCallPress,
    setIsExpert,
    userData: isExpert ? specialistData : data?.user_getMyProfile?.result,
    isLoggedIn,
    updatePending,
    updateMutate,
    editVisible,
    setEditVisible,
    setIsLoggedIn,
    setAccessToken,
    setRefreshToken,
    onSwitchRole,
    switchPending,
  };
}
