import {
  Divider,
  ThemedButton,
  ThemedContainer,
  ThemedView,
} from "@/components";
import { StyleSheet } from "react-native";

import { ProgressBar } from "@/components/molecules/ProgressBar";
import SelectOrderTime from "../SelectTime";

export default function AddressOrg() {
  return (
    <ThemedContainer style={styles.container}>
      <ProgressBar percent={70} />
      <ThemedView style={styles.flex1}>
        <SelectOrderTime />
      </ThemedView>
      <ThemedView style={styles.bottomView}>
        <ThemedButton title="بعدی" style={styles.flex1} disabled />
        <Divider height={0} width={8} />
        <ThemedButton title="قبلی" type="outline" style={styles.flex1} />
      </ThemedView>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {},

  divider: { flex: 0.9 },

  bottomView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  flex1: { flex: 1 },
});
