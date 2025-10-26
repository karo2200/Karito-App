import { ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { maxWidth } from "@/constants/Dimension";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function TimeSlotItem({
  item,
  index,
  field,
  isDisabled,
  onPress,
}: {
  item: any;
  index: number;
  field: any;
  isDisabled: boolean;
  onPress: any;
}) {
  const isSelected = useMemo(() => {
    return field?.value?.value === item?.value;
  }, [field.value, item]);

  return (
    <TouchableOpacity
      style={[
        styles.timeButton,
        isSelected && styles.timeButtonSelected,
        isDisabled && { backgroundColor: Colors.disabledIcon },
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <ThemedText
        fontType={isSelected ? "bold" : "regular"}
        style={[styles.timeText, isSelected && styles.timeTextSelected]}
      >
        {item?.label}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  timeButton: {
    borderWidth: 2,
    borderColor: Colors.gray100,
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 4,
    minWidth: maxWidth / 3 - 20,
    alignItems: "center",
    justifyContent: "center",
  },

  timeButtonSelected: {
    backgroundColor: Colors.hint50,
    borderColor: Colors.hint500,
    borderWidth: 2,
  },

  timeText: {
    fontSize: 14,
    color: Colors.gray900,
  },

  timeTextSelected: {
    color: Colors.hint500,
  },
});
