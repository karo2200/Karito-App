import { useCity_GetAllQuery } from "@/generated/graphql";
import useUserStore from "@/stores/loginStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function useHomeHook() {
  const router = useRouter();

  const {
    isSelectRole,
    isModalUserLoggedInVisible,
    setIsModalUserLoggedInVisible,
  } = useUserStore();

  const [selectRoleVisible, setSelectRoleVisibe] = useState<boolean>(false);

  const { data } = useCity_GetAllQuery({ take: 200 });

  useEffect(() => {
    if (isSelectRole) {
      setSelectRoleVisibe(false);
    }
    // if (Platform.OS === "ios")
    else {
      const timeout = setTimeout(() => {
        setIsModalUserLoggedInVisible(true);

        const interval = setInterval(() => {
          setIsModalUserLoggedInVisible(true);
        }, 30000);

        return () => {
          clearInterval(interval);
          setIsModalUserLoggedInVisible(false);
        };
      }, 5000);

      return () => {
        clearTimeout(timeout);
        setSelectRoleVisibe(false);
      };
    }
  }, [isSelectRole]);

  // ⏱ باز شدن خودکار هر ۳۰ ثانیه اگه انتخابی انجام نشده باشه
  // useEffect(() => {
  //   const openWithDelay = () => {
  //     if (!answered) actionSheetRef.current?.show();
  //   };

  //   // بار اول ۵ ثانیه بعد
  //   const firstTimeout = setTimeout(openWithDelay, 5000);

  //   // دفعات بعد هر ۳۰ ثانیه
  //   const interval = setInterval(openWithDelay, 30000);

  //   return () => {
  //     clearTimeout(firstTimeout);
  //     clearInterval(interval);
  //   };
  // }, [answered]);

  return {
    router,
    selectRoleVisible,
    setSelectRoleVisibe,
    data,
  };
}
