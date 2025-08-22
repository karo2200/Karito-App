import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  ServiceRequest_GetMyServiceAcceptancesDocument,
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
    queryKey: [queryKeys.serviceRequest_getMyServiceAcceptances, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(ServiceRequest_GetMyServiceAcceptancesDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage?.serviceRequest_getMyServiceAcceptances?.result?.pageInfo
          ?.hasNextPage
      ) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.serviceRequest_getMyServiceAcceptances?.result?.items)
          .flat(),
        totalCount:
          data?.pages?.[0]?.serviceRequest_getMyServiceAcceptances?.result
            ?.totalCount,
      };
    },
  });
};
