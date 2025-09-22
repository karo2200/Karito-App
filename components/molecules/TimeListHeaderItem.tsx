import { Colors } from "@/constants/Colors";
import { forwardRef, useMemo } from "react";
import { useController } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "..";

const width = 80;

const TimeListHeaderItem = forwardRef(
  (
    {
      item,
      onItemPress,
    }: {
      item: any;
      onItemPress?: () => void;
    },
    ref
  ) => {
    const { field } = useController({ name: "date" });

    const handleOnItemPress = () => {
      field.onChange(item.value);
      onItemPress?.();
    };

    const isChecked = useMemo(() => {
      return item?.value === field.value;
    }, [field.value]);

    return (
      <TouchableOpacity
        style={[
          isChecked ? styles.selectedContainer : styles.deSelectedContainer,
        ]}
        onPress={handleOnItemPress}
        disabled={!onItemPress}
      >
        <ThemedText
          type="subtitle"
          style={isChecked ? styles.selectedText : styles.deSelectedText}
        >
          {item?.display}
        </ThemedText>
        <ThemedText
          fontType="bold"
          type="title"
          style={isChecked ? styles.selectedText : styles.deSelectedText}
        >
          {item?.label}
        </ThemedText>
      </TouchableOpacity>
    );
  }
);

export default TimeListHeaderItem;

const styles = StyleSheet.create({
  selectedContainer: {
    borderColor: Colors.hint500,
    backgroundColor: Colors.hint50,
    borderWidth: 2,
    borderRadius: 12,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    width,
  },

  deSelectedContainer: {
    borderColor: Colors.grayMedium,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    width,
  },

  selectedText: { color: Colors.hint500 },
  deSelectedText: { color: Colors.semiBlack },
});
