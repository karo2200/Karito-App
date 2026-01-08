import { Colors } from "@/constants/Colors";
import { useRoute } from "@react-navigation/native";
import React, { JSX } from "react";
import { StyleSheet, View } from "react-native";
import { CustomImage, ThemedText, ThemedView } from "..";
import CircularStepProgress from "./CircularStepProgress";

export function ProgressBar({ step }: { step?: number }): JSX.Element {
  const item = useRoute().params;

  return (
    <ThemedView style={styles.rowView}>
      <CustomImage src={item?.logo} style={styles.image} resizeMode="cover" />
      <ThemedView style={styles.margin}>
        <ThemedText
          fontType="bold"
          style={{ fontSize: 14, color: Colors.black }}
        >{`درخواست سرویس «${item?.subService}»`}</ThemedText>
        <ThemedText
          style={{ fontSize: 12, color: Colors.gray500 }}
          numberOfLines={1}
        >{`خدمات مربوط به ${item?.service}`}</ThemedText>
      </ThemedView>
      <View style={{ flex: 1 }} />
      <CircularStepProgress step={step} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  image: { width: 44, height: 44, borderRadius: 4, overflow: "hidden" },

  rowView: {
    flexDirection: "row-reverse",
    paddingHorizontal: 16,
  },

  margin: {
    marginRight: 8,
    justifyContent: "space-between",
  },

  infoView: {
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: Colors.info50,
    borderColor: Colors.info200,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row-reverse",
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: "100%",
  },

  infoText: { color: Colors.info900, marginRight: 16, fontWeight: "400" },

  flex1: { flex: 1, width: "100%" },
});
