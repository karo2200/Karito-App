import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  City_GetAvailableServiceCategoriesDocument,
  City_GetAvailableServiceSubCategoriesDocument,
  GetAvailableServiceCategoriesForCityInput,
  GetAvailableServiceSubCategoriesForCityInput,
  ServiceCategoryDtoFilterInput,
  ServiceCategoryDtoSortInput,
  ServiceCategory_GetAllDocument,
  ServiceSubCategoryDtoFilterInput,
  ServiceSubCategoryDtoSortInput,
  ServiceSubCategory_GetAllDocument,
} from "@/generated/graphql";
import { graphqlFetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

type ServiceCategoriesOptions = {
  skip?: number;
  take?: number;
  where?: ServiceCategoryDtoFilterInput;
  order?: [ServiceCategoryDtoSortInput];
};

export const useGetServiceCategoriesQuery = (
  options: ServiceCategoriesOptions = {}
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.ServiceCategory_GetServiceCategoriesQuery],
    queryFn: async ({ pageParam = 0 }) => {
      return await graphqlFetcher(ServiceCategory_GetAllDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.serviceCategory_getAll?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.serviceCategory_getAll?.result?.items)
          .flat(),
        totalCount:
          data?.pages?.[0]?.serviceCategory_getAll?.result?.totalCount,
      };
    },
  });
};

export const useGetSubServiceCategoriesQuery = ({
  where,
  order,
  take,
  enabled = true,
}: {
  where?: ServiceSubCategoryDtoFilterInput;
  order?: [ServiceSubCategoryDtoSortInput];
  take?: number;
  enabled?: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.serviceSubCategory_getAll, where, order, enabled],
    queryFn: async ({ pageParam = 0 }) => {
      return await graphqlFetcher(ServiceSubCategory_GetAllDocument, {
        skip: pageParam * PAGE_SIZE,
        take: take ?? PAGE_SIZE,
        where,
        order,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.serviceSubCategory_getAll?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.serviceSubCategory_getAll?.result?.items)
          .flat(),
      };
    },
  });
};

export const useGetCityServiceCategoriesQuery = ({
  where,
  order,
  take,
  enabled = true,
  input,
}: {
  where?: ServiceSubCategoryDtoFilterInput;
  order?: [ServiceSubCategoryDtoSortInput];
  take?: number;
  enabled?: boolean;
  input: GetAvailableServiceCategoriesForCityInput;
}) => {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.city_getAvailableServiceCategories,
      input,
      where,
      order,
      take,
      enabled,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      return await graphqlFetcher(City_GetAvailableServiceCategoriesDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        input,
        where,
        order,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage?.city_getAvailableServiceCategories?.result?.pageInfo
          ?.hasNextPage
      ) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.city_getAvailableServiceCategories?.result?.items)
          .flat(),
        totalCount:
          data?.pages?.[0]?.city_getAvailableServiceCategories?.result
            ?.totalCount,
      };
    },
  });
};

export const useGetCitySubServiceCategoriesQuery = ({
  where,
  order,
  take,
  enabled = true,
  input,
}: {
  where?: ServiceSubCategoryDtoFilterInput;
  order?: [ServiceSubCategoryDtoSortInput];
  take?: number;
  enabled?: boolean;
  input: GetAvailableServiceSubCategoriesForCityInput;
}) => {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.city_getAvailableServiceSubCategories,
      where,
      order,
      enabled,
      input,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      return await graphqlFetcher(
        City_GetAvailableServiceSubCategoriesDocument,
        {
          skip: pageParam * PAGE_SIZE,
          take: take ?? PAGE_SIZE,
          where,
          order,
          input,
        }
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage?.city_getAvailableServiceSubCategories?.result?.pageInfo
          ?.hasNextPage
      ) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.city_getAvailableServiceSubCategories?.result?.items)
          .flat(),
      };
    },
  });
};
