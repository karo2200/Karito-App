import {
  ServiceRequestStatus,
  SortEnumType,
  SpecialistProfileDto,
} from "@/generated/graphql";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useGetSpecialistProfile } from "../../PersonalInfo/hooks/personalInfo.query";
import { useGetAllAvailableRequestQuery } from "./WorkList.query";

export default function useWorkOutHook() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const { data: expertData } = useGetSpecialistProfile();

  const profileData: SpecialistProfileDto =
    expertData?.specialist_getMyProfile?.result;

  const ids = profileData?.serviceTypes?.map((item) => item?.id);

  const filters: any[] = useMemo(() => {
    return [
      { status: { eq: ServiceRequestStatus.Pending } },
      {
        serviceType: {
          id: { in: ids },
        },
      },
      {
        address: {
          neighborhood: { city: { id: { eq: profileData?.city?.id } } },
        },
      },
    ];
  }, [ids]);

  if (searchText.length > 0) {
    filters.push({ serviceType: { name: { eq: searchText } } });
  }

  const {
    data: workData,
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGetAllAvailableRequestQuery({
    where: {
      and: filters,
    },
    order: [{ requestDate: SortEnumType.Desc }],
  });

  return {
    router,
    workData: workData?.pages ?? [],
    searchText,
    setSearchText,
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isLoading,
  };
}
