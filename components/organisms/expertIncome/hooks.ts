import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  PaymentDtoFilterInput,
  PaymentDtoSortInput,
  Payment_GetMyPaymentsDocument,
  ServiceRequestDtoFilterInput,
  ServiceRequest_GetMyAcceptancesIncomDocument,
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

export const useGetServiceAcceptanceIncomeQuery = ({
  where,
}: {
  where?: ServiceRequestDtoFilterInput;
}) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.serviceRequest_getMyAcceptances, where],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(ServiceRequest_GetMyAcceptancesIncomDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...where,
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
