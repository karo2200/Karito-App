import EmptyAddressSvg from "@/assets/icons/EmptyAddress";
import { Divider, ThemedButton, ThemedText, ThemedView } from "@/components";
import { DeviceHeight } from "@/constants/Dimension";
import { FontStyle } from "@/constants/Fonts";
import { StyleSheet } from "react-native";

export default function EmptyAddressState() {
  return (
    <ThemedView>
      <ThemedView style={styles.container}>
        <EmptyAddressSvg />
        <Divider height={23} />
        <ThemedText>هیچ آدرسی وارد نکرده‌اید!</ThemedText>
      </ThemedView>
      <ThemedButton
        title="افزودن آدرس جدید"
        fontType={FontStyle.bold}
        style={styles.btn}
        type="outline"
      />
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

  btn: { width: "100%", marginTop: 70 },
});
