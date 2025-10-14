import { DeviceWidth } from "@/constants/Dimension";
import { ServiceRequestStatus, SortEnumType } from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useGetServiceRequestsQuery } from "./Order.query";

export default function useOrderHook() {
  const router = useRouter();

  const { params } = useRoute();

  const { isLoggedIn } = authCacheStore();

  const [activeTab, setActiveTab] = useState(params?.index ?? 0);

  const scrollRef = useRef<ScrollView>(null);

  const today = useMemo(() => new Date().toISOString(), []);

  useEffect(() => {
    if (params?.index !== undefined) {
      const index = Number(params.index);
      setActiveTab(index);

      setTimeout(() => {
        scrollRef.current?.scrollTo({
          x: DeviceWidth * index,
          animated: false,
        });
      }, 0);
    }
  }, [params?.index]);

  const {
    data: inprogressOrders,
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isLoading: inProgressLoading,
  } = useGetServiceRequestsQuery({
    where: {
      and: [
        { status: { neq: ServiceRequestStatus.CancelledByCustomer } },
        { requestDate: { gte: today } },
        { status: { neq: ServiceRequestStatus.Paid } },
      ],
    },
    order: [{ requestDate: SortEnumType.Asc }],
  });

  const {
    data: completeOrders,
    isRefetching: completeIsRefetching,
    refetch: completeRefetch,
    hasNextPage: completeHasNextPage,
    fetchNextPage: completeFetchNextPage,
    isLoading: completeLoading,
  } = useGetServiceRequestsQuery({
    where: { status: { eq: ServiceRequestStatus.Paid } },
    order: [{ requestDate: SortEnumType.Asc }],
  });

  const {
    data: cancelledOrders,
    isRefetching: cancelledIsRefetching,
    refetch: cancelledRefetch,
    hasNextPage: cancelledHasNextPage,
    fetchNextPage: cancelledFetchNextPage,
    isLoading: canceledLoading,
  } = useGetServiceRequestsQuery({
    where: { status: { eq: ServiceRequestStatus.CancelledByCustomer } },
    order: [{ requestDate: SortEnumType.Asc }],
  });

  return {
    router,
    inProgressData: inprogressOrders?.pages ?? [],
    completeOrders: completeOrders?.pages ?? [],
    cancelledOrders: cancelledOrders?.pages ?? [],
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    completeIsRefetching,
    completeRefetch,
    completeHasNextPage,
    completeFetchNextPage,
    cancelledIsRefetching,
    cancelledRefetch,
    cancelledHasNextPage,
    cancelledFetchNextPage,
    completeLoading,
    canceledLoading,
    inProgressLoading,
    activeTab,
    setActiveTab,
    scrollRef,
    isLoggedIn,
  };
}
