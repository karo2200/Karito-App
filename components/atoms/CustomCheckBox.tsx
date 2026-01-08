import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { TickSquare } from "iconsax-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function CustomCheckbox({
  label,
  checked,
  onPress,
}: {
  checked: boolean;
  label?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <ThemedView style={styles.flex1}>
        <ThemedText
          numberOfLines={2}
          style={[styles.width, checked && { color: Colors.hint900 }]}
          fontType="semiBold"
        >
          {label}
        </ThemedText>
        {checked ? (
          <TickSquare size={18} color={Colors.hint500} variant="Bold" />
        ) : (
          <ThemedView style={styles.unCheckedView} />
        )}
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  outView: {
    alignItems: "center",
    justifyContent: "center",
    height: 18,
    width: 18,
  },

  unCheckedView: {
    borderColor: Colors.gray["200"],
    borderWidth: 0.9,
    height: 18,
    width: 18,
    borderRadius: 4,
  },

  width: {
    fontSize: 14,
    color: Colors.black,
    marginHorizontal: 10,
  },
});
