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
    <ThemedView style={styles.flex1}>
      {checked ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <ThemedView style={styles.container}>
            <ThemedView style={styles.flex1} />
            <ThemedText numberOfLines={2} style={styles.width}>
              {label}
            </ThemedText>
            <ThemedView style={styles.outView}>
              <TickSquare size={24} color={Colors.hint500} />
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <ThemedView style={styles.container}>
            <ThemedView style={styles.flex1} />
            <ThemedText numberOfLines={2} style={styles.width}>
              {label}
            </ThemedText>
            <ThemedView style={styles.unCheckedView} />
          </ThemedView>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },

  outView: {
    alignItems: "center",
    justifyContent: "center",
    height: 22,
    width: 22,
    marginLeft: 4,
  },

  unCheckedView: {
    borderColor: Colors.mediumGray,
    borderWidth: 2,
    height: 22,
    width: 22,
    marginLeft: 4,
    borderRadius: 6,
  },

  container: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 4,
    flexShrink: 1,
  },

  width: { width: "90%" },
});
