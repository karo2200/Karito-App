import EmptyOfferIcon from "@/assets/icons/EmptyOffer";
import { Divider, ThemedText, ThemedView } from "@/components";
import { DeviceHeight } from "@/constants/Dimension";
import { StyleSheet } from "react-native";

export default function EmptyOfferState() {
  return (
    <ThemedView>
      <ThemedView style={styles.container}>
        <EmptyOfferIcon />
        <Divider height={23} />
        <ThemedText>در حال حاضر هیچ کد تخفیفی ندارید!</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: DeviceHeight * 0.15,
  },
});
