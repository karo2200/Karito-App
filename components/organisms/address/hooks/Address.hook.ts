import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  SortEnumType,
  useAddress_DeleteMutation,
  useAddress_SetPrimaryMutation,
} from "@/generated/graphql";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useGetUserAddressesQuery } from "./Address.query";

export default function useAddressHook() {
  const router = useRouter();

  const { showToast } = useToast();

  const queryClient = useQueryClient();

  const [deleteVisibe, setDeleteVisible] = useState(false);
  const [address, setAddress] = useState();

  const {
    data: userAddressData,
    refetch,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    isLoading,
  } = useGetUserAddressesQuery({ order: [{ isPrimary: SortEnumType.Desc }] });

  const { mutate } = useAddress_SetPrimaryMutation();

  const { mutate: deleteAddressMutate, isPending: deleteLoading } =
    useAddress_DeleteMutation();

  const onSetPrimary = (addressId: string) => {
    mutate(
      {
        input: {
          addressId: addressId,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.address_setPrimary?.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.address_getMyAddresses],
            });
          }
        },
      }
    );
  };

  const onDeletePress = () => {
    deleteAddressMutate(
      { input: { addressId: address } },
      {
        onSuccess: (data) => {
          console.log(JSON.stringify({ data }));
          if (data?.address_delete?.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.address_getMyAddresses],
              exact: false,
            });
            setDeleteVisible(false);
          } else {
            showToast({
              message: data?.address_delete?.status?.message,
              type: "error",
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
    deleteLoading,
    onDeletePress,
    setAddress,
    address,
    deleteVisibe,
    setDeleteVisible,
  };
}
