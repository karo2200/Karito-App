import { useRouter } from "expo-router";

import { useGetDiscountCodesQuery } from "./Offer.query";

export default function useOfferHook() {
  const router = useRouter();

  const {
    data: discountData,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
  } = useGetDiscountCodesQuery({
    where: {
      and: [{ isActive: { eq: true } }, { expiryDate: { lte: Date.now() } }],
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
