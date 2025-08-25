import { ServiceRequestStatus, SortEnumType } from "@/generated/graphql";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useGetAllAvailableRequestQuery } from "./WorkList.query";

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
  } = useGetAllAvailableRequestQuery({
    where: {
      and: [
        { status: { eq: ServiceRequestStatus.Pending } },
        { serviceType: { name: { eq: searchText } } },
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
