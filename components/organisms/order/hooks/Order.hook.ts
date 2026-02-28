import { DeviceWidth } from "@/constants/Dimension";
import {
  ServiceRequestDtoFilterInput,
  ServiceRequestStatus,
  SortEnumType,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import useOrderFilterModalStore from "@/stores/orderFilterModalStore";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useGetServiceRequestsQuery } from "./Order.query";

type TabKey = "all" | "inProgress" | "past" | "cancelled";
type WhereType = NonNullable<ServiceRequestDtoFilterInput["where"]>;

type TabItem = {
  label: string;
  key: TabKey;
  condition?: WhereType;
};

export default function useOrderHook() {
  const appliedFilter = useOrderFilterModalStore(
    (state) => state.appliedFilter
  );
  const router = useRouter();

  const { params } = useRoute();

  const { isLoggedIn } = authCacheStore();

  const [activeTab, setActiveTab] = useState(params?.index ?? 0);

  const scrollRef = useRef<ScrollView>(null);

  const today = useMemo(() => new Date().toISOString(), []);

  const tabs: TabItem[] = [
    { label: "همه", key: "all" },
    {
      label: "فعال",
      key: "inProgress",
      condition: {
        where: {
          and: [
            {
              or: [
                { status: { eq: ServiceRequestStatus.AcceptedBySpecialist } },
                {
                  status: {
                    eq: ServiceRequestStatus.SpecialistArrivedToLocation,
                  },
                },
                {
                  status: {
                    eq: ServiceRequestStatus.Pending,
                  },
                },
              ],
            },
            { requestDate: { gte: today } },
          ],
        },
      },
    },
    {
      label: "گذشته",
      condition: {
        where: {
          or: [
            { status: { eq: ServiceRequestStatus.Paid } },
            { requestDate: { lt: today } },
          ],
        },
      },
      key: "past",
    },
    {
      label: "لغو شده",
      key: "cancelled",
      condition: {
        where: {
          or: [
            { status: { eq: ServiceRequestStatus.CancelledByCustomer } },
            { status: { eq: ServiceRequestStatus.CancelledBySpecialist } },
          ],
        },
      },
    },
  ];
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

  const { data, isRefetching, refetch, hasNextPage, fetchNextPage, isLoading } =
    useGetServiceRequestsQuery({
      where: { ...tabs[activeTab]?.condition?.where, ...appliedFilter },
      order: [{ requestDate: SortEnumType.Asc }],
    });

  return {
    router,
    inProgressData: data?.pages ?? [],
    completeOrders: data?.pages ?? [],
    cancelledOrders: data?.pages ?? [],
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    completeIsRefetching: isRefetching,
    completeRefetch: refetch,
    completeHasNextPage: hasNextPage,
    completeFetchNextPage: fetchNextPage,
    cancelledIsRefetching: isRefetching,
    cancelledRefetch: refetch,
    cancelledHasNextPage: hasNextPage,
    cancelledFetchNextPage: fetchNextPage,
    completeLoading: isLoading,
    canceledLoading: isLoading,
    inProgressLoading: isLoading,
    data,
    activeTab,
    setActiveTab,
    scrollRef,
    isLoggedIn,
    tabs,
    isLoading,
  };
}
