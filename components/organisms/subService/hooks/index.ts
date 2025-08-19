import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  ServiceTypeDtoFilterInput,
  ServiceTypeDtoSortInput,
  ServiceTypes_GatAllDocument,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetServiceTypesQuery = ({
  where,
  order,
  enabled = true,
}: {
  where?: ServiceTypeDtoFilterInput;
  order?: [ServiceTypeDtoSortInput];
  enabled?: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.serviceSubCategory_getAll, where, order, enabled],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(ServiceTypes_GatAllDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.serviceTypes_gatAll?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages?.map((a) => a?.serviceTypes_gatAll?.items).flat(),
      };
    },
  });
};
