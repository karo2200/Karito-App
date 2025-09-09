import { queryKeys } from "@/constants/queryKeys";
import {
  SortEnumType,
  useAddress_SetPrimaryMutation,
} from "@/generated/graphql";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useGetUserAddressesQuery } from "./Address.query";

export default function useAddressHook() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: userAddressData,
    refetch,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    isLoading,
  } = useGetUserAddressesQuery({ order: [{ isPrimary: SortEnumType.Desc }] });

  const { mutate } = useAddress_SetPrimaryMutation();

  const onSetPrimary = (addressId: string) => {
    mutate(
      {
        input: {
          addressId: addressId,
        },
      },
      {
        onSuccess: (data) => {
          console.log("dddd", data);

          if (data?.address_setPrimary?.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.address_getMyAddresses],
            });
          }
        },
      }
    );
  };

  return {
    router,
    refetch,
    hasNextPage,
    fetchNextPage,
    addressesData: userAddressData?.pages ?? [],
    isRefetching,
    isLoading,
    onSetPrimary,
  };
}
