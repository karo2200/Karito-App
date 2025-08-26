import { ThemedView } from "@/components";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useGetUserAddressesQuery } from "../address/hooks/Address.query";
import EmptyAddressState from "./Views/AddressEmpty";
import AddressList from "./Views/AddressList";

export default function AddressOrg() {
  const { data, isLoading } = useGetUserAddressesQuery();
  const addressList = data?.pages ?? [];

  return (
    <ThemedView style={styles.flex1}>
      {isLoading ? (
        <ThemedView style={styles.centerView}>
          <ActivityIndicator size="large" />
        </ThemedView>
      ) : addressList.length > 0 ? (
        <AddressList />
      ) : (
        <EmptyAddressState />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1, width: "100%" },

  centerView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
