import { PAGE_SIZE } from "@/constants/MockData";
import { queryKeys } from "@/constants/queryKeys";
import {
  ServiceCategoryDtoFilterInput,
  ServiceCategoryDtoSortInput,
  ServiceCategory_GetAllDocument,
  ServiceSubCategoryDtoSortInput,
  ServiceSubCategory_GetAllDocument,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
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
      return fetcher(ServiceCategory_GetAllDocument, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.serviceRequest_getAll?.result?.pageInfo?.hasNextPage) {
        return allPages.length;
      }
      return undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data?.pages
          ?.map((a) => a?.serviceRequest_getAll?.result?.items)
          .flat(),
        totalCount: data?.pages?.[0]?.serviceRequest_getAll?.result?.totalCount,
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
