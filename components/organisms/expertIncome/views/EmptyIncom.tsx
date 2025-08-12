import { EmptyIncomSvg } from "@/assets";
import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { memo } from "react";
import { StyleSheet } from "react-native";

const EmptyIncomState = () => {
  return (
    <ThemedView style={styles.view}>
      <EmptyIncomSvg />
      <ThemedText fontType="bold" style={styles.label}>
        در تاریخ انتخابی تراکنشی برای شما ثبت نشده است!
      </ThemedText>
    </ThemedView>
  );
};

export default memo(EmptyIncomState);

const styles = StyleSheet.create({
  label: {
    color: Colors.black500,
    textAlign: "center",
    marginTop: 32,
  },

  view: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 75,
  },
});
