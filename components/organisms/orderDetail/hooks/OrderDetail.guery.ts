import { queryKeys } from "@/constants/queryKeys";
import {
  CancellationReason_GetAllDocument,
  CancellationReasonDtoFilterInput,
  CancellationReasonDtoSortInput,
  ServiceRequest_GetByIdDocument,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useGetServiceById(variables: { id: number }) {
  return useQuery({
    queryKey: [queryKeys.serviceRequest_getById, variables],
    queryFn: () => fetcher(ServiceRequest_GetByIdDocument, variables)(),
  });
}

type UseGetCancelationRequestOptions = {
  skip?: number;
  take?: number;
  where?: CancellationReasonDtoFilterInput;
  order?: [CancellationReasonDtoSortInput];
};

export const useGetCancelationRequestsQuery = (
  options: UseGetCancelationRequestOptions = {}
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.cancellationReason_getAll, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(CancellationReason_GetAllDocument, {
        skip: pageParam * 50,
        take: 50,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.cancellationReason_getAll?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.cancellationReason_getAll?.result?.items)
          .flat(),
        totalCount:
          data?.pages?.[0]?.cancellationReason_getAll?.result?.totalCount,
      };
    },
  });
};
