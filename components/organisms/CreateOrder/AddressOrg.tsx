import { ThemedView } from "@/components";
import { StyleSheet } from "react-native";
import EmptyAddressState from "./Views/AddressEmpty";

export default function AddressOrg() {
  return (
    <ThemedView style={styles.flex1}>
      <EmptyAddressState />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1, width: "100%" },
});
