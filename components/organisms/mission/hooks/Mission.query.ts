import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  ServiceRequest_GetMyAcceptancesDocument,
  ServiceRequestDtoFilterInput,
  ServiceRequestDtoSortInput,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseGetServiceAcceptanceOptions = {
  skip?: number;
  take?: number;
  where?: ServiceRequestDtoFilterInput;
  order?: [ServiceRequestDtoSortInput];
};

export const useGetServiceAcceptanceQuery = (
  options: UseGetServiceAcceptanceOptions = {}
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.serviceRequest_getMyAcceptances, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(ServiceRequest_GetMyAcceptancesDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage?.serviceRequest_getMyAcceptances?.result?.pageInfo?.hasNextPage
      ) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.serviceRequest_getMyAcceptances?.result?.items)
          .flat(),
        totalCount:
          data?.pages?.[0]?.serviceRequest_getMyAcceptances?.result?.totalCount,
      };
    },
  });
};
