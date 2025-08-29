import {
  useUser_GetMyProfileQuery,
  useUser_UpdateProfileMutation,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import useUserStore from "@/stores/loginStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

export default function useProfileHook() {
  const router = useRouter();

  const [exitVisible, setExitVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const { isExpert, setIsExpert } = useUserStore();
  const { isUserLoggedIn } = authCacheStore();

  const { setUserId } = authCacheStore();

  const { data } = useUser_GetMyProfileQuery();

  const { mutate: updateMutate, isPending: updatePending } =
    useUser_UpdateProfileMutation();

  useEffect(() => {
    if (data?.user_getMyProfile?.result) {
      setUserId(data?.user_getMyProfile?.result?.id);
    }
  }, [data]);

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
    userData: data?.user_getMyProfile?.result,
    isUserLoggedIn,
    updatePending,
    updateMutate,
    editVisible,
    setEditVisible,
  };
}
