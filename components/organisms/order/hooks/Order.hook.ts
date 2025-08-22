import { ServiceRequestStatus } from "@/generated/graphql";
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
  } = useGetServiceRequestsQuery({
    where: {
      or: [
        { status: { neq: ServiceRequestStatus.Cancelled } },
        { status: { neq: ServiceRequestStatus.Completed } },
      ],
    },
  });

  const {
    data: completeOrders,
    isRefetching: completeIsRefetching,
    refetch: completeRefetch,
    hasNextPage: completeHasNextPage,
    fetchNextPage: completeFetchNextPage,
  } = useGetServiceRequestsQuery({
    where: { status: { eq: ServiceRequestStatus.Completed } },
  });

  const {
    data: cancelledOrders,
    isRefetching: cancelledIsRefetching,
    refetch: cancelledRefetch,
    hasNextPage: cancelledHasNextPage,
    fetchNextPage: cancelledFetchNextPage,
  } = useGetServiceRequestsQuery({
    where: { status: { eq: ServiceRequestStatus.Cancelled } },
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
  };
}
