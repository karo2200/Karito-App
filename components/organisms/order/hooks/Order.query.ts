import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  ServiceRequest_GetMyServiceRequestsDocument,
  ServiceRequestDetailDtoSortInput,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseGetServiceRequestsOptions = {
  skip?: number;
  take?: number;
  // where?: AddressDtoFilterInput;
  order?: [ServiceRequestDetailDtoSortInput];
};

export const useGetServiceRequestsQuery = (
  options: UseGetServiceRequestsOptions = {}
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.serviceRequest_getMyServiceRequests, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(ServiceRequest_GetMyServiceRequestsDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage?.serviceRequest_getMyServiceRequests?.pageInfo?.hasNextPage
      ) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.serviceRequest_getMyServiceRequests?.items)
          .flat(),
      };
    },
  });
};
