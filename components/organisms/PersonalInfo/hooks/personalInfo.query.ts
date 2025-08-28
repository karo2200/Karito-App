import { queryKeys } from "@/constants/queryKeys";
import { Specialist_GetMyProfileDocument } from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useQuery } from "@tanstack/react-query";

export function useGetSpecialistProfile() {
  return useQuery({
    queryKey: [queryKeys.specialist_getMyProfile],
    queryFn: () => fetcher(Specialist_GetMyProfileDocument)(),
  });
}
