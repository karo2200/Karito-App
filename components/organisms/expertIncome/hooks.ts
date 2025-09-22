import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  PaymentDtoFilterInput,
  PaymentDtoSortInput,
  Payment_GetMyPaymentsDocument,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetMyPaymentsQuery = ({
  where,
  order,
  take,
  enabled = true,
}: {
  where?: PaymentDtoFilterInput;
  order?: [PaymentDtoSortInput];
  take?: number;
  enabled?: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.payment_getMyPayments, where, order, enabled],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(Payment_GetMyPaymentsDocument, {
        skip: pageParam * PAGE_SIZE,
        take: take ?? PAGE_SIZE,
        where,
        order,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.payment_getMyPayments?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.payment_getMyPayments?.result?.items)
          .flat(),
      };
    },
  });
};
