import { ServiceRequestStatus, SortEnumType } from "@/generated/graphql";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useGetServiceAcceptanceQuery } from "../../mission/hooks/Mission.query";

export default function useWorkOutHook() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const {
    data: workData,
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGetServiceAcceptanceQuery({
    where: {
      and: [
        { status: { eq: ServiceRequestStatus.Pending } },
        { serviceTypeName: { eq: searchText } },
      ],
    },
    order: [{ requestDate: SortEnumType.Desc }],
  });

  return {
    router,
    workData: workData?.pages ?? [],
    searchText,
    setSearchText,
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isLoading,
  };
}
