import { SortEnumType } from "@/generated/graphql";
import { hideSheet, showSheet } from "@/hooks/useShowSheet";
import authCacheStore from "@/stores/authCacheStore";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { useGetServiceCategoriesQuery } from "../../service/hooks";
import {
  useGetAllCityQuery,
  useGetAllPopularQuery,
  useGetAllSpecialistQuery,
} from "./Home.query";

export default function useHomeHook() {
  const router = useRouter();

  const { isLoggedIn } = authCacheStore();

  const { customerCity, setCustomerCity } = authCacheStore();

  const { data: cityData, isLoading } = useGetAllCityQuery({
    where: { isActive: { eq: true } },
  });

  const { data: popularData } = useGetAllPopularQuery();

  const { data: specialData } = useGetAllPopularQuery({
    where: { isSpecial: { eq: true } },
  });

  const { data: specialists } = useGetAllSpecialistQuery({
    // where: {
    //   and: [
    //     { idCardVerificationStatus: { eq: VerificationStatus.Approved } },
    //     {
    //       specializedDocumentsVerificationStatus: {
    //         eq: VerificationStatus.Approved,
    //       },
    //     },
    //     {
    //       identityVerificationVideoStatus: {
    //         eq: VerificationStatus.Approved,
    //       },
    //     },
    //   ],
    // },
    order: [{ averageRating: SortEnumType.Desc }],
  });

  const { data: homeCategoryData } = useGetServiceCategoriesQuery();

  const { data: selectedCityData, isLoading: selectedCityLoading } =
    useGetAllCityQuery({ where: { name: { eq: customerCity } } });

  console.log({ isLoggedIn });
  useEffect(() => {
    if (isLoggedIn) return;
    const timeout = setTimeout(() => {
      onShow();
    }, 5000);

    const interval = setInterval(() => {
      onShow();
    }, 30000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  const onShow = () => {
    showSheet("confirmation-action", {
      payload: {
        hasLoading: false,
        showToastInActionSheet: false,
        title: "ورود",

        onClose: handleClose,
      },
    });
  };

  const { handleClose } = useShowSheetTimer(isLoggedIn, onShow, () =>
    hideSheet("confirmation-action")
  );

  const onCityPress = (city: string) => {
    setCustomerCity(city);
  };

  return {
    router,
    cityData: cityData?.pages ?? [],
    homeCategoryData: homeCategoryData?.pages ?? [],
    customerCity,
    onCityPress,
    activeBanner: selectedCityData?.pages[0]?.activeBanner,
    activeCarousel: selectedCityData?.pages[0]?.activeCarousel,
    specialists: specialists?.pages,
    popularData: popularData?.pages ?? [],
    specialData: specialData?.pages ?? [],
  };
}

export function useShowSheetTimer(
  isUserLoggedIn: boolean | undefined,
  onShow: () => void,
  onClose: () => void
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = (delay: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      onShow();
    }, delay);
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      resetTimer(5000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isUserLoggedIn]);

  const handleClose = () => {
    onClose?.();
    resetTimer(30000);
  };

  return { handleClose };
}
