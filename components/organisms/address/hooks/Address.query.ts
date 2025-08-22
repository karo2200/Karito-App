import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  Address_GetMyAddressesDocument,
  AddressDtoFilterInput,
  AddressDtoSortInput,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseGetUserAddressesOptions = {
  skip?: number;
  take?: number;
  userId: string;
  where?: AddressDtoFilterInput;
  order?: [AddressDtoSortInput];
};

export const useGetUserAddressesQuery = (
  options: UseGetUserAddressesOptions
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.address_getMyAddresses, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(Address_GetMyAddressesDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.address_getMyAddresses?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.address_getMyAddresses?.result?.items)
          .flat(),
        totalCount:
          data?.pages?.[0]?.address_getMyAddresses?.result?.totalCount,
      };
    },
  });
};
