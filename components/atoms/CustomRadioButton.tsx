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
    <ThemedView style={styles.flex1}>
      {checked ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <ThemedView style={styles.container}>
            <ThemedText numberOfLines={2} style={styles.width}>
              {label}
            </ThemedText>
            <ThemedView style={styles.outView}>
              <ThemedView style={styles.filledCircle} />
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <ThemedView style={styles.container}>
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
    borderColor: Colors.hint500,
    borderWidth: 2,
    height: 20,
    width: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },

  filledCircle: {
    backgroundColor: Colors.hint500,
    height: 14,
    width: 14,
    borderRadius: 14,
  },

  unCheckedView: {
    borderColor: Colors.mediumGray,
    borderWidth: 2,
    height: 20,
    width: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },

  container: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginLeft: 4,
    flexShrink: 1,
  },

  width: { width: "90%" },
});
