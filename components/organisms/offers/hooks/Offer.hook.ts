import { useRouter } from "expo-router";

import { useMemo } from "react";
import { useGetDiscountCodesQuery } from "./Offer.query";

export default function useOfferHook() {
  const router = useRouter();

  const today = useMemo(() => new Date().toISOString(), []);

  const {
    data: discountData,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
  } = useGetDiscountCodesQuery({
    where: {
      and: [
        { isActive: { eq: true } },
        { expiryDate: { gte: today } },
        { isUsed: { eq: false } },
      ],
    },
  });

  return {
    router,
    isLoading,
    discountData: discountData?.pages ?? [],
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
  };
}
