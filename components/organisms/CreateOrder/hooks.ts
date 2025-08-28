import { queryKeys } from "@/constants/queryKeys";
import {
  GetServiceTypeQuestionsByServiceTypeInput,
  ServiceTypeQuestion_GetByServiceTypeDocument,
} from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetServiceTypeQuestionsQuery = ({
  input,
}: {
  input: GetServiceTypeQuestionsByServiceTypeInput;
}) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.serviceTypeQuestion_getByServiceType, input],
    queryFn: async ({ pageParam = 0 }) => {
      return fetcher(ServiceTypeQuestion_GetByServiceTypeDocument, {
        skip: pageParam * 30,
        take: 30,
        input,
      })();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage?.serviceTypeQuestion_getByServiceType?.result?.pageInfo
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
          ?.map((a) => a?.serviceTypeQuestion_getByServiceType?.result?.items)
          .flat(),
      };
    },
  });
};
