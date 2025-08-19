import EmptyAddressSvg from "@/assets/icons/EmptyAddress";
import { hideSheet, showSheet } from "@/hooks/useShowSheet";
import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedButton from "../atoms/ThemedButton";
import ThemedText from "../atoms/ThemedText";

const GuestMode = () => {
  return (
    <View style={styles.container}>
      <EmptyAddressSvg />
      <ThemedText style={styles.text}>
        لطفا برای استفاده از امکانات اپلیکیشن نقش خود را انتخاب کنید.
      </ThemedText>
      <ThemedButton
        title={"انتخاب نقش"}
        style={styles.btn}
        onPress={() => {
          showSheet("confirmation-action", {
            payload: {
              hasLoading: false,
              showToastInActionSheet: false,
              title: "ورود",

              onClose: () => hideSheet("confirmation-action"),
            },
          });
        }}
      />
    </View>
  );
};

export default GuestMode;

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
    marginVertical: 24,
  },

  container: { flex: 1, alignItems: "center", justifyContent: "center" },

  btn: { width: "50%" },
});
