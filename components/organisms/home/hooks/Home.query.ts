import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  Banner_GetAllDocument,
  BannerDtoFilterInput,
  BannerDtoSortInput,
  City_GetAllDocument,
  CityDtoFilterInput,
  CityDtoSortInput,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseGetAllCityOptions = {
  skip?: number;
  take?: number;
  where?: CityDtoFilterInput;
  order?: [CityDtoSortInput];
};

type UseGetAllBannerOptions = {
  skip?: number;
  take?: number;
  where?: BannerDtoFilterInput;
  order?: [BannerDtoSortInput];
};

export const useGetAllCityQuery = (options: UseGetAllCityOptions = {}) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.city_getAll, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(City_GetAllDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.city_getAll?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages?.map((a) => a?.city_getAll?.result?.items).flat(),
        totalCount: data?.pages?.[0]?.city_getAll?.result?.totalCount,
      };
    },
  });
};

export const useGetAllBannerQuery = (options: UseGetAllBannerOptions = {}) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.banner_getAll, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(Banner_GetAllDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.banner_getAll?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages?.map((a) => a?.banner_getAll?.result?.items).flat(),
        totalCount: data?.pages?.[0]?.banner_getAll?.result?.totalCount,
      };
    },
  });
};
