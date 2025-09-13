import { Colors } from "@/constants/Colors";
import { forwardRef, useImperativeHandle, useState } from "react";
import { DimensionValue, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "..";

const DayTimeItem = forwardRef(
  (
    {
      title,
      subtitle,
      width,
      height,
      checked,
      onItemPress,
    }: {
      title: string;
      subtitle?: string;
      width?: DimensionValue;
      height?: DimensionValue;
      checked?: boolean;
      onItemPress?: () => void;
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(checked);

    useImperativeHandle(ref, () => ({
      setCheck: (value: boolean) => {
        setIsChecked(value);
      },
    }));

    return (
      <TouchableOpacity
        style={[
          isChecked ? styles.selectedContainer : styles.deSelectedContainer,
          { width, height },
        ]}
        onPress={onItemPress}
        disabled={!onItemPress}
      >
        {subtitle && (
          <ThemedText
            type="subtitle"
            style={isChecked ? styles.selectedText : styles.deSelectedText}
          >
            {subtitle}
          </ThemedText>
        )}
        <ThemedText
          fontType="bold"
          type="title"
          style={checked ? styles.selectedText : styles.deSelectedText}
        >
          {title}
        </ThemedText>
      </TouchableOpacity>
    );
  }
);

export default DayTimeItem;

const styles = StyleSheet.create({
  selectedContainer: {
    borderColor: Colors.hint500,
    backgroundColor: Colors.hint50,
    borderWidth: 2,
    borderRadius: 12,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  deSelectedContainer: {
    borderColor: Colors.grayMedium,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedText: { color: Colors.hint500 },
  deSelectedText: { color: Colors.semiBlack },
});
