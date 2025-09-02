import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  DiscountCodeDtoFilterInput,
  DiscountCodeDtoSortInput,
  DiscountCode_GetMyCodesDocument,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

type DiscountCodeOptions = {
  skip?: number;
  take?: number;
  where?: DiscountCodeDtoFilterInput;
  order?: [DiscountCodeDtoSortInput];
};

export const useGetDiscountCodesQuery = (options: DiscountCodeOptions = {}) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.discountCode_getMyCodes],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(DiscountCode_GetMyCodesDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.discountCode_getMyCodes?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.discountCode_getMyCodes?.result?.items)
          .flat(),
        totalCount:
          data?.pages?.[0]?.discountCode_getMyCodes?.result?.totalCount,
      };
    },
  });
};
