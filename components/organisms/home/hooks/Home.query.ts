import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  Banner_GetAllDocument,
  BannerDtoFilterInput,
  BannerDtoSortInput,
  City_GetAllDocument,
  CityDtoFilterInput,
  CityDtoSortInput,
  PopularServiceTypeDtoFilterInput,
  PopularServiceTypeDtoSortInput,
  Province_GetAllDocument,
  ProvinceDtoFilterInput,
  ProvinceDtoSortInput,
  ServiceTypes_GetPopularDocument,
  Specialist_GetAllDocument,
  SpecialistProfileDtoFilterInput,
  SpecialistProfileDtoSortInput,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseGetAllCityOptions = {
  skip?: number;
  take?: number;
  where?: CityDtoFilterInput;
  order?: [CityDtoSortInput];
  enabled?: boolean;
};

type UseGetAllBannerOptions = {
  skip?: number;
  take?: number;
  where?: BannerDtoFilterInput;
  order?: [BannerDtoSortInput];
};

type UseGetAllProvinceOptions = {
  skip?: number;
  take?: number;
  where?: ProvinceDtoFilterInput;
  order?: [ProvinceDtoSortInput];
  enabled?: boolean;
};

type UseGetAllSpecialistOptions = {
  skip?: number;
  take?: number;
  where?: SpecialistProfileDtoFilterInput;
  order?: [SpecialistProfileDtoSortInput];
};

type UseGetAllPopularOptions = {
  skip?: number;
  take?: number;
  where?: PopularServiceTypeDtoFilterInput;
  order?: [PopularServiceTypeDtoSortInput];
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

export const useGetAllprovinceQuery = (
  options: UseGetAllProvinceOptions = {}
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.city_getAll, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(Province_GetAllDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.province_getAll?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.province_getAll?.result?.items)
          .flat(),
        totalCount: data?.pages?.[0]?.province_getAll?.result?.totalCount,
      };
    },
  });
};

export const useGetAllSpecialistQuery = (
  options: UseGetAllSpecialistOptions = {}
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.specialist_getAll, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(Specialist_GetAllDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.specialist_getAll?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.specialist_getAll?.result?.items)
          .flat(),
        totalCount: data?.pages?.[0]?.specialist_getAll?.result?.totalCount,
      };
    },
  });
};

export const useGetAllPopularQuery = (
  options: UseGetAllPopularOptions = {}
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.serviceTypes_getPopular, options],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(ServiceTypes_GetPopularDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.serviceTypes_getPopular?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.serviceTypes_getPopular?.result?.items)
          .flat(),
        totalCount:
          data?.pages?.[0]?.serviceTypes_getPopular?.result?.totalCount,
      };
    },
  });
};
