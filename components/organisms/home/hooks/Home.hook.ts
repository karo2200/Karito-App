import useUserStore from "@/stores/loginStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function useHomeHook() {
  const router = useRouter();

  const { isSelectRole } = useUserStore();

  //   const { data } = useCity_GetAllQuery({ take: 200 });
  //   console.log("ddddd", data);
  const [selectRoleVisible, setSelectRoleVisibe] = useState<boolean>(false);

  useEffect(() => {
    if (isSelectRole) {
      setSelectRoleVisibe(false);
    } else {
      const interval = setInterval(() => {
        setSelectRoleVisibe(true);
      }, 50000);

      return () => clearInterval(interval);
    }
  }, [isSelectRole]);

  return {
    router,
    selectRoleVisible,
    setSelectRoleVisibe,
  };
}
