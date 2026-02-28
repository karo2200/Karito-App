import { queryKeys } from "@/constants/queryKeys";
import {
  City_GetAvailableServiceTypesDocument,
  GetAvailableServiceTypesForCityInput,
  ServiceTypeDtoFilterInput,
  ServiceTypeDtoSortInput,
} from "@/generated/graphql";
import { graphqlFetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetCityServiceTypesQuery = ({
  where,
  order,
  enabled = true,
  input,
}: {
  where?: ServiceTypeDtoFilterInput;
  order?: [ServiceTypeDtoSortInput];
  enabled?: boolean;
  input: GetAvailableServiceTypesForCityInput;
}) => {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.city_getAvailableServiceTypes,
      where,
      order,
      input,
      enabled,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      return await graphqlFetcher(City_GetAvailableServiceTypesDocument, {
        skip: pageParam * 100,
        take: 100,
        where,
        order,
        input,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage?.city_getAvailableServiceTypes?.result?.pageInfo?.hasNextPage
      ) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.city_getAvailableServiceTypes?.result?.items)
          .flat(),
      };
    },
    enabled,
  });
};
