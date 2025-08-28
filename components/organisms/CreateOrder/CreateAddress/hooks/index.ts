import { queryKeys } from "@/constants/queryKeys";
import {
  NeighborhoodDtoFilterInput,
  NeighborhoodDtoSortInput,
  Neighborhood_GetAllDocument,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetNeighborhoodsQuery = ({
  where,
  order,
  enabled = true,
}: {
  where?: NeighborhoodDtoFilterInput;
  order?: [NeighborhoodDtoSortInput];
  enabled?: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.neighborhood_getAll, where, order, enabled],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(Neighborhood_GetAllDocument, {
        skip: pageParam * 100,
        take: 100,
        where,
        order,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.neighborhood_getAll?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.neighborhood_getAll?.result?.items)
          .flat(),
      };
    },
  });
};
