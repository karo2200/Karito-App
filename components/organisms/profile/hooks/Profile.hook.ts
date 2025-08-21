import { useUser_GetMyProfileQuery } from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import useUserStore from "@/stores/loginStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

export default function useProfileHook() {
  const router = useRouter();

  const [exitVisible, setExitVisible] = useState(false);

  const { isExpert, setIsExpert, isLoggedIn } = useUserStore();

  const { setUserId, accessToken } = authCacheStore();

  const { data } = useUser_GetMyProfileQuery();
  // console.log("//////", accessToken);

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
    isLoggedIn,
  };
}
