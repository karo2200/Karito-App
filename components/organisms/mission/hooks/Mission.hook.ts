import { ServiceRequestStatus, SortEnumType } from "@/generated/graphql";
import { useRouter } from "expo-router";
import { useGetServiceAcceptanceQuery } from "./Mission.query";

export default function useMissionsHook() {
  const router = useRouter();

  const {
    data: inProgressData,
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useGetServiceAcceptanceQuery({
    where: { status: { neq: ServiceRequestStatus.Completed } },
    order: [{ requestDate: SortEnumType.Desc }],
  });

  const {
    data: compleateData,
    isRefetching: completeIsRefetching,
    refetch: completeRefetch,
    hasNextPage: completeHasNextPage,
    fetchNextPage: completeFetchNextPage,
  } = useGetServiceAcceptanceQuery({
    where: { status: { eq: ServiceRequestStatus.Completed } },
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
  };
}
