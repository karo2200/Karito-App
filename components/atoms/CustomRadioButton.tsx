import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function CustomRadioButton({
  label,
  checked,
  onPress,
}: {
  checked: boolean;
  label?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{ flex: 1 }}>
      <ThemedView style={styles.flex1}>
        <ThemedView
          style={[styles.outView, checked && { borderColor: Colors.hint500 }]}
        >
          {checked && <ThemedView style={styles.filledCircle} />}
        </ThemedView>
        <ThemedText
          numberOfLines={2}
          fontType="semiBold"
          style={[styles.width, checked && { color: Colors.hint900 }]}
        >
          {label}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flexDirection: "row-reverse",
    alignItems: "center",
    width: "100%",
  },

  outView: {
    borderColor: Colors.gray["200"],
    borderWidth: 0.9,
    height: 18,
    width: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  filledCircle: {
    backgroundColor: Colors.hint500,
    height: 12,
    width: 12,
    borderRadius: 10,
  },

  width: { fontSize: 14, color: Colors.black },
});
