import { ServiceRequestStatus, SortEnumType } from "@/generated/graphql";
import { useRouter } from "expo-router";
import { useGetServiceRequestsQuery } from "./Order.query";

export default function useOrderHook() {
  const router = useRouter();

  const {
    data: inprogressOrders,
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isLoading: inProgressLoading,
  } = useGetServiceRequestsQuery({
    where: {
      or: [
        { status: { neq: ServiceRequestStatus.Cancelled } },
        { status: { neq: ServiceRequestStatus.Completed } },
      ],
    },
    order: [{ requestDate: SortEnumType.Desc }],
  });

  const {
    data: completeOrders,
    isRefetching: completeIsRefetching,
    refetch: completeRefetch,
    hasNextPage: completeHasNextPage,
    fetchNextPage: completeFetchNextPage,
    isLoading: completeLoading,
  } = useGetServiceRequestsQuery({
    where: { status: { eq: ServiceRequestStatus.Completed } },
    order: [{ requestDate: SortEnumType.Desc }],
  });

  const {
    data: cancelledOrders,
    isRefetching: cancelledIsRefetching,
    refetch: cancelledRefetch,
    hasNextPage: cancelledHasNextPage,
    fetchNextPage: cancelledFetchNextPage,
    isLoading: canceledLoading,
  } = useGetServiceRequestsQuery({
    where: { status: { eq: ServiceRequestStatus.Cancelled } },
    order: [{ requestDate: SortEnumType.Desc }],
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
  };
}
