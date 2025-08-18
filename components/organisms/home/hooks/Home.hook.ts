import { useCity_GetAllQuery } from "@/generated/graphql";
import useUserStore from "@/stores/loginStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export default function useHomeHook() {
  const router = useRouter();

  const { isSelectRole } = useUserStore();

  const [selectRoleVisible, setSelectRoleVisibe] = useState<boolean>(false);

  const { data } = useCity_GetAllQuery({ take: 200 });
  console.log("ddddd", data);

  useEffect(() => {
    if (isSelectRole) {
      setSelectRoleVisibe(false);
    } else if (Platform.OS === "ios") {
      const timeout = setTimeout(() => {
        setSelectRoleVisibe(true);

        const interval = setInterval(() => {
          setSelectRoleVisibe(true);
        }, 30000);

        return () => {
          clearInterval(interval);
          setSelectRoleVisibe(false);
        };
      }, 5000);

      return () => {
        clearTimeout(timeout);
        setSelectRoleVisibe(false);
      };
    }
  }, [isSelectRole]);

  return {
    router,
    selectRoleVisible,
    setSelectRoleVisibe,
    data,
  };
}
