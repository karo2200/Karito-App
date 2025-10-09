import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  GetAvailableRequestsInput,
  ServiceRequest_GetAvailableRequestsDocument,
  ServiceRequestDtoFilterInput,
  ServiceRequestDtoSortInput,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseGetAllAvailableRequestOptions = {
  skip?: number;
  take?: number;
  where?: ServiceRequestDtoFilterInput;
  order?: [ServiceRequestDtoSortInput];
  input?: GetAvailableRequestsInput;
};

export const useGetAllAvailableRequestQuery = (
  options: UseGetAllAvailableRequestOptions = {},
  enabled?: boolean
) => {
  console.log(JSON.stringify({ options }));
  return useInfiniteQuery({
    queryKey: [queryKeys.serviceRequest_getAvailableRequests, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(ServiceRequest_GetAvailableRequestsDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage?.serviceRequest_getAvailableRequests?.result?.pageInfo
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
          ?.map((a) => a?.serviceRequest_getAvailableRequests?.result?.items)
          .flat(),
        totalCount:
          data?.pages?.[0]?.serviceRequest_getAvailableRequests?.result
            ?.totalCount,
      };
    },
    enabled: options?.input?.latitude != undefined,
  });
};
