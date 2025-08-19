import { useCity_GetAllQuery } from "@/generated/graphql";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function useHomeHook() {
  const router = useRouter();

  const [selectRoleVisible, setSelectRoleVisibe] = useState<boolean>(false);

  const { data } = useCity_GetAllQuery({ take: 200 });

  // useEffect(() => {
  //   if (isSelectRole) {
  //     setSelectRoleVisibe(false);
  //   }
  //   // if (Platform.OS === "ios")
  //   else {
  //     const timeout = setTimeout(() => {
  //       setIsModalUserLoggedInVisible(true);

  //       const interval = setInterval(() => {
  //         setIsModalUserLoggedInVisible(true);
  //       }, 30000);

  //       return () => {
  //         clearInterval(interval);
  //         setIsModalUserLoggedInVisible(false);
  //       };
  //     }, 5000);

  //     return () => {
  //       clearTimeout(timeout);
  //       setSelectRoleVisibe(false);
  //     };
  //   }
  // }, [isSelectRole]);

  return {
    router,
    selectRoleVisible,
    setSelectRoleVisibe,
    data,
  };
}
