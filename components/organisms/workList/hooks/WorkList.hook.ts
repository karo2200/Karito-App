import {
  ServiceRequestStatus,
  SortEnumType,
  SpecialistProfileDto,
} from "@/generated/graphql";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useGetSpecialistProfile } from "../../PersonalInfo/hooks/personalInfo.query";
import { useGetAllAvailableRequestQuery } from "./WorkList.query";

import { useToast } from "@/components/atoms/Toast";
import * as Location from "expo-location";

export default function useWorkOutHook() {
  const router = useRouter();

  const { showToast } = useToast();

  const [searchText, setSearchText] = useState("");

  const [location, setLocation] = useState<{
    latitude?: number;
    longitude?: number;
  }>({});

  const { data: expertData } = useGetSpecialistProfile();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showToast({
          message: "اجازه دسترسی به مکان شما داده نشده است.",
          type: "error",
        });
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      if (loc.coords) {
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      }
    })();
  }, []);

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
          city: { id: { eq: profileData?.city?.id } },
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
  } = useGetAllAvailableRequestQuery(
    {
      input: { latitude: location?.latitude, longitude: location?.longitude },
      where: {
        and: filters,
      },
      order: [{ requestDate: SortEnumType.Desc }],
    },
    {
      enabled: !!location?.latitude && !!location?.longitude,
    }
  );

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
