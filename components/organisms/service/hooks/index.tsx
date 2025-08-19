import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  ServiceCategoryDtoSortInput,
  ServiceCategory_GetServiceCategoriesDocument,
  ServiceSubCategoryDtoSortInput,
  ServiceSubCategory_GetAllDocument,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetServiceCategoriesQuery = ({
  //   where,
  order,
  enabled = true,
}: {
  //   where?: ServiceCategoryDtoFilterInput;
  order?: [ServiceCategoryDtoSortInput];
  enabled?: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.ServiceCategory_GetServiceCategoriesQuery,
      //   where,
      order,
      enabled,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(ServiceCategory_GetServiceCategoriesDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        // where,
        // order,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage?.serviceCategory_getServiceCategories?.pageInfo?.hasNextPage
      ) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.serviceCategory_getServiceCategories?.items)
          .flat(),
      };
    },
  });
};

export const useGetSubServiceCategoriesQuery = ({
  //   where,
  order,
  enabled = true,
}: {
  //   where?: ServiceCategoryDtoFilterInput;
  order?: [ServiceSubCategoryDtoSortInput];
  enabled?: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.serviceSubCategory_getAll,
      //   where,
      order,
      enabled,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(ServiceSubCategory_GetAllDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where: undefined,
        // order,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.serviceSubCategory_getAll?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      console.log({ datass: data });
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.serviceSubCategory_getAll?.items)
          .flat(),
      };
    },
  });
};
