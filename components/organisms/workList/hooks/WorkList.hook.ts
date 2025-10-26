import { SortEnumType } from "@/generated/graphql";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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

  const whereCondition =
    searchText.length > 0
      ? { serviceType: { name: { contains: searchText } } }
      : {};

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
      where: whereCondition,
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
