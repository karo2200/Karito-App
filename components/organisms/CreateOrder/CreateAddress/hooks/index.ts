// export const useGetBoundaries=()=>{
//     return useInfiniteQuery({
//       queryKey: [queryKeys.city_getAllBoundariesWkt],
//       queryFn: async ({ pageParam = 0 }) => {
//         return fetcher(City_GetAllBoundariesWktDocument, {
//           skip: pageParam * PAGE_SIZE,
//           take: PAGE_SIZE,
//           ...options,
//         })();
//       },
//       initialPageParam: 0,
//       getNextPageParam: (lastPage, allPages) => {
//         if (lastPage?.address_getMyAddresses?.result?.pageInfo?.hasNextPage) {
//           return allPages.length;
//         }
//         return undefined;
//       },
//       select: (data) => {
//         return {
//           ...data,
//           pages: data?.pages
//             ?.map((a) => a?.address_getMyAddresses?.result?.items)
//             .flat(),
//           totalCount:
//             data?.pages?.[0]?.address_getMyAddresses?.result?.totalCount,
//         };
//       },
//     });
// }
