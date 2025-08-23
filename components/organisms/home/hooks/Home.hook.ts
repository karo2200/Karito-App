import { hideSheet, showSheet } from "@/hooks/useShowSheet";
import authCacheStore from "@/stores/authCacheStore";
import useUserStore from "@/stores/loginStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useGetServiceCategoriesQuery } from "../../service/hooks";
import { useGetAllCityQuery } from "./Home.query";

export default function useHomeHook() {
  const router = useRouter();

  const { isSelectRole } = useUserStore();

  const { customerCity, setCustomerCity } = authCacheStore();

  const [selectRoleVisible, setSelectRoleVisibe] = useState<boolean>(false);

  const { data: cityData, isLoading } = useGetAllCityQuery({
    where: { isActive: { eq: true } },
  });

  const { data: homeCategoryData } = useGetServiceCategoriesQuery();

  const { data: selectedCityData, isLoading: selectedCityLoading } =
    useGetAllCityQuery({ where: { name: { eq: customerCity } } });

  console.log(".......", selectedCityData);

  useEffect(() => {
    // if (isSelectRole) {
    //   setSelectRoleVisibe(false);
    // }
    // // if (Platform.OS === "ios")
    // else {
    //   const timeout = setTimeout(() => {
    //     onShow();
    //     const interval = setInterval(() => {
    //       onShow();
    //     }, 30000);
    //     return () => {
    //       clearInterval(interval);
    //     };
    //   }, 5000);
    //   return () => {
    //     clearTimeout(timeout);
    //     setSelectRoleVisibe(false);
    //   };
    // }
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

  const onCityPress = (city: string) => {
    setCustomerCity(city);
  };

  return {
    router,
    selectRoleVisible,
    setSelectRoleVisibe,
    cityData: cityData?.pages ?? [],
    homeCategoryData: homeCategoryData?.pages ?? [],
    customerCity,
    onCityPress,
    activeBanner: selectedCityData?.pages[0]?.activeBanner,
    activeCarousel: selectedCityData?.pages[0]?.activeCarousel,
  };
}
