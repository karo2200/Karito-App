import { DeviceWidth } from "@/constants/Dimension";
import { ServiceRequestStatus, SortEnumType } from "@/generated/graphql";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useGetServiceAcceptanceQuery } from "./Mission.query";

export default function useMissionsHook() {
  const router = useRouter();

  const { params } = useRoute();

  const [activeTab, setActiveTab] = useState(params?.index ?? 0);

  const scrollRef = useRef<ScrollView>(null);

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
    data: inProgressData,
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isLoading: inProressLoading,
  } = useGetServiceAcceptanceQuery({
    where: { status: { neq: ServiceRequestStatus.Paid } },
    order: [{ requestDate: SortEnumType.Desc }],
  });

  const {
    data: compleateData,
    isRefetching: completeIsRefetching,
    refetch: completeRefetch,
    hasNextPage: completeHasNextPage,
    fetchNextPage: completeFetchNextPage,
    isLoading: copmleteLoading,
  } = useGetServiceAcceptanceQuery({
    where: { status: { eq: ServiceRequestStatus.Paid } },
    order: [{ requestDate: SortEnumType.Desc }],
  });

  return {
    router,
    inProgressData: inProgressData?.pages ?? [],
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    compleateData: compleateData?.pages ?? [],
    completeIsRefetching,
    completeRefetch,
    completeHasNextPage,
    completeFetchNextPage,
    inProressLoading,
    copmleteLoading,
    activeTab,
    setActiveTab,
    scrollRef,
  };
}
