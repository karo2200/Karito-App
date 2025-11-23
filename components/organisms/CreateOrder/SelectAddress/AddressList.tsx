import { CustomFlatList, ThemedButton, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";

import createOrderStore from "@/stores/createOrder";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useGetUserAddressesQuery } from "../../address/hooks/Address.query";
import EmptyAddressState from "./AddressEmpty";
import ListItem from "./ListItem";

export default function AddressList({
  onChange,
  setValue,
  setEmptyState = false,
  onClose,
}: {
  onChange?: any;
  setValue?: any;
  setEmptyState?: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const {
    setAddressId,
    setCustomerCity,
    setCustomerCityId,
    setAddress,
    addressId,
    address,
  } = createOrderStore();

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useGetUserAddressesQuery();

  const adresses = data?.pages?.[0] ? data?.pages : [];

  useEffect(() => {
    setValue("addressId", addressId);
    setValue("addressLabel", address);
  }, [addressId]);

  useEffect(() => {
    if (data?.pages?.[0] && !isLoading) {
      const primaryAddress = data?.pages.find((addr) => addr.isPrimary);
      setValue("addressId", primaryAddress?.id);
      setValue("addressLabel", primaryAddress?.text);
      setAddressId?.(primaryAddress?.id);
      setCustomerCity(primaryAddress?.city?.name);
      setCustomerCityId(primaryAddress?.city?.id);
      setAddress(primaryAddress?.text);
    }
  }, [data]);

  const onPress = () => {
    router.push("/CreateAddress");
    onClose?.();
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      {...{ item, index, router, length: data?.pages?.length, onChange }}
      onClose={onClose}
    />
  );

  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <ThemedView style={styles.container}>
      <CustomFlatList
        data={adresses}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}_${item?.value}`}
        onEndReached={onLoadMore}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          setEmptyState
            ? () => <EmptyAddressState onPressNewAddress={onPress} />
            : undefined
        }
      />
      {adresses?.length > 0 && (
        <ThemedButton
          title="افزودن آدرس جدید"
          fontType={"bold"}
          style={styles.btn}
          type="outline"
          onPress={onPress}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  btn: { width: "100%", marginTop: 70, bottom: 30 },

  container: { width: "100%", flex: 1, alignItems: "center" },

  editIcon: { backgroundColor: Colors.background },

  groupView: {
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 3,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  label: { marginBottom: 16 },
});
