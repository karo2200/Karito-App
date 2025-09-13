import { queryKeys } from "@/constants/queryKeys";
import {
  DisabledServiceTimeDocument,
  DisabledServiceTimeDtoFilterInput,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetDisabledTimesQuery = ({
  where,
  enabled = true,
}: {
  where?: DisabledServiceTimeDtoFilterInput;
  enabled?: boolean;
}) => {
  const PAGE_SIZE = 30;
  return useInfiniteQuery({
    queryKey: [queryKeys.disabledServiceTime_getAll, where, enabled],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(DisabledServiceTimeDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.disabledServiceTime_getAll?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.disabledServiceTime_getAll?.result?.items)
          .flat(),
      };
    },
  });
};
