import authCacheStore from "@/stores/authCacheStore";
import { useRouter } from "expo-router";
import { useGetUserAddressesQuery } from "./Address.query";

export default function useAddressHook() {
  const router = useRouter();

  const { userId } = authCacheStore();

  const {
    data: userAddressData,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useGetUserAddressesQuery({
    userId: userId,
  });
  console.log("//////////......", userAddressData);

  return {
    router,
    refetch,
    hasNextPage,
    fetchNextPage,
    addressesData: userAddressData?.pages ?? [],
  };
}
