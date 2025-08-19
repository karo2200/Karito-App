import {
  useCity_GetAllQuery,
  useServiceCategory_GetServiceCategoriesQuery,
} from "@/generated/graphql";
import { hideSheet, showSheet } from "@/hooks/useShowSheet";
import useUserStore from "@/stores/loginStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function useHomeHook() {
  const router = useRouter();

  const { isSelectRole } = useUserStore();

  const [selectRoleVisible, setSelectRoleVisibe] = useState<boolean>(false);

  const { data } = useCity_GetAllQuery({ take: 200 });

  const { data: homeCategoryData } =
    useServiceCategory_GetServiceCategoriesQuery();
  console.log("////", homeCategoryData);

  useEffect(() => {
    if (isSelectRole) {
      setSelectRoleVisibe(false);
    }
    // if (Platform.OS === "ios")
    else {
      const timeout = setTimeout(() => {
        onShow();

        const interval = setInterval(() => {
          onShow();
        }, 30000);

        return () => {
          clearInterval(interval);
        };
      }, 5000);

      return () => {
        clearTimeout(timeout);
        setSelectRoleVisibe(false);
      };
    }
  }, [isSelectRole]);

  const onShow = () => {
    showSheet("confirmation-action", {
      payload: {
        hasLoading: false,
        showToastInActionSheet: false,
        title: "ورود",

        onClose: () => hideSheet("confirmation-action"),
      },
    });
  };

  return {
    router,
    selectRoleVisible,
    setSelectRoleVisibe,
    data,
  };
}
