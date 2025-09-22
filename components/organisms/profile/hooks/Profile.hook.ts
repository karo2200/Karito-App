import {
  useSpecialist_GetMyProfileQuery,
  useUser_GetMyProfileQuery,
  useUser_UpdateProfileMutation,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Platform } from "react-native";

export default function useProfileHook() {
  const router = useRouter();

  const [exitVisible, setExitVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const {
    isExpert,
    setIsExpert,
    isLoggedIn,
    setIsLoggedIn,
    setAccessToken,
    setRefreshToken,
  } = authCacheStore();

  const { data } = useUser_GetMyProfileQuery();

  const { data: specialist } = useSpecialist_GetMyProfileQuery();

  const specialistData = specialist?.specialist_getMyProfile?.result;
  console.log("....", specialistData);

  const { mutate: updateMutate, isPending: updatePending } =
    useUser_UpdateProfileMutation();

  const onCallPress = () => {
    if (Platform.OS === "web") {
      window.location.href = `tel:${"0938484848"}`;
    } else {
      Linking.openURL(`tel:${"9382467423467"}`);
    }
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
  };
}
