import { useUser_GetMyProfileQuery } from "@/generated/graphql";
import useUserStore from "@/stores/loginStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Platform } from "react-native";

export default function useProfileHook() {
  const router = useRouter();

  const [exitVisible, setExitVisible] = useState(false);

  const { isExpert, setIsExpert, isLoggedIn } = useUserStore();

  const { data } = useUser_GetMyProfileQuery();

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
